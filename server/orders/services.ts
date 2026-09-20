import { Locale } from "@/types";
import {
  PlaceOrderCreateInputs,
  OrderStatus,
  OrdersFilteration,
  OrdersReportDataFilter,
} from "./types";
import { createOrderBackendSchema } from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { generateOrderNumber } from "@/lib/helpers";
import { Prisma } from "@/generated/prisma/client";

export const placeAnOrder = async (
  orderData: PlaceOrderCreateInputs,
  userId: string,
) => {
  try {
    const validation = createOrderBackendSchema.safeParse(orderData);

    if (!validation.success)
      return {
        success: false,
        message: "VALIDATION_ERROR",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    if (!userId)
      return {
        success: false,
        message: "USER_ID_REQUIRED",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    return prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          cartItems: {
            include: {
              productVariants: {
                select: {
                  products: {
                    select: { productNameEn: true, productNameAr: true },
                  },
                },
              },
            },
          },
        },
      });

      if (!cart) throw new Error("CART_NOT_FOUND");
      if (cart.cartItems.length === 0) throw new Error("CART_EMPTY");

      let cartTotalAmount = cart.totalAmount;
      let appliedPromoCodeId: string | null = null;

      if (validation.data.promoCode) {
        const existedPromoCode = await tx.promo_codes.findUnique({
          where: { code: validation.data.promoCode.trim().toUpperCase() },
        });

        if (
          !existedPromoCode ||
          existedPromoCode.usedCount >= existedPromoCode.maxUsage ||
          !existedPromoCode.isActive ||
          (existedPromoCode.expiresAt &&
            existedPromoCode.expiresAt < new Date())
        )
          throw new Error("INVALID_PROMO_CODE");

        const usedByUser = await tx.user_promo_codes.findFirst({
          where: { promoCodeId: existedPromoCode.id, userId },
        });

        if (usedByUser) throw new Error("PROMO_CODE_ALREADY_USED");

        const discount = cartTotalAmount
          .mul(existedPromoCode.discountPercentage)
          .div(100);

        cartTotalAmount = cartTotalAmount.sub(discount);
        appliedPromoCodeId = existedPromoCode.id;
      }

      const variants = await tx.product_variants.findMany({
        where: {
          id: { in: cart.cartItems.map((item) => item.variantId) },
        },
      });

      const variantsMap = new Map(variants.map((v) => [v.id, v]));

      for (const cartItem of cart.cartItems) {
        const productVariant = variantsMap.get(cartItem.variantId);

        if (!productVariant) throw new Error("PRODUCT_VARIANT_NOT_FOUND");

        if (cartItem.quantity > productVariant.stock)
          throw new Error("QUANTITY_EXCEEDS_AVAILABLE_STOCK");

        await tx.product_variants.update({
          where: { id: cartItem.variantId },
          data: {
            stock: { decrement: cartItem.quantity },
          },
        });
      }

      const { promoCode, ...orderValidatedData } = validation.data;
      const orderNumber = generateOrderNumber();

      const order = await tx.orders.create({
        data: {
          ...orderValidatedData,
          userId,
          orderNumber,
          totalAmount: cartTotalAmount,
          subtotal: cart.totalAmount,
          discountAmount: cart.totalAmount.sub(cartTotalAmount),
        },
      });

      const arrayOfOrderItems = cart.cartItems.map((item) => ({
        variantId: item.variantId,
        itemPrice: item.itemPrice,
        quantity: item.quantity,
        productNameEn: item.productVariants.products.productNameEn,
        productNameAr: item.productVariants.products.productNameAr,
        orderId: order.id,
      }));

      await tx.order_items.createMany({
        data: arrayOfOrderItems,
      });

      if (validation.data.promoCode && appliedPromoCodeId) {
        await tx.promo_codes.update({
          where: {
            id: appliedPromoCodeId,
          },
          data: { usedCount: { increment: 1 } },
        });

        await tx.user_promo_codes.create({
          data: {
            orderId: order.id,
            userId,
            promoCodeId: appliedPromoCodeId,
          },
        });
      }

      await tx.cart_items.deleteMany({
        where: { cartId: cart.id },
      });

      await tx.cart.update({
        where: { id: cart.id },
        data: { totalAmount: 0 },
      });

      revalidateTag("orders", { expire: 0 });
      revalidateTag("cart", { expire: 0 });
      revalidateTag("cartItems", { expire: 0 });

      return {
        success: true,
        message: "ORDER_PLACED_SUCCESSFULLY",
        code: RESPONSE_CODES.CREATED,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "CART_NOT_FOUND":
        case "PRODUCT_VARIANT_NOT_FOUND":
          return {
            success: false,
            message: error.message,
            code: RESPONSE_CODES.NOT_FOUND,
          };

        case "INVALID_PROMO_CODE":
        case "PROMO_CODE_ALREADY_USED":
        case "QUANTITY_EXCEEDS_AVAILABLE_STOCK":
          return {
            success: false,
            message: error.message,
            code: RESPONSE_CODES.BAD_REQUEST,
          };

        case "CART_EMPTY":
          return {
            success: false,
            message: error.message,
            code: RESPONSE_CODES.CONFLICT,
          };
      }
    }

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      code: RESPONSE_CODES.INTERNAL_ERROR,
    };
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  const order = await prisma.orders.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!order)
    return {
      success: false,
      message: "ORDER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
    };

  await prisma.orders.update({
    where: {
      id: orderId,
    },

    data: {
      status,
    },
  });

  revalidateTag("orders", { expire: 0 });
  revalidateTag(`order-${orderId}`, { expire: 0 });

  return {
    success: true,
    message: "ORDER_STATUS_UPDATED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
  };
};

/* -------------------- Caching Helps --------------------  */

const getCachedOrdersByUserIdAndLocale = (userId: string) =>
  unstable_cache(
    async () => {
      return prisma.orders.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          totalAmount: true,
          subtotal: true,
          discountAmount: true,
          orderNumber: true,
          status: true,
          createdAt: true,
          _count: {
            select: {
              orderItems: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    [`orders-by-userId-${userId}`],
    {
      tags: ["orders"],
      revalidate: 3600,
    },
  )();

const getCachedOrderByIdUserAndLocale = (
  orderId: string,
  userId: string,
  locale: Locale,
) =>
  unstable_cache(
    async () => {
      const order = await prisma.orders.findFirst({
        where: {
          id: orderId,
          userId,
        },
        select: {
          id: true,
          email: true,
          phoneNumber: true,
          city: true,
          streetAddress: true,
          buildingNumber: true,
          additionalNote: true,
          subtotal: true,
          discountAmount: true,
          orderNumber: true,
          totalAmount: true,
          status: true,
          createdAt: true,

          orderItems: {
            select: {
              id: true,
              productNameAr: true,
              productNameEn: true,
              quantity: true,
              itemPrice: true,
              variantId: true,
              productVariants: { select: { variantImage: true } },
            },
          },

          userPromoCodes: {
            select: {
              promoCodes: { select: { code: true, discountPercentage: true } },
            },
          },
        },
      });

      if (!order) return null;

      return {
        orderId: order.id,
        email: order.email,
        phoneNumber: order.phoneNumber,
        city: order.city,
        streetAddress: order.streetAddress,
        buildingNumber: order.buildingNumber,
        additionalNote: order.additionalNote,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        discountAmount: order.discountAmount,
        status: order.status,
        promoCodeDetails: order.userPromoCodes,
        createdAt: order.createdAt,
        orderItems: order.orderItems.map((item) => ({
          orderItemId: item.id,
          itemPrice: item.itemPrice,
          quantity: item.quantity,
          variantImage: item.productVariants?.variantImage ?? null,
          productName:
            locale === "en" ? item.productNameEn : item.productNameAr,
        })),
      };
    },
    [`order-by-id-${orderId}-userId-${userId}-and-locale-${locale}`],
    { tags: ["orders"], revalidate: 3600 },
  )();

const getCachedAdminOrders = (filterationObject: OrdersFilteration) => {
  const page = filterationObject.page ?? 1;
  const take = filterationObject.take ?? 5;
  const customerEmail = filterationObject.customerEmail ?? "";
  const status = filterationObject.status ?? "";
  const orderNumber = filterationObject.orderNumber ?? "";

  return unstable_cache(
    async () => {
      const skip = take * (page - 1);

      const where: Prisma.ordersWhereInput = {};

      if (status) {
        where.status = status;
      }

      if (customerEmail) {
        where.users = {
          email: customerEmail,
        };
      }

      if (orderNumber) {
        where.orderNumber = {
          contains: orderNumber,
          mode: "insensitive",
        };
      }

      const ordersCount = await prisma.orders.count({ where });
      const result = await prisma.orders.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          totalAmount: true,
          paymentMethod: true,
          status: true,
          createdAt: true,
          orderNumber: true,
          updatedAt: true,

          users: {
            select: {
              email: true,
            },
          },

          _count: {
            select: {
              orderItems: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        orders: result.map((o) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          paymentMethod: o.paymentMethod,
          customerEmail: o.users?.email,
          createdAt: o.createdAt,
          itemsCount: o._count.orderItems,
          totalAmount: o.totalAmount,
          status: o.status,
          updatedAt: o.updatedAt,
        })),

        pagination: {
          currentPage: page,
          itemsPerPage: take,
          totalItems: ordersCount,
          totalPages: Math.ceil(ordersCount / take),
        },
      };
    },
    [
      `admin-orders-pag-${page}-${customerEmail}-${status}-${take}-${orderNumber}`,
    ],
    {
      tags: ["orders"],
      revalidate: 3600,
    },
  )();
};

const getCachedAdminOrderById = (orderId: string) =>
  unstable_cache(
    async () => {
      return prisma.orders.findUnique({
        where: {
          id: orderId,
        },

        select: {
          id: true,
          orderNumber: true,
          email: true,
          phoneNumber: true,
          city: true,
          streetAddress: true,
          paymentMethod: true,
          buildingNumber: true,
          additionalNote: true,
          subtotal: true,
          discountAmount: true,
          totalAmount: true,
          status: true,
          createdAt: true,
          userPromoCodes: {
            where: { orderId },
            select: {
              promoCodes: {
                select: {
                  code: true,
                  discountPercentage: true,
                },
              },
            },
          },

          users: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          orderItems: {
            select: {
              id: true,
              productNameEn: true,
              variantId: true,
              quantity: true,
              itemPrice: true,
              productVariants: {
                select: {
                  sku: true,
                  stock: true,
                  price: true,
                  finalPrice: true,
                  discountPercentage: true,
                  isDefault: true,
                  variantImage: true,
                },
              },
            },
          },
        },
      });
    },
    [`admin-order-${orderId}`],
    {
      tags: [`order-${orderId}`],
      revalidate: 3600,
    },
  )();

const getCachedAdminOrdersByStatus = (
  status?: OrderStatus,
  page: number = 1,
) => {
  const itemsPerPage = 10;
  const skip = (page - 1) * itemsPerPage;
  return unstable_cache(
    async () => {
      const [orders, totalOrders] = await prisma.$transaction([
        prisma.orders.findMany({
          where: { ...(status && { status }) },
          select: {
            id: true,
            totalAmount: true,
            subtotal: true,
            discountAmount: true,
            status: true,
            createdAt: true,
            users: { select: { id: true, name: true, email: true } },
            _count: { select: { orderItems: true } },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: itemsPerPage,
        }),
        prisma.orders.count({ where: { ...(status && { status }) } }),
      ]);
      return {
        orders,
        pagination: {
          currentPage: page,
          itemsPerPage,
          totalItems: totalOrders,
          totalPages: Math.ceil(totalOrders / itemsPerPage),
        },
      };
    },
    [`admin-orders-by-status-${status}-and-page-${page}`],
    { tags: ["orders"], revalidate: 3600 },
  )();
};

/* -------------------- Caching Helps --------------------  */

export const getAllOrdersByUserId = async (userId: string) => {
  if (!userId)
    return {
      success: false,
      message: "USER_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  const orders = await getCachedOrdersByUserIdAndLocale(userId);

  return {
    success: true,
    message: "ORDERS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: orders,
  };
};

export const getOrderDetailsByUserIdAndLocale = async (
  orderId: string,
  userId: string,
  locale: Locale,
) => {
  try {
    if (!orderId || !userId)
      return {
        success: false,
        message: "ORDER_ID_AND_USER_ID_REQUIRED",
        code: RESPONSE_CODES.BAD_REQUEST,
        data: null,
      };

    const order = await getCachedOrderByIdUserAndLocale(
      orderId,
      userId,
      locale,
    );

    if (!order)
      return {
        success: false,
        message: "ORDER_NOT_FOUND",
        code: RESPONSE_CODES.NOT_FOUND,
        data: null,
      };

    return {
      success: true,
      message: "ORDER_DETAILS_RETRIEVED_SUCCESSFULLY",
      code: RESPONSE_CODES.OK,
      data: order,
    };
  } catch (error) {
    console.log("Get order details error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      code: RESPONSE_CODES.INTERNAL_ERROR,
      data: null,
    };
  }
};

export const adminGetOrders = async (filtrationObject: OrdersFilteration) => {
  const orders = await getCachedAdminOrders(filtrationObject);

  return {
    success: true,
    message: "ORDERS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: orders,
  };
};

export const adminGetOrderById = async (orderId: string) => {
  if (!orderId)
    return {
      success: false,
      message: "ORDER_ID_REQUIRED",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  const order = await getCachedAdminOrderById(orderId);

  if (!order)
    return {
      success: false,
      message: "ORDER_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
      data: null,
    };

  return {
    success: true,
    message: "ORDER_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: order,
  };
};

export const adminGetOrdersByStatus = async (
  status?: OrderStatus,
  page: number = 1,
) => {
  const result = await getCachedAdminOrdersByStatus(status, page);

  return {
    success: true,
    message: "ORDERS_RETRIEVED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: result,
  };
};

export const getOrdersReportData = async (
  filterationObj: OrdersReportDataFilter,
) => {
  const { from, to, status } = filterationObj;

  if (from > to) {
    return {
      success: false,
      message: "INVALID_REPORT_DATE_RANGE",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };
  }

  const MAX_REPORT_DAYS = 370;
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diffInDays = (to.getTime() - from.getTime()) / MS_PER_DAY;
  if (diffInDays > MAX_REPORT_DAYS)
    return {
      success: false,
      message: "REPORT_RANGE_CANNOT_EXCEED_ONE_YEAR",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  try {
    return prisma.$transaction(async (tx) => {
      /*     ==================================    First Section: Report Summary Data     ==================================     */
      const allOrdersCount = await tx.orders.count({
        where: {
          createdAt: {
            gte: from,
            lt: to,
          },
        },
      });
      const allSoldItems = await tx.order_items.aggregate({
        where: {
          orders: {
            status: "DELIVERED",
            createdAt: {
              gte: from,
              lt: to,
            },
          },
        },
        _sum: {
          quantity: true,
        },
      });

      const ordersByStatus = await tx.orders.groupBy({
        by: ["status"],
        where: {
          createdAt: {
            gte: from,
            lt: to,
          },
        },
        _count: {
          id: true,
        },
        _sum: {
          totalAmount: true,
        },
      });

      // Total Pending Orders Count
      const totalPendingOrdersCount =
        ordersByStatus.find((o) => o.status === "PENDING")?._count.id ?? 0;

      // Total Cancelled Orders Count
      const totalCancelledOrdersCount =
        ordersByStatus.find((o) => o.status === "CANCELLED")?._count.id ?? 0;

      // Total Delivered Orders Count, and Total Amount
      const totalDeliveredOrders = ordersByStatus.find(
        (o) => o.status === "DELIVERED",
      );
      const totalDeliveredOrdersCount = totalDeliveredOrders?._count.id ?? 0;
      const totalDeliveredOrdersAmount =
        totalDeliveredOrders?._sum.totalAmount?.toFixed(2) ?? "0.00";

      const ordersSummary = {
        allOrdersCount,
        allSoldItems: allSoldItems._sum.quantity ?? 0,
        totalPendingOrdersCount,
        totalCancelledOrdersCount,
        totalDeliveredOrdersCount,
        totalDeliveredOrdersAmount,
      };

      /*     ==================================     Second Section: Report Details Data     ==================================     */

      const orderDetailsData = await tx.orders.findMany({
        where: {
          createdAt: {
            gte: from,
            lt: to,
          },
          ...(status && {
            status,
          }),
        },

        select: {
          orderNumber: true,
          paymentMethod: true,
          totalAmount: true,
          subtotal: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          orderItems: {
            select: {
              productNameEn: true,
              quantity: true,
            },
          },
        },
      });

      const orderDetails = orderDetailsData.map((o) => ({
        orderNumber: o.orderNumber,
        paymentMethod: o.paymentMethod,
        totalAmount: o.totalAmount,
        subtotal: o.subtotal,
        status: o.status,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
        email: o.email,
        orderItemsNumbers: o.orderItems.reduce(
          (total, item) => total + item.quantity,
          0,
        ),
        products: o.orderItems.map((ot) => ({
          name: ot.productNameEn,
          quantity: ot.quantity,
        })),
      }));

      /*     ==================================     Third Section: Top Five Sold Products     ==================================     */

      const topProducts = await tx.order_items.groupBy({
        by: ["productNameEn"],
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
        where: {
          orders: {
            createdAt: {
              gte: from,
              lt: to,
            },
            status: "DELIVERED",
          },
        },
      });

      const topSoldProducts = topProducts.map((tp) => ({
        name: tp.productNameEn,
        quantitySold: Number(tp._sum.quantity),
      }));

      return {
        success: true,
        message: "ALL_REPORT_DATA",
        code: RESPONSE_CODES.OK,
        data: {
          ordersSummary,
          orderDetails,
          topSoldProducts,
        },
      };
    });
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      code: RESPONSE_CODES.INTERNAL_ERROR,
      data: null,
    };
  }
};


import { Locale, PlaceOrderCreateInputs, OrderStatus } from "@/types";
import { createOrderBackendSchema } from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { prisma } from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export const placeAnOrder = async (
  orderData: PlaceOrderCreateInputs,
  userId: string,
) => {
  try {
    const validation = createOrderBackendSchema.safeParse(orderData);

    if (!validation.success)
      return {
        success: false,
        message: "Validation error",
        code: RESPONSE_CODES.BAD_REQUEST,
      };

    if (!userId)
      return {
        success: false,
        message: "User ID required",
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

      if (!cart) throw new Error("Cart not found");
      if (cart.cartItems.length === 0) throw new Error("Cart is empty");
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
          throw new Error("Invalid Promo Code");

        const usedByUser = await tx.user_promo_codes.findFirst({
          where: { promoCodeId: existedPromoCode.id, userId },
        });
        if (usedByUser) throw new Error("Promo Code already used by this user");

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

        if (!productVariant) throw new Error("Product variant not found");
        if (cartItem.quantity > productVariant.stock)
          throw new Error("Quantity exceeds available stock");

        await tx.product_variants.update({
          where: { id: cartItem.variantId },
          data: {
            stock: { decrement: cartItem.quantity },
          },
        });
      }

      const { promoCode, ...orderValidatedData } = validation.data;
      const order = await tx.orders.create({
        data: {
          ...orderValidatedData,
          userId,
          totalAmount: cartTotalAmount,
          subtotal: cart.totalAmount,
          discountAmount: cart.totalAmount.sub(cartTotalAmount),
        },
      });

      const arrayOfOrderItems = cart.cartItems.map((item) => {
        return {
          variantId: item.variantId,
          itemPrice: item.itemPrice,
          quantity: item.quantity,
          productNameEn: item.productVariants.products.productNameEn,
          productNameAr: item.productVariants.products.productNameAr,
          orderId: order.id,
        };
      });

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

      revalidateTag("orders", "max");
      return {
        success: true,
        message: "Order placed successfully",
        code: RESPONSE_CODES.CREATED,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case "Cart not found":
        case "Product variant not found":
          return {
            success: false,
            message: error.message,
            code: RESPONSE_CODES.NOT_FOUND,
          };

        case "Invalid Promo Code":
        case "Quantity exceeds available stock":
          return {
            success: false,
            message: error.message,
            code: RESPONSE_CODES.BAD_REQUEST,
          };

        case "Cart is empty":
          return {
            success: false,
            message: error.message,
            code: RESPONSE_CODES.CONFLICT,
          };
      }
    }

    return {
      success: false,
      message: "Internal server error",
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
      message: "Order not found",
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

  revalidateTag("orders", "max");
  revalidateTag(`order-${orderId}`, "max");

  return {
    success: true,
    message: "Order status updated successfully",
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
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        orderItems: order.orderItems.map((item) => ({
          orderItemId: item.id,
          itemPrice: item.itemPrice,
          quantity: item.quantity,
          productName:
            locale === "en" ? item.productNameEn : item.productNameAr,
        })),
      };
    },
    [`order-by-id-${orderId}-userId-${userId}-and-locale-${locale}`],
    { tags: ["orders"], revalidate: 3600 },
  )();

const getCachedAdminOrders = () =>
  unstable_cache(
    async () => {
      return prisma.orders.findMany({
        select: {
          id: true,
          email: true,
          phoneNumber: true,
          city: true,
          totalAmount: true,
          subtotal: true,
          discountAmount: true,
          status: true,
          createdAt: true,

          users: {
            select: {
              id: true,
              name: true,
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
    },
    ["admin-orders"],
    {
      tags: ["orders"],
      revalidate: 3600,
    },
  )();

const getCachedAdminOrderById = (orderId: string) =>
  unstable_cache(
    async () => {
      return prisma.orders.findUnique({
        where: {
          id: orderId,
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
          totalAmount: true,
          status: true,
          createdAt: true,

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
      message: "User ID is required",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  const orders = await getCachedOrdersByUserIdAndLocale(userId);

  return {
    success: true,
    message: "Orders retrieved successfully",
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
        message: "Order ID and User ID are required",
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
        message: "Order not found",
        code: RESPONSE_CODES.NOT_FOUND,
        data: null,
      };

    return {
      success: true,
      message: "Order details retrieved successfully",
      code: RESPONSE_CODES.OK,
      data: order,
    };
  } catch (error) {
    console.log("Get order details error:", error);

    return {
      success: false,
      message: "Internal server error",
      code: RESPONSE_CODES.INTERNAL_ERROR,
      data: null,
    };
  }
};

export const adminGetOrders = async () => {
  const orders = await getCachedAdminOrders();

  return {
    success: true,
    message: "Orders retrieved successfully",
    code: RESPONSE_CODES.OK,
    data: orders,
  };
};

export const adminGetOrderById = async (orderId: string) => {
  if (!orderId)
    return {
      success: false,
      message: "Order ID required",
      code: RESPONSE_CODES.BAD_REQUEST,
      data: null,
    };

  const order = await getCachedAdminOrderById(orderId);

  if (!order)
    return {
      success: false,
      message: "Order not found",
      code: RESPONSE_CODES.NOT_FOUND,
      data: null,
    };

  return {
    success: true,
    message: "Order retrieved successfully",
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
    message: "Orders retrieved successfully",
    code: RESPONSE_CODES.OK,
    data: result,
  };
};

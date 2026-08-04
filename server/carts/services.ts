import { type Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ClearCartData, Locale } from "@/types";
import { clearCartSchema } from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { revalidateTag, unstable_cache } from "next/cache";

export const getOrCreateUserCart = async (
  db: Prisma.TransactionClient | typeof prisma,
  userId: string,
) => {
  let cart = await db.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    revalidateTag("carts", "max");
    cart = await db.cart.create({
      data: {
        userId,
      },
    });
  }

  return cart;
};

export const recalculateTotalAmount = async (
  db: Prisma.TransactionClient | typeof prisma,
  cartId: string,
) => {
  const cartItems = await db.cart_items.findMany({
    where: {
      cartId,
    },
    select: {
      itemPrice: true,
      quantity: true,
    },
  });

  const totalAmount = Number(
    cartItems.reduce((total, item) => {
      return total + Number(item.itemPrice) * item.quantity;
    }, 0),
  ).toFixed(2);

  const updatedTotalAmount = await db.cart.update({
    where: { id: cartId },
    data: { totalAmount },
  });
  revalidateTag("carts", "max");
  return updatedTotalAmount;
};

export const clearCart = async (cartData: ClearCartData) => {
  const validation = clearCartSchema.safeParse(cartData);

  if (!validation.success) {
    return {
      success: false,
      message: "VALIDATION_ERROR",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: {
          userId: validation.data.userId,
        },
      });

      if (!cart) {
        throw new Error("CART_NOT_FOUND");
      }

      await tx.cart_items.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await tx.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          totalAmount: 0,
        },
      });

      revalidateTag("cartItems", { expire: 0 });
      revalidateTag("carts", { expire: 0 });

      return {
        success: true,
        message: "CART_CLEARED_SUCCESSFULLY",
        code: RESPONSE_CODES.OK,
      };
    });
  } catch (error) {
    console.log("Clear cart error:", error);

    if (error instanceof Error && error.message === "CART_NOT_FOUND") {
      return {
        success: false,
        message: error.message,
        code: RESPONSE_CODES.NOT_FOUND,
      };
    }

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      code: RESPONSE_CODES.INTERNAL_ERROR,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

const getCachedCartByUserIdAndLocale = (userId: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const cart = await prisma.cart.findUnique({
        where: {
          userId,
        },
        select: {
          id: true,
          totalAmount: true,
          cartItems: {
            select: {
              id: true,
              quantity: true,
              itemPrice: true,

              productVariants: {
                select: {
                  id: true,
                  sku: true,
                  variantImage: true,

                  products: {
                    select: {
                      id: true,
                      productNameEn: true,
                      productNameAr: true,
                      productCardImage: true,
                      slug: true,
                    },
                  },

                  variantAttributeValues: {
                    select: {
                      attributeValues: {
                        select: {
                          id: true,
                          attributeValueEn: true,
                          attributeValueAr: true,

                          attributes: {
                            select: {
                              attributeNameEn: true,
                              attributeNameAr: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!cart) return null;

      return {
        cartId: cart.id,
        totalAmount: cart.totalAmount,

        items: cart.cartItems.map((item) => ({
          cartItemId: item.id,

          quantity: item.quantity,

          // price when added to cart
          itemPrice: item.itemPrice,

          product: {
            id: item.productVariants.id,

            name:
              locale === "en"
                ? item.productVariants.products.productNameEn
                : item.productVariants.products.productNameAr,

            image:
              item.productVariants.variantImage ??
              item.productVariants.products.productCardImage,

            slug: item.productVariants.products.slug,
          },

          variant: {
            id: item.productVariants.id,
            sku: item.productVariants.sku,

            attributes: item.productVariants.variantAttributeValues.map(
              (value) => ({
                attributeName:
                  locale === "en"
                    ? value.attributeValues.attributes.attributeNameEn
                    : value.attributeValues.attributes.attributeNameAr,

                value:
                  locale === "en"
                    ? value.attributeValues.attributeValueEn
                    : value.attributeValues.attributeValueAr,

                valueId: value.attributeValues.id,
              }),
            ),
          },

          subtotal: Number(item.itemPrice) * Number(item.quantity),
        })),
      };
    },
    [`cart-${userId}-${locale}`],
    {
      tags: ["cart"],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getCartByUserIdAndLocale = async (
  userId: string,
  locale: Locale,
) => {
  const cart = await getCachedCartByUserIdAndLocale(userId, locale);

  if (!cart)
    return {
      success: false,
      message: "CART_NOT_FOUND",
      code: RESPONSE_CODES.NOT_FOUND,
      data: null,
    };

  return {
    success: true,
    message: "CART_FETCHED_SUCCESSFULLY",
    code: RESPONSE_CODES.OK,
    data: cart,
  };
};

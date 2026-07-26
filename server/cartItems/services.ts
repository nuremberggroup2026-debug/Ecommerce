import { CartitemCreateInput, UpdateQuantity } from "@/types";
import {
  deleteCartItemSchema,
  newCartItemSchema,
  updateQuantitySchema,
} from "./validators";
import { RESPONSE_CODES } from "@/lib/constants/response";
import { getOrCreateUserCart, recalculateTotalAmount } from "../carts/services";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const addCartItem = async (
  newCartitem: CartitemCreateInput,
  userId: string,
) => {
  const validation = newCartItemSchema.safeParse(newCartitem);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation error",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const productVariant = await tx.product_variants.findUnique({
        where: { id: validation.data.variantId },
        select: {
          id: true,
          finalPrice: true,
          stock: true,
        },
      });

      if (!productVariant) {
        throw new Error("Product variant not found");
      }

      const cart = await getOrCreateUserCart(tx, userId);

      const existingItem = await tx.cart_items.findFirst({
        where: {
          cartId: cart.id,
          variantId: productVariant.id,
        },
      });

      if (existingItem) {
        const newQuantity = validation.data.quantity + existingItem.quantity;

        if (newQuantity > productVariant.stock) {
          throw new Error("Quantity exceeds available stock");
        }

        await tx.cart_items.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: newQuantity,
          },
        });
      } else {
        if (validation.data.quantity > productVariant.stock) {
          throw new Error("Quantity exceeds available stock");
        }

        await tx.cart_items.create({
          data: {
            cartId: cart.id,
            variantId: productVariant.id,
            itemPrice: productVariant.finalPrice,
            quantity: validation.data.quantity,
          },
        });
      }

      await recalculateTotalAmount(tx, cart.id);

      revalidateTag("cartItems", "max");
      revalidateTag("carts", "max");

      return {
        success: true,
        message: "Item added to cart",
        code: RESPONSE_CODES.CREATED,
      };
    });
  } catch (error) {
    console.log("Add cart item error:", error);

    if (error instanceof Error) {
      if (error.message === "Product variant not found") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.NOT_FOUND,
        };
      }

      if (error.message === "Quantity exceeds available stock") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.BAD_REQUEST,
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

export const editQuantity = async (
  updateQuantityData: UpdateQuantity,
  userId: string,
) => {
  const validation = updateQuantitySchema.safeParse(updateQuantityData);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation error",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const cartItem = await tx.cart_items.findFirst({
        where: {
          id: validation.data.cartItemId,
          cart: { userId },
        },
      });

      if (!cartItem) {
        throw new Error("Cart item not found");
      }

      const variant = await tx.product_variants.findUnique({
        where: {
          id: cartItem.variantId,
        },
        select: {
          stock: true,
        },
      });

      if (!variant) {
        throw new Error("Variant not found");
      }

      if (validation.data.newQuantity > variant.stock) {
        throw new Error("New quantity exceeds available stock");
      }

      await tx.cart_items.update({
        where: {
          id: validation.data.cartItemId,
        },
        data: {
          quantity: validation.data.newQuantity,
        },
      });

      await recalculateTotalAmount(tx, cartItem.cartId);

      revalidateTag("cartItems", "max");
      revalidateTag("carts", "max");

      return {
        success: true,
        message: "Quantity updated successfully",
        code: RESPONSE_CODES.OK,
      };
    });
  } catch (error) {
    console.log("Edit quantity error:", error);

    if (error instanceof Error) {
      if (error.message === "Cart item not found") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.NOT_FOUND,
        };
      }

      if (error.message === "Variant not found") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.NOT_FOUND,
        };
      }

      if (error.message === "New quantity exceeds available stock") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.BAD_REQUEST,
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

export const deleteCartItem = async (cartItemId: string, userId: string) => {
  const validation = deleteCartItemSchema.safeParse({ cartItemId });

  if (!validation.success) {
    return {
      success: false,
      message: "Validation error",
      code: RESPONSE_CODES.BAD_REQUEST,
    };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const cartItem = await tx.cart_items.findFirst({
        where: {
          id: validation.data.cartItemId,
          cart: {
            userId,
          },
        },
      });

      if (!cartItem) {
        throw new Error("Cart item not found");
      }

      await tx.cart_items.delete({
        where: {
          id: cartItem.id,
        },
      });

      await recalculateTotalAmount(tx, cartItem.cartId);

      revalidateTag("cartItems", "max");
      revalidateTag("carts", "max");

      return {
        success: true,
        message: "Cart item deleted successfully",
        code: RESPONSE_CODES.OK,
      };
    });
  } catch (error) {
    console.log("Delete cart item error:", error);

    if (error instanceof Error && error.message === "Cart item not found") {
      return {
        success: false,
        message: error.message,
        code: RESPONSE_CODES.NOT_FOUND,
      };
    }

    return {
      success: false,
      message: "Internal server error",
      code: RESPONSE_CODES.INTERNAL_ERROR,
    };
  }
};

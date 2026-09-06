import { CartitemCreateInput, UpdateQuantity } from "./types";
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
      message: "VALIDATION_ERROR",
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
        throw new Error("PRODUCT_VARIANT_NOT_FOUND");
      }

      const cart = await getOrCreateUserCart(tx, userId);

      const existingItem = await tx.cart_items.findFirst({
        where: {
          cartId: cart.id,
          variantId: productVariant.id,
        },
      });

      if (existingItem) {
        const newQuantity = validation.data.quantity;

        if (newQuantity > productVariant.stock) {
          throw new Error("QUANTITY_EXCEEDS_AVAILABLE_STOCK");
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
          throw new Error("QUANTITY_EXCEEDS_AVAILABLE_STOCK");
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

      revalidateTag("cartItems", { expire: 0 });
      revalidateTag("cart", { expire: 0 });

      return {
        success: true,
        message: "ITEM_ADDED_TO_CART",
        code: RESPONSE_CODES.CREATED,
      };
    });
  } catch (error) {
    console.log("Add cart item error:", error);

    if (error instanceof Error) {
      if (error.message === "PRODUCT_VARIANT_NOT_FOUND") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.NOT_FOUND,
        };
      }

      if (error.message === "QUANTITY_EXCEEDS_AVAILABLE_STOCK") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.BAD_REQUEST,
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

export const editQuantity = async (
  updateQuantityData: UpdateQuantity,
  userId: string,
) => {
  const validation = updateQuantitySchema.safeParse(updateQuantityData);

  console.log("validation: ", validation);

  if (!validation.success) {
    return {
      success: false,
      message: "VALIDATION_ERROR",
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
        throw new Error("CART_ITEM_NOT_FOUND");
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
        throw new Error("VARIANT_NOT_FOUND");
      }

      if (validation.data.newQuantity > variant.stock) {
        throw new Error("NEW_QUANTITY_EXCEEDS_AVAILABLE_STOCK");
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

      revalidateTag("cartItems", { expire: 0 });
      revalidateTag("cart", { expire: 0 });

      return {
        success: true,
        message: "QUANTITY_UPDATED_SUCCESSFULLY",
        code: RESPONSE_CODES.OK,
      };
    });
  } catch (error) {
    console.log("Edit quantity error:", error);

    if (error instanceof Error) {
      if (error.message === "CART_ITEM_NOT_FOUND") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.NOT_FOUND,
        };
      }

      if (error.message === "VARIANT_NOT_FOUND") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.NOT_FOUND,
        };
      }

      if (error.message === "NEW_QUANTITY_EXCEEDS_AVAILABLE_STOCK") {
        return {
          success: false,
          message: error.message,
          code: RESPONSE_CODES.BAD_REQUEST,
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

export const deleteCartItem = async (cartItemId: string, userId: string) => {
  const validation = deleteCartItemSchema.safeParse({ cartItemId });

  if (!validation.success) {
    return {
      success: false,
      message: "VALIDATION_ERROR",
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
        throw new Error("CART_ITEM_NOT_FOUND");
      }

      await tx.cart_items.delete({
        where: {
          id: cartItem.id,
        },
      });

      await recalculateTotalAmount(tx, cartItem.cartId);

      revalidateTag("cartItems", { expire: 0 });
      revalidateTag("cart", { expire: 0 });

      return {
        success: true,
        message: "CART_ITEM_DELETED_SUCCESSFULLY",
        code: RESPONSE_CODES.OK,
      };
    });
  } catch (error) {
    console.log("Delete cart item error:", error);

    if (error instanceof Error && error.message === "CART_ITEM_NOT_FOUND") {
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

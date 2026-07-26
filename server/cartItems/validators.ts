import { z } from "zod";

export const newCartItemSchema = z.object({
  variantId: z.string().uuid("Invalid product variant ID"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
});

export const updateQuantitySchema = z.object({
  cartItemId: z.string().uuid("Invalid cart item ID"),

  newQuantity: z
    .number({
      message: "Quantity is required",
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),


});

export const deleteCartItemSchema = z.object({
  cartItemId: z.string().uuid("Invalid cart item ID"),
});

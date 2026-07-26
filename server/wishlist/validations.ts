import { z } from "zod";

export const addWishlistItemSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),

  userId: z.string().uuid("Invalid user ID"),
});



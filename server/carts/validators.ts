import z from "zod";

export const clearCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

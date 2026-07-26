import { z } from "zod";

export const createPromoCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Promo code is required")
    .max(50, "Promo code must not exceed 50 characters"),

  discountPercentage: z
    .number()
    .gt(0, "Discount percentage must be greater than 0")
    .lte(100, "Discount percentage cannot exceed 100"),

  maxUsage: z
    .number()
    .int("Maximum usage must be an integer")
    .positive("Maximum usage must be greater than 0"),

  expiresAt: z.coerce.date().optional(),

  isActive: z.boolean().optional(),
});

export const updatePromoCodeSchema = createPromoCodeSchema.partial();

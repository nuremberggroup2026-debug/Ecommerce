import { z } from "zod";

export const createProductVariantSchema =
  z.object({
    price: z
      .number()
      .min(
        0,
        "Price cannot be negative"
      ),

    stock: z
      .number()
      .int(
        "Stock must be an integer"
      )
      .min(
        0,
        "Stock cannot be negative"
      ),

    discountPercentage: z
      .number()
      .min(
        0,
        "Discount cannot be negative"
      )
      .max(
        100,
        "Discount cannot exceed 100"
      )
      .optional(),

    productId: z
      .string()
      .uuid("Invalid product id"),

    sku: z
      .string()
      .min(
        1,
        "SKU is required"
      )
      .max(
        255,
        "SKU cannot exceed 255 characters"
      ),

    variantImage:
      z.string().optional(),

    isDefault:
      z.boolean().optional(),

    attributeValueIds:
      z
        .array(z.string().uuid())
        .optional()
        .default([]),
  });

export const updateProductVariantSchema =
  z.object({
    price: z
      .number()
      .min(
        0,
        "Price cannot be negative"
      )
      .optional(),

    stock: z
      .number()
      .int(
        "Stock must be an integer"
      )
      .min(
        0,
        "Stock cannot be negative"
      )
      .optional(),

    discountPercentage: z
      .number()
      .min(
        0,
        "Discount cannot be negative"
      )
      .max(
        100,
        "Discount cannot exceed 100"
      )
      .optional(),

    sku: z
      .string()
      .min(
        1,
        "SKU is required"
      )
      .max(
        255,
        "SKU cannot exceed 255 characters"
      )
      .optional(),

    variantImage:
      z.string().optional(),

    isDefault:
      z.boolean().optional(),

    attributeValueIds:
      z
        .array(z.string().uuid())
        .optional(),
  });

import { z } from "zod";

export const createProductSchema = z.object({
  productNameEn: z
    .string()
    .min(2, "Product name in English must be at least 2 characters")
    .max(255, "Product name in English cannot exceed 255 characters"),

  productNameAr: z
    .string()
    .min(2, "Product name in Arabic must be at least 2 characters")
    .max(255, "Product name in Arabic cannot exceed 255 characters"),

  productDescriptionEn: z
    .string()
    .min(10, "Product description in English must be at least 10 characters"),

  productDescriptionAr: z
    .string()
    .min(10, "Product description in Arabic must be at least 10 characters"),

  productCardImage: z.string().min(1, "Product card image is required"),

  productImages: z
    .array(z.string().min(1))
    .min(1, "At least one product image is required"),

  categoryId: z.string().uuid("Invalid category ID"),
});

export const updateProductSchema = createProductSchema.partial();

export const productVariantNestedSchema = z.object({
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(255, "SKU cannot exceed 255 characters"),

  variantImage: z.string().optional().nullable(),

  price: z.number().min(0, "Price cannot be negative"),

  discountPercentage: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100")
    .optional()
    .default(0),

  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .default(0),

  isDefault: z.boolean().optional().default(false),

  attributeValueIds: z
    .array(z.string().uuid("Invalid attribute value id"))
    .optional()
    .default([]),
});

export const updateProductVariantNestedSchema = z.object({
  id: z.uuid(),
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(255, "SKU cannot exceed 255 characters"),

  variantImage: z.string().optional().nullable(),

  price: z.number().min(0, "Price cannot be negative"),

  discountPercentage: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100")
    .optional()
    .default(0),

  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .default(0),

  isDefault: z.boolean().optional().default(false),

  attributeValueIds: z
    .array(z.string().uuid("Invalid attribute value id"))
    .optional()
    .default([]),
});

export const createProductWithVariantsSchema = z.object({
  productNameEn: z
    .string()
    .min(2, "Product name in English must be at least 2 characters")
    .max(255),

  productNameAr: z
    .string()
    .min(2, "Product name in Arabic must be at least 2 characters")
    .max(255),

  productDescriptionEn: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  productDescriptionAr: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  productCardImage: z.string().min(1, "Product card image is required"),

  productImages: z
    .array(z.string())
    .min(1, "At least one product image is required"),

  isFeatured: z.boolean().default(false),

  categoryId: z.string().uuid("Invalid category id"),

  variants: z
    .array(productVariantNestedSchema)
    .min(1, "Product must have at least one variant"),
});

export const updateProductWithVariantsSchema = z.object({
  productNameEn: z
    .string()
    .min(2, "Product name in English must be at least 2 characters")
    .max(255),

  productNameAr: z
    .string()
    .min(2, "Product name in Arabic must be at least 2 characters")
    .max(255),

  productDescriptionEn: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  productDescriptionAr: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  productCardImage: z.string().min(1, "Product card image is required"),

  productImages: z
    .array(z.string())
    .min(1, "At least one product image is required"),

  isFeatured: z.boolean().default(false),

  categoryId: z.string().uuid("Invalid category id"),

  variants: z
    .array(updateProductVariantNestedSchema)
    .min(1, "Product must have at least one variant"),
});

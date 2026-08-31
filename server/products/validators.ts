import { z } from "zod";

// Create Product Schema
export const productVariantSchema = z.object({
  sku: z.string().trim().min(1, "SKU is required").max(255),

  variantImage: z.string().optional().nullable(),

  price: z
    .number({ message: "Price should be positive number" })
    .finite()
    .min(0, "Price cannot be negative"),

  discountPercentage: z
    .number({ message: "Discount should be between 0 and 100" })
    .finite()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100")
    .optional(),

  stock: z
    .number({ message: "Stock should be positive number" })
    .int()
    .min(0, "Stock cannot be negative"),

  isDefault: z.boolean(),

  attributeValueIds: z.array(z.string().uuid("Invalid attribute value ID")),
});

export const createProductWithVariantsSchema = z.object({
  productNameEn: z
    .string()
    .trim()
    .min(2, "English product name is required")
    .max(255),

  productNameAr: z
    .string()
    .trim()
    .min(2, "Arabic product name is required")
    .max(255),

  productDescriptionEn: z
    .string()
    .trim()
    .min(10, "English description must be at least 10 characters"),

  productDescriptionAr: z
    .string()
    .trim()
    .min(10, "Arabic description must be at least 10 characters"),

  productCardImage: z
    .string({ message: "Product card image is required" })
    .min(1, "Product card image is required"),

  productImages: z
    .array(z.string().min(1))
    .min(0, "At least one product image is required")
    .optional(),

  categoryId: z.string().uuid("Category is required"),

  isFeatured: z.boolean(),

  variants: z
    .array(productVariantSchema)
    .min(1, "Product must have at least one variant"),
});

export type CreateProductFormType = z.infer<
  typeof createProductWithVariantsSchema
>;

// Update Product Schema
export const updateProductVariantsSchema = productVariantSchema.extend({
  id: z.uuid().optional(),
});

export const updateProductSchema = z.object({
  productNameEn: z
    .string()
    .trim()
    .min(2, "English product name is required")
    .max(255),
  productNameAr: z
    .string()
    .trim()
    .min(2, "Arabic product name is required")
    .max(255),
  productDescriptionEn: z
    .string()
    .trim()
    .min(10, "English description must be at least 10 characters"),
  productDescriptionAr: z
    .string()
    .trim()
    .min(10, "Arabic description must be at least 10 characters"),
  productCardImage: z
    .string({ message: "Product card image is required" })
    .min(1, "Product card image is required"),
  productImages: z
    .array(z.string().min(0))
    .min(0, "At least one product image is required"),
  categoryId: z.string().uuid("Category is required").optional(),

  isFeatured: z.boolean(),

  variants: z
    .array(updateProductVariantsSchema)
    .min(1, "Product must have at least one variant"),
});

export type UpdateProductFormType = z.infer<typeof updateProductSchema>;

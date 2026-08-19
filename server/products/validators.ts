import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string().uuid("Invalid variant ID").optional(),

  sku: z
    .string()
    .trim()
    .min(1, "SKU is required")
    .max(255),

  variantImage: z
    .string()
    .optional()
    .nullable(),

  price: z
    .number()
    .finite()
    .min(0, "Price cannot be negative"),

  discountPercentage: z
    .number()
    .finite()
    .min(0, "Discount cannot be negative")
    .max(
      100,
      "Discount cannot exceed 100"
    ),

  finalPrice: z
    .number()
    .finite()
    .min(
      0,
      "Final price cannot be negative"
    ),

  stock: z
    .number()
    .int()
    .min(0, "Stock cannot be negative"),

  isDefault: z.boolean(),

  attributeValueIds: z.array(
    z.string().uuid(
      "Invalid attribute value ID"
    )
  ),
});

export const productSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Invalid slug"
    ),

  productNameEn: z
    .string()
    .trim()
    .min(
      2,
      "English product name is required"
    )
    .max(255),

  productNameAr: z
    .string()
    .trim()
    .min(
      2,
      "Arabic product name is required"
    )
    .max(255),

  productDescriptionEn: z
    .string()
    .trim()
    .min(
      10,
      "English description must be at least 10 characters"
    ),

  productDescriptionAr: z
    .string()
    .trim()
    .min(
      10,
      "Arabic description must be at least 10 characters"
    ),

  productCardImage: z
    .string()
    .min(
      1,
      "Product card image is required"
    ),

  productImages: z
    .array(z.string().min(1))
    .min(
      1,
      "At least one product image is required"
    ),

  categoryId: z
    .string()
    .uuid("Invalid category ID"),

  isFeatured: z.boolean(),

  variants: z
    .array(productVariantSchema)
    .min(
      1,
      "Product must have at least one variant"
    )
    .optional(),
});

export type ProductSchema =
  z.infer<typeof productSchema>;

export type ProductVariantSchema =
  z.infer<
    typeof productVariantSchema
  >;

export const updateProductSchema =
  productSchema.partial();

export type UpdateProductSchema =
  z.infer<typeof updateProductSchema>;

export const createProductWithVariantsSchema =
  productSchema;

export const updateProductWithVariantsSchema =
  z.object({
    slug:
      productSchema.shape.slug.optional(),

    productNameEn:
      productSchema.shape.productNameEn.optional(),

    productNameAr:
      productSchema.shape.productNameAr.optional(),

    productDescriptionEn:
      productSchema.shape.productDescriptionEn.optional(),

    productDescriptionAr:
      productSchema.shape.productDescriptionAr.optional(),

    productCardImage:
      productSchema.shape.productCardImage.optional(),

    productImages:
      productSchema.shape.productImages.optional(),

    isFeatured:
      productSchema.shape.isFeatured.optional(),

    categoryId:
      productSchema.shape.categoryId.optional(),

    variants: z
      .array(productVariantSchema)
      .optional(),
  });

export type UpdateProductWithVariantsSchema =
  z.infer<
    typeof updateProductWithVariantsSchema
  >;

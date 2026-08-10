import { z } from "zod";

/* =====================================================
   Attribute
===================================================== */

export const attributeSchema = z.object({
  attributeNameEn: z
    .string()
    .min(2, "Attribute name in English must be at least 2 characters")
    .max(255, "Attribute name in English cannot exceed 255 characters"),

  attributeNameAr: z
    .string()
    .min(2, "Attribute name in Arabic must be at least 2 characters")
    .max(255, "Attribute name in Arabic cannot exceed 255 characters"),
});

/**
 * Used by the API when updating the attribute itself.
 * Values are handled by their own APIs.
 */
export const updateAttributeSchema = z.object({
  attributeNameEn: z
    .string()
    .min(2, "Attribute name in English must be at least 2 characters")
    .max(255, "Attribute name in English cannot exceed 255 characters"),

  attributeNameAr: z
    .string()
    .min(2, "Attribute name in Arabic must be at least 2 characters")
    .max(255, "Attribute name in Arabic cannot exceed 255 characters"),
});

export type AttributeSchema = z.infer<typeof attributeSchema>;

export type UpdateAttributeSchema = z.infer<
  typeof updateAttributeSchema
>;


/* =====================================================
   Edit Attribute Form
===================================================== */

export const editAttributeFormSchema = z.object({
  attributeNameEn: z
    .string()
    .min(2, "Attribute name in English must be at least 2 characters")
    .max(255, "Attribute name in English cannot exceed 255 characters"),

  attributeNameAr: z
    .string()
    .min(2, "Attribute name in Arabic must be at least 2 characters")
    .max(255, "Attribute name in Arabic cannot exceed 255 characters"),

  attributeValues: z.array(
    z.object({
      id: z.string().optional(),

      attributeValueEn: z
        .string()
        .min(
          2,
          "Attribute value in English must be at least 2 characters",
        )
        .max(
          255,
          "Attribute value in English cannot exceed 255 characters",
        ),

      attributeValueAr: z
        .string()
        .min(
          2,
          "Attribute value in Arabic must be at least 2 characters",
        )
        .max(
          255,
          "Attribute value in Arabic cannot exceed 255 characters",
        ),
    }),
  ),
});

export type EditAttributeFormSchema = z.infer<
  typeof editAttributeFormSchema
>;


/* =====================================================
   Attribute Value
===================================================== */

export const createAttributeValueSchema = z.object({
  attributeValueEn: z
    .string()
    .min(
      2,
      "Attribute value in English must be at least 2 characters",
    )
    .max(
      255,
      "Attribute value in English cannot exceed 255 characters",
    ),

  attributeValueAr: z
    .string()
    .min(
      2,
      "Attribute value in Arabic must be at least 2 characters",
    )
    .max(
      255,
      "Attribute value in Arabic cannot exceed 255 characters",
    ),

  attributeId: z.string().uuid("Invalid attribute ID"),
});

export const updateAttributeValueSchema = z.object({
  attributeValueEn: z
    .string()
    .min(
      2,
      "Attribute value in English must be at least 2 characters",
    )
    .max(
      255,
      "Attribute value in English cannot exceed 255 characters",
    ),

  attributeValueAr: z
    .string()
    .min(
      2,
      "Attribute value in Arabic must be at least 2 characters",
    )
    .max(
      255,
      "Attribute value in Arabic cannot exceed 255 characters",
    ),
});
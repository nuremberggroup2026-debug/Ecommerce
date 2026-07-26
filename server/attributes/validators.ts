import { z } from "zod";

export const createAttributeSchema = z.object({
  attributeNameEn: z
    .string()
    .min(2, "Attribute name in English must be at least 2 characters")
    .max(255, "Attribute name in English cannot exceed 255 characters"),

  attributeNameAr: z
    .string()
    .min(2, "Attribute name in Arabic must be at least 2 characters")
    .max(255, "Attribute name in Arabic cannot exceed 255 characters"),
});

export const updateAttributeSchema = createAttributeSchema.partial();

export const createAttributeValueSchema = z.object({
  attributeValueEn: z
    .string()
    .min(2, "Attribute value in English must be at least 2 characters")
    .max(255, "Attribute value in English cannot exceed 255 characters"),

  attributeValueAr: z
    .string()
    .min(2, "Attribute value in Arabic must be at least 2 characters")
    .max(255, "Attribute value in Arabic cannot exceed 255 characters"),

  attributeId: z.string().uuid("Invalid attribute ID"),
});

export const updateAttributeValueSchema = createAttributeValueSchema
  .omit({
    attributeId: true,
  })
  .partial();

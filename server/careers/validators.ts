import { z } from "zod";

export const careersSchema = z.object({
  id: z.string().optional(),
  positionEn: z.string().min(1, "English postion is required"),
  positionAr: z.string().min(1, "Arabic postion is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "English description is required"),
  requirementsEn: z
    .array(z.string())
    .min(1, "English requirements are required"),
  requirementsAr: z
    .array(z.string())
    .min(1, "Arabic requirements are required"),
  experienceEn: z.string().min(1, "English experience is required"),
  experienceAr: z.string().min(1, "Arabic experience is required"),
  roleEn: z.string().min(1, "English role is required"),
  roleAr: z.string().min(1, "Arabic role is required"),
  image: z.string().min(1, "Image is required"),
});


export const updateCareersSchema = z.object({
  id: z.string().optional(),
  positionEn: z.string().min(1, "English postion is required").optional(),
  positionAr: z.string().min(1, "Arabic postion is required").optional(),
  descriptionEn: z
    .string()
    .min(1, "English description is required")
    .optional(),
  descriptionAr: z
    .string()
    .min(1, "English description is required")
    .optional(),
  requirementsEn: z
    .array(z.string())
    .min(1, "English requirements are required")
    .optional(),
  requirementsAr: z
    .array(z.string())
    .min(1, "Arabic requirements are required")
    .optional(),
  experienceEn: z.string().min(1, "English experience is required").optional(),
  experienceAr: z.string().min(1, "Arabic experience is required").optional(),
  roleEn: z.string().min(1, "English role is required").optional(),
  roleAr: z.string().min(1, "Arabic role is required").optional(),
  image: z.string().min(1, "Image is required").optional(),
});


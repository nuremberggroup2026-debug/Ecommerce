import { z } from "zod";

export const careerSchema = z.object({
  id: z.string().optional(),
  positionEn: z.string().min(1, "English position is required"),
  positionAr: z.string().min(1, "Arabic position is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  requirementsEn: z.array(z.string()).min(1, "English requirements are required"),
  requirementsAr: z.array(z.string()).min(1, "Arabic requirements are required"),
  experienceEn: z.string().min(1, "English experience is required"),
  experienceAr: z.string().min(1, "Arabic experience is required"),
  roleEn: z.string().min(1, "English role is required"),
  roleAr: z.string().min(1, "Arabic role is required"),
  image: z.string().min(1, "Image is required"),
});

export const updateCareerSchema = z.object({
  id: z.string().optional(),
  positionEn: z.string().min(1, "English position is required"),
  positionAr: z.string().min(1, "Arabic position is required"),
  descriptionEn: z.string().min(1, "English description is required"),
  descriptionAr: z.string().min(1, "Arabic description is required"),
  requirementsEn: z.array(z.string()).min(1, "English requirements are required"),
  requirementsAr: z.array(z.string()).min(1, "Arabic requirements are required"),
  experienceEn: z.string().min(1, "English experience is required"),
  experienceAr: z.string().min(1, "Arabic experience is required"),
  roleEn: z.string().min(1, "English role is required"),
  roleAr: z.string().min(1, "Arabic role is required"),
  image: z.string().min(1, "Image is required"),
});

export type CareerSchema = z.infer<typeof careerSchema>;
export type UpdateCareerSchema = z.infer<typeof updateCareerSchema>;
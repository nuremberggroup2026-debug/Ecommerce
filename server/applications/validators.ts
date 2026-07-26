import { z } from "zod";
import { Locale } from "@/types/index";

export const applicationSchema = (locale: Locale) =>
  z.object({
    first_name: z
      .string()
      .min(1, locale === "en" ? "First Name is required" : "الاسم الأول مطلوب"),
    last_name: z
      .string()
      .min(1, locale === "en" ? "Last Name is required" : "الاسم الثاني مطلوب"),
    email: z
      .string()
      .min(1, locale === "en" ? "Email is required" : "البريد الإلكتروني مطلوب")
      .email(
        locale === "en"
          ? "Invalid email address"
          : "البريد الإلكتروني غير صالح",
      ),
    major: z
      .string()
      .min(1, locale === "en" ? "Major is required" : "التخصص مطلوب"),
    cv: z
      .string()
      .min(1, locale === "en" ? "CV is required" : "السيرة الذاتية مطلوبة"),

    phone_number: z
      .string()
      .min(
        1,
        locale === "en" ? "Phone number is required" : "رقم الهاتف مطلوب",
      ),

    career_id: z
      .string()
      .min(1, locale === "en" ? "Career is required" : "الوظيفة مطلوبة"),
      applied_at: z.date().optional(),
  });



export const applicationSchemaEn = z.object({
  firstName: z
    .string()
    .min(1, "First name is required"),

  lastName: z
    .string()
    .min(1, "Last name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  major: z
    .string()
    .min(1, "Major is required"),

  cv: z
    .string()
    .min(1, "CV is required"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required"),

  careerId: z
    .string()
    .min(1, "Career is required"),

  appliedAt: z.date().optional(),
});
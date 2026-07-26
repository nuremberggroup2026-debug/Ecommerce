import { z } from "zod";

type Locale = "en" | "ar";

export const createOrderFrontendSchema = (locale: Locale) =>
  z.object({
    email: z
      .string()
      .min(1, locale === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required")
      .email(
        locale === "ar"
          ? "البريد الإلكتروني غير صالح"
          : "Please enter a valid email address",
      ),

    phoneNumber: z
      .string()
      .min(1, locale === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required")
      .max(
        255,
        locale === "ar" ? "رقم الهاتف طويل جداً" : "Phone number is too long",
      ),

    city: z
      .string()
      .min(1, locale === "ar" ? "المدينة مطلوبة" : "City is required")
      .max(
        255,
        locale === "ar" ? "اسم المدينة طويل جداً" : "City name is too long",
      ),

    streetAddress: z
      .string()
      .min(
        1,
        locale === "ar" ? "عنوان الشارع مطلوب" : "Street address is required",
      )
      .max(
        255,
        locale === "ar"
          ? "عنوان الشارع طويل جداً"
          : "Street address is too long",
      ),

    buildingNumber: z
      .number({
        error:
          locale === "ar" ? "رقم المبنى مطلوب" : "Building number is required",
      })
      .int(
        locale === "ar"
          ? "رقم المبنى يجب أن يكون عدداً صحيحاً"
          : "Building number must be a whole number",
      )
      .positive(
        locale === "ar"
          ? "رقم المبنى يجب أن يكون أكبر من صفر"
          : "Building number must be greater than zero",
      ),

    additionalNote: z
      .string()
      .max(
        1000,
        locale === "ar"
          ? "الملاحظات طويلة جداً"
          : "Additional note is too long",
      )
      .optional(),
  });

export const createOrderBackendSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(255, "Phone number exceeds maximum length"),

  city: z
    .string()
    .min(1, "City is required")
    .max(255, "City exceeds maximum length"),

  streetAddress: z
    .string()
    .min(1, "Street address is required")
    .max(255, "Street address exceeds maximum length"),

  buildingNumber: z
    .number({
      error: "Building number is required",
    })
    .int("Building number must be an integer")
    .positive("Building number must be greater than zero"),

  additionalNote: z
    .string()
    .max(1000, "Additional note exceeds maximum length")
    .optional(),

  promoCode: z.string().max(50, "Promo Code exceeds maximum length").optional(),
});

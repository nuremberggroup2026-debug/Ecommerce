import { z } from "zod";
import { Locale } from "@/types/index";

export const applicationSchemaEn = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  major: z.string().min(1, "Major is required"),

  cv: z.string().min(1, "CV is required"),

  phoneNumber: z.number().positive().min(1, "Phone number is required"),

  careerSlug: z.string().min(1, "Career is required"),

  appliedAt: z.date().optional(),
});

// ---------------------------------     Frontend (With Locale)     --------------------------------------

const applicationMessages = {
  en: {
    required: "This field is required",
    emailInvalid: "Invalid email address",
    cvRequired: "Please upload your CV",
    phoneNumberInvalid: "Invalid phone number",
    positivePhoneNumber: "Phone number cannot be negative",
  },
  ar: {
    required: "هذا الحقل مطلوب",
    emailInvalid: "البريد الإلكتروني غير صالح",
    cvRequired: "يرجى رفع السيرة الذاتية",
    phoneNumberInvalid: "رقم الهاتف غير صالح",
    positivePhoneNumber: "لا يمكن أن يكون رقم الهاتف قيمة سالبة.",
  },
};

export const createApplicationSchema = (locale: Locale = "en") => {
  const t = applicationMessages[locale];

  return z.object({
    firstName: z.string().min(2, { message: t.required }),
    lastName: z.string().min(2, { message: t.required }),
    email: z
      .string()
      .min(1, { message: t.required })
      .email({ message: t.emailInvalid }),
    phoneNumber: z
      .number({ message: t.phoneNumberInvalid })
      .positive({message:t.positivePhoneNumber})
      .min(5, { message: t.required }),
    major: z.string().min(2, { message: t.required }),
    cv: z.string().min(1, { message: t.cvRequired }),
    careerSlug: z.string(),
  });
};

export type ApplicationFormValues = z.infer<
  ReturnType<typeof createApplicationSchema>
>;

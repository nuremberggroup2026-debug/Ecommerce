import z from "zod";
import { Locale } from "@/types";
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(5, "name must be at least 5 characters"),

  email: z.string().email("Please enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),

    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords you entered do not match.",
    path: ["confirmPassword"],
  });

//  --------------------------------    Frontend Schema (with locale)     -----------------------------------
const validationMessages = {
  en: {
    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters long",
    emailRequired: "Email address is required",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Password is required",
    passwordMin: "Password must be at least 8 characters long",
    confirmPasswordRequired: "Please confirm your password",
    passwordsMustMatch: "Passwords do not match",
  },
  ar: {
    nameRequired: "الاسم مطلوب",
    nameMin: "يجب أن يتكون الاسم من حرفين على الأقل",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال بريد إلكتروني صالح",
    passwordRequired: "كلمة المرور مطلوبة",
    passwordMin: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
    confirmPasswordRequired: "يرجى تأكيد كلمة المرور",
    passwordsMustMatch: "كلمات المرور غير متطابقة",
  },
};

// Login
export const createLoginSchema = (locale: Locale = "en") => {
  const t = validationMessages[locale];

  return z.object({
    email: z
      .string({ message: t.emailRequired })
      .min(1, { message: t.emailRequired })
      .email({ message: t.emailInvalid }),
    password: z
      .string({ message: t.passwordRequired })
      .min(6, { message: t.passwordMin }),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

// Register
export const createRegisterSchema = (locale: Locale = "en") => {
  const t = validationMessages[locale];

  return z
    .object({
      name: z
        .string({ message: t.nameRequired })
        .min(5, { message: t.nameMin }),
      email: z
        .string({ message: t.emailRequired })
        .min(1, { message: t.emailRequired })
        .email({ message: t.emailInvalid }),
      password: z
        .string({ message: t.passwordRequired })
        .min(8, { message: t.passwordMin }),
      confirmPassword: z.string({ message: t.confirmPasswordRequired }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.passwordsMustMatch,
      path: ["confirmPassword"],
    });
};

export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>;

// Forgot Password
export const createForgotPasswordSchema = (locale: Locale = "en") => {
  const t = validationMessages[locale];

  return z.object({
    email: z
      .string({ message: t.emailRequired })
      .min(1, { message: t.emailRequired })
      .email({ message: t.emailInvalid }),
  });
};

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

// Reset Password
export const createResetPasswordSchema = (locale: Locale = "en") => {
  const t = validationMessages[locale];

  return z
    .object({
      password: z
        .string({ message: t.passwordRequired })
        .min(6, { message: t.passwordMin }),
      confirmPassword: z.string({ message: t.confirmPasswordRequired }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.passwordsMustMatch,
      path: ["confirmPassword"],
    });
};

export type ResetPasswordFormValues = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;

// Change Password
export const createChangePasswordSchema = (locale: Locale = "en") => {
  const t = validationMessages[locale];

  return z
    .object({
      oldPassword: z.string({ message: t.passwordRequired }),
      newPassword: z
        .string({ message: t.passwordRequired })
        .min(6, { message: t.passwordMin }),
      confirmPassword: z.string({
        message: t.confirmPasswordRequired,
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t.passwordsMustMatch,
      path: ["confirmPassword"],
    });
};

export type ChangePasswordFormValues = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;

import z from "zod";

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
    oldPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your new password"),
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

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords you entered do not match.",
    path: ["confirmPassword"],
  });

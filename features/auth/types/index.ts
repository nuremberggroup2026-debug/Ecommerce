import { createRegisterSchema } from "@/server/auth/validators";
import z from "zod";

export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
export type PostResponseType = {
  message: string;
  success: boolean;
  status: number;
};

export type ResetPasswordBody = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

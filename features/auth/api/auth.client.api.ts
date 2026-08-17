import { Clientapi } from "@/services/client/api";
import { API } from "@/constants";
import type {
  ChangePasswordBody,
  PostResponseType,
  RegisterFormValues,
  ResetPasswordBody,
} from "../types/index";

export async function registerApi(
  formData: RegisterFormValues,
): Promise<PostResponseType> {
  const data = await Clientapi.post<PostResponseType, RegisterFormValues>(
    `${API.ENDPOINTS.AUTH.REGISTER}`,
    formData,
  );

  return data;
}

export async function verifyEmailApi(
  token: string,
  userId: string,
): Promise<PostResponseType> {
  const data = await Clientapi.post<PostResponseType, string>(
    `${API.ENDPOINTS.AUTH.VERIFY_EMAIL}/${userId}`,
    token,
  );

  return data;
}

export async function generateForgotPasswordToken(
  email: string,
): Promise<PostResponseType> {
  const data = await Clientapi.post<PostResponseType, string>(
    `${API.ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
    email,
  );

  return data;
}

export async function resetPasswordApi(
  requestData: ResetPasswordBody,
): Promise<PostResponseType> {
  const data = await Clientapi.post<PostResponseType, ResetPasswordBody>(
    `${API.ENDPOINTS.AUTH.RESET_PASSWORD}`,
    requestData,
  );

  return data;
}

export async function changePasswordApi(
  requestData: ChangePasswordBody,
): Promise<PostResponseType> {
  const data = await Clientapi.put<PostResponseType, ChangePasswordBody>(
    `${API.ENDPOINTS.AUTH.CHANGE_PASSWORD}`,
    requestData,
  );

  return data;
}

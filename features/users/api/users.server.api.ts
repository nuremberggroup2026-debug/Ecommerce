import { api } from "@/services/server/api";
import { API } from "@/constants/api";
import type { ResponseType } from "@/types/index";
import type { User } from "@/features/users/types";

export async function adminUsers(): Promise<ResponseType<User[]>> {
  return api.get<ResponseType<User[]>>(
    API.ENDPOINTS.USERS.ALL_USERS
  );
}

export async function adminUserById(
  id: string
): Promise<ResponseType<User>> {
  return api.get<ResponseType<User>>(
    `${API.ENDPOINTS.USERS.USER_BY_ID}/${id}`
  );
}

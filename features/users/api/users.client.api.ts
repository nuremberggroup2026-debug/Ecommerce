import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import type { deleteResponseType, PutResponseType } from "@/types/index";
import type { User } from "@/features/users/types";

export async function adminUpdateUserRole(
  id: string,
  role: User["role"],
): Promise<PutResponseType> {
  return Clientapi.put<PutResponseType, { role: User["role"] }>(
    `${API.ENDPOINTS.USERS.UPDATE_USER_ROLE}/${id}`,
    { role },
  );
}

export async function adminDeleteUser(id: string): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.USERS.USER_BY_ID}/${id}`,
  );
}

export async function deleteManyUsers(
  ids: string[],
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType, string[]>(
    API.ENDPOINTS.USERS.DELETE_MANY_USERS,
    ids,
  );
}

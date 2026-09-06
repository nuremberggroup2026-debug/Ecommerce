import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";

import type {
  deleteResponseType,
  ResponseType,
  ShownResponseType,
  PostResponseType,
  ApplicationCreateInput,
} from "../types/index";

import type { CareerApplication } from "@/features/applications/types";

/**
 * Delete one application
 */
export async function adminDeleteApplication(
  id: string,
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType, string>(
    `${API.ENDPOINTS.APPLICATIONS.APPLICATION_BY_ID}/${id}`,
  );
}

/**
 * Delete multiple applications
 */
export async function deleteManyApplications(
  ids: string[],
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType, string[]>(
    API.ENDPOINTS.APPLICATIONS.DELETE_MANY_APPLICATIONS,
    ids,
  );
}

/**
 * Get all applications
 */
export async function adminApplications(): Promise<
  ResponseType<CareerApplication[]>
> {
  return Clientapi.get<ResponseType<CareerApplication[]>>(
    API.ENDPOINTS.APPLICATIONS.ALL_APPLICATIONS,
  );
}

export async function markApplicationAsShown(
  id: string,
): Promise<ShownResponseType> {
  return Clientapi.put<ShownResponseType, string>(
    `${API.ENDPOINTS.APPLICATIONS.MARK_APPLICATION_AS_SHOWN}/${id}`,
  );
}

/**
 * Apply
 */
export async function applyApi(
  formData: ApplicationCreateInput,
): Promise<PostResponseType> {
  return Clientapi.post<PostResponseType, ApplicationCreateInput>(
    API.ENDPOINTS.APPLICATIONS.ALL_APPLICATIONS,
    formData,
  );
}

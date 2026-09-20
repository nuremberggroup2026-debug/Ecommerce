import { api } from "@/services/server/api";
import { API } from "@/lib/constants/api";
import type { ResponseType } from "@/types";
import type {
  CareerApplication,
  AdminApplicationData,
} from "@/features/applications/types";

export async function adminApplicationById(
  id: string,
): Promise<ResponseType<CareerApplication>> {
  return api.get<ResponseType<CareerApplication>>(
    `${API.ENDPOINTS.APPLICATIONS.APPLICATION_WITH_CAREER_BY_ID}/${id}`,
  );
}
export async function adminApplicationsByCareerId(
  id: string,
  page: number,
  take: number,
): Promise<ResponseType<AdminApplicationData>> {
  return api.get<ResponseType<AdminApplicationData>>(
    `${API.ENDPOINTS.APPLICATIONS.APPLICATIONS_BY_CAREER_ID}/${id}?page=${page}&take=${take}`,
  );
}

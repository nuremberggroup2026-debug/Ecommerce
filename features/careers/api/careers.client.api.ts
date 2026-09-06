
import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import type {
  deleteResponseType,
  AddResponseType,
  PutResponseType,
  ResponseType,
} from "@/types/index";
import type {
  CreateAdminCareer,
  PUTAdminCareer,
  AdminCareers,
} from "@/features/careers/types";

export async function adminAddCareer(
  data: CreateAdminCareer
): Promise<AddResponseType> {
  return Clientapi.post<AddResponseType, CreateAdminCareer>(
    API.ENDPOINTS.CAREERS.ADD_CAREER,
    data
  );
}

export async function adminUpdateCareer(
  id: string,
  data: PUTAdminCareer
): Promise<PutResponseType> {
  return Clientapi.put<PutResponseType, PUTAdminCareer>(
    `${API.ENDPOINTS.CAREERS.CAREER_BY_ID}/${id}`,
    data
  );
}

export async function adminDeleteCareer(
    id: string,
): Promise<deleteResponseType> {
  const result =await Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.CAREERS.CAREER_BY_ID}/${id}`
  );
  return result
}




/////////////////////////////////////////

export async function deleteManyCareers(
  ids: string[]
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType, string[]>(
    API.ENDPOINTS.CAREERS.DELETE_MANY_CAREERS,
    ids
  );
}

export async function adminCareers(): Promise<ResponseType<AdminCareers[]>> {
  return Clientapi.get<ResponseType<AdminCareers[]>>(
    API.ENDPOINTS.CAREERS.ALL_CAREERS
  );
}


import { Clientapi } from "@/services/client/api";

import { API } from "@/constants/api";
import type {
  deleteResponseType,
  PutResponseType,
  AddResponseType,
} from "@/types/index";

import type {
  PUTAdminBanner,
  CreateAdminBanner,
} from "@/features/banner/types/index";

export async function adminUpdateBanner(
  id: string,
  data: PUTAdminBanner,
): Promise<PutResponseType> {
  const result = await Clientapi.put<PutResponseType, PUTAdminBanner>(
    `${API.ENDPOINTS.BANNERS.BANNER_BY_ID}/${id}`,
    data,
  );

  return result;
}

export async function adminDeleteBanner(
  id: string,
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.BANNERS.BANNER_BY_ID}/${id}`,
  );

  return result;
}
export async function adminAddBanner(
  data: CreateAdminBanner,
): Promise<AddResponseType> {
  const result = await Clientapi.post<AddResponseType, CreateAdminBanner>(
    `${API.ENDPOINTS.BANNERS.ADD_BANNERS}`,
    data,
  );

  return result;
}

export async function deleteManyBanners(
  ids: string[],
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType, string[]>(
    `${API.ENDPOINTS.BANNERS.DELETE_MANY_BANNERS}`,
    ids,
  );

  return result;
}

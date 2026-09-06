import { api } from "@/services/server/api";
import { API } from "@/lib/constants/api";
import type { Locale, ResponseType, PutResponseType } from "@/types/index";
import type {
  AdminBanner,
  PUTAdminBanner,
  TranslatedBanner,
} from "@/features/banner/types/index";
import { auth } from "@/lib/auth/auth";

export async function fetchBanners(
  locale: Locale,
): Promise<ResponseType<TranslatedBanner[]>> {
  const data = await api.get<ResponseType<TranslatedBanner[]>>(
    `${API.ENDPOINTS.BANNERS.ALL_BANNERS_BY_LOCALE}/${locale}`,
  );

  console.log("data: ", data);

  return data;
}

export async function adminBanners(): Promise<ResponseType<AdminBanner[]>> {
  const data = await api.get<ResponseType<AdminBanner[]>>(
    `${API.ENDPOINTS.BANNERS.ALL_BANNERS}`,
  );

  return data;
}

export async function adminBannerById(
  id: string,
): Promise<ResponseType<AdminBanner>> {
  const session = await auth();
  console.log("session in apiser: ", session);

  const data = await api.get<ResponseType<AdminBanner>>(
    `${API.ENDPOINTS.BANNERS.BANNER_BY_ID}/${id}`,
  );

  return data;
}
export async function adminUpdateBanner(
  id: string,
  data: PUTAdminBanner,
): Promise<PutResponseType> {
  const result = await api.put<PutResponseType, PUTAdminBanner>(
    `${API.ENDPOINTS.BANNERS.BANNER_BY_ID}/${id}`,
    data,
  );

  return result;
}

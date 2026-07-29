import { api } from "@/services/api";
import { API } from "@/constants/api";
import type { Locale, TranslatedBanner, ResponseType } from "@/types/index";

export async function fetchBanners(
  locale: Locale,
): Promise<TranslatedBanner[]> {
  console.log("locale223: ", locale);

  const data = await api.get<ResponseType<TranslatedBanner[]>>(
    `${API.ENDPOINTS.BANNERS.ALL_BANNERS_BY_LOCALE}/${locale}`,
  );

  console.log("data: ", data);

  return data.data;
}

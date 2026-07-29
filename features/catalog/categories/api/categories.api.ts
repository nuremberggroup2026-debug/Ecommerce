import { api } from "@/services/api";
import { API } from "@/constants";
import type {
  TransalatedCategories,
  ResponseType,
  Locale,
} from "@/types/index";
export type Category = {
  slug: string;
  name: string;
  url: string;
};

export async function fetchFeaturedCategories(
  locale: Locale,
): Promise<TransalatedCategories[]> {
  const data = await api.get<ResponseType<TransalatedCategories[]>>(
    `${API.ENDPOINTS.CATEGORIES.FEATURED_CATEGORIES_BY_LOCALE}/${locale}`,
  );

  return data.data;
}

export async function fetchALLCategories(
  locale: Locale,
): Promise<TransalatedCategories[]> {
  const data = await api.get<ResponseType<TransalatedCategories[]>>(
    `${API.ENDPOINTS.CATEGORIES.ALL_CATEGORIES_BY_LOCALE}/${locale}`,
  );

  return data.data;
}

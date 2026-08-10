import { api } from "@/services/server/api";
import { API } from "@/constants";
import { auth } from "@/lib/auth/auth";

import type {
  TransalatedCategories,
  ResponseType,
  Locale,
} from "@/types/index";



import type {
  AdminCategories,

  
} from "@/features/catalog/categories/types";
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


export async function adminCategories(): Promise<ResponseType<AdminCategories[]>> {
  const data = await api.get<ResponseType<AdminCategories[]>>(
    `${API.ENDPOINTS.CATEGORIES.ALL_CATEGORIES}`,
  );

  return data;
}
export async function adminCategoryById(
  id: string,
): Promise<ResponseType<AdminCategories>> {
  const session = await auth();
  console.log("session in apiser: ", session);

  const data = await api.get<ResponseType<AdminCategories>>(
    `${API.ENDPOINTS.CATEGORIES.CATEGORY_BY_ID}/${id}`,
   
  );

  return data;
}
import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import type { PutResponseType, AddResponseType ,deleteResponseType} from "@/types/index";

import type {
  PUTAdminCategory,
  CreateAdminCategory,
} from "@/features/catalog/categories/types";

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



export async function fetchALLCategories(
  locale: Locale,
): Promise<TransalatedCategories[]> {
  const data = await Clientapi.get<ResponseType<TransalatedCategories[]>>(
    `${API.ENDPOINTS.CATEGORIES.ALL_CATEGORIES_BY_LOCALE}/${locale}`,
  );

  return data.data;
}
export async function adminUpdateCategory(
  id: string,
  data: PUTAdminCategory,
): Promise<PutResponseType> {
  const result = await Clientapi.put<PutResponseType, PUTAdminCategory>(
    `${API.ENDPOINTS.CATEGORIES.CATEGORY_BY_ID}/${id}`,
    data,
  );

  return result;
}

export async function adminAddCategory(
  data: CreateAdminCategory,
): Promise<AddResponseType> {
  const result = await Clientapi.post<AddResponseType, CreateAdminCategory>(
    `${API.ENDPOINTS.CATEGORIES.ADD_CATEGORY}`,
    data,
  );

  return result;
}
export async function deleteManyCategories(
  ids: string[],
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType, string[]>(
    `${API.ENDPOINTS.CATEGORIES.DELETE_MANY_CATEGORIES}`,
    ids,
  );

  return result;
}
export async function adminDeleteCategory(
  id: string,
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.CATEGORIES.CATEGORY_BY_ID}/${id}`
  );

  return result;
}
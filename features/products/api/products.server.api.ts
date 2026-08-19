import { api } from "@/services/server/api";

import { API } from "@/constants/api";

import type {
  Locale,
  ResponseType,
} from "@/types/index";

import type {
  Product,
} from "@/features/products/types";

export async function fetchProducts(
  locale: Locale,
): Promise<ResponseType<Product[]>> {
  const data = await api.get<ResponseType<Product[]>>(
    `${API.ENDPOINTS.PRODUCTS.ALL_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return data;
}

export async function productBySlug(
  slug: string,
  locale: Locale,
): Promise<ResponseType<Product>> {
  const data = await api.get<ResponseType<Product>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_SLUG_AND_LOCALE}/${locale}?slug=${slug}`,
  );

  return data;
}

export async function adminProductById(
  id: string
): Promise<ResponseType<Product>> {
  return api.get<ResponseType<Product>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`
  );
}
export async function adminProducts(): Promise<ResponseType<Product[]>> {
  return api.get<ResponseType<Product[]>>(
    API.ENDPOINTS.PRODUCTS.ALL_PRODUCTS
  );
}

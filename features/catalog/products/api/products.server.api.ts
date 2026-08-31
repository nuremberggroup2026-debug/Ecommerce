import { api } from "@/services/server/api";

import { API } from "@/constants/api";

import type { Locale, ResponseType } from "@/types/index";

<<<<<<< HEAD:features/products/api/products.server.api.ts
import type { Product, ProductById } from "@/features/products/types";
=======
import type {
  Product,
} from "@/features/catalog/products/types";
>>>>>>> f5ccd3c9aec08eaa088233b41bb6cc5bff9f57ec:features/catalog/products/api/products.server.api.ts

export async function getProducts(
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
  id: string,
): Promise<ResponseType<ProductById>> {
  return api.get<ResponseType<ProductById>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`,
  );
}
export async function adminProducts(): Promise<ResponseType<Product[]>> {
  return api.get<ResponseType<Product[]>>(API.ENDPOINTS.PRODUCTS.ALL_PRODUCTS);
}

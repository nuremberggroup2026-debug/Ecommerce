import { api } from "@/services/server/api";
import { API } from "@/lib/constants/api";
import type { Locale, ResponseType } from "@/types/index";
import type {
  FilteredProductsData,
  ProductsDataWithOutPag,
  ProductByLocale,
  Product,
  ProductById,
} from "@/features/products/types";

/* ==================================     Admin Api      ================================== */

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

/* ==================================     Shop Api      ================================== */

export async function getProductBySlug(
  locale: Locale,
  slug: string,
): Promise<ProductByLocale> {
  const result = await api.get<ResponseType<ProductByLocale>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_SLUG_AND_LOCALE}/${locale}?slug=${slug}`,
  );

  return result.data;
}

export async function fetchFeaturedProducts(
  locale: Locale,
): Promise<ProductsDataWithOutPag> {
  const result = await api.get<ResponseType<ProductsDataWithOutPag>>(
    `${API.ENDPOINTS.PRODUCTS.FEATURED_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return result.data;
}

export async function fetchOnDiscountProducts(
  locale: Locale,
): Promise<ProductsDataWithOutPag> {
  const result = await api.get<ResponseType<ProductsDataWithOutPag>>(
    `${API.ENDPOINTS.PRODUCTS.ON_DISCOUNT_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return result.data;
}

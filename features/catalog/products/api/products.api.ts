import { api } from "@/services/api";
import type { Product } from "../types";
import { API } from "@/constants";
import type {
  GetProductType,
  Locale,
  ResponseType,
  FilteredProductsData,
} from "@/types";

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ProductsQuery = {
  category?: string;
  search?: string;
  limit: number;
  skip: number;
  locale: Locale;
  sortBy?: string;
  order?: "asc" | "desc";
};

export async function getProducts({
  locale,
  category,
  search,
  limit,
  skip,
  sortBy,
  order,
}: ProductsQuery): Promise<FilteredProductsData> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
  });

  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);

  let url = API.ENDPOINTS.PRODUCTS.FEATURED_PRODUCTS_BY_LOCALE;

  if (search) {
    url += "/search";
    params.set("q", search);
  } else if (category && category !== "all") {
    url += `/category/${encodeURIComponent(category)}`;
  }

  console.log("params: ", params);

  const result = await api.get<ResponseType<FilteredProductsData>>(
    `${url}/${locale}?${params.toString()}`,
  );
  return result.data;
}

export async function getProductById(id: string): Promise<Product> {
  return api.get<Product>(`${API.ENDPOINTS.PRODUCTS}/${id}`);
}

export async function fetchFeaturedProducts(
  locale: Locale,
): Promise<GetProductType[]> {
  const result = await api.get<ResponseType<GetProductType[]>>(
    `${API.ENDPOINTS.PRODUCTS.FEATURED_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return result.data;
}

export async function fetchOnDiscountProducts(
  locale: Locale,
): Promise<GetProductType[]> {
  const result = await api.get<ResponseType<GetProductType[]>>(
    `${API.ENDPOINTS.PRODUCTS.ON_DISCOUNT_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return result.data;
}

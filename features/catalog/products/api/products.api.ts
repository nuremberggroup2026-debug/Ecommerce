import { api } from "@/services/server/api";
import { API } from "@/constants";
import type {
  GetProductType,
  ProductsDataWithOutPag,
  Locale,
  ResponseType,
  FilteredProductsData,
  ProductByLocale,
} from "../types";

type ProductsQuery = {
  categories?: string;
  search?: string;
  page: string;
  locale: Locale;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
};

export async function getProducts({
  locale,
  categories,
  search,
  page,
  sort,
  minPrice,
  maxPrice,
}: ProductsQuery): Promise<ResponseType<FilteredProductsData>> {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (sort) params.set("sort", sort);
  const url = `${API.ENDPOINTS.PRODUCTS.FILTERED_PRODUCTS_BY_LOCALE}/${locale}?`;

  if (maxPrice) params.set("maxPrice", maxPrice);

  if (minPrice) params.set("minPrice", minPrice);

  if (search) params.set("search", search);

  if (categories && categories !== "all")
    categories
      .split(",")
      .forEach((category) => params.append("categories", category));

  const result = await api.get<ResponseType<FilteredProductsData>>(
    `${url}${params.toString()}`,
  );
  console.log("result: ", `${url}${params.toString()}`);

  return result;
}
// ------------------------------------------------------------------------------ //
export async function getProductById(
  locale: Locale,
  id: string,
): Promise<ProductByLocale> {
  const result = await api.get<ResponseType<ProductByLocale>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID_AND_LOCALE}/${locale}?id=${id}`,
  );

  console.log("ressss:", result);
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

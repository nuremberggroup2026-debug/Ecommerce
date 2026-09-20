import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import {
  CreateProductFormType,
  UpdateProductFormType,
} from "@/server/products/validators";
import type {
  deleteResponseType,
  AddResponseType,
  PutResponseType,
  ResponseType,
  deleteManyResponseType,
  Locale,
} from "@/types/index";

import type {
  FilteredProductsData,
  ProductByLocale,
  ProductsDataWithOutPag,
  ProductsQuery,
} from "@/features/products/types";

/* ==================================     Admin Api      ================================== */

export async function adminAddProduct(
  data: CreateProductFormType,
): Promise<AddResponseType> {
  return Clientapi.post<AddResponseType, CreateProductFormType>(
    API.ENDPOINTS.PRODUCTS.ADD_PRODUCT,
    data,
  );
}

export async function adminUpdateProduct(
  id: string,
  data: UpdateProductFormType,
): Promise<PutResponseType> {
  return Clientapi.put<PutResponseType, UpdateProductFormType>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`,
    data,
  );
}

export async function adminDeleteProduct(
  id: string,
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`,
  );

  return result;
}

export async function deleteManyProducts(
  ids: string[],
): Promise<deleteManyResponseType> {
  const result = await Clientapi.delete<deleteManyResponseType, string[]>(
    API.ENDPOINTS.PRODUCTS.DELETE_MANY_PRODUCTS,
    ids,
  );

  return result;
}

/* ==================================     Shop Api      ================================== */

// =====================================================
// Products
// =====================================================

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

  if (sort) {
    params.set("sort", sort);
  }

  if (maxPrice) {
    params.set("maxPrice", maxPrice);
  }

  if (minPrice) {
    params.set("minPrice", minPrice);
  }

  if (search) {
    params.set("search", search);
  }

  if (categories && categories !== "all") {
    categories.split(",").forEach((category) => {
      params.append("categories", category);
    });
  }

  const url =
    `${API.ENDPOINTS.PRODUCTS.FILTERED_PRODUCTS_BY_LOCALE}/${locale}` +
    `?${params.toString()}`;

  return Clientapi.get<ResponseType<FilteredProductsData>>(url);
}

// =====================================================
// Product By ID
// =====================================================

export async function getProductById(
  locale: Locale,
  slug: string,
): Promise<ProductByLocale> {
  const result = await Clientapi.get<ResponseType<ProductByLocale>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_SLUG_AND_LOCALE}/${locale}?slug=${slug}`,
  );

  return result.data;
}

// =====================================================
// Featured Products
// =====================================================

export async function fetchFeaturedProducts(
  locale: Locale,
): Promise<ProductsDataWithOutPag> {
  const result = await Clientapi.get<ResponseType<ProductsDataWithOutPag>>(
    `${API.ENDPOINTS.PRODUCTS.FEATURED_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return result.data;
}

// =====================================================
// Discount Products
// =====================================================

export async function fetchOnDiscountProducts(
  locale: Locale,
): Promise<ProductsDataWithOutPag> {
  const result = await Clientapi.get<ResponseType<ProductsDataWithOutPag>>(
    `${API.ENDPOINTS.PRODUCTS.ON_DISCOUNT_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return result.data;
}

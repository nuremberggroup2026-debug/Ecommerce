"use client";

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import {
  getProducts,
  type ProductsQuery,
} from "../api/products.client.api";

export function productsQueryKey(params: ProductsQuery) {
  return [
    "products",
    params.locale,
    {
      categories: params.categories ?? "",
      search: params.search ?? "",
      page: params.page,
      sort: params.sort ?? "",
      minPrice: params.minPrice ?? "",
      maxPrice: params.maxPrice ?? "",
    },
  ] as const;
}

export function useProductsQuery(params: ProductsQuery) {
  return useQuery({
    queryKey: productsQueryKey(params),
    refetchOnMount:false,
     refetchOnWindowFocus: false,

    queryFn: () => getProducts(params),

    placeholderData: keepPreviousData,

    staleTime: 60 * 1000,
  });
}

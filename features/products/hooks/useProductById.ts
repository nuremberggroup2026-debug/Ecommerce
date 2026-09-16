"use client";

import { useQuery } from "@tanstack/react-query";

import { getProductById } from "@/features/products/api/products.client.api";
import type { Locale } from "@/types";

export function productByIdQueryKey(locale: Locale, id: string) {
  return ["products", locale, "detail", id] as const;
}

export  function useProductByIdQuery(locale: Locale, id: string) {
  return useQuery({
    queryKey: productByIdQueryKey(locale, id),
    queryFn: async () => {
      const result = await getProductById(locale, id);
      console.log("result: ", result);
      return result;
    },
    enabled: Boolean(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

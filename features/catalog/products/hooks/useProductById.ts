"use client";

import { useQuery } from "@tanstack/react-query";

import { getProductById } from "../api/products.client.api";
import type { Locale } from "@/types";

export function productByIdQueryKey(locale: Locale, id: string) {
  return ["products", locale, "detail", id] as const;
}

export function useProductByIdQuery(locale: Locale, id: string) {
  return useQuery({
    queryKey: productByIdQueryKey(locale, id),
    queryFn: () => getProductById(locale, id),
    enabled: Boolean(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    
  });
}
"use client";

import { useQuery } from "@tanstack/react-query";
import type { Locale } from "@/types";

import { fetchALLCategories } from "../api/categories.client.api";

export function useCategoriesQuery(locale: Locale) {
  return useQuery({
    queryKey: ["categories", locale],

    queryFn: () => fetchALLCategories(locale),

    staleTime: 5 * 60 * 1000,
  });
}

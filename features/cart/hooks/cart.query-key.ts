import type { Locale } from "@/types";

export interface CartQuery {
  locale: Locale;
}

export function cartQueryKey(params: CartQuery) {
  return ["cart", params.locale] as const;
}

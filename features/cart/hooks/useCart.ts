"use client";

import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/cart.client.api";
import {
  cartQueryKey,
  type CartQuery,
} from "./cart.query-key";

export { cartQueryKey };

export function useCartQuery(params: CartQuery) {
  return useQuery({
    queryKey: cartQueryKey(params),

    staleTime: 4 * 1000,

    queryFn: async () => {
      const response = await getCart(params.locale);

      return response.data;
    },
  });
}

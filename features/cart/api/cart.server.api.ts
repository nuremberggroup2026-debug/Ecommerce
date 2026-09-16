import { api } from "@/services/server/api";
import { API } from "@/lib/constants/api";
import type { CartData } from "../types/index";
import type { ResponseType, Locale } from "@/types";

export async function getCart(locale: Locale): Promise<ResponseType<CartData>> {
  const data = await api.get<ResponseType<CartData>>(
    `${API.ENDPOINTS.CART.GET_CART_WITH_ITEMS}/${locale}`,
  );

  return data;
}

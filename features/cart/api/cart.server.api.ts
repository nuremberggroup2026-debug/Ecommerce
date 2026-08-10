import { api } from "@/services/server/api";
import { API } from "@/constants";
import type { CartData, ResponseType, Locale } from "../types/index";

export async function getCart(
  locale: Locale,
): Promise<ResponseType<CartData>> {
  const data = await api.get<ResponseType<CartData>>(
    `${API.ENDPOINTS.CART.GET_CART_WITH_ITEMS}/${locale}`,
  );

  return data;
}

import { API } from "@/lib/constants/api";

import { api } from "@/services/server/api";
import type { WishlistItemsType, ResponseType, Locale } from "../types";

export async function getWishlistItems(
  locale: Locale,
): Promise<ResponseType<WishlistItemsType[]>> {
  const data = await api.get<ResponseType<WishlistItemsType[]>>(
    `${API.ENDPOINTS.WISHLIST.GET_ITEMS_BY_USER}/${locale}`,
  );

  return data;
}

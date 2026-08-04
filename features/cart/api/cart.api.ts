import { api } from "@/services/api";
import { API } from "@/constants";
import type { NewCartItem, PostResponseType } from "../types/index";

export async function addItemToCart(
  variantId: string,
  quantity: number,
): Promise<PostResponseType> {
  const data = await api.post<PostResponseType, NewCartItem>(
    `${API.ENDPOINTS.CART_ITEMS.ADD_NEW_ITEM}`,
    {
      variantId,
      quantity,
    },
  );

  return data;
}

export async function getCart(
  variantId: string,
  quantity: number,
): Promise<PostResponseType> {
  const data = await api.post<PostResponseType, NewCartItem>(
    `${API.ENDPOINTS.CART_ITEMS.ADD_NEW_ITEM}`,
    {
      variantId,
      quantity,
    },
  );

  return data;
}





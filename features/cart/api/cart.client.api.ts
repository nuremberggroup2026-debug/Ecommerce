import { Clientapi } from "@/services/client/api";
import { API } from "@/constants";
import type {
  CartData,
  NewCartItem,
  PostResponseType,
  ResponseType,
} from "../types/index";

export async function addItemToCart(
  variantId: string,
  quantity: number,
): Promise<PostResponseType> {
  const data = await Clientapi.post<PostResponseType, NewCartItem>(
    `${API.ENDPOINTS.CART_ITEMS.ADD_NEW_ITEM}`,
    {
      variantId,
      quantity,
    },
  );

  return data;
}

export async function updateItemQuantity(
  newQuantity: number,
  cartItemId: string,
): Promise<PostResponseType> {
  const data = await Clientapi.put<PostResponseType, { newQuantity: number }>(
    `${API.ENDPOINTS.CART_ITEMS.UPDATE_QUANTITY}/${cartItemId}`,
    {
      newQuantity,
    },
  );

  return data;
}

export async function deleteItem(
  cartItemId: string,
): Promise<PostResponseType> {
  const data = await Clientapi.delete<PostResponseType>(
    `${API.ENDPOINTS.CART_ITEMS.DELETE_ITEM}/${cartItemId}`,
  );

  return data;
}

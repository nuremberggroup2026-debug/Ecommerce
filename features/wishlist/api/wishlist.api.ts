import { API } from "@/constants";
import { PostResponseType } from "@/features/cart/types";
import { api } from "@/services/api";

export async function addItemToWishlist(
  productId: string,
): Promise<PostResponseType> {
  const data = await api.post<PostResponseType, { productId: string }>(
    `${API.ENDPOINTS.WISHLIST.ADD_NEW_ITEM}`,
    {
      productId,
    },
  );

  console.log("data: ", data);

  return data;
}

export async function removeItemFromWishlist(
  itemId: string,
): Promise<PostResponseType> {
  const data = await api.delete<PostResponseType>(
    `${API.ENDPOINTS.WISHLIST.REMOVE_ITEM}/${itemId}`,
  );

  

  console.log("data: ", data);

  return data;
}

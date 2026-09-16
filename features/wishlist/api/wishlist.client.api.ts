import { API } from "@/lib/constants/api";
import { PostResponseType } from "@/types";
import { Clientapi } from "@/services/client/api";

export async function addItemToWishlist(
  productId: string,
): Promise<PostResponseType> {
  const data = await Clientapi.post<PostResponseType, { productId: string }>(
    `${API.ENDPOINTS.WISHLIST.ADD_NEW_ITEM}`,
    {
      productId,
    },
  );

  return data;
}

export async function removeItemFromWishlist(
  itemId: string,
): Promise<PostResponseType> {
  const data = await Clientapi.delete<PostResponseType>(
    `${API.ENDPOINTS.WISHLIST.REMOVE_ITEM}/${itemId}`,
  );

  return data;
}

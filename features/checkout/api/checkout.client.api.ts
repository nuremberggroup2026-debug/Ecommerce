import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import type { OrderFormDataType, PromoCodeData } from "../types/index";
import type { PostResponseType, ResponseType } from "@/types";

export async function placeAnOrder(
  formData: OrderFormDataType,
): Promise<PostResponseType> {
  const data = await Clientapi.post<PostResponseType, OrderFormDataType>(
    `${API.ENDPOINTS.CHECKOUT.PLACE_AN_ORDER}`,
    formData,
  );

  return data;
}

export async function validatePromoCode(
  code: string,
): Promise<ResponseType<PromoCodeData>> {
  const data = await Clientapi.get<ResponseType<PromoCodeData>>(
    `${API.ENDPOINTS.CHECKOUT.VALIDATE_PROMO_CODE}?code=${code}`,
  );

  return data;
}

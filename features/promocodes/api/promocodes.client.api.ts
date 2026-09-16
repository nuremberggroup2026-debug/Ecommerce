import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import type {
  PutResponseType,
  AddResponseType,
  deleteResponseType,
  deleteManyResponseType,
} from "@/types/index";

import { CreatePromoCodeType, UpdatePromoCodeType } from "../types/index";

export async function adminUpdatePromoCode(
  id: string,
  data: UpdatePromoCodeType,
): Promise<PutResponseType> {
  const result = await Clientapi.put<PutResponseType, UpdatePromoCodeType>(
    `${API.ENDPOINTS.PROMO_CODES.PROMO_CODE_BY_ID}/${id}`,
    data,
  );

  return result;
}

export async function adminAddPromoCode(
  data: CreatePromoCodeType,
): Promise<AddResponseType> {
  const result = await Clientapi.post<AddResponseType, CreatePromoCodeType>(
    `${API.ENDPOINTS.PROMO_CODES.ADD_PROMO_CODE}`,
    data,
  );

  return result;
}
export async function deleteManyPromoCodes(
  ids: string[],
): Promise<deleteManyResponseType> {
  const result = await Clientapi.delete<deleteManyResponseType, string[]>(
    `${API.ENDPOINTS.PROMO_CODES.DELETE_MANY_PROMO_CODES}`,
    ids,
  );

  return result;
}
export async function adminDeletePromoCode(
  id: string,
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.PROMO_CODES.PROMO_CODE_BY_ID}/${id}`,
  );

  return result;
}

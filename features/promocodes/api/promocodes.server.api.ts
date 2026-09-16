import { api } from "@/services/server/api";
import { API } from "@/lib/constants/api";
import type { AllPromoCodes, AdminPromoCodesData } from "../types/index";
import { ResponseType } from "@/types";

export async function adminPromoCodes(
  page: number,
  take: number,
): Promise<ResponseType<AdminPromoCodesData>> {
  const data = await api.get<ResponseType<AdminPromoCodesData>>(
    `${API.ENDPOINTS.PROMO_CODES.ALL_PROMO_CODES}?page=${page}&take=${take}`,
  );

  return data;
}
export async function adminPromoCodeById(
  id: string,
): Promise<ResponseType<AllPromoCodes>> {
  const data = await api.get<ResponseType<AllPromoCodes>>(
    `${API.ENDPOINTS.PROMO_CODES.PROMO_CODE_BY_ID}/${id}`,
  );

  return data;
}

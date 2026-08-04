import { Clientapi } from "@/services/client/api";

import { API } from "@/constants/api";
import type {
  Locale,
  TranslatedBanner,
  ResponseType,
  PutResponseType,
} from "@/types/index";
import type {
  AdminBanner,
  PUTAdminBanner,
} from "@/features/banner/types/index";
import { auth } from "@/lib/auth/auth";



export async function adminUpdateBanner(
  id: string,
  data: PUTAdminBanner,
): Promise<PutResponseType> {
  const result = await Clientapi.put<PutResponseType, PUTAdminBanner>(
    `${API.ENDPOINTS.BANNERS.BANNER_BY_ID}/${id}`,
    data,
  );

  return result;
}

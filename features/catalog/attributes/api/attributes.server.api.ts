import { api } from "@/services/server/api";

import { API } from "@/constants/api";
import type { ResponseType } from "@/types/index";
import type {
  AdminAttribute,
  AttributesWithValues,
} from "@/features/catalog/attributes/types";
import { auth } from "@/lib/auth/auth";

export async function adminAttributes(): Promise<
  ResponseType<AdminAttribute[]>
> {
  const data = await api.get<ResponseType<AdminAttribute[]>>(
    `${API.ENDPOINTS.ATTRIBUTES.ALL_ATTRIBUTES}`,
  );

  return data;
}

export async function adminAttributeById(
  id: string,
): Promise<ResponseType<AdminAttribute>> {
  const session = await auth();
  console.log("session in apiser: ", session);

  const data = await api.get<ResponseType<AdminAttribute>>(
    `${API.ENDPOINTS.ATTRIBUTES.ATTRIBUTE_BY_ID}/${id}`,
  );

  return data;
}

export async function adminAttributeWithValues(): Promise<
  ResponseType<AttributesWithValues[]>
> {
  const data = await api.get<ResponseType<AttributesWithValues[]>>(
    `${API.ENDPOINTS.ATTRIBUTES.ATTRIBUTE_WITH_VALUES}`,
  );

  return data;
}

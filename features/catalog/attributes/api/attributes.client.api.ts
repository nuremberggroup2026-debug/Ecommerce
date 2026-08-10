import { Clientapi } from "@/services/client/api";
import { API } from "@/constants/api";

import type {
  deleteResponseType,
  AddResponseType,
  PutResponseType,
} from "@/types/index";

import type {
  CreateAdminAttribute,
  PUTAdminAttribute,
  CreateAdminAttributeValue,
  UpdateAdminAttributeValue,
} from "@/features/catalog/attributes/types";

/* =========================================================
   ATTRIBUTES
========================================================= */

/**
 * Create Attribute
 */
export async function adminAddAttribute(
  data: CreateAdminAttribute,
): Promise<AddResponseType> {
  return Clientapi.post<
    AddResponseType,
    CreateAdminAttribute
  >(
    API.ENDPOINTS.ATTRIBUTES.ADD_ATTRIBUTES,
    data,
  );
}

/**
 * Update Attribute
 */
export async function adminUpdateAttribute(
  id: string,
  data: PUTAdminAttribute,
): Promise<PutResponseType> {
  return Clientapi.put<
    PutResponseType,
    PUTAdminAttribute
  >(
    `${API.ENDPOINTS.ATTRIBUTES.ATTRIBUTE_BY_ID}/${id}`,
    data,
  );
}

/**
 * Delete Attribute
 */
export async function adminDeleteAttribute(
  id: string,
): Promise<deleteResponseType> {
  return Clientapi.delete(
    `${API.ENDPOINTS.ATTRIBUTES.ATTRIBUTE_BY_ID}/${id}`,
  );
}

/**
 * Delete Many Attributes
 */
export async function deleteManyAttributes(
  ids: string[],
): Promise<deleteResponseType> {
  return Clientapi.delete<
    deleteResponseType,
    string[]
  >(
    API.ENDPOINTS.ATTRIBUTES.DELETE_MANY_ATTRIBUTES,
    ids,
  );
}


/* =========================================================
   ATTRIBUTE VALUES
========================================================= */

/**
 * Create Attribute Value
 */
export async function adminAddAttributeValue(
  data: CreateAdminAttributeValue,
): Promise<AddResponseType> {
  return Clientapi.post<
    AddResponseType,
    CreateAdminAttributeValue
  >(
    API.ENDPOINTS.ATTRIBUTE_VALUES
      .ADD_ATTRIBUTE_VALUE,
    data,
  );
}

/**
 * Update Attribute Value
 */
export async function adminUpdateAttributeValue(
  id: string,
  data: UpdateAdminAttributeValue,
): Promise<PutResponseType> {
  return Clientapi.put<
    PutResponseType,
    UpdateAdminAttributeValue
  >(
    `${API.ENDPOINTS.ATTRIBUTE_VALUES.ATTRIBUTE_VALUE_BY_ID}/${id}`,
    data,
  );
}

/**
 * Delete Attribute Value
 */
export async function adminDeleteAttributeValue(
  id: string,
): Promise<deleteResponseType> {
  return Clientapi.delete(
    `${API.ENDPOINTS.ATTRIBUTE_VALUES.ATTRIBUTE_VALUE_BY_ID}/${id}`,
  );
}
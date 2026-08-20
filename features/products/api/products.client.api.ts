import { Clientapi } from "@/services/client/api";
import { API } from "@/constants/api";

import type {
  deleteResponseType,
  AddResponseType,
  PutResponseType,
  ResponseType,
} from "@/types/index";

import type {
  CreateAdminProduct,
  PUTAdminProduct,
  Product,
} from "@/features/products/types";

export async function adminAddProduct(
  data: CreateAdminProduct
): Promise<AddResponseType> {
  return Clientapi.post<AddResponseType, CreateAdminProduct>(
    API.ENDPOINTS.PRODUCTS.ADD_PRODUCT,
    data
  );
}

export async function adminUpdateProduct(
  id: string,
  data: PUTAdminProduct
): Promise<PutResponseType> {
  return Clientapi.put<PutResponseType, PUTAdminProduct>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`,
    data
  );
}

export async function adminDeleteProduct(
  id: string
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`
  );

  return result;
}

/////////////////////////////////////////

export async function deleteManyProducts(
  ids: string[]
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType, string[]>(
    API.ENDPOINTS.PRODUCTS.DELETE_MANY_PRODUCTS,
    ids
  );
}


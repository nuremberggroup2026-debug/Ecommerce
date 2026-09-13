import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import {
  CreateProductFormType,
  UpdateProductFormType,
} from "@/server/products/validators";
import type {
  deleteResponseType,
  AddResponseType,
  PutResponseType,
  ResponseType,
  deleteManyResponseType,
} from "@/types/index";

export async function adminAddProduct(
  data: CreateProductFormType,
): Promise<AddResponseType> {
  return Clientapi.post<AddResponseType, CreateProductFormType>(
    API.ENDPOINTS.PRODUCTS.ADD_PRODUCT,
    data,
  );
}

export async function adminUpdateProduct(
  id: string,
  data: UpdateProductFormType,
): Promise<PutResponseType> {
  return Clientapi.put<PutResponseType, UpdateProductFormType>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`,
    data,
  );
}

export async function adminDeleteProduct(
  id: string,
): Promise<deleteResponseType> {
  const result = await Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`,
  );

  return result;
}

/////////////////////////////////////////

export async function deleteManyProducts(
  ids: string[],
): Promise<deleteManyResponseType> {
  const result = await Clientapi.delete<deleteManyResponseType, string[]>(
    API.ENDPOINTS.PRODUCTS.DELETE_MANY_PRODUCTS,
    ids,
  );
  console.log("result in many : ", result);

  return result;
}

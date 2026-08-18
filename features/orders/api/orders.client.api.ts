import { Clientapi } from "@/services/client/api";
import { API } from "@/constants/api";

import type {
  deleteResponseType,
  PutResponseType,
} from "@/types/index";

import type {
  Order,
  order_status,
} from "@/features/orders/types";

export async function adminUpdateOrderStatus(
  id: string,
  status: order_status
): Promise<PutResponseType> {
  return Clientapi.put<
    PutResponseType,
    { status: order_status }
  >(
       `${API.ENDPOINTS.ORDERS.UPDATE_ORDER_STATUS}/${id}`,
    { status }
  );
}

export async function adminDeleteOrder(
  id: string
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.ORDERS.ORDER_BY_ID}/${id}`
  );
}

export async function deleteManyOrders(
  ids: string[]
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType, string[]>(
    API.ENDPOINTS.ORDERS.DELETE_MANY_ORDERS,
    ids
  );
}


import { api } from "@/services/server/api";

import { API } from "@/constants/api";

import type {
  ResponseType,
} from "@/types/index";

import type {
  Order,
} from "@/features/orders/types/index";

export async function adminOrders(): Promise<ResponseType<Order[]>> {
  return api.get<ResponseType<Order[]>>(
    API.ENDPOINTS.ORDERS.ALL_ORDERS
  );
}

export async function adminOrderById(
  id: string
): Promise<ResponseType<Order>> {
  return api.get<ResponseType<Order>>(
    `${API.ENDPOINTS.ORDERS.ORDER_BY_ID}/${id}`
  );
}
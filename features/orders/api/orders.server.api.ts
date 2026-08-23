import { api } from "@/services/server/api";

import { API } from "@/constants/api";

import type {
  ResponseType,
  AllOrdersByUser,
    Locale,
  OrderByID,
} from "../types/index";

;

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

export async function fetchAllOrdersByUser(): Promise<
  ResponseType<AllOrdersByUser[]>
> {
  const data = await api.get<ResponseType<AllOrdersByUser[]>>(
    `${API.ENDPOINTS.ORDERS.ALL_ORDERS_BY_USER}`,
  );

  console.log("data: ", data);

  return data;
}
export async function fetchOrderByUserOrderIdAndLocale(
  locale: Locale,
  id: string,
): Promise<ResponseType<OrderByID>> {
  const data = await api.get<ResponseType<OrderByID>>(
    `${API.ENDPOINTS.ORDERS.ORDER_BY_USER_ORDER_ID_AND_LOCALE}/${locale}?orderId=${id}`,
  );

  console.log("data: ", data);

  return data;
}
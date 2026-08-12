import { api } from "@/services/server/api";
import { API } from "@/constants/api";
import type {
  Locale,
  ResponseType,
  AllOrdersByUser,
  OrderByID,
} from "../types/index";

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

import { api } from "@/services/server/api";

import { API } from "@/lib/constants/api";

import type {
  ResponseType,
  AllOrdersByUser,
  Locale,
  Order,
  OrderByID,
  OrderByIdAdmin,
  AdminOrdersData,
  OrdersFilteration,
} from "../types/index";

export async function adminOrders(
  params: OrdersFilteration,
): Promise<ResponseType<AdminOrdersData>> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.take) searchParams.set("take", String(params.take));
  if (params?.customerEmail)
    searchParams.set("customerEmail", params.customerEmail);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.orderNumber) searchParams.set("orderNumber", params.orderNumber);

  const queryString = searchParams.toString();
  const url = `${API.ENDPOINTS.ORDERS.ALL_ORDERS}${queryString ? `?${queryString}` : ""}`;

  return api.get<ResponseType<AdminOrdersData>>(url);
}

export async function adminOrderById(
  id: string,
): Promise<ResponseType<OrderByIdAdmin>> {
  return api.get<ResponseType<OrderByIdAdmin>>(
    `${API.ENDPOINTS.ORDERS.ORDER_BY_ID}/${id}`,
  );
}

export async function fetchOrderByUserOrderIdAndLocale(
  locale: Locale,
  id: string,
): Promise<ResponseType<OrderByID>> {
  return api.get<ResponseType<OrderByID>>(
    `${API.ENDPOINTS.ORDERS.ORDER_DETAILS_BY_ID_AND_LOCALE}/${locale}?orderId=${id}`,
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

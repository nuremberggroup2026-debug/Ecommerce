import { Clientapi } from "@/services/client/api";
import { API } from "@/lib/constants/api";
import type {
  deleteResponseType,
  PutResponseType,
  ResponseType,
} from "@/types/index";
import type {
  OrderStatus,
  OrderReportFiltrationObject,
  OrdersReportDataType,
} from "@/features/orders/types";

export async function adminUpdateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<PutResponseType> {
  return Clientapi.put<PutResponseType, { status: OrderStatus }>(
    `${API.ENDPOINTS.ORDERS.UPDATE_ORDER_STATUS}/${id}`,
    { status },
  );
}

export async function adminDeleteOrder(
  id: string,
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType>(
    `${API.ENDPOINTS.ORDERS.ORDER_BY_ID}/${id}`,
  );
}

export async function deleteManyOrders(
  ids: string[],
): Promise<deleteResponseType> {
  return Clientapi.delete<deleteResponseType, string[]>(
    API.ENDPOINTS.ORDERS.DELETE_MANY_ORDERS,
    ids,
  );
}

export async function orderReportData(
  filterObj: OrderReportFiltrationObject,
): Promise<ResponseType<OrdersReportDataType>> {
  const params = new URLSearchParams();

  if (filterObj.from) {
    const fromStr =
      filterObj.from instanceof Date
        ? filterObj.from.toISOString()
        : String(filterObj.from);
    params.set("from", fromStr);
  }

  if (filterObj.to) {
    const toStr =
      filterObj.to instanceof Date
        ? filterObj.to.toISOString()
        : String(filterObj.to);
    params.set("to", toStr);
  }

  if (
    filterObj.status &&
    filterObj.status !== "ALL" &&
    filterObj.status.toUpperCase() !== "ALL"
  ) {
    params.set("status", filterObj.status);
  }

  const queryString = params.toString();
  const url = `${API.ENDPOINTS.ORDERS.GET_ORDERS_REPORT_DATA}${queryString ? `?${queryString}` : ""}`;

  const result = await Clientapi.get<ResponseType<OrdersReportDataType>>(url);

  return result;
}

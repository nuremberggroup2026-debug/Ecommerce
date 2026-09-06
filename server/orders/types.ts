import { order_status } from "@/generated/prisma/client";

export type PlaceOrderCreateInputs = {
  email: string;
  phoneNumber: string;
  city: string;
  streetAddress: string;
  buildingNumber: number;
  additionalNote?: string;
  promoCode?: string;
};

export type OrderStatus = order_status;

export type UpdateOrderStatusRequest = {
  status: OrderStatus;
};

export type OrdersFilteration = {
  page: number;
  take?: number;
  customerEmail?: string | null;
  status?: OrderStatus;
  orderNumber?: string | null;
};

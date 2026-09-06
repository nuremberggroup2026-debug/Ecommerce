import { adminOrders } from "@/features/orders/api/orders.server.api";
import type { Order, OrdersFilteration } from "@/features/orders/types";

export type AdminOrder = Order & {
  paymentMethodLabel: string;
  createdAtRelative: string;
  updatedAtRelative: string;
};

function getPaymentMethodLabel(paymentMethod: Order["paymentMethod"]): string {
  const labels: Record<Order["paymentMethod"], string> = {
    COD: "Cash on Delivery",
    CLIQ: "CliQ",
  };

  return labels[paymentMethod];
}

function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const createdAt = new Date(date);

  const diffInSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);

  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

export async function getAdminOrders(params: OrdersFilteration): Promise<{
  orders: AdminOrder[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}> {
  const response = await adminOrders(params);

  const orders = response.data.orders.map((order) => ({
    ...order,

    userEmail: order.customerEmail,
    totalAmount: Number(order.totalAmount),
    paymentMethodLabel: getPaymentMethodLabel(order.paymentMethod),
    
    createdAtRelative: getRelativeTime(order.createdAt),
    updatedAtRelative: getRelativeTime(order.updatedAt),
  }));

  return {
    orders,
    pagination: response.data.pagination,
  };
}

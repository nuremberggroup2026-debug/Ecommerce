"use client";

import type { OrderByIdAdmin } from "@/features/orders/types";
import { ViewOrderHeader } from "./view-order-header";
import { ViewOrderItems } from "./view-order-items";
import { ViewOrderCustomerShipping } from "./view-order-customer-shipping";
import { ViewOrderPaymentSummary } from "./view-order-payment-summary";

export default function ViewOrder({ order }: { order: OrderByIdAdmin }) {
  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <ViewOrderHeader order={order} />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          {/* Main Column (Order Items and Shipping) */}
          <div className="flex-1 space-y-5 lg:min-w-0">
            <ViewOrderItems items={order.orderItems} />
            <ViewOrderCustomerShipping order={order} />
          </div>

          {/* Sidebar (Payment Summary) */}
          <div className="w-full lg:w-85 shrink-0">
            <ViewOrderPaymentSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}

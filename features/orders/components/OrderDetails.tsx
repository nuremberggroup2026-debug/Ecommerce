"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatDate, getStatusColor } from "@/lib/helpers/clientSideHelpers";
import type { OrderStatus, OrderByID } from "../types";

// Import your newly extracted components
import OrderItemsSection from "./orderDetailsComponents/OrderItemsSection";
import DeliveryInfoSection from "./orderDetailsComponents/DeliveryInfoSection";
import OrderSummarySection from "./orderDetailsComponents/OrderSummarySection";

interface Props {
  order: OrderByID;
}

export default function OrderDetailsComponent({ order }: Props) {
  const t = useTranslations("ORDERS.ORDER_DETAILS");

  // Calculations for the Summary Section
  const subtotal = order.orderItems.reduce(
    (total, item) => total + Number(item.itemPrice) * item.quantity,
    0,
  );

  const appliedPromoCode = order.promoCodeDetails?.[0]?.promoCodes?.code;
  const discountAmount = order.discountAmount
    ? Number(order.discountAmount)
    : 0;

  return (
    <main className="min-h-screen bg-neutral-50/50 pb-20 text-neutral-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Header Section */}
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/orders"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              <span aria-hidden="true">&larr;</span>
              {t("BACK_TO_ORDERS")}
            </Link>

            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {order.orderNumber}
              </h1>
              <span
                className={`mt-1 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(
                  order.status as OrderStatus,
                )}`}
              >
                {t(`STATUS.${order.status}`)}
              </span>
            </div>

            <p className="mt-2 text-sm text-neutral-500">
              {t("TITLE")} • {formatDate(order.createdAt)}
            </p>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Items and Delivery */}
          <div className="space-y-6 lg:col-span-8">
            <OrderItemsSection order={order} />
            <DeliveryInfoSection order={order} />
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:sticky lg:top-8 lg:col-span-4">
            <OrderSummarySection
              order={order}
              subtotal={subtotal}
              appliedPromoCode={appliedPromoCode}
              discountAmount={discountAmount}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { formatDate, getStatusColor } from "@/lib/helpers/clientSideHelpers";
import type { OrderStatus, OrderByID } from "../../types";
import OrderItemsSection from "../shop/orderDetailsComponents/OrderItemsSection";
import DeliveryInfoSection from "../shop/orderDetailsComponents/DeliveryInfoSection";
import OrderSummarySection from "../shop/orderDetailsComponents/OrderSummarySection";

interface Props {
  order: OrderByID;
}

export default function OrderDetailsComponent({ order }: Props) {
  const t = useTranslations("ORDERS.ORDER_DETAILS");
  const locale = useLocale();
  const isAr = locale === "ar";

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
        {/* Improved Header Section */}
        <header className="mb-10 flex flex-col gap-4 border-b border-neutral-100 pb-8">
          <Link
            href="/orders"
            className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <span aria-hidden="true">{isAr ? "→" : "←"}</span>
            {t("BACK_TO_ORDERS")}
          </Link>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight text-neutral-900 wrap-break-word sm:text-2xl md:text-3xl">
                  {order.orderNumber}
                </h1>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${getStatusColor(
                    order.status as OrderStatus,
                  )}`}
                >
                  {t(`STATUS.${order.status}`)}
                </span>
              </div>

              <p className="text-sm font-medium text-neutral-400">
                {t("TITLE")} <span className="mx-2 text-neutral-300">•</span>{" "}
                {formatDate(order.createdAt)}
              </p>
            </div>
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

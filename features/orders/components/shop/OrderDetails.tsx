import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { formatDate, getStatusColor } from "@/lib/helpers/clientSideHelpers";
import type { OrderStatus, OrderByID } from "../../types";
import OrderItemsSection from "../shop/orderDetailsComponents/OrderItemsSection";
import DeliveryInfoSection from "../shop/orderDetailsComponents/DeliveryInfoSection";
import OrderSummarySection from "../shop/orderDetailsComponents/OrderSummarySection";
import { theme } from "@/themes";
import { ArrowLeft } from "lucide-react";

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
    <main className={theme.orderDetailsComponent.main} dir={isAr ? "rtl" : "ltr"}>
      <div className={theme.orderDetailsComponent.container}>
        {/* Improved Header Section */}
        <header className={theme.orderDetailsComponent.header}>
          <Link
            href={`/${locale}/orders`}
            className={theme.orderDetailsComponent.backLink}
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("BACK_TO_ORDERS")}
          </Link>

          <div className={theme.orderDetailsComponent.headerFlex}>
            <div className={theme.orderDetailsComponent.titleSpace}>
              <div className={theme.orderDetailsComponent.titleRow}>
                <h1 className={theme.orderDetailsComponent.orderTitle}>
                  #{order.orderNumber}
                </h1>
                <span
                  className={theme.orderDetailsComponent.statusBadge(
                    getStatusColor(order.status as OrderStatus),
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {t(`STATUS.${order.status}`)}
                </span>
              </div>

              <p className={theme.orderDetailsComponent.dateText}>
                {t("TITLE")}{" "}
                <span className={theme.orderDetailsComponent.dotSeparator}>•</span>{" "}
                {formatDate(order.createdAt, locale as "en" | "ar")}
              </p>
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className={theme.orderDetailsComponent.gridMain}>
          {/* Left Column: Items and Delivery */}
          <div className={theme.orderDetailsComponent.leftColumn}>
            <OrderItemsSection order={order} />
            <DeliveryInfoSection order={order} />
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className={theme.orderDetailsComponent.rightColumn}>
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
"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { OrderByID } from "../../../types/index";
import { theme } from "@/themes";

interface OrderSummarySectionProps {
  order: OrderByID;
  subtotal: number;
  appliedPromoCode?: string;
  discountAmount: number;
}

export default function OrderSummarySection({
  order,
  subtotal,
  appliedPromoCode,
  discountAmount,
}: OrderSummarySectionProps) {
  const t = useTranslations("ORDERS.ORDER_DETAILS");

  return (
    <section className={theme.orderSummarySection.section}>
      <div className={theme.orderSummarySection.header}>
        <h2 className={theme.orderSummarySection.title}>
          {t("SUMMARY.TITLE")}
        </h2>
      </div>

      <div className={theme.orderSummarySection.body}>
        <div className={theme.orderSummarySection.row}>
          <span className={theme.orderSummarySection.rowLabel}>{t("SUMMARY.SUBTOTAL")}</span>
          <span className={theme.orderSummarySection.rowValue}>
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {appliedPromoCode && (
          <div className={theme.orderSummarySection.discountRow}>
            <div className={theme.orderSummarySection.discountLeft}>
              <span className={theme.orderSummarySection.rowLabel}> {t("SUMMARY.DISCOUNT")}</span>
              <span className={theme.orderSummarySection.promoBadge}>
                {appliedPromoCode}
              </span>
            </div>
            <span className={theme.orderSummarySection.discountValue}>
              -${discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        <div className={theme.orderSummarySection.totalRow}>
          <span className={theme.orderSummarySection.totalLabel}>
            {t("SUMMARY.TOTAL")}
          </span>
          <span className={theme.orderSummarySection.totalValue}>
            ${Number(order.totalAmount).toFixed(2)}
          </span>
        </div>
      </div>

      <div className={theme.orderSummarySection.footer}>
        <Link
          href="/orders"
          className={theme.orderSummarySection.button}
        >
          {t("BACK_TO_ORDERS")}
        </Link>
      </div>
    </section>
  );
}
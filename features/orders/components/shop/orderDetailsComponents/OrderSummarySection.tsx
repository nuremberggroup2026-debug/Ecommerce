"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { OrderByID } from "@/features/orders/types";
import { theme } from "@/themes";
import { Receipt, ArrowLeft } from "lucide-react";

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
  const locale = useLocale();

  return (
    <section className={theme.orderSummarySection.section}>
      <div className={theme.orderSummarySection.header}>
        <h2 className="flex items-center text-lg font-semibold text-neutral-900">
          <Receipt className="me-2.5 h-5 w-5 text-neutral-500" />
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
              <span className={theme.orderSummarySection.rowLabel}>{t("SUMMARY.DISCOUNT")}</span>
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
          href={`/${locale}/orders`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-black active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("BACK_TO_ORDERS")}
        </Link>
      </div>
    </section>
  );
}
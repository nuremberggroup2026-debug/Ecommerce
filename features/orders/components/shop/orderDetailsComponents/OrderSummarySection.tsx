"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { OrderByID } from "../../../types/index";

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
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          {t("SUMMARY.TITLE")}
        </h2>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between text-base">
          <span className="text-neutral-500">{t("SUMMARY.SUBTOTAL")}</span>
          <span className="font-medium text-neutral-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {appliedPromoCode && (
          <div className="flex items-start justify-between text-base">
            <div className="flex flex-col items-start gap-1">
              <span className="text-neutral-500"> {t("SUMMARY.DISCOUNT")}</span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {appliedPromoCode}
              </span>
            </div>
            <span className="font-medium text-emerald-600">
              -${discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between border-t border-dashed border-neutral-200 pt-4">
          <span className="text-lg font-semibold text-neutral-900">
            {t("SUMMARY.TOTAL")}
          </span>
          <span className="text-2xl font-bold text-neutral-900">
            ${Number(order.totalAmount).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="rounded-b-2xl border-t border-neutral-100 bg-neutral-50 p-4">
        <Link
          href="/orders"
          className="block w-full rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-black active:scale-[0.98]"
        >
          {t("BACK_TO_ORDERS")}
        </Link>
      </div>
    </section>
  );
}

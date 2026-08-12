"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AllOrdersByUser, OrderStatus } from "../types";
import { getStatusColor, formatDate } from "@/lib/helpers/clientSideHelpers";

interface Props {
  orders: AllOrdersByUser[];
  locale: "en" | "ar";
}

export default function OrdersComponent({ orders, locale }: Props) {
  const t = useTranslations("ORDERS");

  const [expandedOrder, setExpandedOrder] = useState<string | null>(
    orders[0]?.id || null,
  );

  const toggleOrder = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="flex min-h-screen flex-col bg-white text-black"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 lg:px-10">
        {/* Header */}
        <header className="mb-12 border-b border-neutral-100 pb-6 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("TITLE")}
          </h1>

          <p className="mt-2 text-xs font-light text-gray-400">
            {t("DESCRIPTION")}
          </p>
        </header>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-6 py-20 text-center">
            <p className="text-sm font-light text-gray-400">
              {t("EMPTY_MESSAGE")}
            </p>

            <Link
              href={`/${locale}/products`}
              className="rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              {t("START_SHOPPING")}
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                    isExpanded
                      ? "border-neutral-200 bg-white shadow-md"
                      : "border-neutral-100 bg-neutral-50/50 hover:border-neutral-200"
                  }`}
                >
                  {/* Order Summary */}
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.id)}
                    className="flex w-full flex-wrap items-center justify-between gap-4 p-6 text-left focus:outline-none"
                  >
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                      {/* Order ID */}
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {t("ORDER_ID")}
                        </p>

                        <p className="text-sm font-medium text-neutral-900">
                          {order.orderNumber}
                        </p>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {t("DATE")}
                        </p>

                        <p className="text-sm text-neutral-700">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      {/* Items Count */}
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {t("ITEMS")}
                        </p>

                        <p className="text-sm text-neutral-700">
                          {order._count.orderItems}
                        </p>
                      </div>

                      {/* Total */}
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          {t("TOTAL")}
                        </p>

                        <p className="text-sm font-bold text-black">
                          ${Number(order.totalAmount).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="ml-auto flex items-center gap-6">
                      {/* Status */}
                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(
                          order.status as OrderStatus,
                        )}`}
                      >
                        {t(`STATUS.${order.status}`)}
                      </span>

                      {/* Expand Icon */}
                      <svg
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-2 border-t border-neutral-100 p-6 pt-4">
                        {/* Order Pricing */}
                        <div className="space-y-3">
                          {/* Subtotal */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500">
                              {t("SUBTOTAL")}
                            </span>

                            <span className="font-medium text-neutral-900">
                              ${Number(order.subtotal).toFixed(2)}
                            </span>
                          </div>

                          {/* Discount */}
                          {Number(order.discountAmount) > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-neutral-500">
                                {t("DISCOUNT")}
                              </span>

                              <span className="font-medium text-green-600">
                                -$
                                {Number(order.discountAmount).toFixed(2)}
                              </span>
                            </div>
                          )}

                          {/* Total */}
                          <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                            <span className="font-medium text-neutral-900">
                              {t("TOTAL")}
                            </span>

                            <span className="text-lg font-bold text-neutral-900">
                              ${Number(order.totalAmount).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Items Count */}
                        <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neutral-500">
                              {t("ITEMS_IN_ORDER")}
                            </span>

                            <span className="text-sm font-semibold text-neutral-900">
                              {order._count.orderItems}
                            </span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="mt-8 flex justify-end">
                          <Link
                            href={`/${locale}/orders/${order.id}`}
                            className="rounded-xl bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-sm transition hover:bg-neutral-800"
                          >
                            {t("VIEW_ORDER_DETAILS")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

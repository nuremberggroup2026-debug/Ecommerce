"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AllOrdersByUser, OrderStatus } from "../../types";
import { getStatusColor, formatDate } from "@/lib/helpers/clientSideHelpers";
import { theme } from "@/themes";

interface Props {
  orders: AllOrdersByUser[];
  locale: "en" | "ar";
}

export default function OrdersComponent({ orders, locale }: Props) {
  const t = useTranslations("ORDERS");
  const isAr = locale === "ar";

  const [expandedOrder, setExpandedOrder] = useState<string | null>(
    orders[0]?.id || null,
  );

  const toggleOrder = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <main className={theme.ordersComponent.main(isAr)}>
      <div className={theme.ordersComponent.container}>
        {/* Header */}
        <header className={theme.ordersComponent.header}>
          <h1 className={theme.ordersComponent.title}>
            {t("TITLE")}
          </h1>

          <p className={theme.ordersComponent.description}>
            {t("DESCRIPTION")}
          </p>
        </header>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className={theme.ordersComponent.emptyContainer}>
            <p className={theme.ordersComponent.emptyMessage}>
              {t("EMPTY_MESSAGE")}
            </p>

            <Link
              href={`/${locale}/products`}
              className={theme.ordersComponent.emptyButton}
            >
              {t("START_SHOPPING")}
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className={theme.ordersComponent.ordersList}>
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className={theme.ordersComponent.orderCard(isExpanded)}
                >
                  {/* Order Summary */}
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.id)}
                    className={theme.ordersComponent.orderButton}
                  >
                    <div className={theme.ordersComponent.orderInfoGrid}>
                      {/* Order ID */}
                      <div>
                        <p className={theme.ordersComponent.fieldLabel}>
                          {t("ORDER_ID")}
                        </p>

                        <p className={theme.ordersComponent.fieldValue}>
                          {order.orderNumber}
                        </p>
                      </div>

                      {/* Date */}
                      <div>
                        <p className={theme.ordersComponent.fieldLabel}>
                          {t("DATE")}
                        </p>

                        <p className={theme.ordersComponent.fieldValueRegular}>
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      {/* Items Count */}
                      <div>
                        <p className={theme.ordersComponent.fieldLabel}>
                          {t("ITEMS")}
                        </p>

                        <p className={theme.ordersComponent.fieldValueRegular}>
                          {order._count.orderItems}
                        </p>
                      </div>

                      {/* Total */}
                      <div>
                        <p className={theme.ordersComponent.fieldLabel}>
                          {t("TOTAL")}
                        </p>

                        <p className={theme.ordersComponent.fieldValueBold}>
                          ${Number(order.totalAmount).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className={theme.ordersComponent.cardHeaderRight}>
                      {/* Status */}
                      <span
                        className={theme.ordersComponent.statusBadge(
                          getStatusColor(order.status as OrderStatus),
                        )}
                      >
                        {t(`STATUS.${order.status}`)}
                      </span>

                      {/* Expand Icon */}
                      <svg
                        className={theme.ordersComponent.expandIcon(isExpanded)}
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
                  <div className={theme.ordersComponent.expandedGrid(isExpanded)}>
                    <div className={theme.ordersComponent.expandedInner}>
                      <div className={theme.ordersComponent.expandedContent}>
                        {/* Order Pricing */}
                        <div className={theme.ordersComponent.pricingSpace}>
                          {/* Subtotal */}
                          <div className={theme.ordersComponent.pricingRow}>
                            <span className={theme.ordersComponent.pricingLabel}>
                              {t("SUBTOTAL")}
                            </span>

                            <span className={theme.ordersComponent.pricingValue}>
                              ${Number(order.subtotal).toFixed(2)}
                            </span>
                          </div>

                          {/* Discount */}
                          {Number(order.discountAmount) > 0 && (
                            <div className={theme.ordersComponent.pricingRow}>
                              <span className={theme.ordersComponent.pricingLabel}>
                                {t("DISCOUNT")}
                              </span>

                              <span className={theme.ordersComponent.discountValue}>
                                -$
                                {Number(order.discountAmount).toFixed(2)}
                              </span>
                            </div>
                          )}

                          {/* Total */}
                          <div className={theme.ordersComponent.totalPricingRow}>
                            <span className={theme.ordersComponent.totalPricingLabel}>
                              {t("TOTAL")}
                            </span>

                            <span className={theme.ordersComponent.totalPricingValue}>
                              ${Number(order.totalAmount).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Items Count */}
                        <div className={theme.ordersComponent.itemsBox}>
                          <div className={theme.ordersComponent.itemsBoxRow}>
                            <span className={theme.ordersComponent.itemsBoxLabel}>
                              {t("ITEMS_IN_ORDER")}
                            </span>

                            <span className={theme.ordersComponent.itemsBoxValue}>
                              {order._count.orderItems}
                            </span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className={theme.ordersComponent.actionContainer}>
                          <Link
                            href={`/${locale}/orders/${order.id}`}
                            className={theme.ordersComponent.actionButton}
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
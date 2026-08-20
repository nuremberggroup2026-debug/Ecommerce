"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { OrderByID } from "../../../types/index";
import DefaultImage from "@/app/defaultImage.jpg";

interface OrderItemsSectionProps {
  order: OrderByID;
}

export default function OrderItemsSection({ order }: OrderItemsSectionProps) {
  const t = useTranslations("ORDERS.ORDER_DETAILS");

  return (
    <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 bg-neutral-50/50 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-neutral-900">
          {t("ITEMS.TITLE")}
          <span className="ml-2 rounded-full bg-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
            {order.orderItems.length}
          </span>
        </h2>
      </div>

      <div className="divide-y divide-neutral-100 px-6">
        {order.orderItems.map((item) => {
          const itemTotal = Number(item.itemPrice) * item.quantity;

          return (
            <div
              key={item.orderItemId}
              className="flex items-center gap-6 py-6"
            >
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
                <Image
                  src={item.variantImage ?? DefaultImage}
                  alt={item.productName}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between sm:gap-4">
                <div className="mb-2 sm:mb-0">
                  <h3 className="line-clamp-2 text-base font-medium text-neutral-900">
                    {item.productName}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
                    <p>
                      {t("ITEMS.UNIT_PRICE")}: $
                      {Number(item.itemPrice).toFixed(2)}
                    </p>
                    <p className="hidden text-neutral-300 sm:block">•</p>
                    <p>
                      {t("ITEMS.QUANTITY")}: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-base font-semibold text-neutral-900">
                    ${itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import type { OrderByID } from "../../types/index";

interface DeliveryInfoSectionProps {
  order: OrderByID;
}

export default function DeliveryInfoSection({
  order,
}: DeliveryInfoSectionProps) {
  const t = useTranslations("ORDERS.ORDER_DETAILS");

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 bg-neutral-50/50 px-6 py-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          {t("DELIVERY.TITLE")}
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-neutral-500">{t("DELIVERY.EMAIL")}</p>
              <p className="break-all text-base font-medium text-neutral-900">
                {order.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">{t("DELIVERY.PHONE")}</p>
              <p className="text-base font-medium text-neutral-900">
                {order.phoneNumber}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-neutral-500">{t("DELIVERY.CITY")}</p>
              <p className="text-base font-medium text-neutral-900">
                {order.city}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">
                {t("DELIVERY.STREET_ADDRESS")}
              </p>
              <p className="text-base font-medium text-neutral-900">
                {order.streetAddress}, {t("DELIVERY.BUILDING_NUMBER")}:{" "}
                {order.buildingNumber}
              </p>
            </div>
          </div>

          {order.additionalNote && (
            <div className="border-t border-neutral-100 pt-5 sm:col-span-2">
              <p className="mb-2 text-sm text-neutral-500">
                {t("DELIVERY.ADDITIONAL_NOTE")}
              </p>
              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                <p className="text-sm leading-relaxed text-amber-900">
                  {order.additionalNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

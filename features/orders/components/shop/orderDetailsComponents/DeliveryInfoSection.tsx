"use client";

import { useTranslations } from "next-intl";
import type { OrderByID } from "../../../types/index";
import { theme } from "@/themes";
import { Truck, Mail, Phone, MapPin, FileText } from "lucide-react";

interface DeliveryInfoSectionProps {
  order: OrderByID;
}

export default function DeliveryInfoSection({
  order,
}: DeliveryInfoSectionProps) {
  const t = useTranslations("ORDERS.ORDER_DETAILS");

  return (
    <section className={theme.deliveryInfoSection.section}>
      <div className={theme.deliveryInfoSection.header}>
        <h2 className="flex items-center text-lg font-semibold text-neutral-900">
          <Truck className="me-2.5 h-5 w-5 text-neutral-500" />
          {t("DELIVERY.TITLE")}
        </h2>
      </div>

      <div className={theme.deliveryInfoSection.body}>
        <div className={theme.deliveryInfoSection.grid}>
          <div className={theme.deliveryInfoSection.column}>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className={theme.deliveryInfoSection.fieldLabel}>{t("DELIVERY.EMAIL")}</p>
                <p className={theme.deliveryInfoSection.emailValue}>
                  {order.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className={theme.deliveryInfoSection.fieldLabel}>{t("DELIVERY.PHONE")}</p>
                <p className={theme.deliveryInfoSection.fieldValue}>
                  {order.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          <div className={theme.deliveryInfoSection.column}>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className={theme.deliveryInfoSection.fieldLabel}>{t("DELIVERY.CITY")}</p>
                <p className={theme.deliveryInfoSection.fieldValue}>
                  {order.city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className={theme.deliveryInfoSection.fieldLabel}>
                  {t("DELIVERY.STREET_ADDRESS")}
                </p>
                <p className={theme.deliveryInfoSection.fieldValue}>
                  {order.streetAddress}, {t("DELIVERY.BUILDING_NUMBER")}:{" "}
                  {order.buildingNumber}
                </p>
              </div>
            </div>
          </div>

          {order.additionalNote && (
            <div className={theme.deliveryInfoSection.noteContainer}>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-amber-800">
                <FileText className="h-4 w-4" />
                {t("DELIVERY.ADDITIONAL_NOTE")}
              </p>
              <div className={theme.deliveryInfoSection.noteBox}>
                <p className={theme.deliveryInfoSection.noteText}>
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
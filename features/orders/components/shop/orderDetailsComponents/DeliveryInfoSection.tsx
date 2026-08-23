"use client";

import { useTranslations } from "next-intl";
import type { OrderByID } from "../../../types/index";
import { theme } from "@/themes";

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
        <h2 className={theme.deliveryInfoSection.title}>
          {t("DELIVERY.TITLE")}
        </h2>
      </div>

      <div className={theme.deliveryInfoSection.body}>
        <div className={theme.deliveryInfoSection.grid}>
          <div className={theme.deliveryInfoSection.column}>
            <div>
              <p className={theme.deliveryInfoSection.fieldLabel}>{t("DELIVERY.EMAIL")}</p>
              <p className={theme.deliveryInfoSection.emailValue}>
                {order.email}
              </p>
            </div>
            <div>
              <p className={theme.deliveryInfoSection.fieldLabel}>{t("DELIVERY.PHONE")}</p>
              <p className={theme.deliveryInfoSection.fieldValue}>
                {order.phoneNumber}
              </p>
            </div>
          </div>

          <div className={theme.deliveryInfoSection.column}>
            <div>
              <p className={theme.deliveryInfoSection.fieldLabel}>{t("DELIVERY.CITY")}</p>
              <p className={theme.deliveryInfoSection.fieldValue}>
                {order.city}
              </p>
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

          {order.additionalNote && (
            <div className={theme.deliveryInfoSection.noteContainer}>
              <p className={theme.deliveryInfoSection.noteLabel}>
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
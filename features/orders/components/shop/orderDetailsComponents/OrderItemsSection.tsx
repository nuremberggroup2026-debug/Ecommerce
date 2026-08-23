"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { OrderByID } from "../../../types/index";
import DefaultImage from "@/app/defaultImage.jpg";
import { theme } from "@/themes";

interface OrderItemsSectionProps {
  order: OrderByID;
}

export default function OrderItemsSection({ order }: OrderItemsSectionProps) {
  const t = useTranslations("ORDERS.ORDER_DETAILS");

  return (
    <section className={theme.orderItemsSection.section}>
      <div className={theme.orderItemsSection.header}>
        <h2 className={theme.orderItemsSection.title}>
          {t("ITEMS.TITLE")}
          <span className={theme.orderItemsSection.badge}>
            {order.orderItems.length}
          </span>
        </h2>
      </div>

      <div className={theme.orderItemsSection.itemsList}>
        {order.orderItems.map((item) => {
          const itemTotal = Number(item.itemPrice) * item.quantity;

          return (
            <div
              key={item.orderItemId}
              className={theme.orderItemsSection.itemRow}
            >
              <div className={theme.orderItemsSection.imageWrapper}>
                <Image
                  src={item.variantImage ?? DefaultImage}
                  alt={item.productName}
                  fill
                  sizes="80px"
                  className={theme.orderItemsSection.image}
                />
              </div>

              <div className={theme.orderItemsSection.contentWrapper}>
                <div className={theme.orderItemsSection.infoCol}>
                  <h3 className={theme.orderItemsSection.productName}>
                    {item.productName}
                  </h3>
                  <div className={theme.orderItemsSection.metaRow}>
                    <p>
                      {t("ITEMS.UNIT_PRICE")}: $
                      {Number(item.itemPrice).toFixed(2)}
                    </p>
                    <p className={theme.orderItemsSection.separator}>•</p>
                    <p>
                      {t("ITEMS.QUANTITY")}: {item.quantity}
                    </p>
                  </div>
                </div>

                <div className={theme.orderItemsSection.priceCol}>
                  <p className={theme.orderItemsSection.totalPrice}>
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
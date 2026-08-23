"use client";

import React, { useState } from "react";
import { Locale, CartData } from "../types";
import CustomerDetails from "./CustomerDetails";
import OrderSummary from "./OrderSummary";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

interface Prop {
  locale: Locale;
  cartData: CartData;
}

function CheckoutComponent({ locale, cartData }: Prop) {
  const [promoCode, setPromoCode] = useState<string | undefined>();

  const t = useTranslations("CHECKOUT");

  return (
    <div className={theme.checkout.grid}>
      {/* Left Side — Customer Details */}
      <section className={theme.checkout.leftSection}>
        <div className={theme.checkout.card}>
          <div className={theme.checkout.header}>
            <p className={theme.checkout.step}>
              {t("STEP_01")}
            </p>
            <h2 className={theme.checkout.title}>
              {t("DELIVERY_DETAILS")}
            </h2>
            <p className={theme.checkout.description}>
              {t("DELIVERY_DESC")}
            </p>
          </div>

          <CustomerDetails locale={locale} promoCode={promoCode} />
        </div>
      </section>

      {/* Right Side — Order Summary */}
      <aside className={theme.checkout.rightSection}>
        <OrderSummary
          locale={locale}
          cartData={cartData}
          onPromoCodeChange={setPromoCode}
        />
      </aside>
    </div>
  );
}

export default CheckoutComponent;
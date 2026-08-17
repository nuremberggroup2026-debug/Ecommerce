"use client";

import React, { useState } from "react";
import { Locale, CartData } from "../types";
import CustomerDetails from "./CustomerDetails";
import OrderSummary from "./OrderSummary";
import { useTranslations } from "next-intl";

interface Prop {
  locale: Locale;
  cartData: CartData;
}

function CheckoutComponent({ locale, cartData }: Prop) {
  const [promoCode, setPromoCode] = useState<string | undefined>();

  const t = useTranslations("CHECKOUT");

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Left Side — Customer Details */}
      <section className="lg:col-span-7">
        <div className="rounded-[32px] border border-neutral-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {t("STEP_01")}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">
              {t("DELIVERY_DETAILS")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              {t("DELIVERY_DESC")}
            </p>
          </div>

          <CustomerDetails locale={locale} promoCode={promoCode} />
        </div>
      </section>

      {/* Right Side — Order Summary */}
      <aside className="lg:col-span-5 lg:sticky lg:top-8">
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

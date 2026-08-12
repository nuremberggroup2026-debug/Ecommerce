"use client";
import { useTranslations } from "next-intl";
import { Locale } from "@/types";
import { CartData } from "../types";
import { useState } from "react";
import { validatePromoCode } from "../api/checkout.client.api";
import { toast } from "sonner";
import OrderSummaryItem from "./OrderSummaryItem";

interface Props {
  locale: Locale;
  cartData: CartData;
  onPromoCodeChange: (promoCode: string | undefined) => void;
}

function OrderSummary({ locale, cartData, onPromoCodeChange }: Props) {
  const t = useTranslations();

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const handleApplyPromo = async () => {
    try {
      if (!promoCodeInput.trim()) return;

      setIsApplyingPromo(true);

      const result = await validatePromoCode(promoCodeInput);

      toast.success(t(`ResponseMessages.${result.message}`));

      setDiscount(result.data.discountPercentage);
      setIsPromoApplied(true);

      onPromoCodeChange(promoCodeInput);
    } catch (error) {
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);

          toast.error(t(`ResponseMessages.${errorData.message}`));
        } catch {
          toast.error(error.message);
        }
      }
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handlePromoCodeChange = (value: string) => {
    setPromoCodeInput(value);
    if (isPromoApplied) {
      setIsPromoApplied(false);
      setDiscount(0);
      onPromoCodeChange(undefined);
    }
  };

  const subtotal = cartData.items.reduce(
    (total, item) => total + item.subtotal,
    0,
  );

  const discountAmount = subtotal * (discount / 100);

  const total = subtotal - discountAmount;

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="rounded-[32px] bg-neutral-50 p-6 sm:p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
          {t("CHECKOUT.ORDER_SUMMARY")}
        </h2>

        <p className="mt-2 text-xs text-neutral-400">
          {t("CHECKOUT.ITEMS_COUNT", { count: cartData.items.length })}
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 border-b border-neutral-200 pb-8">
        {cartData.items.map((item) => (
          <OrderSummaryItem item={item} key={item.cartItemId} />
        ))}
      </div>

      {/* Subtotal */}
      <div className="flex items-center justify-between pt-6">
        <span className="text-sm text-neutral-500">
          {t("CHECKOUT.SUBTOTAL")}
        </span>

        <span className="text-sm font-medium text-neutral-900">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Promo Code */}
      <div className="mt-6 border-b border-neutral-200 pb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCodeInput}
            onChange={(e) => handlePromoCodeChange(e.target.value)}
            placeholder={t("CHECKOUT.PROMO_CODE")}
            disabled={isApplyingPromo}
            className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-neutral-400"
          />

          <button
            type="button"
            onClick={handleApplyPromo}
            disabled={
              isApplyingPromo || !promoCodeInput.trim() || isPromoApplied
            }
            className="rounded-xl bg-neutral-900 px-5 py-3 text-xs font-medium uppercase tracking-wider text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isApplyingPromo
              ? t("CHECKOUT.APPLYING")
              : isPromoApplied
                ? t("CHECKOUT.APPLIED")
                : t("CHECKOUT.APPLY")}
          </button>
        </div>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex items-center justify-between py-4 text-sm">
          <span className="text-neutral-500">{t("CHECKOUT.DISCOUNT")}</span>

          <span className="font-medium text-green-600">-{discount}%</span>
        </div>
      )}

      {/* Total */}
      <div className="flex items-center justify-between pt-2">
        <span className="font-medium text-neutral-900">
          {t("CHECKOUT.TOTAL")}
        </span>

        <div className="text-right">
          {discount > 0 && (
            <p className="text-sm text-neutral-400 line-through">
              ${subtotal.toFixed(2)}
            </p>
          )}

          <span className="text-xl font-bold text-neutral-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

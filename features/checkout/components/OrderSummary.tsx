"use client";
import { useTranslations } from "next-intl";
import { Locale } from "@/types";
import { CartData } from "../types";
import { useState } from "react";
import { validatePromoCode } from "../api/checkout.client.api";
import { toast } from "sonner";
import OrderSummaryItem from "./OrderSummaryItem";
import { theme } from "@/themes";

interface Props {
  locale: Locale;
  cartData: CartData;
  onPromoCodeChange: (promoCode: string | undefined) => void;
}

function OrderSummary({ locale, cartData, onPromoCodeChange }: Props) {
  const t = useTranslations();
  const isAr = locale === "ar";

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
    <div className={theme.orderSummary.container(isAr)}>
      {/* Header */}
      <div className={theme.orderSummary.header}>
        <h2 className={theme.orderSummary.title}>
          {t("CHECKOUT.ORDER_SUMMARY")}
        </h2>

        <p className={theme.orderSummary.itemsCount}>
          {t("CHECKOUT.ITEMS_COUNT", { count: cartData.items.length })}
        </p>
      </div>

      {/* Cart Items */}
      <div className={theme.orderSummary.itemsList}>
        {cartData.items.map((item) => (
          <OrderSummaryItem item={item} key={item.cartItemId} />
        ))}
      </div>

      {/* Subtotal */}
      <div className={theme.orderSummary.subtotalRow}>
        <span className={theme.orderSummary.subtotalLabel}>
          {t("CHECKOUT.SUBTOTAL")}
        </span>

        <span className={theme.orderSummary.subtotalValue}>
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Promo Code */}
      <div className={theme.orderSummary.promoSection}>
        <div className={theme.orderSummary.promoFlex}>
          <input
            type="text"
            value={promoCodeInput}
            onChange={(e) => handlePromoCodeChange(e.target.value)}
            placeholder={t("CHECKOUT.PROMO_CODE")}
            disabled={isApplyingPromo}
            className={theme.orderSummary.promoInput}
          />

          <button
            type="button"
            onClick={handleApplyPromo}
            disabled={
              isApplyingPromo || !promoCodeInput.trim() || isPromoApplied
            }
            className={theme.orderSummary.promoButton}
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
        <div className={theme.orderSummary.discountRow}>
          <span className={theme.orderSummary.discountLabel}>{t("CHECKOUT.DISCOUNT")}</span>

          <span className={theme.orderSummary.discountValue}>-{discount}%</span>
        </div>
      )}

      {/* Total */}
      <div className={theme.orderSummary.totalRow}>
        <span className={theme.orderSummary.totalLabel}>
          {t("CHECKOUT.TOTAL")}
        </span>

        <div className={theme.orderSummary.totalWrapper}>
          {discount > 0 && (
            <p className={theme.orderSummary.oldTotalValue}>
              ${subtotal.toFixed(2)}
            </p>
          )}

          <span className={theme.orderSummary.finalTotalValue}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
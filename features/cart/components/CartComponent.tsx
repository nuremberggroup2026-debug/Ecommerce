"use client";

import Image from "next/image";
import Link from "next/link";
import { CartData, Locale } from "../types";
import { useRef, useState } from "react";
import { deleteItem, updateItemQuantity } from "../api/cart.client.api";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { theme } from "@/themes";

interface Prop {
  cartData: CartData;
  locale: Locale;
}

export default function CartComponent({ cartData, locale }: Prop) {
  const [items, setItems] = useState(cartData.items);

  const t = useTranslations();

  const isAr = locale === "ar";

  const pendingUpdates = useRef<Record<string, number>>({});
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const subtotal = items
    .reduce((total, item) => total + item.subtotal, 0)
    .toFixed(2);
  const shipping = Number(subtotal) > 300 ? 0 : 15;

  const total = Number(subtotal) + shipping;

  const updateQuantity = (itemId: string, quantity: number) => {
    const previousItems = items;

    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === itemId
          ? {
              ...item,
              quantity,
              subtotal: quantity * Number(item.itemPrice),
            }
          : item,
      ),
    );

    pendingUpdates.current[itemId] = quantity;

    clearTimeout(timers.current[itemId]);

    timers.current[itemId] = setTimeout(async () => {
      try {
        await updateItemQuantity(pendingUpdates.current[itemId], itemId);
        delete pendingUpdates.current[itemId];
      } catch {
        setItems(previousItems);
      }
    }, 750);
  };

  const handleDeleteItem = async (itemId: string) => {
    const previousItems = items;

    setItems((prev) => prev.filter((item) => item.cartItemId !== itemId));

    try {
      const result = await deleteItem(itemId);

      if (!result.success) throw new Error(result.message);

      toast.success(t(`ResponseMessages.${result.message}`));
    } catch {
      setItems(previousItems);
      toast.error(t("ResponseMessages.DELETE_CART_ITEM_FAILED"));
    }
  };

  return (
    <main className={theme.cart.main}>
      <div className={theme.cart.container}>
        <header className={theme.cart.header}>
          <h1 className={theme.cart.title}>
            {t("Cart.TITLE")}
          </h1>

          <p className={theme.cart.itemCount}>
            {items.length === 0
              ? t("Cart.EMPTY_CART")
              : t("Cart.ITEMS_COUNT", { count: items.length })}
          </p>
        </header>

        {items.length === 0 ? (
          <div className={theme.cart.emptyContainer}>
            <p className={theme.cart.emptyText}>
              {t("Cart.FEELS_LIGHT")}
            </p>

            <Link
              href="/products"
              className={theme.cart.emptyButton}
            >
              {t("Cart.CONTINUE_SHOPPING")}
            </Link>
          </div>
        ) : (
          <div className={theme.cart.grid}>
            {/* Cart Items */}
            <div className={theme.cart.itemsList}>
              {items.map((item) => {
                const product = item.product;

                return (
                  <div key={product.id} className={theme.cart.itemCard}>
                    <div className={theme.cart.itemImageWrapper}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={theme.cart.itemImage}
                      />
                    </div>

                    <div className={theme.cart.itemInfoWrapper}>
                      <div>
                        <div className={theme.cart.itemHeader}>
                          <h3 className={theme.cart.itemTitle}>{product.name}</h3>

                          <p className={theme.cart.itemSubtotal}>
                            {t("Cart.CURRENCY_SYMBOL")}
                            {item.subtotal.toFixed(2)}
                          </p>
                        </div>

                        <p className={theme.cart.itemPrice}>
                          {t("Cart.CURRENCY_SYMBOL")}
                          {Number(item.itemPrice).toFixed(2)} {t("Cart.EACH")}
                        </p>

                        <p className={theme.cart.itemSku}>
                          {t("Cart.SKU")}: {item.variant.sku}
                        </p>
                      </div>

                      <div className={theme.cart.itemFooter}>
                        <div className={theme.cart.quantityWrapper}>
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className={theme.cart.quantityButton}
                          >
                            -
                          </button>

                          <span className={theme.cart.quantityText}>
                            {item.quantity}
                          </span>

                          <button
                            disabled={item.quantity >= item.variant.stock}
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className={theme.cart.quantityButton}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            handleDeleteItem(item.cartItemId);
                          }}
                          className={theme.cart.removeButton}
                        >
                          {t("Cart.REMOVE")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className={theme.cart.summaryColumn}>
              <div className={theme.cart.summaryCard}>
                <h2 className={theme.cart.summaryTitle}>
                  {t("Cart.ORDER_SUMMARY")}
                </h2>

                <div className={theme.cart.summaryRows}>
                  <div className={theme.cart.summaryRow}>
                    <span>{t("Cart.SUBTOTAL")}</span>
                    <span className={theme.cart.summaryValue}>
                      {t("Cart.CURRENCY_SYMBOL")}
                      {subtotal}
                    </span>
                  </div>

                  <div className={theme.cart.summaryRow}>
                    <span>{t("Cart.SHIPPING")}</span>
                    <span className={theme.cart.summaryValue}>
                      {shipping === 0
                        ? t("Cart.FREE")
                        : `${t("Cart.CURRENCY_SYMBOL")}${shipping}`}
                    </span>
                  </div>
                </div>

                <div className={theme.cart.totalRow}>
                  <span className={theme.cart.totalLabel}>{t("Cart.TOTAL")}</span>
                  <span className={theme.cart.totalValue}>
                    {t("Cart.CURRENCY_SYMBOL")}
                    {total.toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className={theme.cart.checkoutButton}
                >
                  {t("Cart.PROCEED_TO_CHECKOUT")}
                </Link>

                <Link
                  href="/products"
                  className={theme.cart.continueShoppingLink}
                >
                  {isAr ? "→" : "←"} {t("Cart.CONTINUE_SHOPPING")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
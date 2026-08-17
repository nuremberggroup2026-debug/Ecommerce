"use client";

import type { ProductByLocale } from "../../types";
import { addItemToCart } from "@/features/cart/api/cart.client.api";
import { useTranslations } from "next-intl";
import { toastResponse } from "@/lib/toast";

type Props = {
  product: ProductByLocale;
  quantity: number;
  setQuantity: (value: number) => void;
  selectedVariant: ProductByLocale["productData"]["productVariants"][number];
  handleVariantChange: (
    variant: ProductByLocale["productData"]["productVariants"][number],
  ) => void;
};

export default function ProductInfo({
  product,
  selectedVariant,
  quantity,
  setQuantity,
  handleVariantChange,
}: Props) {
  const t = useTranslations();

  const isOutOfStock = selectedVariant.stock <= 0;

  // Safely handle quantity caps when switching variants
  if (!isOutOfStock && quantity > selectedVariant.stock) {
    setQuantity(selectedVariant.stock);
  } else if (isOutOfStock && quantity > 0) {
    setQuantity(0);
  }

  const handleQuantityChange = (delta: number) => {
    if (isOutOfStock) return;
    setQuantity(Math.min(Math.max(1, quantity + delta), selectedVariant.stock));
  };

  const handleAddItem = async () => {
    if (isOutOfStock) return;

    await toastResponse(
      addItemToCart(selectedVariant.variantId, quantity),
      t,
      "CART_ITEM_ADDING",
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            {product.productData.productName}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isOutOfStock
                  ? "bg-red-500"
                  : selectedVariant.stock > 5
                    ? "bg-emerald-500"
                    : "bg-amber-500"
              }`}
            />
            <span className="text-[11px] font-medium text-neutral-500">
              {isOutOfStock
                ? t("Product.outOfStock")
                : selectedVariant.stock > 5
                  ? t("Product.inStock")
                  : t("Product.onlyItemsLeft", {
                      count: selectedVariant.stock,
                    })}
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          {product.productData.productName}
        </h1>
        <div className="flex items-center gap-4 pt-1">
          <p className="text-xl font-bold tracking-tight text-black">
            ${selectedVariant.finalPrice}
          </p>
          {Number(selectedVariant.discountPercentage) > 0 && (
            <p className="text-sm text-neutral-400 line-through">
              ${selectedVariant.price}
            </p>
          )}
        </div>
      </div>

      <hr className="border-neutral-100" />

      <div className="space-y-3">
        <p className="text-sm text-gray-400 leading-relaxed font-light">
          {product.productData.productDescription}
        </p>
      </div>

      {product.productData.productVariants.length > 1 && (
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 block">
            {t("Product.options")}
          </label>
          <div className="flex flex-wrap gap-2">
            {product.productData.productVariants.map((variant) => {
              return (
                <button
                  key={variant.variantId}
                  onClick={() => handleVariantChange(variant)}
                  className={`rounded-xl border px-4 py-2 text-sm transition ${
                    selectedVariant.variantId === variant.variantId
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 hover:border-black"
                  }`}
                >
                  {variant.attributes.length > 0
                    ? variant.attributes
                        .map((attribute) => attribute.attributeValue)
                        .join(" / ")
                    : t("Product.default")}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <span className="text-[10px] text-gray-300 font-mono block">
        {t("Product.sku")}: {selectedVariant.sku}
      </span>

      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 block">
          {t("Product.quantity")}
        </label>

        <div
          className={`inline-flex items-center border border-neutral-200 rounded-full bg-white p-1 shadow-sm ${isOutOfStock ? "opacity-50" : ""}`}
        >
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1 || isOutOfStock}
            className="p-2 text-gray-400 hover:text-black disabled:opacity-30 disabled:hover:text-gray-400"
          >
            -
          </button>

          <span className="w-10 text-center text-xs font-semibold">
            {quantity}
          </span>

          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= selectedVariant.stock || isOutOfStock}
            className="p-2 text-gray-400 hover:text-black disabled:opacity-30 disabled:hover:text-gray-400"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => handleAddItem()}
        disabled={isOutOfStock}
        className={`w-full py-4 text-xs font-semibold uppercase tracking-widest text-white rounded-2xl transition shadow-sm active:scale-[0.98] ${
          isOutOfStock
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-black hover:bg-neutral-800"
        }`}
      >
        {isOutOfStock ? t("Product.outOfStock") : t("Product.addToBag")}
      </button>
    </div>
  );
}

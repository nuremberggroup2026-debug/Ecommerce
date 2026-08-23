"use client";

import type { ProductByLocale } from "../../types";
import { addItemToCart } from "@/features/cart/api/cart.client.api";
import { useTranslations } from "next-intl";
import { toastResponse } from "@/lib/toast";
import { theme } from "@/themes";

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
    <div className={theme.productInfo.container}>
      <div className={theme.productInfo.headerSpace}>
        <div className={theme.productInfo.brandRow}>
          <span className={theme.productInfo.brandText}>
            {product.productData.productName}
          </span>
          <div className={theme.productInfo.stockRow}>
            <span
              className={theme.productInfo.stockIndicator(
                isOutOfStock,
                selectedVariant.stock
              )}
            />
            <span className={theme.productInfo.stockText}>
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
        <h1 className={theme.productInfo.title}>
          {product.productData.productName}
        </h1>
        <div className={theme.productInfo.priceRow}>
          <p className={theme.productInfo.price}>
            ${selectedVariant.finalPrice}
          </p>
          {Number(selectedVariant.discountPercentage) > 0 && (
            <p className={theme.productInfo.oldPrice}>
              ${selectedVariant.price}
            </p>
          )}
        </div>
      </div>

      <hr className={theme.productInfo.divider} />

      <div className={theme.productInfo.descriptionSpace}>
        <p className={theme.productInfo.descriptionText}>
          {product.productData.productDescription}
        </p>
      </div>

      {product.productData.productVariants.length > 1 && (
        <div className={theme.productInfo.variantsContainer}>
          <label className={theme.productInfo.variantsLabel}>
            {t("Product.options")}
          </label>
          <div className={theme.productInfo.variantsGrid}>
            {product.productData.productVariants.map((variant) => {
              const isSelected = selectedVariant.variantId === variant.variantId;
              return (
                <button
                  key={variant.variantId}
                  onClick={() => handleVariantChange(variant)}
                  className={theme.productInfo.variantButton(isSelected)}
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

      <span className={theme.productInfo.skuText}>
        {t("Product.sku")}: {selectedVariant.sku}
      </span>

      <div className={theme.productInfo.descriptionSpace}>
        <label className={theme.productInfo.variantsLabel}>
          {t("Product.quantity")}
        </label>

        <div className={theme.productInfo.quantityBox(isOutOfStock)}>
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1 || isOutOfStock}
            className={theme.productInfo.quantityButton}
          >
            -
          </button>

          <span className={theme.productInfo.quantityValue}>
            {quantity}
          </span>

          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= selectedVariant.stock || isOutOfStock}
            className={theme.productInfo.quantityButton}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => handleAddItem()}
        disabled={isOutOfStock}
        className={theme.productInfo.addButton(isOutOfStock)}
      >
        {isOutOfStock ? t("Product.outOfStock") : t("Product.addToBag")}
      </button>
    </div>
  );
}
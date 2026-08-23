import Image from "next/image";
import { useTranslations } from "next-intl";
import { CartData } from "../types";
import { theme } from "@/themes";

interface Props {
  item: CartData["items"][number];
}

function OrderSummaryItem({ item }: Props) {
  const t = useTranslations();

  return (
    <div className={theme.orderSummaryItem.container}>
      {/* Product Image */}
      <div className={theme.orderSummaryItem.imageWrapper}>
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="80px"
          className={theme.orderSummaryItem.image}
        />
      </div>

      {/* Product Information */}
      <div className={theme.orderSummaryItem.contentWrapper}>
        <div className={theme.orderSummaryItem.headerRow}>
          <div className={theme.orderSummaryItem.infoCol}>
            <h3 className={theme.orderSummaryItem.title}>
              {item.product.name}
            </h3>

            <p className={theme.orderSummaryItem.sku}>
              {t("CHECKOUT.SKU")}: {item.variant.sku}
            </p>
          </div>

          <p className={theme.orderSummaryItem.subtotal}>
            ${item.subtotal.toFixed(2)}
          </p>
        </div>

        {/* Variant Attributes */}
        {item.variant.attributes.length > 0 && (
          <div className={theme.orderSummaryItem.attributesWrapper}>
            {item.variant.attributes.map((attribute) => (
              <span
                key={attribute.valueId}
                className={theme.orderSummaryItem.attributeSpan}
              >
                {attribute.attributeName}: {attribute.value}
              </span>
            ))}
          </div>
        )}

        {/* Quantity + Unit Price */}
        <div className={theme.orderSummaryItem.footerRow}>
          <p className={theme.orderSummaryItem.quantityText}>
            {item.quantity} × ${Number(item.itemPrice).toFixed(2)}
          </p>

          <p className={theme.orderSummaryItem.unitPriceText}>
            {t("CHECKOUT.UNIT_PRICE")}: ${Number(item.itemPrice).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryItem;
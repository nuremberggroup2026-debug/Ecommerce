import Image from "next/image";
import { useTranslations } from "next-intl";
import { CartData } from "../types";

interface Props {
  item: CartData["items"][number];
}

function OrderSummaryItem({ item }: Props) {
  const t = useTranslations();

  return (
    <div className="flex gap-4">
      {/* Product Image */}
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-white">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-neutral-900">
              {item.product.name}
            </h3>

            <p className="mt-1 text-xs text-neutral-400">
              {t("CHECKOUT.SKU")}: {item.variant.sku}
            </p>
          </div>

          <p className="shrink-0 text-sm font-semibold text-neutral-900">
            ${item.subtotal.toFixed(2)}
          </p>
        </div>

        {/* Variant Attributes */}
        {item.variant.attributes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {item.variant.attributes.map((attribute) => (
              <span
                key={attribute.valueId}
                className="text-xs text-neutral-400"
              >
                {attribute.attributeName}: {attribute.value}
              </span>
            ))}
          </div>
        )}

        {/* Quantity + Unit Price */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-neutral-400">
            {item.quantity} × ${Number(item.itemPrice).toFixed(2)}
          </p>

          <p className="text-xs text-neutral-400">
            {t("CHECKOUT.UNIT_PRICE")}: ${Number(item.itemPrice).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryItem;

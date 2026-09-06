import Image from "next/image";
import { Package } from "lucide-react";
import type { OrderByIdAdmin } from "@/features/orders/types";

export function ViewOrderItems({ items }: { items: OrderByIdAdmin["orderItems"] }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold">Order Items</h2>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {items.length} items
        </span>
      </div>

      <div className="hidden grid-cols-[1fr_120px_120px] border-b bg-muted/10 px-4 py-2.5 text-xs font-semibold  tracking-wider text-muted-foreground sm:grid">
        <span>Product</span>
        <span className="text-right pr-4">Price</span>
        <span className="text-right">Total</span>
      </div>

      <div className="divide-y">
        {items.map((item) => {
          const image = item.productVariants?.variantImage || "/placeholder-product.png";
          const price = Number(item.itemPrice);
          const quantity = Number(item.quantity);
          const itemTotal = price * quantity;

          return (
            <div
              key={item.id}
              className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_120px_120px] sm:items-center hover:bg-muted/10 transition-colors"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={image}
                    alt={item.productNameEn}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {item.productNameEn}
                  </p>
                  
                  {item.productVariants?.sku && (
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">
                      SKU: {item.productVariants.sku}
                    </p>
                  )}

                  <p className="mt-1 text-xs font-medium text-emerald-600 sm:hidden">
                    {price.toFixed(2)} JOD × {quantity}
                  </p>
                </div>
              </div>

              <div className="hidden text-sm font-medium text-muted-foreground sm:block text-right pr-4">
                <span className="text-foreground">{price.toFixed(2)} JOD</span>
                <span className="text-muted-foreground ml-1 text-xs">× {quantity}</span>
              </div>

              <div className="text-sm font-semibold text-right text-gray-900">
                {itemTotal.toFixed(2)} JOD
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

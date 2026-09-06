import { CreditCard, Ticket } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { OrderByIdAdmin } from "@/features/orders/types";

export function ViewOrderPaymentSummary({ order }: { order: OrderByIdAdmin }) {
  const discount = Number(order.discountAmount);
  const total = Number(order.totalAmount);
  const subtotal = Number(order.subtotal);

  return (
    <div className="rounded-lg border bg-white shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
        <CreditCard className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold">Payment Summary</h2>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">Subtotal</span>
            <span className="font-semibold text-gray-900">
              {subtotal.toFixed(2)} JOD
            </span>
          </div>

          {discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">
                Discount
              </span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                -{discount.toFixed(2)} JOD
              </span>
            </div>
          )}

          {order.userPromoCodes && order.userPromoCodes.length > 0 && (
            <div className="pt-2">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold  tracking-wider text-muted-foreground">
                <Ticket className="h-3.5 w-3.5" />
                Applied Promo Codes
              </div>

              <div className="space-y-2">
                {order.userPromoCodes.map((promo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-emerald-50/80 border border-emerald-100 px-3 py-2 text-xs"
                  >
                    <span className="font-bold text-emerald-800">
                      {promo.promoCodes.code}
                    </span>

                    <span className="font-bold text-emerald-700">
                      {promo.promoCodes.discountPercentage}% off
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold  tracking-wider text-muted-foreground mb-1">
                Total Amount
              </p>
              <p className="text-2xl font-black text-gray-900">
                {total.toFixed(2)}{" "}
                <span className="text-sm font-bold text-gray-500">JOD</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

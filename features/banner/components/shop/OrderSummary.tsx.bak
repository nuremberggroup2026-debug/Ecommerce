import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types/checkout";

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onSubmit: () => void;
}

export default function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
  onSubmit,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-10 rounded-[32px] bg-neutral-50 p-8">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
        Order Summary
      </h2>

      <div className="space-y-5 max-h-[40vh] overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="relative h-20 w-16 overflow-hidden rounded-xl">
              <Image
                src={item.product.images[0]}
                alt={item.product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-sm font-medium line-clamp-1">{item.product.title}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <div className="flex items-center">
              <p className="text-sm font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4 border-t border-neutral-200 pt-6 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between border-t border-neutral-200 pt-4 text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="mt-8 w-full rounded-2xl bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-400 focus:outline-none"
      >
        Place Order
      </button>

      <Link
        href="/cart"
        className="mt-5 block text-center text-xs text-gray-400 transition hover:text-black"
      >
        &larr; Back To Cart
      </Link>
    </div>
  );
}
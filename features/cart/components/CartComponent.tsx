"use client";

import Image from "next/image";
import Link from "next/link";
import { CartData } from "../types";
import {  useRef,  useState } from "react";
import { deleteItem, updateItemQuantity } from "../api/cart.client.api";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface Prop {
  cartData: CartData;
}

export default function CartComponent({ cartData }: Prop) {
  const [items, setItems] = useState(cartData.items);
  const t = useTranslations();
 
  const pendingUpdates = useRef<Record<string, number>>({});


  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const subtotal = items
    .reduce((total, item) => total + item.subtotal, 0)
    .toFixed(2);
  const shipping = Number(subtotal) > 300 ? 0 : 15;

  const total = subtotal + shipping;

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
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <header className="mb-16 border-b border-neutral-100 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-xs text-gray-400">
            {items.length === 0
              ? "Your cart is empty"
              : `You have ${items.length} items in your cart`}
          </p>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="mb-6 text-sm text-gray-400">Your cart feels light.</p>

            <Link
              href="/products"
              className="rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Cart Items */}

            <div className="divide-y divide-neutral-100 lg:col-span-7">
              {items.map((item) => {
                const product = item.product;

                return (
                  <div key={product.id} className="flex gap-6 py-8">
                    <div className="relative h-32 w-24 overflow-hidden rounded-2xl bg-neutral-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between gap-4">
                          <h3 className="font-medium">{product.name}</h3>

                          <p className="font-semibold">
                            ${item.subtotal.toFixed(2)}
                          </p>
                        </div>

                        <p className="mt-1 text-sm text-gray-400">
                          ${Number(item.itemPrice).toFixed(2)} each
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Sku: {item.variant.sku}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-neutral-200">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className="px-4 py-2 text-gray-500 hover:text-black"
                          >
                            -
                          </button>

                          <span className="px-3 text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            disabled={item.quantity >= item.variant.stock}
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="px-4 py-2 text-gray-500 hover:text-black"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            handleDeleteItem(item.cartItemId);
                          }}
                          className="text-sm text-gray-400 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}

            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-neutral-50 p-8">
                <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                  Order Summary
                </h2>

                <div className="space-y-4 border-b border-neutral-200 pb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>

                    <span className="font-semibold">${subtotal}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>

                    <span className="font-semibold">
                      {shipping === 0 ? "Free" : `$${shipping}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between py-6">
                  <span className="font-medium">Total</span>

                  <span className="text-xl font-bold">${total}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full rounded-2xl bg-black py-4 text-center text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-neutral-800"
                >
                  Proceed To Checkout
                </Link>

                <Link
                  href="/products"
                  className="mt-5 block text-center text-xs text-gray-400 hover:text-black"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

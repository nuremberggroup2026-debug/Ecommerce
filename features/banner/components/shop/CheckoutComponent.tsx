"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "@/Redux/store/hooks";

export default function CheckoutComponent() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 300 ? 0 : 15;
  const total = subtotal + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="mb-6 text-gray-400">
            Your cart is empty
          </p>
          <Link
            href="/products"
            className="rounded-full bg-black px-8 py-4 text-xs uppercase tracking-widest text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <h1 className="mb-10 text-3xl font-semibold tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          <section className="lg:col-span-7 space-y-6">

            <div className="rounded-[32px] border border-neutral-100 p-8">

              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
                Delivery Details
              </h2>

              <div className="grid gap-4">

                <input
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="rounded-xl border border-neutral-200 p-4 text-sm outline-none"
                />

                <input
                  name="email"
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="rounded-xl border border-neutral-200 p-4 text-sm outline-none"
                />

                <input
                  name="phone"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-xl border border-neutral-200 p-4 text-sm outline-none"
                />

                <input
                  name="address"
                  onChange={handleChange}
                  placeholder="Address"
                  className="rounded-xl border border-neutral-200 p-4 text-sm outline-none"
                />

                <input
                  name="city"
                  onChange={handleChange}
                  placeholder="City"
                  className="rounded-xl border border-neutral-200 p-4 text-sm outline-none"
                />

              </div>

            </div>


            <div className="rounded-[32px] border border-neutral-100 p-8">

              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
                Payment Method
              </h2>


              <div className="grid gap-4">

                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "cash"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    Cash On Delivery
                  </p>
                  <span className="text-xs opacity-70">
                    Pay when your order arrives
                  </span>
                </button>


                <button
                  onClick={() => setPaymentMethod("visa")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "visa"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    Visa / Mastercard
                  </p>
                  <span className="text-xs opacity-70">
                    Secure card payment
                  </span>
                </button>


                <button
                  onClick={() => setPaymentMethod("cliq")}
                  className={`rounded-2xl border p-5 text-left transition ${
                    paymentMethod === "cliq"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    CliQ
                  </p>
                  <span className="text-xs opacity-70">
                    Instant bank transfer
                  </span>
                </button>

              </div>

            </div>

          </section>



          <aside className="lg:col-span-5">

            <div className="sticky top-10 rounded-[32px] bg-neutral-50 p-8">

              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest">
                Order Summary
              </h2>


              <div className="space-y-5">

                {cartItems.map((item) => (

                  <div
                    key={item.product.id}
                    className="flex gap-4"
                  >

                    <div className="relative h-20 w-16 overflow-hidden rounded-xl">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>


                    <div className="flex-1">

                      <p className="text-sm font-medium">
                        {item.product.title}
                      </p>

                      <p className="text-xs text-gray-400">
                        Quantity: {item.quantity}
                      </p>

                    </div>


                    <p className="text-sm font-semibold">
                      ${item.product.price * item.quantity}
                    </p>

                  </div>

                ))}

              </div>


              <div className="mt-8 space-y-4 border-t border-neutral-200 pt-6 text-sm">

                <div className="flex justify-between">
                  <span>
                    Subtotal
                  </span>
                  <span>
                    ${subtotal}
                  </span>
                </div>


                <div className="flex justify-between">
                  <span>
                    Shipping
                  </span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </span>
                </div>


                <div className="flex justify-between pt-4 text-lg font-bold">
                  <span>
                    Total
                  </span>
                  <span>
                    ${total}
                  </span>
                </div>

              </div>


              <button
                className="
                mt-8
                w-full
                rounded-2xl
                bg-black
                py-4
                text-xs
                font-semibold
                uppercase
                tracking-widest
                text-white
                transition
                hover:bg-neutral-800
                "
              >
                Place Order
              </button>


              <Link
                href="/cart"
                className="mt-5 block text-center text-xs text-gray-400 hover:text-black"
              >
                ← Back To Cart
              </Link>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}
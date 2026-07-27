"use client";

import { useState } from "react";
import { useAppSelector } from "@/Redux/store/hooks";
import { ShippingData } from "@/features/checkout/types";

import EmptyCart from "@/features/checkout/components/EmptyCart";
import DeliveryDetails from "@/features/checkout/components/DeliveryDetails";
import PaymentMethods from "@/features/checkout/components/PaymentMethods";
import OrderSummary from "@/features/checkout/components/OrderSummary";

export default function CheckoutComponent() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [shippingData, setShippingData] = useState<ShippingData>({
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

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = () => {
    console.log("Order Placed:", { shippingData, paymentMethod, cartItems, total });
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight">Checkout</h1>

        <form 
          className="grid grid-cols-1 gap-10 lg:grid-cols-12"
          onSubmit={(e) => e.preventDefault()} 
        >
          <section className="space-y-6 lg:col-span-7">
            <DeliveryDetails 
              shippingData={shippingData} 
              onChange={handleShippingChange} 
            />
            <PaymentMethods 
              paymentMethod={paymentMethod} 
              setPaymentMethod={setPaymentMethod} 
            />
          </section>

          <aside className="lg:col-span-5">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onSubmit={handlePlaceOrder}
            />
          </aside>
        </form>
      </div>
    </main>
  );
}
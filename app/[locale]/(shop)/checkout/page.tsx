import EmptyCart from "@/features/checkout/components/EmptyCart";
import DeliveryDetails from "@/features/checkout/components/DeliveryDetails";
import PaymentMethods from "@/features/checkout/components/PaymentMethods";
import OrderSummary from "@/features/checkout/components/OrderSummary";
import CustomerDetails from "@/features/checkout/components/CustomerDetails";

import { Locale } from "@/types";
import { getCart } from "@/features/cart/api/cart.server.api";

interface Props {
  params: Promise<{ locale: Locale }>;
}
export default async function CheckoutComponent({ params }: Props) {
  const { locale } = await params;

  const data = (await getCart(locale)).data;
  console.log("cart data: ", data);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight">
          Checkout
        </h1>

        <form className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <CustomerDetails locale={locale} />
          {/*<section className="space-y-6 lg:col-span-7">
            <DeliveryDetails
              shippingData={shippingData}
              onChange={handleShippingChange}
            />
           
          </section>*/}

          {/* <aside className="lg:col-span-5">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onSubmit={handlePlaceOrder}
            />
          </aside>*/}
        </form>
      </div>
    </main>
  );
}

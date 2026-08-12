import EmptyCart from "@/features/checkout/components/EmptyCart";
import { Locale } from "@/types";
import { getCart } from "@/features/cart/api/cart.server.api";
import CheckoutComponent from "@/features/checkout/components/CheckoutComponent";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations("CHECKOUT");

  const data = (await getCart(locale)).data;

  if (!data || data.items.length === 0) {
    return <EmptyCart locale={locale} />;
  }

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-black"
    >
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-10 lg:pb-20 lg:pt-10">
        {/* Page Header */}
        <header className="mb-12 border-b border-neutral-100 pb-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {t("PAGE_LABEL")}
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("PAGE_TITLE")}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
            {t("PAGE_DESCRIPTION")}
          </p>
        </header>

        {/* Checkout Layout */}
        <CheckoutComponent locale={locale} cartData={data} />
      </div>
    </main>
  );
}

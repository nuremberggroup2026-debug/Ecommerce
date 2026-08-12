import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/types";

interface Props {
  locale: Locale;
}

export default async function EmptyCart({ locale }: Props) {
  const t = await getTranslations("CHECKOUT.EMPTY_CART");

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="flex min-h-screen items-center justify-center bg-white"
    >
      <div className="text-center">
        <p className="mb-6 text-gray-400">{t("MESSAGE")}</p>

        <Link
          href={`/${locale}/products`}
          className="rounded-full bg-black px-8 py-4 text-xs uppercase tracking-widest text-white transition hover:bg-neutral-800"
        >
          {t("CONTINUE_SHOPPING")}
        </Link>
      </div>
    </main>
  );
}

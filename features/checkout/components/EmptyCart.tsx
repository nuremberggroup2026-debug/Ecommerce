import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/types";
import { theme } from "@/themes";

interface Props {
  locale: Locale;
}

export default async function EmptyCart({ locale }: Props) {
  const t = await getTranslations("CHECKOUT.EMPTY_CART");
  const isAr = locale === "ar";

  return (
    <main className={theme.emptyCart.main(isAr)}>
      <div className={theme.emptyCart.container}>
        <p className={theme.emptyCart.message}>{t("MESSAGE")}</p>

        <Link
          href={`/${locale}/products`}
          className={theme.emptyCart.button}
        >
          {t("CONTINUE_SHOPPING")}
        </Link>
      </div>
    </main>
  );
}
import Link from "next/link";
import OrdersComponent from "@/features/orders/components/shop/OrdersComponent";
import { Locale } from "@/types";
import { fetchAllOrdersByUser } from "@/features/orders/api/orders.server.api";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth/auth";
import { theme } from "@/themes";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;

  return generateStaticMetadata("orders", locale);
};

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const session = await auth();

  if (!session) {
    const t = await getTranslations("ORDERS");

    return (
      <main
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={theme.wishlistAuth.main(locale)}
      >
        <div className={theme.wishlistAuth.container}>
          {/* Icon */}
          <div className={theme.wishlistAuth.iconWrapper}>
            <svg
              className={theme.wishlistAuth.icon}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
              />
            </svg>
          </div>

          {/* Content */}
          <div className={theme.wishlistAuth.contentBox}>
            <h1 className={theme.wishlistAuth.title}>
              {t("loginRequiredTitle")}
            </h1>

            <p className={theme.wishlistAuth.description}>
              {t("loginRequiredDescription")}
            </p>

            {/* Login */}
            <div className={theme.wishlistAuth.actionBox}>
              <Link
                href={`/${locale}/login`}
                className={theme.wishlistAuth.loginButton}
              >
                {t("login")}
              </Link>
            </div>

            {/* Continue Shopping */}
            <Link
              href={`/${locale}/products`}
              className={theme.wishlistAuth.continueLink}
            >
              {t("continueShopping")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const ordersByUser = (await fetchAllOrdersByUser()).data;

  return (
    <div>
      <OrdersComponent orders={ordersByUser} locale={locale} />
    </div>
  );
}

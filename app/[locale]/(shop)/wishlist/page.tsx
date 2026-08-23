import Link from "next/link";
import WishlistComponent from "@/features/wishlist/components/WishlistComponent";
import { Locale } from "@/types";
import { getWishlistItems } from "@/features/wishlist/api/wishlist.server.api";
import { auth } from "@/lib/auth/auth";
import { getTranslations } from "next-intl/server";
import { theme } from "@/themes";

interface Prop {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: Prop) {
  const session = await auth();
  const { locale } = await params;

  if (!session) {
    const t = await getTranslations("Wishlist");
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
                d="M16.5 3.75a5.25 5.25 0 00-4.5 2.54 5.25 5.25 0 00-9.75 2.71c0 6.22 9.75 11.25 9.75 11.25s9.75-5.03 9.75-11.25A5.25 5.25 0 0016.5 3.75z"
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
                href="/login"
                className={theme.wishlistAuth.loginButton}
              >
                {t("login")}
              </Link>
            </div>
            {/* Continue Shopping */}
            <Link
              href="/products"
              className={theme.wishlistAuth.continueLink}
            >
              {t("continueShopping")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const wishlistItems = (await getWishlistItems(locale)).data;
  return <WishlistComponent wishlistItems={wishlistItems} locale={locale} />;
}
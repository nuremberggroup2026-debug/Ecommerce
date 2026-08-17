import Link from "next/link";
import WishlistComponent from "@/features/wishlist/components/WishlistComponent";
import { Locale } from "@/types";
import { getWishlistItems } from "@/features/wishlist/api/wishlist.server.api";
import { auth } from "@/lib/auth/auth";
import { getTranslations } from "next-intl/server";
interface Prop {
  params: Promise<{ locale: Locale }>;
}
export default async function Page({ params }: Prop) {
  const session = await auth();
  const { locale } = await params;
  if (!session) {
    const t = await getTranslations("");
    return (
      <main
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-white text-black"
      >
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20 text-center lg:px-10">
          {/* Icon */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-neutral-100 bg-neutral-50 shadow-sm">
            <svg
              className="h-8 w-8 text-neutral-400"
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
          <div className="max-w-md">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t("loginRequiredTitle")}
            </h1>
            <p className="mt-4 text-sm font-light leading-relaxed text-gray-400">
              {t("loginRequiredDescription")}
            </p>
            {/* Login */}
            <div className="mt-8">
              <Link
                href="/login"
                className=" inline-block rounded-xl bg-neutral-900 px-10 py-4 text-[11px] font-medium uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:bg-black active:scale-[0.98] "
              >
                {t("login")}
              </Link>
            </div>
            {/* Continue Shopping */}
            <Link
              href="/products"
              className="mt-6 inline-block text-xs font-light text-gray-400 transition hover:text-black"
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

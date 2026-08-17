"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { theme } from "@/themes";
import { ROUTES } from "@/shared/config/routes";

import { CartIcon, UserIcon, MenuIcon, CloseIcon } from "./icons";

import { ActionsProps } from "./types";

export function Actions({
  pathname,
  totalQty,
  isMobileMenuOpen,
  toggleMobileMenu,
  closeMobileMenu,
}: ActionsProps) {
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";

    let newPathname = pathname;

    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    } else {
      newPathname = `/${nextLocale}${pathname === "/" ? "" : pathname}`;
    }

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;

    router.push(newPathname);
    router.refresh();
  };

  return (
    <div className={theme.navbar.actions}>
      {/* Ultra-Minimalist High-End Language Switcher */}
      <button
        onClick={toggleLanguage}
        className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mr-2"
        aria-label="Toggle language"
      >
        <span
          className={`transition-colors duration-300 ${
            locale === "en"
              ? "text-black"
              : "text-neutral-300 hover:text-neutral-500"
          }`}
        >
          EN
        </span>
        <span className="text-neutral-200 font-light">|</span>
        <span
          className={`transition-colors duration-300 ${
            locale === "ar"
              ? "text-black"
              : "text-neutral-300 hover:text-neutral-500"
          }`}
        >
          عربي
        </span>
      </button>

      {/* Wishlist */}
      <Link
        href={ROUTES.WISHLIST}
        className={`hidden sm:flex ${theme.navbar.icon} ${
          pathname === ROUTES.WISHLIST
            ? theme.navbar.iconActive
            : theme.navbar.iconInactive
        }`}
      >
        <UserIcon />
      </Link>

      {/* Cart */}
      <Link
        href={ROUTES.CART}
        onClick={closeMobileMenu}
        className={`${theme.navbar.icon} ${
          pathname === ROUTES.CART
            ? theme.navbar.iconActive
            : theme.navbar.iconInactive
        }`}
      >
        <CartIcon />

        {totalQty > 0 && <span className={theme.navbar.badge}>{totalQty}</span>}
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={theme.navbar.menuButton}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </div>
  );
}

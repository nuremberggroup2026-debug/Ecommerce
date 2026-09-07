"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { Heart, Package, KeyRound, LogOut, LogIn } from "lucide-react";

import { theme } from "@/themes";
import { ROUTES } from "@/shared/config/routes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
  const t = useTranslations("Navbar");
  const { data: session, status } = useSession();

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    const nextDir = nextLocale === "ar" ? "rtl" : "ltr";

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    document.documentElement.dir = nextDir;
    document.documentElement.lang = nextLocale;

    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
      router.push(newPathname);
    } else {
      router.refresh();
      window.location.reload();
    }
  };

  const isUserSectionActive =
    pathname === ROUTES.WISHLIST ||
    pathname === ROUTES.ORDERS ||
    pathname === ROUTES.CHANGE_PASSWORD;

  return (
    <div className={theme.navbar.actions}>
      {/* Ultra-Minimalist High-End Language Switcher */}
      <button
        onClick={toggleLanguage}
        className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider me-2 cursor-pointer select-none"
        aria-label="Toggle language"
      >
        <span
          className={`transition-colors duration-200 ${
            locale === "en"
              ? "text-black font-extrabold"
              : "text-neutral-400 hover:text-neutral-700"
          }`}
        >
          EN
        </span>
        <span className="text-neutral-300 font-normal">|</span>
        <span
          className={`transition-colors duration-200 ${
            locale === "ar"
              ? "text-black font-extrabold"
              : "text-neutral-400 hover:text-neutral-700"
          }`}
        >
          عربي
        </span>
      </button>

      {/* Auth State: Desktop only (on mobile, user options and login are inside MobileMenu) */}
      <div className="hidden md:flex items-center">
        {status === "loading" ? (
          <div className="h-10 w-10 rounded-full bg-neutral-100 animate-pulse" />
        ) : session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`cursor-pointer ${theme.navbar.icon} ${
                  isUserSectionActive
                    ? theme.navbar.iconActive
                    : theme.navbar.iconInactive
                }`}
                aria-label="User menu"
              >
                <UserIcon />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={locale === "ar" ? "start" : "end"}
              className="w-56 rounded-2xl p-1.5 shadow-xl border border-neutral-200 bg-white"
            >
              {session.user.name && (
                <>
                  <div className="px-3.5 py-2.5">
                    <p className="text-sm font-bold text-neutral-900 truncate">
                      {session.user.name}
                    </p>
                    {session.user.email && (
                      <p className="text-xs text-neutral-500 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                  <DropdownMenuSeparator className="my-1 bg-neutral-100" />
                </>
              )}

              {/* Wishlist */}
              <DropdownMenuItem asChild>
                <Link
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  href={ROUTES.WISHLIST}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Heart className="h-4 w-4 text-neutral-500" />
                  <span>{t("USER_MENU.WISHLIST")}</span>
                </Link>
              </DropdownMenuItem>

              {/* My Orders */}
              <DropdownMenuItem asChild>
                <Link
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  href={ROUTES.ORDERS}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <Package className="h-4 w-4 text-neutral-500" />
                  <span>{t("USER_MENU.MY_ORDERS")}</span>
                </Link>
              </DropdownMenuItem>

              {/* Change Password */}
              <DropdownMenuItem asChild>
                <Link
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  href={ROUTES.CHANGE_PASSWORD}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <KeyRound className="h-4 w-4 text-neutral-500" />
                  <span>{t("USER_MENU.CHANGE_PASSWORD")}</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-neutral-100" />

              {/* Logout */}
              <DropdownMenuItem
                dir={locale === "ar" ? "rtl" : "ltr"}
                onClick={() => signOut({ redirectTo: ROUTES.HOME })}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-red-500" />
                <span>{t("USER_MENU.LOGOUT")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={ROUTES.LOGIN}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-[13px] font-bold text-neutral-900 transition hover:border-black hover:bg-neutral-50 active:scale-95 shadow-xs"
          >
            <LogIn className="h-4 w-4" />
            <span>{t("USER_MENU.LOGIN")}</span>
          </Link>
        )}
      </div>

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

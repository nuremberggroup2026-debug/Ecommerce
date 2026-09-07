"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { Heart, Package, KeyRound, LogOut, LogIn, Globe } from "lucide-react";

import { theme } from "@/themes";
import { ROUTES } from "@/shared/config/routes";
import { NavbarLink, MobileMenuProps } from "./types";

interface Props extends MobileMenuProps {
  links: NavbarLink[];
}

export function MobileMenu({
  pathname,
  links,
  isMobileMenuOpen,
  closeMobileMenu,
}: Props) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("Navbar");
  const { data: session } = useSession();

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

  return (
    <aside
      className={`${theme.navbar.drawer} ${
        isMobileMenuOpen ? "translate-x-0" : "rtl:-translate-x-full ltr:translate-x-full"
      } flex flex-col justify-between overflow-y-auto`}
    >
      <ul className={theme.navbar.mobileLinks}>
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMobileMenu}
                className={`${theme.navbar.mobileLink} ${
                  isActive
                    ? theme.navbar.mobileLinkActive
                    : theme.navbar.mobileLinkInactive
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* User Actions Section in Mobile Menu */}
      <div className="pt-6 border-t border-neutral-200 flex flex-col gap-3">
        {session?.user ? (
          <>
            {session.user.name && (
              <div className="pb-1">
                <p className="text-sm font-bold text-neutral-900 truncate">
                  {session.user.name}
                </p>
                {session.user.email && (
                  <p className="text-xs text-neutral-500 truncate mt-0.5">
                    {session.user.email}
                  </p>
                )}
              </div>
            )}

            <Link
              href={ROUTES.WISHLIST}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 py-2 text-sm font-semibold ${
                pathname === ROUTES.WISHLIST
                  ? "text-black font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              <Heart className="h-4.5 w-4.5 text-neutral-500" />
              <span>{t("USER_MENU.WISHLIST")}</span>
            </Link>

            <Link
              href={ROUTES.ORDERS}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 py-2 text-sm font-semibold ${
                pathname === ROUTES.ORDERS
                  ? "text-black font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              <Package className="h-4.5 w-4.5 text-neutral-500" />
              <span>{t("USER_MENU.MY_ORDERS")}</span>
            </Link>

            <Link
              href={ROUTES.CHANGE_PASSWORD}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 py-2 text-sm font-semibold ${
                pathname === ROUTES.CHANGE_PASSWORD
                  ? "text-black font-bold"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              <KeyRound className="h-4.5 w-4.5 text-neutral-500" />
              <span>{t("USER_MENU.CHANGE_PASSWORD")}</span>
            </Link>

            <button
              onClick={() => {
                closeMobileMenu();
                signOut({ redirectTo: ROUTES.HOME });
              }}
              className="flex items-center gap-3 py-2 text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer text-start"
            >
              <LogOut className="h-4.5 w-4.5 text-red-500" />
              <span>{t("USER_MENU.LOGOUT")}</span>
            </button>
          </>
        ) : (
          <Link
            href={ROUTES.LOGIN}
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-2.5 w-full rounded-full bg-black py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <LogIn className="h-4.5 w-4.5" />
            <span>{t("USER_MENU.LOGIN")}</span>
          </Link>
        )}

        {/* Mobile Language Switcher */}
        <div className="pt-3 border-t border-neutral-100">
          <button
            onClick={() => {
              closeMobileMenu();
              toggleLanguage();
            }}
            className="flex items-center gap-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black cursor-pointer transition-colors"
          >
            <Globe className="h-4 w-4 text-neutral-400" />
            <span>{locale === "ar" ? "English " : "العربية "}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { theme } from "@/themes";
import { useAppSelector } from "@/Redux/store/hooks";
import { DesktopLinks } from "./DesktopLinks";
import { Actions } from "./Actions";
import { MobileMenu } from "./MobileMenu";
import { Overlay } from "./Overlay";
import { links } from "./links";
import { ROUTES } from "@/shared/config/routes";

import { useCartQuery } from "@/features/cart/hooks/useCart";
import type { Locale } from "@/types";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locale = useLocale() as Locale;

  const cartQuery = useCartQuery({ locale });

const totalQty =
  cartQuery.data?.items.reduce(
    (total, item) => total + item.quantity,
    0,
  ) ?? 0;


  const t = useTranslations("Navbar");

  const translatedLinks = links.map((link) => {
    const translationKey = link.label
      .toUpperCase()
      .replace(/\s+/g, "_");

    return {
      ...link,
      label: t(`LINKS.${translationKey}`),
    };
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={theme.navbar.header}>
        <nav
          className={theme.navbar.nav}
          aria-label="Main navigation"
        >
          <Link
            href={ROUTES.HOME}
            onClick={closeMobileMenu}
            className={theme.navbar.logo}
          >
            {t("BRAND_NAME")}
            <span className={theme.navbar.logoAccent}>
              {t("BRAND_SUFFIX")}
            </span>
          </Link>

          <DesktopLinks
            pathname={pathname}
            links={translatedLinks}
          />

          <Actions
            pathname={pathname}
            totalQty={totalQty}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            closeMobileMenu={closeMobileMenu}
          />
        </nav>
      </header>

      <Overlay
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
      />

      <MobileMenu
        pathname={pathname}
        links={translatedLinks}
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
      />
    </>
  );
}

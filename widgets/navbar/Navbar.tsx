"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { theme } from "@/themes";
import { useAppSelector } from "@/Redux/store/hooks";
import { DesktopLinks } from "./DesktopLinks";
import { Actions } from "./Actions";
import { MobileMenu } from "./MobileMenu";
import { Overlay } from "./Overlay";
import { links } from "./links";
import { ROUTES } from "@/shared/config/routes";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = useAppSelector((state) => state.cart.items);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  const t = useTranslations("Navbar");
  const translatedLinks = links.map((link) => {
    const translationKey = link.label.toUpperCase().replace(/\s+/g, "_");
    console.log("translationKey: ", translationKey);

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
        <nav className={theme.navbar.nav} aria-label="Main navigation">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            onClick={closeMobileMenu}
            className={theme.navbar.logo}
          >
            {t("BRAND_NAME")}
            <span className={theme.navbar.logoAccent}>{t("BRAND_SUFFIX")}</span>
          </Link>

          {/* Desktop Navigation - Passing the TRANSLATED links */}
          <DesktopLinks pathname={pathname} links={translatedLinks} />

          {/* Actions */}
          <Actions
            pathname={pathname}
            totalQty={totalQty}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
            closeMobileMenu={closeMobileMenu}
          />
        </nav>
      </header>

      {/* Mobile Overlay */}
      <Overlay
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
      />

      {/* Mobile Drawer - Passing the TRANSLATED links */}
      <MobileMenu
        pathname={pathname}
        links={translatedLinks}
        isMobileMenuOpen={isMobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
      />
    </>
  );
}

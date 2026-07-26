import Link from "next/link";

import { theme } from "@/themes";
import { ROUTES } from "@/shared/config/routes";

import {
  CartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

import { ActionsProps } from "./types";


export function Actions({
  pathname,
  totalQty,
  isMobileMenuOpen,
  toggleMobileMenu,
  closeMobileMenu,
}: ActionsProps) {
  return (
    <div className={theme.navbar.actions}>

      {/* Wishlist */}
      <Link
        href={ROUTES.WISHLIST}
        className={`hidden sm:flex ${
          theme.navbar.icon
        } ${
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

        {totalQty > 0 && (
          <span className={theme.navbar.badge}>
            {totalQty}
          </span>
        )}
      </Link>


      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={theme.navbar.menuButton}
        aria-label={
          isMobileMenuOpen
            ? "Close menu"
            : "Open menu"
        }
      >
        {isMobileMenuOpen ? (
          <CloseIcon />
        ) : (
          <MenuIcon />
        )}
      </button>

    </div>
  );
}
import Link from "next/link";

import { theme } from "@/themes";

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
  return (
    <aside
      className={`${theme.navbar.drawer} ${
        isMobileMenuOpen
          ? "translate-x-0"
          : "translate-x-full"
      }`}
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
    </aside>
  );
}
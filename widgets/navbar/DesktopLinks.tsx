import Link from "next/link";

import { theme } from "@/themes";

import { NavbarLink } from "./types";

interface DesktopLinksProps {
  pathname: string;
  links: NavbarLink[];
}

export function DesktopLinks({
  pathname,
  links,
}: DesktopLinksProps) {
  return (
    <ul className={theme.navbar.desktopLinks}>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li
            key={link.href}
            className={theme.navbar.desktopItem}
          >
            <Link
              href={link.href}
              aria-current={
                isActive ? "page" : undefined
              }
              className={`${theme.navbar.link} ${
                isActive
                  ? theme.navbar.linkActive
                  : theme.navbar.linkInactive
              }`}
            >
              {link.label}
            </Link>

            {isActive && (
              <span
                className={theme.navbar.activeDot}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
import { theme } from "@/themes";

interface OverlayProps {
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

export function Overlay({
  isMobileMenuOpen,
  closeMobileMenu,
}: OverlayProps) {
  return (
    <div
      onClick={closeMobileMenu}
      className={`${theme.navbar.overlay} ${
        isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    />
  );
}
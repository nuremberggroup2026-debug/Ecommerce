export interface NavbarLink {
  href: string;
  label: string;
}


export interface ActionsProps {
  pathname: string;
  totalQty: number;

  isMobileMenuOpen: boolean;

  toggleMobileMenu: () => void;

  closeMobileMenu: () => void;
}


export interface MobileMenuProps {
  pathname: string;

  isMobileMenuOpen: boolean;

  closeMobileMenu: () => void;
}
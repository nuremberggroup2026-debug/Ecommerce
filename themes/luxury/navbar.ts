export const navbarTheme = {
  header:
    "sticky top-0 z-50 border-b border-[#b08d57]/15 bg-[#f9f6ef]/80 backdrop-blur-md",

  nav: "mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10",

  logo: "font-serif text-xl tracking-tight text-[#0c0a07] active:scale-[0.98] transition-transform",

  logoAccent: "font-serif italic font-light text-[#b08d57]",

  desktopLinks: "hidden items-center gap-10 md:flex",

  desktopItem: "relative flex flex-col items-center",

  link: "text-[11px] tracking-[0.25em] transition-all duration-300 pb-1 font-medium uppercase active:scale-95 block",

  linkActive: "text-[#0c0a07] font-semibold",

  linkInactive: "text-stone-400 hover:text-[#b08d57]",

  activeDot:
    "absolute -bottom-1 h-1 w-1 rounded-full bg-[#b08d57] transition-all duration-300",

  actions: "flex items-center gap-4",

  icon: "relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 active:scale-90",

  iconActive: "text-[#0c0a07] bg-[#b08d57]/10",

  iconInactive: "text-stone-500 hover:text-[#b08d57] hover:bg-[#b08d57]/10",

  badge:
    "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0c0a07] text-[9px] font-bold text-[#d4b877] tabular-nums scale-95",

  menuButton:
    "md:hidden flex h-9 w-9 items-center justify-center rounded-sm border border-[#b08d57]/30 text-[#0c0a07] hover:bg-[#b08d57]/10 active:scale-95 transition-all z-50 relative",

  overlay:
    "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",

  drawer:
    "fixed top-0 right-0 bottom-0 w-72 bg-[#f9f6ef] border-l border-[#b08d57]/20 p-8 pt-24 z-40 md:hidden transition-transform duration-300 ease-out shadow-2xl",

  mobileLinks: "flex flex-col gap-6",

  mobileLink:
    "font-serif text-sm uppercase tracking-[0.2em] font-medium block py-2 transition-all active:translate-x-1",

  mobileLinkActive: "text-[#0c0a07] font-semibold",

  mobileLinkInactive: "text-stone-400",
};

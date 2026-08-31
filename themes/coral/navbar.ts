export const navbarTheme = {
  header:
    "sticky top-0 z-50 border-b border-[#e8674f]/15 bg-[#eefaf8]/80 backdrop-blur-md",

  nav: "mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10",

  logo: "font-sans text-xl tracking-tight text-[#0a2e2a] active:scale-[0.98] transition-transform",

  logoAccent: "font-sans font-light text-[#e8674f]",

  desktopLinks: "hidden items-center gap-10 md:flex",

  desktopItem: "relative flex flex-col items-center",

  link: "text-[11px] tracking-normal transition-all duration-300 pb-1 font-medium normal-case active:scale-95 block",

  linkActive: "text-[#0a2e2a] font-semibold",

  linkInactive: "text-teal-400 hover:text-[#e8674f]",

  activeDot:
    "absolute -bottom-1 h-1 w-1 rounded-full bg-[#e8674f] transition-all duration-300",

  actions: "flex items-center gap-4",

  icon: "relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 active:scale-90",

  iconActive: "text-[#0a2e2a] bg-[#e8674f]/10",

  iconInactive: "text-teal-500 hover:text-[#e8674f] hover:bg-[#e8674f]/10",

  badge:
    "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0a2e2a] text-[9px] font-bold text-[#f7c9a3] tabular-nums scale-95",

  menuButton:
    "md:hidden flex h-9 w-9 items-center justify-center rounded-2xl border border-[#e8674f]/30 text-[#0a2e2a] hover:bg-[#e8674f]/10 active:scale-95 transition-all z-50 relative",

  overlay:
    "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",

  drawer:
    "fixed top-0 right-0 bottom-0 w-72 bg-[#eefaf8] border-l border-[#e8674f]/20 p-8 pt-24 z-40 md:hidden transition-transform duration-300 ease-out shadow-2xl",

  mobileLinks: "flex flex-col gap-6",

  mobileLink:
    "font-sans text-sm normal-case tracking-normal font-medium block py-2 transition-all active:translate-x-1",

  mobileLinkActive: "text-[#0a2e2a] font-semibold",

  mobileLinkInactive: "text-teal-400",
};

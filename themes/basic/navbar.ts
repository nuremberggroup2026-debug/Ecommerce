export const navbarTheme = {
  header:
    "sticky top-0 z-50 border-b border-neutral-100 bg-white/85 backdrop-blur-md",

  nav: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10",

  logo: "text-xl font-bold tracking-tight text-neutral-900 active:scale-[0.98] transition-transform",

  logoAccent: "font-normal text-neutral-400",

  desktopLinks: "hidden items-center gap-7 md:flex",

  desktopItem: "relative flex flex-col items-center",

  link: "text-[13px] md:text-sm font-semibold transition-all duration-200 pb-0.5 active:scale-95 block",

  linkActive: "text-black font-bold scale-105",

  linkInactive: "text-neutral-600 hover:text-black",

  activeDot:
    "absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black transition-all duration-200",

  actions: "flex items-center gap-3.5",

  icon: "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 active:scale-90",

  iconActive: "text-black bg-neutral-100",

  iconInactive: "text-neutral-600 hover:text-black hover:bg-neutral-50",

  badge:
    "absolute top-1 end-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white tabular-nums scale-95",

  menuButton:
    "md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 active:scale-95 transition-all z-50 relative",

  overlay:
    "fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300",

  drawer:
    "fixed top-0 end-0 bottom-0 w-72 bg-white border-s border-neutral-200 p-8 pt-24 z-40 md:hidden transition-transform duration-300 ease-out shadow-2xl",

  mobileLinks: "flex flex-col gap-5",

  mobileLink:
    "text-base font-semibold block py-2 transition-all active:translate-x-1",

  mobileLinkActive: "text-black font-bold",

  mobileLinkInactive: "text-neutral-500 hover:text-black",
};

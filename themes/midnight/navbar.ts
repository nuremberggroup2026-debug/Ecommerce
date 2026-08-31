export const navbarTheme = {
  header:
    "sticky top-0 z-50 border-b border-[#a78bfa]/15 bg-[#17121f]/80 backdrop-blur-md",

  nav: "mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10",

  logo: "font-mono text-xl tracking-tight text-[#f5f2fb] active:scale-[0.98] transition-transform",

  logoAccent: "font-mono font-light text-[#a78bfa]",

  desktopLinks: "hidden items-center gap-10 md:flex",

  desktopItem: "relative flex flex-col items-center",

  link: "text-[11px] tracking-[0.25em] transition-all duration-300 pb-1 font-medium uppercase active:scale-95 block",

  linkActive: "text-[#f5f2fb] font-semibold",

  linkInactive: "text-violet-300 hover:text-[#a78bfa]",

  activeDot:
    "absolute -bottom-1 h-1 w-1 rounded-full bg-[#a78bfa] transition-all duration-300",

  actions: "flex items-center gap-4",

  icon: "relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 active:scale-90",

  iconActive: "text-[#f5f2fb] bg-[#a78bfa]/10",

  iconInactive: "text-violet-400 hover:text-[#a78bfa] hover:bg-[#a78bfa]/10",

  badge:
    "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f5f2fb] text-[9px] font-bold text-[#3d2b5c] tabular-nums scale-95",

  menuButton:
    "md:hidden flex h-9 w-9 items-center justify-center rounded-none border border-[#a78bfa]/30 text-[#f5f2fb] hover:bg-[#a78bfa]/10 active:scale-95 transition-all z-50 relative",

  overlay:
    "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",

  drawer:
    "fixed top-0 right-0 bottom-0 w-72 bg-[#17121f] border-l border-[#a78bfa]/20 p-8 pt-24 z-40 md:hidden transition-transform duration-300 ease-out shadow-2xl",

  mobileLinks: "flex flex-col gap-6",

  mobileLink:
    "font-mono text-sm uppercase tracking-[0.2em] font-medium block py-2 transition-all active:translate-x-1",

  mobileLinkActive: "text-[#f5f2fb] font-semibold",

  mobileLinkInactive: "text-violet-300",
};

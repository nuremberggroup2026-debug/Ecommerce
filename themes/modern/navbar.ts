export const navbarTheme = {
  header:
    "sticky top-0 z-50 border-b border-[#2563eb]/15 bg-[#ffffff]/80 backdrop-blur-md",

  nav: "mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10",

  logo: "font-sans text-xl tracking-tight text-[#111827] active:scale-[0.98] transition-transform",

  logoAccent: "font-sans font-light text-[#2563eb]",

  desktopLinks: "hidden items-center gap-10 md:flex",

  desktopItem: "relative flex flex-col items-center",

  link: "text-[11px] tracking-wide transition-all duration-300 pb-1 font-medium normal-case active:scale-95 block",

  linkActive: "text-[#111827] font-semibold",

  linkInactive: "text-slate-400 hover:text-[#2563eb]",

  activeDot:
    "absolute -bottom-1 h-1 w-1 rounded-full bg-[#2563eb] transition-all duration-300",

  actions: "flex items-center gap-4",

  icon: "relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 active:scale-90",

  iconActive: "text-[#111827] bg-[#2563eb]/10",

  iconInactive: "text-slate-500 hover:text-[#2563eb] hover:bg-[#2563eb]/10",

  badge:
    "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#111827] text-[9px] font-bold text-[#93c5fd] tabular-nums scale-95",

  menuButton:
    "md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[#2563eb]/30 text-[#111827] hover:bg-[#2563eb]/10 active:scale-95 transition-all z-50 relative",

  overlay:
    "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",

  drawer:
    "fixed top-0 right-0 bottom-0 w-72 bg-[#ffffff] border-l border-[#2563eb]/20 p-8 pt-24 z-40 md:hidden transition-transform duration-300 ease-out shadow-2xl",

  mobileLinks: "flex flex-col gap-6",

  mobileLink:
    "font-sans text-sm normal-case tracking-wide font-medium block py-2 transition-all active:translate-x-1",

  mobileLinkActive: "text-[#111827] font-semibold",

  mobileLinkInactive: "text-slate-400",
};

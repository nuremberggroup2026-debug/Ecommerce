export const navbarTheme = {

  header:
    "sticky top-0 z-50 border-b border-neutral-100 bg-white/70 backdrop-blur-md",

  nav:
    "mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10",

  logo:
    "text-lg font-semibold tracking-tight text-neutral-900 active:scale-[0.98] transition-transform",

  logoAccent:
    "font-light text-neutral-400",


  desktopLinks:
    "hidden items-center gap-8 md:flex",

  desktopItem:
    "relative flex flex-col items-center",


  link:
    "text-xs uppercase tracking-widest transition-all duration-300 pb-1 font-medium active:scale-95 block",

  linkActive:
    "text-black font-semibold scale-105",

  linkInactive:
    "text-neutral-400 hover:text-black",


  activeDot:
    "absolute -bottom-1 h-1 w-1 rounded-full bg-black transition-all duration-300",


  actions:
    "flex items-center gap-4",


  icon:
    "relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 active:scale-90",

  iconActive:
    "text-black bg-neutral-50",

  iconInactive:
    "text-neutral-500 hover:text-black hover:bg-neutral-50",


  badge:
    "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white tabular-nums scale-95",


  menuButton:
    "md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all z-50 relative",


  overlay:
    "fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",


  drawer:
    "fixed top-0 right-0 bottom-0 w-72 bg-white border-l border-neutral-100 p-8 pt-24 z-40 md:hidden transition-transform duration-300 ease-out shadow-xl",


  mobileLinks:
    "flex flex-col gap-6",


  mobileLink:
    "text-sm uppercase tracking-widest font-medium block py-2 transition-all active:translate-x-1",

  mobileLinkActive:
    "text-black font-semibold",

  mobileLinkInactive:
    "text-neutral-400",
};
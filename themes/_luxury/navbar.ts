export const navbarTheme = {

  header:
    "sticky top-0 z-50 border-b border-neutral-300 bg-white",

  nav:
    "mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10",


  logo:
    "text-xl font-bold tracking-[0.15em] text-black active:scale-[0.98] transition-transform",

  logoAccent:
    "font-normal text-neutral-500",



  desktopLinks:
    "hidden items-center gap-10 md:flex",

  desktopItem:
    "relative flex flex-col items-center",


  link:
    "text-[11px] uppercase tracking-[0.25em] transition-all duration-300 pb-2 font-semibold active:scale-95 block",

  linkActive:
    "text-black border-b border-black",

  linkInactive:
    "text-neutral-500 hover:text-black",


  activeDot:
    "hidden",



  actions:
    "flex items-center gap-3",


  icon:
    "relative flex h-10 w-10 items-center justify-center border border-neutral-300 transition-all duration-300 active:scale-95",


  iconActive:
    "bg-black text-white border-black",


  iconInactive:
    "text-neutral-600 hover:bg-black hover:text-white hover:border-black",



  badge:
    "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-black text-[9px] font-bold text-white",



  menuButton:
    "md:hidden flex h-10 w-10 items-center justify-center border border-neutral-300 text-black hover:bg-black hover:text-white transition-all duration-300 z-50 relative",



  overlay:
    "fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",



  drawer:
    "fixed top-0 right-0 bottom-0 w-80 bg-white border-l border-neutral-300 p-8 pt-28 z-40 md:hidden transition-transform duration-300 shadow-2xl",



  mobileLinks:
    "flex flex-col gap-8",


  mobileLink:
    "text-sm uppercase tracking-[0.2em] font-semibold block py-2 transition-all",


  mobileLinkActive:
    "text-black border-l-2 border-black pl-3",


  mobileLinkInactive:
    "text-neutral-500 hover:text-black",
};
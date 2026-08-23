export const productCardTheme = {
  container:
    "group relative flex flex-col space-y-4",

  imageWrapper:
    "relative aspect-[4/5] w-full overflow-hidden border border-neutral-300 bg-white shadow-none",

  image:
    "object-cover transition duration-500 ease-out group-hover:scale-105",

  brandBadge:
    "absolute top-3 left-3 bg-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white border border-neutral-900 z-10",

  wishlistButton:
    "absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center bg-white border border-neutral-300 text-neutral-700 transition-all duration-300 hover:bg-black hover:text-white active:scale-95",

  wishlistIcon:
    "h-4 w-4",

  addCartWrapper:
    "absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10",

  addCartButton:
    "w-full bg-neutral-900 py-3 text-xs font-bold uppercase tracking-widest text-white border border-neutral-900 hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98]",

  info:
    "flex justify-between items-start px-0",

  meta:
    "text-[11px] uppercase tracking-wide text-neutral-500 font-medium",

  title:
    "text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-500 line-clamp-1",

  price:
    "text-sm font-bold text-neutral-900 pt-1",
};
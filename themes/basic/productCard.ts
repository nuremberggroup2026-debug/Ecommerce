export const productCardTheme = {
  container:
    "group relative flex flex-col space-y-4",

  imageWrapper:
    "relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-200/60 bg-neutral-100 shadow-sm",

  image:
    "object-cover transition duration-700 ease-out group-hover:scale-105",

  brandBadge:
    "absolute top-3.5 start-3.5 bg-black/90 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full shadow-sm z-10",

  wishlistButton:
    "absolute top-3.5 end-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border border-neutral-200/60 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 active:scale-90 shadow-sm cursor-pointer disabled:opacity-50",

  wishlistIcon:
    "h-4.5 w-4.5 transition-all duration-200",

  addCartWrapper:
    "absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10",

  addCartButton:
    "w-full bg-black py-3 text-xs font-semibold uppercase tracking-wider text-white rounded-2xl shadow-md hover:bg-neutral-800 transition active:scale-[0.97]",

  info:
    "flex justify-between items-start px-1 flex-1",

  meta:
    "text-[11px] text-gray-400 font-medium tracking-tight",

  title:
    "text-sm font-medium text-neutral-800 transition-colors hover:text-black line-clamp-1",

  price:
    "text-sm font-semibold text-black pt-1",

};
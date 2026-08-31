export const productCardTheme = {
  container:
    "group relative flex flex-col space-y-4",

  imageWrapper:
    "relative aspect-[4/5] w-full overflow-hidden rounded-none border border-[#a78bfa]/15 bg-[#130e1a] shadow-sm",

  image:
    "object-cover transition duration-700 ease-out group-hover:scale-105",

  brandBadge:
    "absolute top-4 left-4 bg-[#f5f2fb] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3d2b5c] rounded-none shadow-sm z-10",

  wishlistButton:
    "absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#17121f]/80 border border-[#a78bfa]/25 text-[#f5f2fb] backdrop-blur-sm transition-all duration-300 hover:bg-[#17121f] hover:text-[#a78bfa] hover:scale-110 active:scale-95 shadow-sm",

  wishlistIcon:
    "h-4 w-4",

  addCartWrapper:
    "absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10",

  addCartButton:
    "w-full bg-[#f5f2fb] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#3d2b5c] rounded-none shadow-md border border-[#3d2b5c]/30 hover:border-[#3d2b5c] transition active:scale-[0.97]",

  info:
    "flex justify-between items-start px-1 flex-1",

  meta:
    "text-[11px] text-[#a78bfa] font-medium tracking-wider uppercase",

  title:
    "font-mono text-sm text-[#f5f2fb] transition-colors hover:text-[#a78bfa] line-clamp-1",

  price:
    "text-sm font-semibold text-[#f5f2fb] pt-1",
};

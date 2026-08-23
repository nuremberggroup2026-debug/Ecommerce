export const productCardTheme = {
  container:
    "group relative flex flex-col space-y-4",

  imageWrapper:
    "relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[#b08d57]/15 bg-[#f3ede0] shadow-sm",

  image:
    "object-cover transition duration-700 ease-out group-hover:scale-105",

  brandBadge:
    "absolute top-4 left-4 bg-[#0c0a07] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d4b877] rounded-sm shadow-sm z-10",

  wishlistButton:
    "absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#f9f6ef]/80 border border-[#b08d57]/25 text-[#0c0a07] backdrop-blur-sm transition-all duration-300 hover:bg-[#f9f6ef] hover:text-[#b08d57] hover:scale-110 active:scale-95 shadow-sm",

  wishlistIcon:
    "h-4 w-4",

  addCartWrapper:
    "absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10",

  addCartButton:
    "w-full bg-[#0c0a07] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#d4b877] rounded-sm shadow-md border border-[#d4b877]/30 hover:border-[#d4b877] transition active:scale-[0.97]",

  info:
    "flex justify-between items-start px-1 flex-1",

  meta:
    "text-[11px] text-[#b08d57] font-medium tracking-wider uppercase",

  title:
    "font-serif text-sm text-[#0c0a07] transition-colors hover:text-[#b08d57] line-clamp-1",

  price:
    "text-sm font-semibold text-[#0c0a07] pt-1",
};

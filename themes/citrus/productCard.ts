export const productCardTheme = {
  container:
    "group relative flex flex-col space-y-4",

  imageWrapper:
    "relative aspect-[4/5] w-full overflow-hidden rounded-full border border-[#a3e635]/15 bg-[#f7fee7] shadow-sm",

  image:
    "object-cover transition duration-700 ease-out group-hover:scale-105",

  brandBadge:
    "absolute top-4 left-4 bg-[#0a0a0a] px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-[#d9f99d] rounded-full shadow-sm z-10",

  wishlistButton:
    "absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#ffffff]/80 border border-[#a3e635]/25 text-[#0a0a0a] backdrop-blur-sm transition-all duration-300 hover:bg-[#ffffff] hover:text-[#a3e635] hover:scale-110 active:scale-95 shadow-sm",

  wishlistIcon:
    "h-4 w-4",

  addCartWrapper:
    "absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10",

  addCartButton:
    "w-full bg-[#0a0a0a] py-3 text-xs font-semibold uppercase tracking-tight text-[#d9f99d] rounded-full shadow-md border border-[#d9f99d]/30 hover:border-[#d9f99d] transition active:scale-[0.97]",

  info:
    "flex justify-between items-start px-1 flex-1",

  meta:
    "text-[11px] text-[#a3e635] font-medium tracking-tight uppercase",

  title:
    "font-sans text-sm text-[#0a0a0a] transition-colors hover:text-[#a3e635] line-clamp-1",

  price:
    "text-sm font-semibold text-[#0a0a0a] pt-1",
};

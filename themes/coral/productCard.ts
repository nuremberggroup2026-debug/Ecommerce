export const productCardTheme = {
  container:
    "group relative flex flex-col space-y-4",

  imageWrapper:
    "relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#e8674f]/15 bg-[#d9f0ec] shadow-sm",

  image:
    "object-cover transition duration-700 ease-out group-hover:scale-105",

  brandBadge:
    "absolute top-4 left-4 bg-[#0a2e2a] px-3 py-1 text-[10px] font-bold normal-case tracking-normal text-[#f7c9a3] rounded-2xl shadow-sm z-10",

  wishlistButton:
    "absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#eefaf8]/80 border border-[#e8674f]/25 text-[#0a2e2a] backdrop-blur-sm transition-all duration-300 hover:bg-[#eefaf8] hover:text-[#e8674f] hover:scale-110 active:scale-95 shadow-sm",

  wishlistIcon:
    "h-4 w-4",

  addCartWrapper:
    "absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10",

  addCartButton:
    "w-full bg-[#0a2e2a] py-3 text-xs font-semibold normal-case tracking-normal text-[#f7c9a3] rounded-2xl shadow-md border border-[#f7c9a3]/30 hover:border-[#f7c9a3] transition active:scale-[0.97]",

  info:
    "flex justify-between items-start px-1 flex-1",

  meta:
    "text-[11px] text-[#e8674f] font-medium tracking-normal normal-case",

  title:
    "font-sans text-sm text-[#0a2e2a] transition-colors hover:text-[#e8674f] line-clamp-1",

  price:
    "text-sm font-semibold text-[#0a2e2a] pt-1",
};

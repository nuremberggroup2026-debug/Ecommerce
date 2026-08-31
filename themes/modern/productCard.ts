export const productCardTheme = {
  container:
    "group relative flex flex-col space-y-4",

  imageWrapper:
    "relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-[#2563eb]/15 bg-[#eff6ff] shadow-sm",

  image:
    "object-cover transition duration-700 ease-out group-hover:scale-105",

  brandBadge:
    "absolute top-4 left-4 bg-[#111827] px-3 py-1 text-[10px] font-bold normal-case tracking-wide text-[#93c5fd] rounded-lg shadow-sm z-10",

  wishlistButton:
    "absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#ffffff]/80 border border-[#2563eb]/25 text-[#111827] backdrop-blur-sm transition-all duration-300 hover:bg-[#ffffff] hover:text-[#2563eb] hover:scale-110 active:scale-95 shadow-sm",

  wishlistIcon:
    "h-4 w-4",

  addCartWrapper:
    "absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10",

  addCartButton:
    "w-full bg-[#111827] py-3 text-xs font-semibold normal-case tracking-normal text-[#93c5fd] rounded-lg shadow-md border border-[#93c5fd]/30 hover:border-[#93c5fd] transition active:scale-[0.97]",

  info:
    "flex justify-between items-start px-1 flex-1",

  meta:
    "text-[11px] text-[#2563eb] font-medium tracking-wide normal-case",

  title:
    "font-sans text-sm text-[#111827] transition-colors hover:text-[#2563eb] line-clamp-1",

  price:
    "text-sm font-semibold text-[#111827] pt-1",
};

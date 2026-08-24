export const productInfoTheme = {
  container: "space-y-8",
  headerSpace: "space-y-2",
  brandRow: "flex items-center justify-between",
  brandText: "text-xs uppercase tracking-widest text-[#b08d57] font-medium",
  stockRow: "flex items-center gap-2",
  stockIndicator: (isOutOfStock: boolean, stock: number) =>
    `h-1.5 w-1.5 rounded-full ${
      isOutOfStock
        ? "bg-red-500"
        : stock > 5
        ? "bg-emerald-600"
        : "bg-amber-600"
    }`,
  stockText: "text-[11px] font-medium text-stone-500",
  title: "font-serif text-2xl tracking-tight text-[#0c0a07] sm:text-3xl",
  priceRow: "flex items-center gap-4 pt-1",
  price: "text-xl font-bold tracking-tight text-[#0c0a07]",
  oldPrice: "text-sm text-stone-400 line-through",
  divider: "border-[#b08d57]/15",
  descriptionSpace: "space-y-3",
  descriptionText: "text-sm text-stone-500 leading-relaxed font-light",
  variantsContainer: "space-y-3",
  variantsLabel: "text-[10px] font-bold uppercase tracking-wider text-[#0c0a07] block",
  variantsGrid: "flex flex-wrap gap-2",
  variantButton: (isSelected: boolean) =>
    `rounded-sm border px-4 py-2 text-sm transition ${
      isSelected
        ? "border-[#0c0a07] bg-[#0c0a07] text-[#d4b877]"
        : "border-[#b08d57]/25 hover:border-[#b08d57]"
    }`,
  skuText: "text-[10px] text-stone-300 font-mono block",
  quantityBox: (isOutOfStock: boolean) =>
    `inline-flex items-center border border-[#b08d57]/25 rounded-full bg-white p-1 shadow-sm ${
      isOutOfStock ? "opacity-50" : ""
    }`,
  quantityButton: "p-2 text-stone-400 hover:text-[#b08d57] disabled:opacity-30 disabled:hover:text-stone-400",
  quantityValue: "w-10 text-center text-xs font-semibold",
  addButton: (isOutOfStock: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-widest rounded-sm transition shadow-sm active:scale-[0.98] border ${
      isOutOfStock
        ? "bg-stone-200 text-stone-400 border-stone-200 cursor-not-allowed"
        : "bg-[#0c0a07] text-[#d4b877] border-[#d4b877]/40 hover:border-[#d4b877] hover:bg-[#1a1611]"
    }`,
};

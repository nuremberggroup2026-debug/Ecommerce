export const productInfoTheme = {
  container: "space-y-8",
  headerSpace: "space-y-2",
  brandRow: "flex items-center justify-between",
  brandText: "text-xs uppercase tracking-tight text-[#a3e635] font-medium",
  stockRow: "flex items-center gap-2",
  stockIndicator: (isOutOfStock: boolean, stock: number) =>
    `h-1.5 w-1.5 rounded-full ${
      isOutOfStock
        ? "bg-red-500"
        : stock > 5
        ? "bg-emerald-600"
        : "bg-amber-600"
    }`,
  stockText: "text-[11px] font-medium text-neutral-500",
  title: "font-sans text-2xl tracking-tight text-[#0a0a0a] sm:text-3xl",
  priceRow: "flex items-center gap-4 pt-1",
  price: "text-xl font-bold tracking-tight text-[#0a0a0a]",
  oldPrice: "text-sm text-neutral-400 line-through",
  divider: "border-[#a3e635]/15",
  descriptionSpace: "space-y-3",
  descriptionText: "text-sm text-neutral-500 leading-relaxed font-light",
  variantsContainer: "space-y-3",
  variantsLabel: "text-[10px] font-bold uppercase tracking-tight text-[#0a0a0a] block",
  variantsGrid: "flex flex-wrap gap-2",
  variantButton: (isSelected: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition ${
      isSelected
        ? "border-[#0a0a0a] bg-[#0a0a0a] text-[#d9f99d]"
        : "border-[#a3e635]/25 hover:border-[#a3e635]"
    }`,
  skuText: "text-[10px] text-neutral-300 font-mono block",
  quantityBox: (isOutOfStock: boolean) =>
    `inline-flex items-center border border-[#a3e635]/25 rounded-full bg-white p-1 shadow-sm ${
      isOutOfStock ? "opacity-50" : ""
    }`,
  quantityButton: "p-2 text-neutral-400 hover:text-[#a3e635] disabled:opacity-30 disabled:hover:text-neutral-400",
  quantityValue: "w-10 text-center text-xs font-semibold",
  addButton: (isOutOfStock: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-tight rounded-full transition shadow-sm active:scale-[0.98] border ${
      isOutOfStock
        ? "bg-neutral-200 text-neutral-400 border-neutral-200 cursor-not-allowed"
        : "bg-[#0a0a0a] text-[#d9f99d] border-[#d9f99d]/40 hover:border-[#d9f99d] hover:bg-[#1a1a1a]"
    }`,
};

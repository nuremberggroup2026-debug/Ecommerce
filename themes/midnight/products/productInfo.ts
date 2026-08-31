export const productInfoTheme = {
  container: "space-y-8",
  headerSpace: "space-y-2",
  brandRow: "flex items-center justify-between",
  brandText: "text-xs uppercase tracking-widest text-[#a78bfa] font-medium",
  stockRow: "flex items-center gap-2",
  stockIndicator: (isOutOfStock: boolean, stock: number) =>
    `h-1.5 w-1.5 rounded-full ${
      isOutOfStock
        ? "bg-red-500"
        : stock > 5
        ? "bg-emerald-600"
        : "bg-amber-600"
    }`,
  stockText: "text-[11px] font-medium text-violet-400",
  title: "font-mono text-2xl tracking-tight text-[#f5f2fb] sm:text-3xl",
  priceRow: "flex items-center gap-4 pt-1",
  price: "text-xl font-bold tracking-tight text-[#f5f2fb]",
  oldPrice: "text-sm text-violet-300 line-through",
  divider: "border-[#a78bfa]/15",
  descriptionSpace: "space-y-3",
  descriptionText: "text-sm text-violet-400 leading-relaxed font-light",
  variantsContainer: "space-y-3",
  variantsLabel: "text-[10px] font-bold uppercase tracking-wider text-[#f5f2fb] block",
  variantsGrid: "flex flex-wrap gap-2",
  variantButton: (isSelected: boolean) =>
    `rounded-none border px-4 py-2 text-sm transition ${
      isSelected
        ? "border-[#f5f2fb] bg-[#f5f2fb] text-[#3d2b5c]"
        : "border-[#a78bfa]/25 hover:border-[#a78bfa]"
    }`,
  skuText: "text-[10px] text-violet-300 font-mono block",
  quantityBox: (isOutOfStock: boolean) =>
    `inline-flex items-center border border-[#a78bfa]/25 rounded-full bg-white p-1 shadow-sm ${
      isOutOfStock ? "opacity-50" : ""
    }`,
  quantityButton: "p-2 text-violet-300 hover:text-[#a78bfa] disabled:opacity-30 disabled:hover:text-violet-300",
  quantityValue: "w-10 text-center text-xs font-semibold",
  addButton: (isOutOfStock: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-widest rounded-none transition shadow-sm active:scale-[0.98] border ${
      isOutOfStock
        ? "bg-violet-950 text-violet-300 border-violet-950 cursor-not-allowed"
        : "bg-[#f5f2fb] text-[#3d2b5c] border-[#3d2b5c]/40 hover:border-[#3d2b5c] hover:bg-[#e6e0f7]"
    }`,
};

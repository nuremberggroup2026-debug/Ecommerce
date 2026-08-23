export const productInfoTheme = {
  container: "space-y-8",
  headerSpace: "space-y-2",
  brandRow: "flex items-center justify-between",
  brandText: "text-xs uppercase tracking-widest text-gray-400 font-medium",
  stockRow: "flex items-center gap-2",
  stockIndicator: (isOutOfStock: boolean, stock: number) =>
    `h-1.5 w-1.5 rounded-full ${
      isOutOfStock
        ? "bg-red-500"
        : stock > 5
        ? "bg-emerald-500"
        : "bg-amber-500"
    }`,
  stockText: "text-[11px] font-medium text-neutral-500",
  title: "text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl",
  priceRow: "flex items-center gap-4 pt-1",
  price: "text-xl font-bold tracking-tight text-black",
  oldPrice: "text-sm text-neutral-400 line-through",
  divider: "border-neutral-100",
  descriptionSpace: "space-y-3",
  descriptionText: "text-sm text-gray-400 leading-relaxed font-light",
  variantsContainer: "space-y-3",
  variantsLabel: "text-[10px] font-bold uppercase tracking-wider text-neutral-800 block",
  variantsGrid: "flex flex-wrap gap-2",
  variantButton: (isSelected: boolean) =>
    `rounded-xl border px-4 py-2 text-sm transition ${
      isSelected
        ? "border-black bg-black text-white"
        : "border-neutral-200 hover:border-black"
    }`,
  skuText: "text-[10px] text-gray-300 font-mono block",
  quantityBox: (isOutOfStock: boolean) =>
    `inline-flex items-center border border-neutral-200 rounded-full bg-white p-1 shadow-sm ${
      isOutOfStock ? "opacity-50" : ""
    }`,
  quantityButton: "p-2 text-gray-400 hover:text-black disabled:opacity-30 disabled:hover:text-gray-400",
  quantityValue: "w-10 text-center text-xs font-semibold",
  addButton: (isOutOfStock: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-widest text-white rounded-2xl transition shadow-sm active:scale-[0.98] ${
      isOutOfStock
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-black hover:bg-neutral-800"
    }`,
};
export const productInfoTheme = {
  container: "space-y-8",
  headerSpace: "space-y-2",
  brandRow: "flex items-center justify-between",
  brandText: "text-xs normal-case tracking-normal text-[#e8674f] font-medium",
  stockRow: "flex items-center gap-2",
  stockIndicator: (isOutOfStock: boolean, stock: number) =>
    `h-1.5 w-1.5 rounded-full ${
      isOutOfStock
        ? "bg-red-500"
        : stock > 5
        ? "bg-emerald-600"
        : "bg-amber-600"
    }`,
  stockText: "text-[11px] font-medium text-teal-500",
  title: "font-sans text-2xl tracking-tight text-[#0a2e2a] sm:text-3xl",
  priceRow: "flex items-center gap-4 pt-1",
  price: "text-xl font-bold tracking-tight text-[#0a2e2a]",
  oldPrice: "text-sm text-teal-400 line-through",
  divider: "border-[#e8674f]/15",
  descriptionSpace: "space-y-3",
  descriptionText: "text-sm text-teal-500 leading-relaxed font-light",
  variantsContainer: "space-y-3",
  variantsLabel: "text-[10px] font-bold normal-case tracking-normal text-[#0a2e2a] block",
  variantsGrid: "flex flex-wrap gap-2",
  variantButton: (isSelected: boolean) =>
    `rounded-2xl border px-4 py-2 text-sm transition ${
      isSelected
        ? "border-[#0a2e2a] bg-[#0a2e2a] text-[#f7c9a3]"
        : "border-[#e8674f]/25 hover:border-[#e8674f]"
    }`,
  skuText: "text-[10px] text-teal-300 font-mono block",
  quantityBox: (isOutOfStock: boolean) =>
    `inline-flex items-center border border-[#e8674f]/25 rounded-full bg-white p-1 shadow-sm ${
      isOutOfStock ? "opacity-50" : ""
    }`,
  quantityButton: "p-2 text-teal-400 hover:text-[#e8674f] disabled:opacity-30 disabled:hover:text-teal-400",
  quantityValue: "w-10 text-center text-xs font-semibold",
  addButton: (isOutOfStock: boolean) =>
    `w-full py-4 text-xs font-semibold normal-case tracking-normal rounded-2xl transition shadow-sm active:scale-[0.98] border ${
      isOutOfStock
        ? "bg-teal-200 text-teal-400 border-teal-200 cursor-not-allowed"
        : "bg-[#0a2e2a] text-[#f7c9a3] border-[#f7c9a3]/40 hover:border-[#f7c9a3] hover:bg-[#072220]"
    }`,
};

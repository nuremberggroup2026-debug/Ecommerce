export const productInfoTheme = {
  container: "space-y-8",
  headerSpace: "space-y-2",
  brandRow: "flex items-center justify-between",
  brandText: "text-xs normal-case tracking-wide text-[#2563eb] font-medium",
  stockRow: "flex items-center gap-2",
  stockIndicator: (isOutOfStock: boolean, stock: number) =>
    `h-1.5 w-1.5 rounded-full ${
      isOutOfStock
        ? "bg-red-500"
        : stock > 5
        ? "bg-emerald-600"
        : "bg-amber-600"
    }`,
  stockText: "text-[11px] font-medium text-slate-500",
  title: "font-sans text-2xl tracking-tight text-[#111827] sm:text-3xl",
  priceRow: "flex items-center gap-4 pt-1",
  price: "text-xl font-bold tracking-tight text-[#111827]",
  oldPrice: "text-sm text-slate-400 line-through",
  divider: "border-[#2563eb]/15",
  descriptionSpace: "space-y-3",
  descriptionText: "text-sm text-slate-500 leading-relaxed font-light",
  variantsContainer: "space-y-3",
  variantsLabel: "text-[10px] font-bold normal-case tracking-wide text-[#111827] block",
  variantsGrid: "flex flex-wrap gap-2",
  variantButton: (isSelected: boolean) =>
    `rounded-lg border px-4 py-2 text-sm transition ${
      isSelected
        ? "border-[#111827] bg-[#111827] text-[#93c5fd]"
        : "border-[#2563eb]/25 hover:border-[#2563eb]"
    }`,
  skuText: "text-[10px] text-slate-300 font-mono block",
  quantityBox: (isOutOfStock: boolean) =>
    `inline-flex items-center border border-[#2563eb]/25 rounded-full bg-white p-1 shadow-sm ${
      isOutOfStock ? "opacity-50" : ""
    }`,
  quantityButton: "p-2 text-slate-400 hover:text-[#2563eb] disabled:opacity-30 disabled:hover:text-slate-400",
  quantityValue: "w-10 text-center text-xs font-semibold",
  addButton: (isOutOfStock: boolean) =>
    `w-full py-4 text-xs font-semibold normal-case tracking-wide rounded-lg transition shadow-sm active:scale-[0.98] border ${
      isOutOfStock
        ? "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed"
        : "bg-[#111827] text-[#93c5fd] border-[#93c5fd]/40 hover:border-[#93c5fd] hover:bg-[#1e293b]"
    }`,
};

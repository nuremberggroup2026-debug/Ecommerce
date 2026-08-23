export const ordersComponentTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen flex-col bg-[#f9f6ef] text-[#0c0a07] ${isAr ? "rtl" : "ltr"}`,
  container: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 lg:px-10",
  header: "mb-12 border-b border-[#b08d57]/15 pb-6 text-center md:text-left",
  title: "font-serif text-3xl tracking-tight md:text-4xl",
  description: "mt-2 text-xs font-light text-stone-400",
  emptyContainer: "flex flex-1 flex-col items-center justify-center space-y-6 py-20 text-center",
  emptyMessage: "text-sm font-light text-stone-400",
  emptyButton: "rounded-sm border border-[#d4b877]/40 bg-[#0c0a07] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#d4b877] shadow-sm transition hover:bg-[#1a1611] active:scale-[0.98]",
  ordersList: "space-y-6",
  orderCard: (isExpanded: boolean) =>
    `overflow-hidden rounded-sm border transition-all duration-300 ${
      isExpanded
        ? "border-[#b08d57]/40 bg-white shadow-md"
        : "border-[#b08d57]/15 bg-[#f3ede0]/50 hover:border-[#b08d57]/30"
    }`,
  orderButton: "flex w-full flex-wrap items-center justify-between gap-4 p-6 text-left focus:outline-none",
  orderInfoGrid: "flex flex-wrap items-center gap-x-8 gap-y-4",
  fieldLabel: "mb-1 text-[10px] font-bold uppercase tracking-wider text-[#b08d57]",
  fieldValue: "text-sm font-medium text-[#0c0a07]",
  fieldValueRegular: "text-sm text-stone-700",
  fieldValueBold: "text-sm font-bold text-[#0c0a07]",
  cardHeaderRight: "ml-auto flex items-center gap-6",
  statusBadge: (statusClass: string) =>
    `rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClass}`,
  expandIcon: (isExpanded: boolean) =>
    `h-5 w-5 text-[#b08d57] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,
  expandedGrid: (isExpanded: boolean) =>
    `grid transition-all duration-300 ease-in-out ${
      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`,
  expandedInner: "overflow-hidden",
  expandedContent: "mt-2 border-t border-[#b08d57]/15 p-6 pt-4",
  pricingSpace: "space-y-3",
  pricingRow: "flex items-center justify-between text-sm",
  pricingLabel: "text-stone-500",
  pricingValue: "font-medium text-[#0c0a07]",
  discountValue: "font-medium text-green-700",
  totalPricingRow: "flex items-center justify-between border-t border-[#b08d57]/15 pt-3",
  totalPricingLabel: "font-medium text-[#0c0a07]",
  totalPricingValue: "font-serif text-lg font-bold text-[#0c0a07]",
  itemsBox: "mt-6 rounded-sm bg-[#f3ede0] p-4",
  itemsBoxRow: "flex items-center justify-between",
  itemsBoxLabel: "text-xs text-stone-500",
  itemsBoxValue: "text-sm font-semibold text-[#0c0a07]",
  actionContainer: "mt-8 flex justify-end",
  actionButton: "rounded-sm bg-[#0c0a07] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#d4b877] shadow-sm transition hover:bg-[#1a1611]",
};

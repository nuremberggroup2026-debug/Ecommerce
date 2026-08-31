export const ordersComponentTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen flex-col bg-[#ffffff] text-[#0a0a0a] ${isAr ? "rtl" : "ltr"}`,
  container: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 lg:px-10",
  header: "mb-12 border-b border-[#a3e635]/15 pb-6 text-center md:text-left",
  title: "font-sans text-3xl tracking-tight md:text-4xl",
  description: "mt-2 text-xs font-light text-neutral-400",
  emptyContainer: "flex flex-1 flex-col items-center justify-center space-y-6 py-20 text-center",
  emptyMessage: "text-sm font-light text-neutral-400",
  emptyButton: "rounded-full border border-[#d9f99d]/40 bg-[#0a0a0a] px-8 py-4 text-xs font-semibold uppercase tracking-tight text-[#d9f99d] shadow-sm transition hover:bg-[#1a1a1a] active:scale-[0.98]",
  ordersList: "space-y-6",
  orderCard: (isExpanded: boolean) =>
    `overflow-hidden rounded-full border transition-all duration-300 ${
      isExpanded
        ? "border-[#a3e635]/40 bg-white shadow-md"
        : "border-[#a3e635]/15 bg-[#f7fee7]/50 hover:border-[#a3e635]/30"
    }`,
  orderButton: "flex w-full flex-wrap items-center justify-between gap-4 p-6 text-left focus:outline-none",
  orderInfoGrid: "flex flex-wrap items-center gap-x-8 gap-y-4",
  fieldLabel: "mb-1 text-[10px] font-bold uppercase tracking-tight text-[#a3e635]",
  fieldValue: "text-sm font-medium text-[#0a0a0a]",
  fieldValueRegular: "text-sm text-neutral-700",
  fieldValueBold: "text-sm font-bold text-[#0a0a0a]",
  cardHeaderRight: "ml-auto flex items-center gap-6",
  statusBadge: (statusClass: string) =>
    `rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-tight ${statusClass}`,
  expandIcon: (isExpanded: boolean) =>
    `h-5 w-5 text-[#a3e635] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,
  expandedGrid: (isExpanded: boolean) =>
    `grid transition-all duration-300 ease-in-out ${
      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`,
  expandedInner: "overflow-hidden",
  expandedContent: "mt-2 border-t border-[#a3e635]/15 p-6 pt-4",
  pricingSpace: "space-y-3",
  pricingRow: "flex items-center justify-between text-sm",
  pricingLabel: "text-neutral-500",
  pricingValue: "font-medium text-[#0a0a0a]",
  discountValue: "font-medium text-green-700",
  totalPricingRow: "flex items-center justify-between border-t border-[#a3e635]/15 pt-3",
  totalPricingLabel: "font-medium text-[#0a0a0a]",
  totalPricingValue: "font-sans text-lg font-bold text-[#0a0a0a]",
  itemsBox: "mt-6 rounded-full bg-[#f7fee7] p-4",
  itemsBoxRow: "flex items-center justify-between",
  itemsBoxLabel: "text-xs text-neutral-500",
  itemsBoxValue: "text-sm font-semibold text-[#0a0a0a]",
  actionContainer: "mt-8 flex justify-end",
  actionButton: "rounded-full bg-[#0a0a0a] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-tight text-[#d9f99d] shadow-sm transition hover:bg-[#1a1a1a]",
};

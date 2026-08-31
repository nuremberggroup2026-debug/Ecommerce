export const ordersComponentTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen flex-col bg-[#17121f] text-[#f5f2fb] ${isAr ? "rtl" : "ltr"}`,
  container: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 lg:px-10",
  header: "mb-12 border-b border-[#a78bfa]/15 pb-6 text-center md:text-left",
  title: "font-mono text-3xl tracking-tight md:text-4xl",
  description: "mt-2 text-xs font-light text-violet-300",
  emptyContainer: "flex flex-1 flex-col items-center justify-center space-y-6 py-20 text-center",
  emptyMessage: "text-sm font-light text-violet-300",
  emptyButton: "rounded-none border border-[#3d2b5c]/40 bg-[#f5f2fb] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#3d2b5c] shadow-sm transition hover:bg-[#e6e0f7] active:scale-[0.98]",
  ordersList: "space-y-6",
  orderCard: (isExpanded: boolean) =>
    `overflow-hidden rounded-none border transition-all duration-300 ${
      isExpanded
        ? "border-[#a78bfa]/40 bg-white shadow-md"
        : "border-[#a78bfa]/15 bg-[#130e1a]/50 hover:border-[#a78bfa]/30"
    }`,
  orderButton: "flex w-full flex-wrap items-center justify-between gap-4 p-6 text-left focus:outline-none",
  orderInfoGrid: "flex flex-wrap items-center gap-x-8 gap-y-4",
  fieldLabel: "mb-1 text-[10px] font-bold uppercase tracking-wider text-[#a78bfa]",
  fieldValue: "text-sm font-medium text-[#f5f2fb]",
  fieldValueRegular: "text-sm text-violet-100",
  fieldValueBold: "text-sm font-bold text-[#f5f2fb]",
  cardHeaderRight: "ml-auto flex items-center gap-6",
  statusBadge: (statusClass: string) =>
    `rounded-none border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClass}`,
  expandIcon: (isExpanded: boolean) =>
    `h-5 w-5 text-[#a78bfa] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,
  expandedGrid: (isExpanded: boolean) =>
    `grid transition-all duration-300 ease-in-out ${
      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`,
  expandedInner: "overflow-hidden",
  expandedContent: "mt-2 border-t border-[#a78bfa]/15 p-6 pt-4",
  pricingSpace: "space-y-3",
  pricingRow: "flex items-center justify-between text-sm",
  pricingLabel: "text-violet-400",
  pricingValue: "font-medium text-[#f5f2fb]",
  discountValue: "font-medium text-green-700",
  totalPricingRow: "flex items-center justify-between border-t border-[#a78bfa]/15 pt-3",
  totalPricingLabel: "font-medium text-[#f5f2fb]",
  totalPricingValue: "font-mono text-lg font-bold text-[#f5f2fb]",
  itemsBox: "mt-6 rounded-none bg-[#130e1a] p-4",
  itemsBoxRow: "flex items-center justify-between",
  itemsBoxLabel: "text-xs text-violet-400",
  itemsBoxValue: "text-sm font-semibold text-[#f5f2fb]",
  actionContainer: "mt-8 flex justify-end",
  actionButton: "rounded-none bg-[#f5f2fb] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#3d2b5c] shadow-sm transition hover:bg-[#e6e0f7]",
};

export const ordersComponentTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen flex-col bg-[#eefaf8] text-[#0a2e2a] ${isAr ? "rtl" : "ltr"}`,
  container: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 lg:px-10",
  header: "mb-12 border-b border-[#e8674f]/15 pb-6 text-center md:text-left",
  title: "font-sans text-3xl tracking-tight md:text-4xl",
  description: "mt-2 text-xs font-light text-teal-400",
  emptyContainer: "flex flex-1 flex-col items-center justify-center space-y-6 py-20 text-center",
  emptyMessage: "text-sm font-light text-teal-400",
  emptyButton: "rounded-2xl border border-[#f7c9a3]/40 bg-[#0a2e2a] px-8 py-4 text-xs font-semibold normal-case tracking-normal text-[#f7c9a3] shadow-sm transition hover:bg-[#072220] active:scale-[0.98]",
  ordersList: "space-y-6",
  orderCard: (isExpanded: boolean) =>
    `overflow-hidden rounded-2xl border transition-all duration-300 ${
      isExpanded
        ? "border-[#e8674f]/40 bg-white shadow-md"
        : "border-[#e8674f]/15 bg-[#d9f0ec]/50 hover:border-[#e8674f]/30"
    }`,
  orderButton: "flex w-full flex-wrap items-center justify-between gap-4 p-6 text-left focus:outline-none",
  orderInfoGrid: "flex flex-wrap items-center gap-x-8 gap-y-4",
  fieldLabel: "mb-1 text-[10px] font-bold normal-case tracking-normal text-[#e8674f]",
  fieldValue: "text-sm font-medium text-[#0a2e2a]",
  fieldValueRegular: "text-sm text-teal-700",
  fieldValueBold: "text-sm font-bold text-[#0a2e2a]",
  cardHeaderRight: "ml-auto flex items-center gap-6",
  statusBadge: (statusClass: string) =>
    `rounded-2xl border px-3 py-1 text-[10px] font-bold normal-case tracking-normal ${statusClass}`,
  expandIcon: (isExpanded: boolean) =>
    `h-5 w-5 text-[#e8674f] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,
  expandedGrid: (isExpanded: boolean) =>
    `grid transition-all duration-300 ease-in-out ${
      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`,
  expandedInner: "overflow-hidden",
  expandedContent: "mt-2 border-t border-[#e8674f]/15 p-6 pt-4",
  pricingSpace: "space-y-3",
  pricingRow: "flex items-center justify-between text-sm",
  pricingLabel: "text-teal-500",
  pricingValue: "font-medium text-[#0a2e2a]",
  discountValue: "font-medium text-green-700",
  totalPricingRow: "flex items-center justify-between border-t border-[#e8674f]/15 pt-3",
  totalPricingLabel: "font-medium text-[#0a2e2a]",
  totalPricingValue: "font-sans text-lg font-bold text-[#0a2e2a]",
  itemsBox: "mt-6 rounded-2xl bg-[#d9f0ec] p-4",
  itemsBoxRow: "flex items-center justify-between",
  itemsBoxLabel: "text-xs text-teal-500",
  itemsBoxValue: "text-sm font-semibold text-[#0a2e2a]",
  actionContainer: "mt-8 flex justify-end",
  actionButton: "rounded-2xl bg-[#0a2e2a] px-5 py-2.5 text-[11px] font-semibold normal-case tracking-normal text-[#f7c9a3] shadow-sm transition hover:bg-[#072220]",
};

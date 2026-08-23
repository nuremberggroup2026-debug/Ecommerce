export const ordersComponentTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen flex-col bg-white text-black ${isAr ? "rtl" : "ltr"}`,
  container: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 lg:px-10",
  header: "mb-12 border-b border-neutral-100 pb-6 text-center md:text-left",
  title: "text-3xl font-semibold tracking-tight md:text-4xl",
  description: "mt-2 text-xs font-light text-gray-400",
  emptyContainer: "flex flex-1 flex-col items-center justify-center space-y-6 py-20 text-center",
  emptyMessage: "text-sm font-light text-gray-400",
  emptyButton: "rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]",
  ordersList: "space-y-6",
  orderCard: (isExpanded: boolean) =>
    `overflow-hidden rounded-3xl border transition-all duration-300 ${
      isExpanded
        ? "border-neutral-200 bg-white shadow-md"
        : "border-neutral-100 bg-neutral-50/50 hover:border-neutral-200"
    }`,
  orderButton: "flex w-full flex-wrap items-center justify-between gap-4 p-6 text-left focus:outline-none",
  orderInfoGrid: "flex flex-wrap items-center gap-x-8 gap-y-4",
  fieldLabel: "mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400",
  fieldValue: "text-sm font-medium text-neutral-900",
  fieldValueRegular: "text-sm text-neutral-700",
  fieldValueBold: "text-sm font-bold text-black",
  cardHeaderRight: "ml-auto flex items-center gap-6",
  statusBadge: (statusClass: string) =>
    `rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClass}`,
  expandIcon: (isExpanded: boolean) =>
    `h-5 w-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,
  expandedGrid: (isExpanded: boolean) =>
    `grid transition-all duration-300 ease-in-out ${
      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`,
  expandedInner: "overflow-hidden",
  expandedContent: "mt-2 border-t border-neutral-100 p-6 pt-4",
  pricingSpace: "space-y-3",
  pricingRow: "flex items-center justify-between text-sm",
  pricingLabel: "text-neutral-500",
  pricingValue: "font-medium text-neutral-900",
  discountValue: "font-medium text-green-600",
  totalPricingRow: "flex items-center justify-between border-t border-neutral-100 pt-3",
  totalPricingLabel: "font-medium text-neutral-900",
  totalPricingValue: "text-lg font-bold text-neutral-900",
  itemsBox: "mt-6 rounded-2xl bg-neutral-50 p-4",
  itemsBoxRow: "flex items-center justify-between",
  itemsBoxLabel: "text-xs text-neutral-500",
  itemsBoxValue: "text-sm font-semibold text-neutral-900",
  actionContainer: "mt-8 flex justify-end",
  actionButton: "rounded-xl bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-sm transition hover:bg-neutral-800",
};
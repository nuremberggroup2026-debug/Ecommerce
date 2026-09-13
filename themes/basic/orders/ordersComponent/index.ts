export const ordersComponentTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen flex-col bg-slate-50/50 text-neutral-900 ${isAr ? "rtl" : "ltr"}`,
  container: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8 lg:py-16",
  header: "mb-10 border-b border-neutral-200/60 pb-6 text-center rtl:md:text-right ltr:md:text-left",
  title: "text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl",
  description: "mt-2 text-sm text-neutral-500",
  emptyContainer: "flex flex-1 flex-col items-center justify-center space-y-5 rounded-3xl border border-dashed border-neutral-300/80 bg-white p-12 text-center shadow-sm",
  emptyIconWrapper: "flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400",
  emptyMessage: "max-w-md text-base text-neutral-500",
  emptyButton: "inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]",
  ordersList: "space-y-5",
  orderCard: (isExpanded: boolean) =>
    `overflow-hidden rounded-2xl border transition-all duration-200 ${
      isExpanded
        ? "border-neutral-300 bg-white shadow-md ring-1 ring-black/5"
        : "border-neutral-200/80 bg-white hover:border-neutral-300 hover:shadow-sm"
    }`,
  orderButton: "flex w-full flex-wrap items-center justify-between gap-4 p-5 text-start focus:outline-none sm:p-6",
  orderInfoGrid: "flex flex-wrap items-center gap-x-8 gap-y-4",
  fieldLabel: "mb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400",
  fieldValue: "text-sm font-bold text-neutral-900",
  fieldValueRegular: "text-sm font-medium text-neutral-700",
  fieldValueBold: "text-sm font-extrabold text-neutral-900",
  cardHeaderRight: "ms-auto flex items-center gap-4 sm:gap-6",
  statusBadge: (statusClass: string) =>
    `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider ${statusClass}`,
  expandIcon: (isExpanded: boolean) =>
    `h-5 w-5 text-neutral-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,
  expandedGrid: (isExpanded: boolean) =>
    `grid transition-all duration-300 ease-in-out ${
      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`,
  expandedInner: "overflow-hidden",
  expandedContent: "border-t border-neutral-100 bg-neutral-50/50 p-5 pt-4 sm:p-6",
  pricingSpace: "space-y-2.5 rounded-xl border border-neutral-200/60 bg-white p-4 shadow-2xs",
  pricingRow: "flex items-center justify-between text-sm",
  pricingLabel: "text-neutral-500",
  pricingValue: "font-medium text-neutral-900",
  discountValue: "font-semibold text-emerald-600",
  totalPricingRow: "flex items-center justify-between border-t border-neutral-100 pt-2.5",
  totalPricingLabel: "font-semibold text-neutral-900",
  totalPricingValue: "text-base font-bold text-neutral-900",
  itemsBox: "mt-4 rounded-xl border border-neutral-200/60 bg-white p-4 shadow-2xs",
  itemsBoxRow: "flex items-center justify-between",
  itemsBoxLabel: "text-xs font-medium text-neutral-500",
  itemsBoxValue: "text-sm font-semibold text-neutral-900",
  actionContainer: "mt-6 flex justify-end",
  actionButton: "inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]",
};
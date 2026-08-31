export const ordersComponentTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen flex-col bg-[#ffffff] text-[#111827] ${isAr ? "rtl" : "ltr"}`,
  container: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-20 lg:px-10",
  header: "mb-12 border-b border-[#2563eb]/15 pb-6 text-center md:text-left",
  title: "font-sans text-3xl tracking-tight md:text-4xl",
  description: "mt-2 text-xs font-light text-slate-400",
  emptyContainer: "flex flex-1 flex-col items-center justify-center space-y-6 py-20 text-center",
  emptyMessage: "text-sm font-light text-slate-400",
  emptyButton: "rounded-lg border border-[#93c5fd]/40 bg-[#111827] px-8 py-4 text-xs font-semibold normal-case tracking-wide text-[#93c5fd] shadow-sm transition hover:bg-[#1e293b] active:scale-[0.98]",
  ordersList: "space-y-6",
  orderCard: (isExpanded: boolean) =>
    `overflow-hidden rounded-lg border transition-all duration-300 ${
      isExpanded
        ? "border-[#2563eb]/40 bg-white shadow-md"
        : "border-[#2563eb]/15 bg-[#eff6ff]/50 hover:border-[#2563eb]/30"
    }`,
  orderButton: "flex w-full flex-wrap items-center justify-between gap-4 p-6 text-left focus:outline-none",
  orderInfoGrid: "flex flex-wrap items-center gap-x-8 gap-y-4",
  fieldLabel: "mb-1 text-[10px] font-bold normal-case tracking-wide text-[#2563eb]",
  fieldValue: "text-sm font-medium text-[#111827]",
  fieldValueRegular: "text-sm text-slate-700",
  fieldValueBold: "text-sm font-bold text-[#111827]",
  cardHeaderRight: "ml-auto flex items-center gap-6",
  statusBadge: (statusClass: string) =>
    `rounded-lg border px-3 py-1 text-[10px] font-bold normal-case tracking-wide ${statusClass}`,
  expandIcon: (isExpanded: boolean) =>
    `h-5 w-5 text-[#2563eb] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`,
  expandedGrid: (isExpanded: boolean) =>
    `grid transition-all duration-300 ease-in-out ${
      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
    }`,
  expandedInner: "overflow-hidden",
  expandedContent: "mt-2 border-t border-[#2563eb]/15 p-6 pt-4",
  pricingSpace: "space-y-3",
  pricingRow: "flex items-center justify-between text-sm",
  pricingLabel: "text-slate-500",
  pricingValue: "font-medium text-[#111827]",
  discountValue: "font-medium text-green-700",
  totalPricingRow: "flex items-center justify-between border-t border-[#2563eb]/15 pt-3",
  totalPricingLabel: "font-medium text-[#111827]",
  totalPricingValue: "font-sans text-lg font-bold text-[#111827]",
  itemsBox: "mt-6 rounded-lg bg-[#eff6ff] p-4",
  itemsBoxRow: "flex items-center justify-between",
  itemsBoxLabel: "text-xs text-slate-500",
  itemsBoxValue: "text-sm font-semibold text-[#111827]",
  actionContainer: "mt-8 flex justify-end",
  actionButton: "rounded-lg bg-[#111827] px-5 py-2.5 text-[11px] font-semibold normal-case tracking-wide text-[#93c5fd] shadow-sm transition hover:bg-[#1e293b]",
};

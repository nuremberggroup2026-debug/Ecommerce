export const orderDetailsComponentTheme = {
  main: "min-h-screen bg-[#f9f6ef]/60 pb-20 text-[#0c0a07]",
  container: "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12",
  header: "mb-10 flex flex-col gap-4 border-b border-[#b08d57]/15 pb-8",
  backLink: "inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 transition-colors hover:text-[#b08d57]",
  headerFlex: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between",
  titleSpace: "space-y-2",
  titleRow: "flex flex-wrap items-center gap-3",
  orderTitle: "font-serif text-xl tracking-tight text-[#0c0a07] wrap-break-word sm:text-2xl md:text-3xl",
  statusBadge: (statusClass: string) =>
    `rounded-sm border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusClass}`,
  dateText: "text-sm font-medium text-stone-400",
  dotSeparator: "mx-2 text-stone-300",
  gridMain: "grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8",
  leftColumn: "space-y-6 lg:col-span-8",
  rightColumn: "lg:sticky lg:top-8 lg:col-span-4",
};

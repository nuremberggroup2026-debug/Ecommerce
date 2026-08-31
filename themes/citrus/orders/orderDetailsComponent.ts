export const orderDetailsComponentTheme = {
  main: "min-h-screen bg-[#ffffff]/60 pb-20 text-[#0a0a0a]",
  container: "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12",
  header: "mb-10 flex flex-col gap-4 border-b border-[#a3e635]/15 pb-8",
  backLink: "inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-tight text-neutral-500 transition-colors hover:text-[#a3e635]",
  headerFlex: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between",
  titleSpace: "space-y-2",
  titleRow: "flex flex-wrap items-center gap-3",
  orderTitle: "font-sans text-xl tracking-tight text-[#0a0a0a] wrap-break-word sm:text-2xl md:text-3xl",
  statusBadge: (statusClass: string) =>
    `rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-tight ${statusClass}`,
  dateText: "text-sm font-medium text-neutral-400",
  dotSeparator: "mx-2 text-neutral-300",
  gridMain: "grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8",
  leftColumn: "space-y-6 lg:col-span-8",
  rightColumn: "lg:sticky lg:top-8 lg:col-span-4",
};

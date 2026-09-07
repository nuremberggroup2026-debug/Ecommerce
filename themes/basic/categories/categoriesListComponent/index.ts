export const categoriesListTheme = {
  main: "bg-white text-neutral-900 min-h-screen",
  heroSection: "mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-10",
  heroContent: "max-w-2xl space-y-3 text-start",
  title: "text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl",
  description: "text-base sm:text-lg leading-relaxed text-neutral-500 font-normal",
  gridSection: "mx-auto max-w-7xl px-6 pb-28 lg:px-10",
  grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-8",
  card: "group relative overflow-hidden rounded-3xl aspect-[3/4] border border-neutral-200/60 bg-neutral-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 block",
  image: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108",
  overlay: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-95",
  content: "absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end text-start",
  cardTitle: "text-xl sm:text-2xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-0.5",
  exploreLink: (isAr: boolean) =>
    `mt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90 transition-all duration-300 ${
      isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
    }`,
};
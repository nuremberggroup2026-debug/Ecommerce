export const categoriesListTheme = {
  main: "bg-white text-black",
  heroSection: "mx-auto max-w-7xl px-6 py-16 lg:px-10",
  heroContent: "max-w-3xl",
  title: "text-5xl font-semibold tracking-tight md:text-6xl",
  description: "mt-6 text-lg leading-relaxed text-neutral-500",
  gridSection: "mx-auto max-w-7xl mt-10 px-6 pb-24 lg:px-10",
  grid: "grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-6 md:h-137.5",
  card: "group relative block h-full w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md min-h-[260px] md:min-h-0",
  image: "h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105",
  overlay: "absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90",
  content: "absolute inset-0 flex items-end p-6 md:p-8",
  cardTitle: "text-xl font-medium text-white md:text-2xl tracking-tight",
  exploreLink: (isAr: boolean) =>
    `mt-1.5 flex items-center gap-1.5 text-xs font-medium text-white/80 opacity-0 transition-all duration-500 group-hover:opacity-100 ${
      isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
    }`,
};
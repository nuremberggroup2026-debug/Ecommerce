export const categoriesListTheme = {
  main: "bg-white text-black",
  heroSection: "mx-auto max-w-7xl px-6 py-24 lg:px-10",
  heroContent: "max-w-3xl",
  title: "text-5xl font-semibold tracking-tight md:text-6xl",
  description: "mt-6 text-lg leading-relaxed text-neutral-500",
  gridSection: "mx-auto max-w-7xl px-6 pb-24 lg:px-10",
  grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
  card: "group relative overflow-hidden rounded-3xl aspect-square border border-neutral-100 shadow-sm transition-all duration-500 hover:shadow-xl",
  image: "absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110",
  overlay: "absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent",
  content: "absolute inset-x-0 bottom-0 p-6",
  cardTitle: "text-2xl font-medium tracking-tight text-white",
  exploreLink: (isAr: boolean) =>
    `mt-2 flex items-center gap-2 text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:opacity-100 ${
      isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
    }`,
};
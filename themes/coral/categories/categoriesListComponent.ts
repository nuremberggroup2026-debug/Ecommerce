export const categoriesListTheme = {
  main: "bg-[#eefaf8] text-[#0a2e2a]",
  heroSection: "mx-auto max-w-7xl px-6 py-24 lg:px-10",
  heroContent: "max-w-3xl",
  title: "font-sans text-5xl tracking-tight md:text-6xl",
  description: "mt-6 text-lg leading-relaxed text-teal-500",
  gridSection: "mx-auto max-w-7xl px-6 pb-24 lg:px-10",
  grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
  card: "group relative overflow-hidden rounded-2xl aspect-square border border-[#e8674f]/15 shadow-sm transition-all duration-500 hover:shadow-xl",
  image: "absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110",
  overlay: "absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent",
  content: "absolute inset-x-0 bottom-0 p-6",
  cardTitle: "font-sans text-2xl text-[#eefaf8]",
  exploreLink: (isAr: boolean) =>
    `mt-2 flex items-center gap-2 text-sm text-[#f7c9a3]/90 opacity-0 transition-all duration-500 group-hover:opacity-100 ${
      isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
    }`,
};

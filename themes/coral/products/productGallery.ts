export const productGalleryTheme = {
  container: "space-y-4",
  mainImageWrapper: "relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-[#e8674f]/15 bg-[#d9f0ec] shadow-sm",
  mainImage: "object-cover transition-all duration-500",
  wishlistButton: "absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-[#e8674f]/25 shadow-sm",
  wishlistIcon: (inWishlist: boolean) =>
    `h-5 w-5 ${inWishlist ? "fill-red-500 stroke-red-500" : "text-[#0a2e2a]"}`,
  thumbnailsContainer: "flex gap-4",
  thumbnailButton: (isActive: boolean) =>
    `relative aspect-4/5 w-20 overflow-hidden rounded-2xl border ${
      isActive ? "border-[#e8674f] ring-1 ring-[#e8674f]" : "border-[#e8674f]/20 opacity-60"
    }`,
  thumbnailImage: "object-cover",
};

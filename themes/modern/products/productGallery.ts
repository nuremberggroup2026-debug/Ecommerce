export const productGalleryTheme = {
  container: "space-y-4",
  mainImageWrapper: "relative aspect-4/5 w-full overflow-hidden rounded-lg border border-[#2563eb]/15 bg-[#eff6ff] shadow-sm",
  mainImage: "object-cover transition-all duration-500",
  wishlistButton: "absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-[#2563eb]/25 shadow-sm",
  wishlistIcon: (inWishlist: boolean) =>
    `h-5 w-5 ${inWishlist ? "fill-red-500 stroke-red-500" : "text-[#111827]"}`,
  thumbnailsContainer: "flex gap-4",
  thumbnailButton: (isActive: boolean) =>
    `relative aspect-4/5 w-20 overflow-hidden rounded-lg border ${
      isActive ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-[#2563eb]/20 opacity-60"
    }`,
  thumbnailImage: "object-cover",
};

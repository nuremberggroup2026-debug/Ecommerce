export const productGalleryTheme = {
  container: "space-y-4",
  mainImageWrapper: "relative aspect-4/5 w-full overflow-hidden rounded-sm border border-[#b08d57]/15 bg-[#f3ede0] shadow-sm",
  mainImage: "object-cover transition-all duration-500",
  wishlistButton: "absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-[#b08d57]/25 shadow-sm",
  wishlistIcon: (inWishlist: boolean) =>
    `h-5 w-5 ${inWishlist ? "fill-red-500 stroke-red-500" : "text-[#0c0a07]"}`,
  thumbnailsContainer: "flex gap-4",
  thumbnailButton: (isActive: boolean) =>
    `relative aspect-4/5 w-20 overflow-hidden rounded-sm border ${
      isActive ? "border-[#b08d57] ring-1 ring-[#b08d57]" : "border-[#b08d57]/20 opacity-60"
    }`,
  thumbnailImage: "object-cover",
};

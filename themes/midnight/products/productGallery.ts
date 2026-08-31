export const productGalleryTheme = {
  container: "space-y-4",
  mainImageWrapper: "relative aspect-4/5 w-full overflow-hidden rounded-none border border-[#a78bfa]/15 bg-[#130e1a] shadow-sm",
  mainImage: "object-cover transition-all duration-500",
  wishlistButton: "absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-[#a78bfa]/25 shadow-sm",
  wishlistIcon: (inWishlist: boolean) =>
    `h-5 w-5 ${inWishlist ? "fill-red-500 stroke-red-500" : "text-[#f5f2fb]"}`,
  thumbnailsContainer: "flex gap-4",
  thumbnailButton: (isActive: boolean) =>
    `relative aspect-4/5 w-20 overflow-hidden rounded-none border ${
      isActive ? "border-[#a78bfa] ring-1 ring-[#a78bfa]" : "border-[#a78bfa]/20 opacity-60"
    }`,
  thumbnailImage: "object-cover",
};

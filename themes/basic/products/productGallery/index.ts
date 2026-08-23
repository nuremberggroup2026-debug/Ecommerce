export const productGalleryTheme = {
  container: "space-y-4",
  mainImageWrapper: "relative aspect-4/5 w-full overflow-hidden rounded-[32px] border border-neutral-100 bg-neutral-50 shadow-sm",
  mainImage: "object-cover transition-all duration-500",
  wishlistButton: "absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/40 shadow-sm",
  wishlistIcon: (inWishlist: boolean) =>
    `h-5 w-5 ${inWishlist ? "fill-red-500 stroke-red-500" : "text-neutral-600"}`,
  thumbnailsContainer: "flex gap-4",
  thumbnailButton: (isActive: boolean) =>
    `relative aspect-4/5 w-20 overflow-hidden rounded-2xl border ${
      isActive ? "border-black ring-1 ring-black" : "border-neutral-200 opacity-60"
    }`,
  thumbnailImage: "object-cover",
};
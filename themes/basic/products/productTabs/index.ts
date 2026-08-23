export const productTabsTheme = {
  container: "border-t border-neutral-100 pt-6",
  tabsList: "flex gap-6 border-b border-neutral-100 pb-2 text-xs uppercase tracking-wider font-semibold",
  tabButton: (isActive: boolean) =>
    `pb-2 transition-all relative ${
      isActive ? "text-black" : "text-gray-400 hover:text-black"
    }`,
  activeIndicator: "absolute bottom-0 inset-x-0 h-0.5 bg-black",
  contentArea: "py-4 text-xs text-gray-400 font-light leading-relaxed",
  featuresList: "list-disc pl-4 space-y-2",
};
export const productTabsTheme = {
  container: "border-t border-[#b08d57]/15 pt-6",
  tabsList: "flex gap-6 border-b border-[#b08d57]/15 pb-2 text-xs uppercase tracking-wider font-semibold",
  tabButton: (isActive: boolean) =>
    `pb-2 transition-all relative ${
      isActive ? "text-[#0c0a07]" : "text-stone-400 hover:text-[#b08d57]"
    }`,
  activeIndicator: "absolute bottom-0 inset-x-0 h-0.5 bg-[#b08d57]",
  contentArea: "py-4 text-xs text-stone-500 font-light leading-relaxed",
  featuresList: "list-disc pl-4 space-y-2",
};

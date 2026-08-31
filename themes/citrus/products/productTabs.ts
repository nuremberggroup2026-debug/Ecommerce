export const productTabsTheme = {
  container: "border-t border-[#a3e635]/15 pt-6",
  tabsList: "flex gap-6 border-b border-[#a3e635]/15 pb-2 text-xs uppercase tracking-tight font-semibold",
  tabButton: (isActive: boolean) =>
    `pb-2 transition-all relative ${
      isActive ? "text-[#0a0a0a]" : "text-neutral-400 hover:text-[#a3e635]"
    }`,
  activeIndicator: "absolute bottom-0 inset-x-0 h-0.5 bg-[#a3e635]",
  contentArea: "py-4 text-xs text-neutral-500 font-light leading-relaxed",
  featuresList: "list-disc pl-4 space-y-2",
};

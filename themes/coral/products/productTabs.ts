export const productTabsTheme = {
  container: "border-t border-[#e8674f]/15 pt-6",
  tabsList: "flex gap-6 border-b border-[#e8674f]/15 pb-2 text-xs normal-case tracking-normal font-semibold",
  tabButton: (isActive: boolean) =>
    `pb-2 transition-all relative ${
      isActive ? "text-[#0a2e2a]" : "text-teal-400 hover:text-[#e8674f]"
    }`,
  activeIndicator: "absolute bottom-0 inset-x-0 h-0.5 bg-[#e8674f]",
  contentArea: "py-4 text-xs text-teal-500 font-light leading-relaxed",
  featuresList: "list-disc pl-4 space-y-2",
};

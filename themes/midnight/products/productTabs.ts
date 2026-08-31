export const productTabsTheme = {
  container: "border-t border-[#a78bfa]/15 pt-6",
  tabsList: "flex gap-6 border-b border-[#a78bfa]/15 pb-2 text-xs uppercase tracking-wider font-semibold",
  tabButton: (isActive: boolean) =>
    `pb-2 transition-all relative ${
      isActive ? "text-[#f5f2fb]" : "text-violet-300 hover:text-[#a78bfa]"
    }`,
  activeIndicator: "absolute bottom-0 inset-x-0 h-0.5 bg-[#a78bfa]",
  contentArea: "py-4 text-xs text-violet-400 font-light leading-relaxed",
  featuresList: "list-disc pl-4 space-y-2",
};

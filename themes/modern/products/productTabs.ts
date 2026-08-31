export const productTabsTheme = {
  container: "border-t border-[#2563eb]/15 pt-6",
  tabsList: "flex gap-6 border-b border-[#2563eb]/15 pb-2 text-xs normal-case tracking-wide font-semibold",
  tabButton: (isActive: boolean) =>
    `pb-2 transition-all relative ${
      isActive ? "text-[#111827]" : "text-slate-400 hover:text-[#2563eb]"
    }`,
  activeIndicator: "absolute bottom-0 inset-x-0 h-0.5 bg-[#2563eb]",
  contentArea: "py-4 text-xs text-slate-500 font-light leading-relaxed",
  featuresList: "list-disc pl-4 space-y-2",
};

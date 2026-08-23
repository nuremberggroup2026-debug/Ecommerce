export const customerDetailsTheme = {
  section: "",
  form: "space-y-6",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-600",
  optionalLabel: "ml-1 font-normal normal-case tracking-normal text-stone-400",
  input: (hasError: boolean) =>
    `w-full rounded-sm border bg-white px-4 py-3 text-sm text-[#0c0a07] outline-none transition placeholder:text-stone-300 focus:border-[#b08d57] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#b08d57]/25"
    }`,
  textarea: (hasError: boolean) =>
    `w-full resize-none rounded-sm border bg-white px-4 py-3 text-sm text-[#0c0a07] outline-none transition placeholder:text-stone-300 focus:border-[#b08d57] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#b08d57]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  gridRow: "grid grid-cols-1 gap-6 sm:grid-cols-3",
  streetCol: "sm:col-span-2",
  submitSection: "border-t border-[#b08d57]/15 pt-6",
  submitButton: "w-full rounded-sm bg-[#0c0a07] py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#d4b877] shadow-sm transition-all duration-300 hover:bg-[#1a1611] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
};

export const customerDetailsTheme = {
  section: "",
  form: "space-y-6",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-xs font-semibold uppercase tracking-tight text-neutral-600",
  optionalLabel: "ml-1 font-normal normal-case tracking-normal text-neutral-400",
  input: (hasError: boolean) =>
    `w-full rounded-full border bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-neutral-300 focus:border-[#a3e635] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#a3e635]/25"
    }`,
  textarea: (hasError: boolean) =>
    `w-full resize-none rounded-full border bg-white px-4 py-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-neutral-300 focus:border-[#a3e635] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#a3e635]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  gridRow: "grid grid-cols-1 gap-6 sm:grid-cols-3",
  streetCol: "sm:col-span-2",
  submitSection: "border-t border-[#a3e635]/15 pt-6",
  submitButton: "w-full rounded-full bg-[#0a0a0a] py-4 text-[11px] font-medium uppercase tracking-tight text-[#d9f99d] shadow-sm transition-all duration-300 hover:bg-[#1a1a1a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
};

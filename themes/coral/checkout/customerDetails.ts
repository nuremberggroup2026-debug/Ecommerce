export const customerDetailsTheme = {
  section: "",
  form: "space-y-6",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-xs font-semibold normal-case tracking-normal text-teal-600",
  optionalLabel: "ml-1 font-normal normal-case tracking-normal text-teal-400",
  input: (hasError: boolean) =>
    `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#0a2e2a] outline-none transition placeholder:text-teal-300 focus:border-[#e8674f] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#e8674f]/25"
    }`,
  textarea: (hasError: boolean) =>
    `w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm text-[#0a2e2a] outline-none transition placeholder:text-teal-300 focus:border-[#e8674f] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#e8674f]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  gridRow: "grid grid-cols-1 gap-6 sm:grid-cols-3",
  streetCol: "sm:col-span-2",
  submitSection: "border-t border-[#e8674f]/15 pt-6",
  submitButton: "w-full rounded-2xl bg-[#0a2e2a] py-4 text-[11px] font-medium normal-case tracking-normal text-[#f7c9a3] shadow-sm transition-all duration-300 hover:bg-[#072220] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
};

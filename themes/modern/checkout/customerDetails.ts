export const customerDetailsTheme = {
  section: "",
  form: "space-y-6",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-xs font-semibold normal-case tracking-wide text-slate-600",
  optionalLabel: "ml-1 font-normal normal-case tracking-normal text-slate-400",
  input: (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-slate-300 focus:border-[#2563eb] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#2563eb]/25"
    }`,
  textarea: (hasError: boolean) =>
    `w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-slate-300 focus:border-[#2563eb] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#2563eb]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  gridRow: "grid grid-cols-1 gap-6 sm:grid-cols-3",
  streetCol: "sm:col-span-2",
  submitSection: "border-t border-[#2563eb]/15 pt-6",
  submitButton: "w-full rounded-lg bg-[#111827] py-4 text-[11px] font-medium normal-case tracking-wide text-[#93c5fd] shadow-sm transition-all duration-300 hover:bg-[#1e293b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
};

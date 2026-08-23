export const customerDetailsTheme = {
  section: "",
  form: "space-y-6",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-600",
  optionalLabel: "ml-1 font-normal normal-case tracking-normal text-neutral-400",
  input: (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${
      hasError ? "border-red-300 focus:border-red-500" : "border-neutral-200"
    }`,
  textarea: (hasError: boolean) =>
    `w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-neutral-900 ${
      hasError ? "border-red-300 focus:border-red-500" : "border-neutral-200"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  gridRow: "grid grid-cols-1 gap-6 sm:grid-cols-3",
  streetCol: "sm:col-span-2",
  submitSection: "border-t border-neutral-100 pt-6",
  submitButton: "w-full rounded-xl bg-neutral-900 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-sm transition-all duration-300 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
};
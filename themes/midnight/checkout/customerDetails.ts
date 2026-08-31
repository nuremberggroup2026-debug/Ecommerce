export const customerDetailsTheme = {
  section: "",
  form: "space-y-6",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-xs font-semibold uppercase tracking-wider text-violet-200",
  optionalLabel: "ml-1 font-normal normal-case tracking-normal text-violet-300",
  input: (hasError: boolean) =>
    `w-full rounded-none border bg-white px-4 py-3 text-sm text-[#f5f2fb] outline-none transition placeholder:text-violet-300 focus:border-[#a78bfa] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#a78bfa]/25"
    }`,
  textarea: (hasError: boolean) =>
    `w-full resize-none rounded-none border bg-white px-4 py-3 text-sm text-[#f5f2fb] outline-none transition placeholder:text-violet-300 focus:border-[#a78bfa] ${
      hasError ? "border-red-300 focus:border-red-500" : "border-[#a78bfa]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  gridRow: "grid grid-cols-1 gap-6 sm:grid-cols-3",
  streetCol: "sm:col-span-2",
  submitSection: "border-t border-[#a78bfa]/15 pt-6",
  submitButton: "w-full rounded-none bg-[#f5f2fb] py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#3d2b5c] shadow-sm transition-all duration-300 hover:bg-[#e6e0f7] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
};

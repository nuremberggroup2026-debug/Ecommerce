export const registerPageTheme = {
  main: "flex min-h-screen items-center justify-center bg-[#f3ede0]/40 px-4 py-12",
  card: "w-full max-w-lg rounded-sm border border-[#b08d57]/15 bg-white p-8 shadow-sm sm:p-10",
  header: "mb-8 text-center",
  title: "font-serif text-2xl tracking-tight text-[#0c0a07]",
  subtitle: "mt-2 text-sm font-light text-stone-500",
  form: "space-y-5",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-[11px] font-semibold uppercase tracking-wider text-stone-600",
  input: (hasError: boolean) =>
    `w-full rounded-sm border bg-[#f9f6ef] px-4 py-3 text-sm text-[#0c0a07] outline-none transition placeholder:text-stone-300 focus:border-[#b08d57] focus:bg-white ${
      hasError ? "border-red-300" : "border-[#b08d57]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  submitButton: "mt-6 w-full rounded-sm bg-[#0c0a07] py-4 text-[11px] font-bold uppercase tracking-widest text-[#d4b877] transition-all hover:bg-[#1a1611] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
  divider: "my-8 flex items-center",
  dividerLine: "grow border-t border-[#b08d57]/15",
  dividerText: "mx-4 text-xs font-light text-stone-400",
  googleButton: "flex w-full items-center justify-center gap-3 rounded-sm border border-[#b08d57]/25 bg-white py-3.5 text-xs font-semibold text-stone-700 transition hover:bg-[#f3ede0]/50 active:scale-[0.98]",
  googleIcon: "h-4 w-4",
  footerText: "mt-8 text-center text-xs font-light text-stone-500",
  footerLink: "font-medium text-[#b08d57] transition hover:underline",
};
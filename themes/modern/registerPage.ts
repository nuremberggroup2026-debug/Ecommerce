export const registerPageTheme = {
  main: "flex min-h-screen items-center justify-center bg-[#eff6ff]/40 px-4 py-12",
  card: "w-full max-w-lg rounded-lg border border-[#2563eb]/15 bg-white p-8 shadow-sm sm:p-10",
  header: "mb-8 text-center",
  title: "font-sans text-2xl tracking-tight text-[#111827]",
  subtitle: "mt-2 text-sm font-light text-slate-500",
  form: "space-y-5",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-[11px] font-semibold normal-case tracking-wide text-slate-600",
  input: (hasError: boolean) =>
    `w-full rounded-lg border bg-[#ffffff] px-4 py-3 text-sm text-[#111827] outline-none transition placeholder:text-slate-300 focus:border-[#2563eb] focus:bg-white ${
      hasError ? "border-red-300" : "border-[#2563eb]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  submitButton: "mt-6 w-full rounded-lg bg-[#111827] py-4 text-[11px] font-bold normal-case tracking-wide text-[#93c5fd] transition-all hover:bg-[#1e293b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
  divider: "my-8 flex items-center",
  dividerLine: "grow border-t border-[#2563eb]/15",
  dividerText: "mx-4 text-xs font-light text-slate-400",
  googleButton: "flex w-full items-center justify-center gap-3 rounded-lg border border-[#2563eb]/25 bg-white py-3.5 text-xs font-semibold text-slate-700 transition hover:bg-[#eff6ff]/50 active:scale-[0.98]",
  googleIcon: "h-4 w-4",
  footerText: "mt-8 text-center text-xs font-light text-slate-500",
  footerLink: "font-medium text-[#2563eb] transition hover:underline",
};
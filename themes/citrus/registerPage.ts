export const registerPageTheme = {
  main: "flex min-h-screen items-center justify-center bg-[#f7fee7]/40 px-4 py-12",
  card: "w-full max-w-lg rounded-full border border-[#a3e635]/15 bg-white p-8 shadow-sm sm:p-10",
  header: "mb-8 text-center",
  title: "font-sans text-2xl tracking-tight text-[#0a0a0a]",
  subtitle: "mt-2 text-sm font-light text-neutral-500",
  form: "space-y-5",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-[11px] font-semibold uppercase tracking-tight text-neutral-600",
  input: (hasError: boolean) =>
    `w-full rounded-full border bg-[#ffffff] px-4 py-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-neutral-300 focus:border-[#a3e635] focus:bg-white ${
      hasError ? "border-red-300" : "border-[#a3e635]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  submitButton: "mt-6 w-full rounded-full bg-[#0a0a0a] py-4 text-[11px] font-bold uppercase tracking-tight text-[#d9f99d] transition-all hover:bg-[#1a1a1a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
  divider: "my-8 flex items-center",
  dividerLine: "grow border-t border-[#a3e635]/15",
  dividerText: "mx-4 text-xs font-light text-neutral-400",
  googleButton: "flex w-full items-center justify-center gap-3 rounded-full border border-[#a3e635]/25 bg-white py-3.5 text-xs font-semibold text-neutral-700 transition hover:bg-[#f7fee7]/50 active:scale-[0.98]",
  googleIcon: "h-4 w-4",
  footerText: "mt-8 text-center text-xs font-light text-neutral-500",
  footerLink: "font-medium text-[#a3e635] transition hover:underline",
};
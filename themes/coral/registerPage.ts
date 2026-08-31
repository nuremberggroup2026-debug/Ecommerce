export const registerPageTheme = {
  main: "flex min-h-screen items-center justify-center bg-[#d9f0ec]/40 px-4 py-12",
  card: "w-full max-w-lg rounded-2xl border border-[#e8674f]/15 bg-white p-8 shadow-sm sm:p-10",
  header: "mb-8 text-center",
  title: "font-sans text-2xl tracking-tight text-[#0a2e2a]",
  subtitle: "mt-2 text-sm font-light text-teal-500",
  form: "space-y-5",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-[11px] font-semibold normal-case tracking-normal text-teal-600",
  input: (hasError: boolean) =>
    `w-full rounded-2xl border bg-[#eefaf8] px-4 py-3 text-sm text-[#0a2e2a] outline-none transition placeholder:text-teal-300 focus:border-[#e8674f] focus:bg-white ${
      hasError ? "border-red-300" : "border-[#e8674f]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  submitButton: "mt-6 w-full rounded-2xl bg-[#0a2e2a] py-4 text-[11px] font-bold normal-case tracking-normal text-[#f7c9a3] transition-all hover:bg-[#072220] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
  divider: "my-8 flex items-center",
  dividerLine: "grow border-t border-[#e8674f]/15",
  dividerText: "mx-4 text-xs font-light text-teal-400",
  googleButton: "flex w-full items-center justify-center gap-3 rounded-2xl border border-[#e8674f]/25 bg-white py-3.5 text-xs font-semibold text-teal-700 transition hover:bg-[#d9f0ec]/50 active:scale-[0.98]",
  googleIcon: "h-4 w-4",
  footerText: "mt-8 text-center text-xs font-light text-teal-500",
  footerLink: "font-medium text-[#e8674f] transition hover:underline",
};
export const registerPageTheme = {
  main: "flex min-h-screen items-center justify-center bg-neutral-50/50 px-4 py-12",
  card: "w-full max-w-lg rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm sm:p-10",
  header: "mb-8 text-center",
  title: "text-2xl font-bold tracking-tight text-neutral-900",
  subtitle: "mt-2 text-sm font-light text-neutral-500",
  form: "space-y-5",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-[11px] font-semibold uppercase tracking-wider text-neutral-600",
  input: (hasError: boolean) =>
    `w-full rounded-xl border bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-300 focus:border-black focus:bg-white ${
      hasError ? "border-red-300" : "border-neutral-200"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  submitButton: "mt-6 w-full rounded-2xl bg-black py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
  divider: "my-8 flex items-center",
  dividerLine: "grow border-t border-neutral-100",
  dividerText: "mx-4 text-xs font-light text-neutral-400",
  googleButton: "flex w-full items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white py-3.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.98]",
  googleIcon: "h-4 w-4",
  footerText: "mt-8 text-center text-xs font-light text-neutral-500",
  footerLink: "font-medium text-black transition hover:underline",
};
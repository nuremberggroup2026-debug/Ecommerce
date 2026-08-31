export const registerPageTheme = {
  main: "flex min-h-screen items-center justify-center bg-[#130e1a]/40 px-4 py-12",
  card: "w-full max-w-lg rounded-none border border-[#a78bfa]/15 bg-white p-8 shadow-sm sm:p-10",
  header: "mb-8 text-center",
  title: "font-mono text-2xl tracking-tight text-[#f5f2fb]",
  subtitle: "mt-2 text-sm font-light text-violet-400",
  form: "space-y-5",
  fieldWrapper: "space-y-2",
  label: "mb-2 block text-[11px] font-semibold uppercase tracking-wider text-violet-200",
  input: (hasError: boolean) =>
    `w-full rounded-none border bg-[#17121f] px-4 py-3 text-sm text-[#f5f2fb] outline-none transition placeholder:text-violet-300 focus:border-[#a78bfa] focus:bg-white ${
      hasError ? "border-red-300" : "border-[#a78bfa]/25"
    }`,
  errorText: "mt-2 text-xs text-red-500",
  submitButton: "mt-6 w-full rounded-none bg-[#f5f2fb] py-4 text-[11px] font-bold uppercase tracking-widest text-[#3d2b5c] transition-all hover:bg-[#e6e0f7] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
  divider: "my-8 flex items-center",
  dividerLine: "grow border-t border-[#a78bfa]/15",
  dividerText: "mx-4 text-xs font-light text-violet-300",
  googleButton: "flex w-full items-center justify-center gap-3 rounded-none border border-[#a78bfa]/25 bg-white py-3.5 text-xs font-semibold text-violet-100 transition hover:bg-[#130e1a]/50 active:scale-[0.98]",
  googleIcon: "h-4 w-4",
  footerText: "mt-8 text-center text-xs font-light text-violet-400",
  footerLink: "font-medium text-[#a78bfa] transition hover:underline",
};
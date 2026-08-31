export const emptyCartTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen items-center justify-center bg-[#ffffff] ${isAr ? "rtl" : "ltr"}`,
  container: "text-center",
  message: "mb-6 text-slate-400",
  button: "rounded-lg border border-[#93c5fd]/40 bg-[#111827] px-8 py-4 text-xs normal-case tracking-wide text-[#93c5fd] transition hover:bg-[#1e293b]",
};

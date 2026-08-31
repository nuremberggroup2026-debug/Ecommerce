export const emptyCartTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen items-center justify-center bg-[#eefaf8] ${isAr ? "rtl" : "ltr"}`,
  container: "text-center",
  message: "mb-6 text-teal-400",
  button: "rounded-2xl border border-[#f7c9a3]/40 bg-[#0a2e2a] px-8 py-4 text-xs normal-case tracking-normal text-[#f7c9a3] transition hover:bg-[#072220]",
};

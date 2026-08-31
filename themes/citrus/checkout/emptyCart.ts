export const emptyCartTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen items-center justify-center bg-[#ffffff] ${isAr ? "rtl" : "ltr"}`,
  container: "text-center",
  message: "mb-6 text-neutral-400",
  button: "rounded-full border border-[#d9f99d]/40 bg-[#0a0a0a] px-8 py-4 text-xs uppercase tracking-tight text-[#d9f99d] transition hover:bg-[#1a1a1a]",
};

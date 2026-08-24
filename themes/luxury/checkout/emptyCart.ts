export const emptyCartTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen items-center justify-center bg-[#f9f6ef] ${isAr ? "rtl" : "ltr"}`,
  container: "text-center",
  message: "mb-6 text-stone-400",
  button: "rounded-sm border border-[#d4b877]/40 bg-[#0c0a07] px-8 py-4 text-xs uppercase tracking-widest text-[#d4b877] transition hover:bg-[#1a1611]",
};

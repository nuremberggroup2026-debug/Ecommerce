export const emptyCartTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen items-center justify-center bg-[#17121f] ${isAr ? "rtl" : "ltr"}`,
  container: "text-center",
  message: "mb-6 text-violet-300",
  button: "rounded-none border border-[#3d2b5c]/40 bg-[#f5f2fb] px-8 py-4 text-xs uppercase tracking-widest text-[#3d2b5c] transition hover:bg-[#e6e0f7]",
};

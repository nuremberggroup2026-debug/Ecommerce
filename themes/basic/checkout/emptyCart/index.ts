export const emptyCartTheme = {
  main: (isAr: boolean) =>
    `flex min-h-screen items-center justify-center bg-white ${isAr ? "rtl" : "ltr"}`,
  container: "text-center",
  message: "mb-6 text-gray-400",
  button: "rounded-full bg-black px-8 py-4 text-xs uppercase tracking-widest text-white transition hover:bg-neutral-800",
};
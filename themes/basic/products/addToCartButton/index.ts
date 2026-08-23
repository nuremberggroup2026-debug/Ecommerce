export const addToCartButtonTheme = {
  button: (isDisabled: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-widest text-white rounded-2xl shadow-sm transition active:scale-[0.98] ${
      isDisabled
        ? "bg-gray-400 cursor-not-allowed shadow-none"
        : "bg-black hover:bg-neutral-800"
    }`,
};
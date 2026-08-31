export const addToCartButtonTheme = {
  button: (isDisabled: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-widest rounded-none shadow-sm transition active:scale-[0.98] border ${
      isDisabled
        ? "bg-violet-950 text-violet-300 border-violet-950 cursor-not-allowed shadow-none"
        : "bg-[#f5f2fb] text-[#3d2b5c] border-[#3d2b5c]/40 hover:border-[#3d2b5c] hover:bg-[#e6e0f7]"
    }`,
};

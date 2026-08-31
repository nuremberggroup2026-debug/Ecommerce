export const addToCartButtonTheme = {
  button: (isDisabled: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-tight rounded-full shadow-sm transition active:scale-[0.98] border ${
      isDisabled
        ? "bg-neutral-200 text-neutral-400 border-neutral-200 cursor-not-allowed shadow-none"
        : "bg-[#0a0a0a] text-[#d9f99d] border-[#d9f99d]/40 hover:border-[#d9f99d] hover:bg-[#1a1a1a]"
    }`,
};

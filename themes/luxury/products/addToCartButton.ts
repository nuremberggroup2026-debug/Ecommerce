export const addToCartButtonTheme = {
  button: (isDisabled: boolean) =>
    `w-full py-4 text-xs font-semibold uppercase tracking-widest rounded-sm shadow-sm transition active:scale-[0.98] border ${
      isDisabled
        ? "bg-stone-200 text-stone-400 border-stone-200 cursor-not-allowed shadow-none"
        : "bg-[#0c0a07] text-[#d4b877] border-[#d4b877]/40 hover:border-[#d4b877] hover:bg-[#1a1611]"
    }`,
};

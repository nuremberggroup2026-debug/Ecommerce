export const addToCartButtonTheme = {
  button: (isDisabled: boolean) =>
    `w-full py-4 text-xs font-semibold normal-case tracking-normal rounded-2xl shadow-sm transition active:scale-[0.98] border ${
      isDisabled
        ? "bg-teal-200 text-teal-400 border-teal-200 cursor-not-allowed shadow-none"
        : "bg-[#0a2e2a] text-[#f7c9a3] border-[#f7c9a3]/40 hover:border-[#f7c9a3] hover:bg-[#072220]"
    }`,
};

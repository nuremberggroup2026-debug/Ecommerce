export const addToCartButtonTheme = {
  button: (isDisabled: boolean) =>
    `w-full py-4 text-xs font-semibold normal-case tracking-wide rounded-lg shadow-sm transition active:scale-[0.98] border ${
      isDisabled
        ? "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed shadow-none"
        : "bg-[#111827] text-[#93c5fd] border-[#93c5fd]/40 hover:border-[#93c5fd] hover:bg-[#1e293b]"
    }`,
};

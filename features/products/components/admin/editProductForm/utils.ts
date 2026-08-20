export const calculateFinalPrice = (price: number, discount: number) => {
  if (!Number.isFinite(price)) {
    return 0;
  }

  if (!Number.isFinite(discount)) {
    discount = 0;
  }

  return Number(Math.max(0, price - price * (discount / 100)).toFixed(2));
};

export const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

export const labelClass = "text-sm font-medium text-gray-700";

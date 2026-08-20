"use client";

type Props = {
  advancedVariants: boolean;
  onSelectSimple: () => void;
  onSelectAdvanced: () => void;
};

export default function VariantModeSelector({
  advancedVariants,
  onSelectSimple,
  onSelectAdvanced,
}: Props) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2">
      <button
        type="button"
        onClick={onSelectSimple}
        className={`rounded-2xl border p-5 text-left transition ${
          !advancedVariants ? "border-black bg-black text-white" : "bg-white hover:border-black"
        }`}
      >
        <p className="font-semibold">Simple Product</p>

        <p className={`mt-1 text-sm ${!advancedVariants ? "text-white/70" : "text-gray-500"}`}>
          One product with one default variant. You can set price, discount, stock, SKU and
          image.
        </p>
      </button>

      <button
        type="button"
        onClick={onSelectAdvanced}
        className={`rounded-2xl border p-5 text-left transition ${
          advancedVariants ? "border-black bg-black text-white" : "bg-white hover:border-black"
        }`}
      >
        <p className="font-semibold">Advanced Variants</p>

        <p className={`mt-1 text-sm ${advancedVariants ? "text-white/70" : "text-gray-500"}`}>
          Multiple variants with different prices, stock, images and attributes.
        </p>
      </button>
    </div>
  );
}

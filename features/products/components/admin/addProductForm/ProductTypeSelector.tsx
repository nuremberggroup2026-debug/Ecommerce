"use client";

interface ProductTypeSelectorProps {
  advancedVariants: boolean;
  enableAdvancedVariants: () => void;
  disableAdvancedVariants: () => void;
}

export default function ProductTypeSelector({
  advancedVariants,
  enableAdvancedVariants,
  disableAdvancedVariants,
}: ProductTypeSelectorProps) {
  return (
    <section className="rounded-2xl border bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Product Type</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose whether this product has one price/stock or multiple variants.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={disableAdvancedVariants}
          className={`rounded-2xl border p-5 text-left transition ${
            !advancedVariants
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white hover:border-black"
          }`}
        >
          <p className="font-semibold">Simple Product</p>
          <p className={`mt-1 text-sm ${!advancedVariants ? "text-white/70" : "text-gray-500"}`}>
            One product with one price, discount and stock.
          </p>
        </button>

        <button
          type="button"
          onClick={enableAdvancedVariants}
          className={`rounded-2xl border p-5 text-left transition ${
            advancedVariants
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white hover:border-black"
          }`}
        >
          <p className="font-semibold">Advanced Variants</p>
          <p className={`mt-1 text-sm ${advancedVariants ? "text-white/70" : "text-gray-500"}`}>
            Multiple variants with their own price, stock and attributes.
          </p>
        </button>
      </div>
    </section>
  );
}
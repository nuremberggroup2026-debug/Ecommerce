"use client";

import { useFormContext } from "react-hook-form";
import { CreateProductFormType } from "@/server/products/validators";

export default function SubmitButtons() {
  const {
    reset,
    formState: { isSubmitting },
  } = useFormContext<CreateProductFormType>();

  return (
    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
      <button
        type="button"
        onClick={() => reset()}
        disabled={isSubmitting}
        className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Product"}
      </button>
    </div>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PriceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  function applyFilter() {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
      <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-5">
        Price Range
      </h3>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="mb-2 block text-[11px] text-gray-400">
            From
          </label>

          <input
            type="number"
            placeholder="$0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        <span className="pb-3 text-gray-300">—</span>

        <div className="flex-1">
          <label className="mb-2 block text-[11px] text-gray-400">
            To
          </label>

          <input
            type="number"
            placeholder="$500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm outline-none focus:border-black"
          />
        </div>
      </div>

      <button
        onClick={applyFilter}
        className="mt-5 w-full rounded-xl bg-black py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Apply Filter
      </button>
    </div>
  );
}
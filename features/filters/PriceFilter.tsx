"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

export default function PriceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Scoped to the "PriceFilter" namespace from your JSON files
  const t = useTranslations("Product.PriceFilter");

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
    <div className={theme.priceFilter.card}>
      <h3 className={theme.priceFilter.title}>
        {t("TITLE")}
      </h3>

      <div className={theme.priceFilter.inputsRow}>
        <div className={theme.priceFilter.inputWrapper}>
          <label className={theme.priceFilter.label}>
            {t("FROM")}
          </label>

          <input
            type="number"
            placeholder={t("PLACEHOLDER_MIN")}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={theme.priceFilter.input}
          />
        </div>

        <span className={theme.priceFilter.separator}>—</span>

        <div className={theme.priceFilter.inputWrapper}>
          <label className={theme.priceFilter.label}>
            {t("TO")}
          </label>

          <input
            type="number"
            placeholder={t("PLACEHOLDER_MAX")}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={theme.priceFilter.input}
          />
        </div>
      </div>

      <button
        onClick={applyFilter}
        className={theme.priceFilter.applyButton}
      >
        {t("APPLY")}
      </button>
    </div>
  );
}
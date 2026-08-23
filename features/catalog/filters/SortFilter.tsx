"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

export default function SortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Scoped to the "SortFilter" namespace from your JSON files
  const t = useTranslations("Product.SortFilter");

  const value = searchParams.get("sort") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());

    const sort = e.target.value;

    if (!sort) {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className={theme.sortFilter.select}
    >
      <option value="price_asc">{t("PRICE_ASC")}</option>
      <option value="price_desc">{t("PRICE_DESC")}</option>
      <option value="newest">{t("NEWEST")}</option>
      <option value="oldest">{t("OLDEST")}</option>
    </select>
  );
}
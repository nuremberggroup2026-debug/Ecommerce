"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export default function SortFilter({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tProduct = useTranslations("Product");
  const t = useTranslations("Product.SortFilter");

  const value = searchParams.get("sort") || undefined;

  function handleValueChange(sort: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!sort) {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={`ms-auto ${className ?? ""}`}>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="justify-between w-44 sm:w-48 h-9 px-3.5 text-xs font-medium rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs focus:ring-2 focus:ring-neutral-900/10 cursor-pointer">
          <div className="flex items-center gap-2 min-w-0">
            <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
            <SelectValue placeholder={tProduct("SORT_BY").replace(":", "")} />
          </div>
        </SelectTrigger>
        <SelectContent
          position="popper"
          align="end"
          className="w-(--radix-select-trigger-width) rounded-xl text-xs"
        >
          <SelectItem value="price_asc" className="text-xs cursor-pointer">
            {t("PRICE_ASC")}
          </SelectItem>
          <SelectItem value="price_desc" className="text-xs cursor-pointer">
            {t("PRICE_DESC")}
          </SelectItem>
          <SelectItem value="newest" className="text-xs cursor-pointer">
            {t("NEWEST")}
          </SelectItem>
          <SelectItem value="oldest" className="text-xs cursor-pointer">
            {t("OLDEST")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

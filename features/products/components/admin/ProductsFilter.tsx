"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CategoiresNameAndIDs } from "@/features/categories/types";

interface Props {
  categoriesData: CategoiresNameAndIDs[];
}

export default function ProductsFilter({ categoriesData }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";

  const handleApply = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-sm font-medium">Filter products</h2>
        <p className="text-sm text-muted-foreground">
          Filter products by category
        </p>
      </div>

      <Select value={selectedCategory || "all"} onValueChange={handleApply}>
        <SelectTrigger className="w-full bg-background sm:w-[200px]">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>

          {categoriesData.map((category) => (
            <SelectItem key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

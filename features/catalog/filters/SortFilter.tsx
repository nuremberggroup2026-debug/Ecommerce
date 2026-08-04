"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      className="bg-transparent font-medium text-black focus:outline-none"
    >
      <option value="price_asc">Price: Low to High</option>

      <option value="price_desc">Price: High to Low</option>

      <option value="newest">Newest</option>

      <option value="oldest">Oldest</option>
    </select>
  );
}

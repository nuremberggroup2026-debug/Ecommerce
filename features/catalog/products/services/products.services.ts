import { FilteredProductsData } from "@/types";
import type { Product } from "../types";

export function applyPremiumPricing(products: FilteredProductsData) {
  console.log("bilal",products)
  return products.data.map((p) => ({
    ...p,
    price: Math.round(p.variants[0].finalPrice * 1.1),
  }));
}

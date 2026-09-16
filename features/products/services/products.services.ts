import type { GetProductType } from "../types";

export function applyPremiumPricing(products: GetProductType[]) {
  return products.map((p) => ({
    ...p,
    price: Math.round(p.variants[0].finalPrice * 1.1),
  }));
}

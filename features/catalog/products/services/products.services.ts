import type { Product } from "../types";

export function applyPremiumPricing(products: Product[]) {
  return products.map((p) => ({
    ...p,
    price: Math.round(p.price * 1.1),
  }));
}
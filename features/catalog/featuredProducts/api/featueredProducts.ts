import { api } from "@/services/server/api";

import type { Product, ProductsResponse } from "../types";
import { Import } from "lucide-react";
import { API } from "@/constants";

export async function getFeaturedProducts(): Promise<ProductsResponse> {
  return api.get<ProductsResponse>(
    `${API.ENDPOINTS.PRODUCTS}?limit=4&skip=150`,
  );
}

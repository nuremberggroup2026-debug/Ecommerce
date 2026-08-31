import { api } from "@/services/server/api";

import { API } from "@/constants/api";

import type { Locale, ResponseType } from "@/types/index";

import type { Product } from "@/features/products/types";

export type ProductByLocale = {
  productData: {
    id: string;
    productName: string;
    productDescription: string;
    productCardImage: string;
    productImages: string[];
    slug: string;

    categoryName: string;
    categoryDescription: string;
    productVariants: {
      variantId: string;
      attributes: {
        attributeId: string;
        attributeName: string;
        attributeValueId: string;
        attributeValue: string;
      }[];
      stock: number;
      price: number;
      sku: string;
      discountPercentage: number | null;
      finalPrice: number;
      productId: string;
      isDefault: boolean | null;
      variantImage: string | null;
    }[];
  };
  cartItems: {
    quantity: number;
    variantId: string;
    product: Product;
  }[];
  isInWishlist: boolean;
};

export async function fetchProducts(
  locale: Locale,
): Promise<ResponseType<Product[]>> {
  const data = await api.get<ResponseType<Product[]>>(
    `${API.ENDPOINTS.PRODUCTS.ALL_PRODUCTS_BY_LOCALE}/${locale}`,
  );

  return data;
}

export async function getProductBySlug(
  locale: Locale,
  slug: string,
): Promise<ProductByLocale> {
  const result = await api.get<ResponseType<ProductByLocale>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_SLUG_AND_LOCALE}/${locale}?slug=${slug}`,
  );

  console.log("ressss:", result);
  return result.data;
}

export async function adminProductById(
  id: string,
): Promise<ResponseType<Product>> {
  return api.get<ResponseType<Product>>(
    `${API.ENDPOINTS.PRODUCTS.PRODUCT_BY_ID}/${id}`,
  );
}
export async function adminProducts(): Promise<ResponseType<Product[]>> {
  return api.get<ResponseType<Product[]>>(API.ENDPOINTS.PRODUCTS.ALL_PRODUCTS);
}

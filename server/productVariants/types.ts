export type ProductVariantCreateInput = {
  sku: string;
  variantImage?: string | null;
  price: number;
  discountPercentage?: number;
  stock?: number;
  isDefault?: boolean;
  productId: string;
  attributeValueIds?: string[];
};

export type ProductVariantUpdateInput = {
  sku?: string;
  variantImage?: string | null;
  price?: number;
  discountPercentage?: number;
  stock?: number;
  isDefault?: boolean;
  attributeValueIds?: string[];
};

type ProductVariantNestedCreateInput = {
  sku: string;
  variantImage?: string | null;
  price: number;
  discountPercentage?: number;
  stock?: number;
  isDefault?: boolean;
  attributeValueIds?: string[];
};

export type ProductWithVaraintsCreateInput = {
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages?: string[];
  isFeatured: boolean;
  categoryId: string;
  variants: ProductVariantNestedCreateInput[];
};

type ProductVariantNestedUpdateInput = {
  id: string;
  sku: string;
  variantImage?: string | null;
  price: number;
  discountPercentage?: number;
  stock?: number;
  isDefault?: boolean;
  attributeValueIds?: string[];
};

export type ProductWithVaraintsUpdateInput = {
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages?: string[];
  isFeatured: boolean;
  categoryId: string;
  variants: ProductVariantNestedUpdateInput[];
};

export type ProductFilters = {
  page?: number;
  search?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortType;
};

export type SortType =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | undefined;

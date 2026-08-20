export interface ProductCategoryOption {
  id: string;
  categoryNameEn: string;
  categoryNameAr: string;
}

export interface ProductAttributeValueOption {
  id: string;
  attributeId: string;
  attributeValueEn: string;
  attributeValueAr: string;
}

export interface ProductAttributeOption {
  id: string;
  attributeNameEn: string;
  attributeNameAr: string;
  attributeValues: ProductAttributeValueOption[];
}

export interface EditProduct {
  id: string;
  slug: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[];
  categoryId: string;
  isFeatured: boolean;
  startingPrice?: number;

  variants: {
    id?: string;
    sku: string;
    variantImage?: string;
    price: number;
    discountPercentage: number;
    finalPrice: number;
    stock: number;
    isDefault: boolean;
    attributeValueIds: string[];
  }[];
}

export type Props = {
  product: EditProduct;
  categories: ProductCategoryOption[];
  attributes: ProductAttributeOption[];
};

export type VariantFilesMap = Record<string, File | null>;

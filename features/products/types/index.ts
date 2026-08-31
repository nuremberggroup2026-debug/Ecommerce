export type Product = {
  id: string;
  slug: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[];
  categoryId: string;
  createdAt: Date;
  isFeatured: boolean;
  startingPrice: number;

  productVariants: {
    id: string;
    sku: string;
    variantImage: string;
    price: number;
    discountPercentage: number;
    finalPrice: number;
    stock: number;
    isDefault: boolean;
    attributeValueIds: string[];
  }[];
};

export type CreateAdminProduct = {
  slug: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[] | null;
  categoryId: string;
  isFeatured: boolean;
  startingPrice: number;

  variants: {
    price: number;
    discountPercentage: number;
    finalPrice: number;
    stock: number;
    sku: string;
    isDefault: boolean;
    variantImage: string;
    attributeValueIds: string[];
  }[];
};

export type ProductVariants = {
  id: string;
  sku: string;
  variantImage: string | null;
  price: number;
  discountPercentage: number | null;
  finalPrice: number;
  stock: number;
  isDefault: boolean;
  variantAttributeValues: {
    attributeValueId: string;
  }[];
}[];

export type ProductById = {
  id: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[];
  isFeatured: boolean;
  categoryId: string;
  slug: string;
  startingPrice: number;
  createdAt: Date;

  productVariants: ProductVariants;
};

export type CategoiresNameAndIDs = {
  categoryId: string;
  categoryName: string;
};

export type AttributesWithValues = {
  attributeId: string;
  attributeName: string;
  attributeValues: {
    attributeValueId: string;
    attributeValue: string;
  }[];
};

export interface ResponseType<T> {
  messgae: string;
  success: boolean;
  data: T;
}



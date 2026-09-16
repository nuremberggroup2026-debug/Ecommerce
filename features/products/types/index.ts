import { Locale } from "@/types";
import { SortType } from "@/server/products/types";
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

export type SortTypeFront = SortType;

export type ProductsQuery = {
  categories?: string;
  search?: string;
  page: string;
  locale: Locale;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
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

export type GetProductType = {
  id: string;
  productName: string;
  productDescription: string;
  productCardImage: string;
  slug: string;
  categoryName: string;
  variants: {
    price: number;
    discountPercentage: number | null;
    finalPrice: number;
    stock: number;
    id: string;
  }[];
};

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
  }[];
  isInWishlist: boolean;
};

export type FilteredProductsData = {
  products: GetProductType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  productsIdsInWishlist: string[];
  productsIdsInCart: string[];
};

export type ProductsDataWithOutPag = {
  products: GetProductType[];
  productsIdsInWishlist: string[];
  productsIdsInCart: string[];
};

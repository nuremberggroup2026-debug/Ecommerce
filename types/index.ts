import { Prisma, user_role, order_status } from "@/generated/prisma/client";

export type UserRoles = user_role;
export type Locale = "ar" | "en";
export interface ResponseType<T> {
  message: string;
  success: boolean;
  data: T;
}
export interface PutResponseType {
  message: string;
  success: boolean;
}
export interface deleteResponseType {
  message: string;
  success: boolean;
}
export interface AddResponseType {
  message: string;
  success: boolean;
}
export interface ShownResponseType {
  message: string;
  success: boolean;
}

// Banners Types
export type NewBanner = Prisma.bannersCreateInput;
export type UpdateBanner = Prisma.bannersUpdateInput;
export type BannerData = Prisma.bannersGetPayload<{}>;
export type TranslatedBanner = {
  id: string;
  name: string;
  image: string;
};

// Careers types
export type CareersCreateInput = {
  id?: string | undefined;
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  roleEn: string;
  roleAr: string;
  experienceEn: string;
  experienceAr: string;
  requirementsEn?: string[];
  requirementsAr?: string[];
  image: string;
};
export type CareersUpdateInput = Prisma.careersUpdateInput;
export type CareersGetPayload = Prisma.careersGetPayload<{}>;
export type TransalatedCareer = {
  id: string;
  position: string;
  description: string;
  image: string;
  requirements: string[];
  role: string | null;
  experience: string | null;
  slug: string;
};

// Applications Types
export type ApplicationCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  major: string;
  cv: string;
  careerId: string;
};
export type ApplicationUpdateInput = Prisma.applicationsUpdateInput;
export type ApplicationGetPayload = Prisma.applicationsGetPayload<{}>;
export type ApplicationGetPayloadWithCareer = Prisma.applicationsGetPayload<{
  include: {
    careers: {
      select: {
        position_en: true;
        image: true;
      };
    };
  };
}>;

// Categories types
export type CategoriesCreateInput = Prisma.categoriesCreateInput;
export type CategoriesUpdateInput = Prisma.categoriesUpdateInput;
export type TransalatedCategories = {
  id: string;
  image: string;
  createdAt: Date;
  slug: string;
  name: string;
  description: string;
  isFeatured: boolean;
};


// Attribute types
export type AttributeCreateInput = Prisma.attributesCreateInput;
export type AttributeUpdateInput = Prisma.attributesUpdateInput;

// Attribute types
export type AttributeValuesCreateInput = {
  attributeValueEn: string;
  attributeValueAr: string;
  attributeId: string;
};
export type AttributeValuesUpdateInput = Prisma.attribute_valuesUpdateInput;

// Product Variant
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

// Product
export type ProductCreateInput = {
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages?: string[];
  isFeatured: boolean;
  categoryId: string;
};

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

export type ProductUpdateInput = Partial<ProductCreateInput>;

export type ProductFilters = {
  page?: number;
  search?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortType;
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
  }[];
};

export type FilteredProductsData = {
  data: GetProductType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

export type SortType =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | undefined;

// WishList

export type WishlistCreateInput = {
  productId: string;
  userId: string;
};

export type WishlistBodyType = {
  productId: string;
};

// Cart items

export type CartitemCreateInput = {
  variantId: string;
  quantity: number;
};

export type UpdateQuantity = {
  cartItemId: string;
  newQuantity: number;
};

export type DeleteCartItemData = {
  cartItemId: string;
};

// Cart
export type ClearCartData = {
  userId: string;
};

// Order
export type PlaceOrderCreateInputs = {
  email: string;
  phoneNumber: string;
  city: string;
  streetAddress: string;
  buildingNumber: number;
  additionalNote?: string;
  promoCode?: string;
};

export type OrderStatus = order_status;

export type UpdateOrderStatusRequest = {
  status: OrderStatus;
};

// Promo Codes
export type PromoCodeCreateInput = {
  code: string;
  discountPercentage: number;
  maxUsage: number;
  expiresAt?: Date;
  isActive?: boolean;
};

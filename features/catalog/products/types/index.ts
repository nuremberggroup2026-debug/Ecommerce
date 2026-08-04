export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;

  discountPercentage: number;
  rating: number;
  stock: number;

  tags: string[];

  brand?: string;

  sku: string;
  weight: number;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;

  thumbnail: string;
  images: string[];

  reviews: Review[];

  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
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

export interface ResponseType<T> {
  messgae: string;
  success: boolean;
  data: T;
}

export type Locale = "ar" | "en";

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

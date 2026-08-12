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

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
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

export type ProductsDataWithOutPag = {
  products: GetProductType[];
  productsIdsInWishlist: string[];
  productsIdsInCart: string[];
};

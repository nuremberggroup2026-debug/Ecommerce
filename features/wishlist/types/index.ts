export interface ResponseType<T> {
  messgae: string;
  success: boolean;
  data: T;
}

export type WishlistItemsType = {
  itemId: string;
  productId: string;
  productName: string;
  productDescription: string;
  productCardImage: string;
  categoryName: string;
  finalPrice: number;
};

export type Locale = "ar" | "en";

export interface ResponseType<T> {
  messgae: string;
  success: boolean;
  data: T;
}

export type PostResponseType = {
  message: string;
  success: boolean;
  status: number;
};

export type NewCartItem = {
  variantId: string;
  quantity: number;
};

export type CartData = {
  cartId: string;
  totalAmount: number;
  items: {
    cartItemId: string;
    quantity: number;
    itemPrice: number;
    product: {
      id: string;
      name: string;
      image: string;
      slug: string;
    };
    variant: {
      id: string;
      sku: string;
      stock: number;

      attributes: {
        attributeName: string;
        value: string;
        valueId: string;
      }[];
    };
    subtotal: number;
  }[];
};

export type Locale = "ar" | "en";

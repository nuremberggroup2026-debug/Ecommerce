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

export type Cart = CartData;

export interface CartMutationContext {
  previousCart: Cart | undefined;
}

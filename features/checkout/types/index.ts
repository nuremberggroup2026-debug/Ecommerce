import { createOrderFrontendSchema } from "@/server/orders/validators";
import z from "zod";

export type OrderFormDataType = z.infer<
  ReturnType<typeof createOrderFrontendSchema>
>;

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

export type PromoCodeData = {
  code: string;
  discountPercentage: number;
};

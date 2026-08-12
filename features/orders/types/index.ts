import { order_status } from "@/generated/prisma/client";

export interface ResponseType<T> {
  message: string;
  success: boolean;
  data: T;
}

export type Locale = "ar" | "en";

export type OrderStatus = order_status;

export type AllOrdersByUser = {
  id: string;
  createdAt: Date;
  _count: {
    orderItems: number;
  };
  totalAmount: number;
  orderNumber: string;
  status: order_status;
  discountAmount: number;
  subtotal: number;
};

export type OrderByID = {
  orderId: string;
  email: string;
  phoneNumber: string;
  city: string;
  streetAddress: string;
  buildingNumber: number;
  additionalNote: string | null;
  orderNumber: string;
  totalAmount: number;
  discountAmount: number;
  status: order_status;
  createdAt: Date;
  orderItems: {
    orderItemId: string;
    itemPrice: number;
    quantity: number;
    variantImage: string | null;
    productName: string;
  }[];
  promoCodeDetails: {
    promoCodes: {
      code: string;
      discountPercentage: number;
    };
  }[];
};

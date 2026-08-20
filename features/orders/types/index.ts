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
export enum order_status {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  COD = "COD",
  CLIQ = "CLIQ",
}

export type OrderItem = {
  id: string;
  orderId: string;
  variantId: string | null;
  quantity: number;
  itemPrice: number;
  createdAt: Date;
  productNameAr: string;
  productNameEn: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  userId: string | null;
  totalAmount: number;
  email: string;
  phoneNumber: string;
  city: string;
  streetAddress: string;
  buildingNumber: number;
  additionalNote: string | null;
  createdAt: Date;
  status: order_status;
  paymentMethod: PaymentMethod;
  updatedAt: Date;
  discountAmount: number;
  subtotal: number;
  orderItems: OrderItem[];
};

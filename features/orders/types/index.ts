export interface ResponseType<T> {
  message: string;
  success: boolean;
  data: T;
}

export type Locale = "ar" | "en";

export type AllOrdersByUser = {
  id: string;
  createdAt: Date;
  _count: {
    orderItems: number;
  };
  totalAmount: number;
  orderNumber: string;
  status: OrderStatus;
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
  status: OrderStatus;
  paymentMethod: PaymentMethod;
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
export enum OrderStatus {
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
  paymentMethod: PaymentMethod;
  customerEmail: string | undefined;
  createdAt: Date;
  itemsCount: number;
  totalAmount: Number;
  status: OrderStatus;
  updatedAt: Date;
};

export type OrderByIdAdmin = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  email: string;
  phoneNumber: string;
  city: string;
  streetAddress: string;
  buildingNumber: number;
  additionalNote: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  discountAmount: number;
  subtotal: number;
  orderItems: {
    id: string;
    variantId: string | null;
    quantity: number;
    itemPrice: number;
    productNameEn: string;
    productVariants: {
      price: number;
      discountPercentage: number | null;
      finalPrice: number;
      stock: number;
      isDefault: boolean | null;
      sku: string;
      variantImage: string | null;
    } | null;
  }[];
  users: {
    id: string;
    name: string;
    email: string;
  } | null;

  userPromoCodes:
    | {
        promoCodes: {
          code: string;
          discountPercentage: number;
        };
      }[]
    | null;
};

export type AdminOrdersData = {
  orders: Order[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type OrdersFilteration = {
  page: number;
  take?: number;
  customerEmail?: string | null;
  status?: OrderStatus;
  orderNumber?: string | null;
};

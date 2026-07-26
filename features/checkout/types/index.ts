export interface ShippingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface Product {
  id: string | number;
  title: string;
  price: number;
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
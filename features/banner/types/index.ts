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
export type TranslatedBanner = {
  id: string;
  name: string;
  image: string;
};
export interface AdminBanner {
  id: string;
  nameEn: string;
  nameAr: string;
  image: string;
  createdAt: string;
}
export interface PUTAdminBanner {
  nameEn: string;
  nameAr: string;
  image: string;
}
export interface CreateAdminBanner {
  nameEn: string;
  nameAr: string;
  image: string;
}
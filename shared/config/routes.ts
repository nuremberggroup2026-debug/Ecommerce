export const ROUTES = {
  HOME: "/",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  CAREERS: "/careers",
  ABOUT_US: "/about-us",
  WISHLIST: "/wishlist",
  CART: "/cart",
  LOGIN: "/login",
  ORDERS: "/orders",
  CHANGE_PASSWORD: "/change-password",
} as const;

export type RouteKeys = keyof typeof ROUTES;

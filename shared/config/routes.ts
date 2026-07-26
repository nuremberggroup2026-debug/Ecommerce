export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  CART: "/cart",
  ORDERS: "/orders",
  WISHLIST: "/wishlist",
    CATEGORIES: "/categories",

} as const;

export type RouteKeys = keyof typeof ROUTES;
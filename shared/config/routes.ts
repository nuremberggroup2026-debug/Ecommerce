export const ROUTES = {
  HOME: "/",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  CAREERS: "/careers",
  ABOUT_US: "/about-us",
    WISHLIST: "/wishlist",
  CART:"/cart"
  
} as const;

export type RouteKeys = keyof typeof ROUTES;

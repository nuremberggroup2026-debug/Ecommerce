export const ROUTES = {
  HOME: "/",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  CAREERS: "/careers",
  ABOUTUS: "/about-us",
} as const;

export type RouteKeys = keyof typeof ROUTES;

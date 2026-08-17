export const ROUTES = {
  HOME: "/",
  CATEGORIES: "/categories",
  PRODUCTS: "/products",
  CAREERS: "/careers",
  ABOUT_US: "/about-us",
    WISHLIST: "/wishlist",
  NEW_ARRIVALS: "/new_arrivals",
  CART:"/cart"
  
} as const;

export type RouteKeys = keyof typeof ROUTES;

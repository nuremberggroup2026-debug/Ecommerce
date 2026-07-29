export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,

  ENDPOINTS: {
    PRODUCTS: {
      FEATURED_PRODUCTS_BY_LOCALE: "products/featured-products-by-locale",
      ON_DISCOUNT_PRODUCTS_BY_LOCALE: "products/on-discount-products-by-locale",
      ALL_PRODUCTS: "/products",
    },

    CATEGORIES: {
      FEATURED_CATEGORIES_BY_LOCALE: "categories/featured-categories-by-locale",
    },

    USERS: "/users",

    ORDERS: "/orders",
    BANNERS: {
      ALL_BANNERS: "/banners",
      ALL_BANNERS_BY_LOCALE: "banners/all-banners-by-locale",
    },
  },
};

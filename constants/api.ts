export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,

  ENDPOINTS: {
    PRODUCTS: {
      FEATURED_PRODUCTS_BY_LOCALE: "products/featured-products-by-locale",
      ON_DISCOUNT_PRODUCTS_BY_LOCALE: "products/on-discount-products-by-locale",
      ALL_PRODUCTS: "/products",
      FILTERED_PRODUCTS_BY_LOCALE: "products/filtered-products",
      PRODUCT_BY_ID_AND_LOCALE: "products/product-by-id-and-locale",
    },

    CATEGORIES: {
      FEATURED_CATEGORIES_BY_LOCALE: "categories/featured-categories-by-locale",
      ALL_CATEGORIES_BY_LOCALE: "categories/categories-by-locale",
    },

    USERS: "/users",

    ORDERS: "/orders",
    BANNERS: {
      ALL_BANNERS: "/banners",
      ALL_BANNERS_BY_LOCALE: "banners/all-banners-by-locale",
      BANNER_BY_ID: "banners",
    },

    CART_ITEMS: {
      ADD_NEW_ITEM: "cart-items",
    },
    WISHLIST: {
      ADD_NEW_ITEM: "wishlist",
      REMOVE_ITEM: "wishlist",
    },
  },
};

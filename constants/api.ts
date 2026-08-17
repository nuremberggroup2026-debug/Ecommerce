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
      ALL_CATEGORIES: "categories",
      CATEGORY_BY_ID: "categories",
      ADD_CATEGORY: "categories",
      DELETE_MANY_CATEGORIES: "categories/delete-many-categories",
    },
    BANNERS: {
      ALL_BANNERS: "/banners",
      ALL_BANNERS_BY_LOCALE: "banners/all-banners-by-locale",
      BANNER_BY_ID: "banners",
      ADD_BANNERS: "banners",
      DELETE_MANY_BANNERS: "banners/delete-many-banners",
    },
    CAREERS: {
      ALL_CAREERS: "/careers",
      ALL_CAREERS_BY_LOCALE: "careers/careers-by-locale",
      CAREER_BY_SLUG: "careers/career-by-slug",
      CAREER_BY_ID: "careers",

      ADD_CAREER: "careers",
      DELETE_MANY_CAREERS: "careers/delete-many-careers",
      CAREER_BY_SLUG_AND_LOCALE: "careers/career-by-slug-and-locale",
      CAREERS_WITH_APPLICATIONS: "careers/careers-with-applications",
    },

    APPLICATIONS: {
      ALL_APPLICATIONS: "applications",

      APPLICATION_WITH_CAREER_BY_ID:
        "applications/applictions-with-career-by-id",

      DELETE_MANY_APPLICATIONS: "applications/delete-many-applications",

      CAREERS_WITH_APPLICATIONS: "careers/applications-by-career-id",
      APPLICATION_BY_ID: "applications",
      APPLICATIONS_BY_CAREER_ID: "applications/applications-by-career-id",
      MARK_APPLICATION_AS_SHOWN: "applications/mark-application-as-shown",
    },

    ATTRIBUTES: {
      ALL_ATTRIBUTES: "/attributes",
      ALL_ATTRIBUTES_BY_LOCALE: "attributes/all-attributes-by-locale",
      ATTRIBUTE_BY_ID: "attributes",
      ADD_ATTRIBUTES: "attributes",
      DELETE_MANY_ATTRIBUTES: "attributes/delete-many-attributes",
      ATTRIBUTE_VALUES: "attributes-values",
    },
    ATTRIBUTE_VALUES: {
      // Attribute Values
      ALL_ATTRIBUTE_VALUES: "attribute-values",
      ATTRIBUTE_VALUE_BY_ID: "attribute-values",
      ADD_ATTRIBUTE_VALUE: "attribute-values",
      DELETE_ATTRIBUTE_VALUE: "attribute-values",
    },

    USERS: "/users",

    ORDERS: {
      ALL_ORDERS_BY_USER: "orders/all-orders-by-user",
      ORDER_BY_USER_ORDER_ID_AND_LOCALE:
        "orders/order-details-by-user-id-and-locale",
    },

    CART_ITEMS: {
      ADD_NEW_ITEM: "cart-items",
      UPDATE_QUANTITY: "cart-items",
      DELETE_ITEM: "cart-items",
    },
    WISHLIST: {
      ADD_NEW_ITEM: "wishlist",
      REMOVE_ITEM: "wishlist",
      GET_ITEMS_BY_USER: "wishlist/wishlist-by-user-id-and-locale",
    },

    CART: {
      GET_CART_WITH_ITEMS: "cart",
    },
    CHECKOUT: {
      PLACE_AN_ORDER: "orders",
      VALIDATE_PROMO_CODE: "promo-codes/validate-promo-code",
    },
    AUTH: {
      REGISTER: "auth/register",
      VERIFY_EMAIL: "auth/verify-email",
      FORGOT_PASSWORD: "auth/generate-token",
      RESET_PASSWORD: "auth/reset-password",
      CHANGE_PASSWORD: "auth/change-password",
    },
  },
};

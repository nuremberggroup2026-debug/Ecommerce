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
  },
};

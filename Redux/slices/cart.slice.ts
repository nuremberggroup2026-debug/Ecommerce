import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductByLocale } from "@/features/catalog/products/types";

type CartItem = {
  variantId: string;
  quantity: number;
  
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.variantId === action.payload.variantId,
      );

      if (existing) {
        existing.quantity = action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    updateQty: (
      state,
      action: PayloadAction<{
        variantId: string;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(
        (item) => String(item.variantId) === action.payload.variantId,
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => String(item.variantId) !== action.payload,
      );
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => String(i.variantId) === action.payload,
      );

      if (item && item.quantity < item.product.productVariants[0].stock) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => String(i.variantId) === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateQty,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

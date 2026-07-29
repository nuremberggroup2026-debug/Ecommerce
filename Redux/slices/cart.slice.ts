import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/features/catalog/products/types";
import { GetProductType } from "@/types";

type CartItem = {
  product: GetProductType;
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
        (item) => item.product.id === action.payload.product.id,
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
        id: string;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find(
        (item) => String(item.product.id) === action.payload.id,
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => String(item.product.id) !== action.payload,
      );
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => String(i.product.id) === action.payload,
      );

      if (item && item.quantity < item.product.variants.stock) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (i) => String(i.product.id) === action.payload,
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

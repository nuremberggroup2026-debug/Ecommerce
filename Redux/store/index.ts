import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/Redux/slices/counter.slice";
import cartReducer from "@/Redux/slices/cart.slice";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
        cart: cartReducer

    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
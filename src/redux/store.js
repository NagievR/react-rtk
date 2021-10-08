import { configureStore } from "@reduxjs/toolkit";
import proudctsReducer from "./slices/proudctsSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: proudctsReducer,
    cart: cartReducer
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/userSlices";
import restaurentSlices from "./slices/restaurentSlices";
import cartSlices from "./slices/cartSlices";

// Create our store
export const store = configureStore({
  reducer: {
    users: userSlices,
    restaurants: restaurentSlices,
    carts: cartSlices
  }
});

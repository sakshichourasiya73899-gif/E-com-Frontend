import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popupSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
=======
import extraReducer from "./slices/extraSlice";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import productReducer from "./slices/productsSlice";
>>>>>>> 701e9bf349e789c5991dcb89f0a7b70b67dca075
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
<<<<<<< HEAD
    auth: authReducer,
    popup: popupReducer,
    cart: cartReducer,
    product: productReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== "production"
=======
    extra: extraReducer,
    auth: authReducer,
    admin: adminReducer,
    product: productReducer,
    order: orderReducer,
  },
>>>>>>> 701e9bf349e789c5991dcb89f0a7b70b67dca075
});

import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/Cart/cartSlice"
import dropdownReducer from '../features/dropDown/dropDownSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartData: cartReducer,
        dropdown: dropdownReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});
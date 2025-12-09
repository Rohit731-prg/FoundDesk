import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../store/AdminSlice";
import ProductReducer from "../store/ProductSline";

const store = configureStore({
    reducer: {
        admin: AdminReducer,
        product: ProductReducer
    },
});

export default store;
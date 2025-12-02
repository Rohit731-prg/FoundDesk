import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../store/AdminSlice";

const store = configureStore({
    reducer: {
        admin: AdminReducer
    },
});

export default store;
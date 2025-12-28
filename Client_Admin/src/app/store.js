import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../store/AdminSlice";
import ProductReducer from "../store/ProductSline";
import QuestionReducer from "../store/QuestionSlice";

const store = configureStore({
    reducer: {
        admin: AdminReducer,
        product: ProductReducer,
        question: QuestionReducer
    },
});

export default store;
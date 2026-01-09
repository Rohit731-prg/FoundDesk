import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../store/AdminSlice";
import ProductReducer from "../store/ProductSline";
import QuestionReducer from "../store/QuestionSlice";
import claimReducer from "../store/ClaimSlice";

const store = configureStore({
    reducer: {
        admin: AdminReducer,
        product: ProductReducer,
        question: QuestionReducer,
        claim: claimReducer
    },
});

export default store;
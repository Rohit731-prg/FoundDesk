import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../store/AdminSlice";
import ProductReducer from "../store/ProductSline";
import QuestionReducer from "../store/QuestionSlice";
import claimReducer from "../store/ClaimSlice";
import StudentReducer from "../store/StudentSlice";

const store = configureStore({
    reducer: {
        admin: AdminReducer,
        product: ProductReducer,
        question: QuestionReducer,
        claim: claimReducer,
        student: StudentReducer,
    },
});

export default store;
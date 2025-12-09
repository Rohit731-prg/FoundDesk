import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./ProductThunk";

const initialState = {
    loading: true,
    products: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                console.log("Products fetching fullfilled");
                state.loading = false;
                state.products = action.payload.items;
            })
            .addCase(getAllProducts.pending, (state) => {
                console.log("Products fetching pending");
                state.loading = true;
            })
            .addCase(getAllProducts.rejected, (state) => {
                console.log("Products fetching rejected");
                state.loading = false;
                state.products = [];
            })
    }
});

export default productSlice.reducer;
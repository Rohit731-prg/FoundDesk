import { createSlice } from "@reduxjs/toolkit";
import { getAllClaims } from "./ClaimThunk";

const initialState = {
    loading: false,
    claims: []
}

export const claimReducer = createSlice({
    name: "claim",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllClaims.pending, (state) => {})
            .addCase(getAllClaims.fulfilled, (state, action) => {
                state.claims = action.payload;
            })
            .addCase(getAllClaims.rejected, (state) => {})
    }
});

export default claimReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { deleteClaim, getAllClaims, updateClaimStatus } from "./ClaimThunk";

const initialState = {
    loading: false,
    claims: [],
    claim: null
}

export const claimReducer = createSlice({
    name: "claim",
    initialState,
    reducers: {
        setClaim: (state, action) => {
            state.claim = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllClaims.pending, (state) => {})
            .addCase(getAllClaims.fulfilled, (state, action) => {
                console.log(action.payload)
                state.claims = action.payload;
            })
            .addCase(getAllClaims.rejected, (state) => {})

            .addCase(deleteClaim.pending, (state) => {})
            .addCase(deleteClaim.rejected, (state) => {})
            .addCase(deleteClaim.fulfilled, (state) => {
                state.loading = false;
                state.claim = null;
            })

            .addCase(updateClaimStatus.pending, (state) => {})
            .addCase(updateClaimStatus.fulfilled, (state) => {
                state.loading = false;
                state.claim = null;
            })
            .addCase(updateClaimStatus.rejected, (state) => {})
    }
});

export const { setClaim } = claimReducer.actions;
export default claimReducer.reducer;
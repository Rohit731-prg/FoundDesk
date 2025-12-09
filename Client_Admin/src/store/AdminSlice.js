import { createSlice } from "@reduxjs/toolkit";
import { loginFunction } from "./AdminThunk";

const initialState = {
  loading: true,
  admin: null,
  employees: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
           .addCase(loginFunction.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.admin);
            state.admin = action.payload.admin;
          })
          .addCase(loginFunction.pending, (state) => {
            state.loading = true;
          })
          .addCase(loginFunction.rejected, (state) => {
            state.loading = false;
          })
  }
});

export const { login, setEmployees } = adminSlice.actions;
export default adminSlice.reducer;

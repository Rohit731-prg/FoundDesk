import { createSlice } from "@reduxjs/toolkit";
import { addNewAdmin, getAllAdmis, loginFunction } from "./AdminThunk";

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
            state.admin = action.payload.admin;
          })
          .addCase(loginFunction.pending, (state) => {
            state.loading = true;
          })
          .addCase(loginFunction.rejected, (state) => {
            state.loading = false;
          })


          .addCase(getAllAdmis.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getAllAdmis.fulfilled, (state, action) => {
            state.employees = action.payload;
            state.loading = false
          })
          .addCase(getAllAdmis.rejected, (state, action) => {
            state.loading = true;
          })


          .addCase(addNewAdmin.pending, (state, action) => {
            state.loading = true
          })
          .addCase(addNewAdmin.fulfilled, (state, action) => {
            state.loading = false;
          })
          .addCase(addNewAdmin.rejected, (state, action) => {
            state.loading = false;
          })
  }
});

export const { login, setEmployees } = adminSlice.actions;
export default adminSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axios";
import { toast } from "sonner";

const initialState = {
  admin: null,
  employees: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    login: async (state, action) => {
      try {
        const promise = axiosInstance.post("/admin/login", action.payload);

        toast.promise(promise, {
          loading: "Loading...",
          success: (res) => res.data.message,
          error: (err) => err?.response?.data?.message || "Login failed",
        });

        const response = await promise;
        state.admin = response.data.admin;
        console.log(state.admin);
      } catch (error) {
        console.log(error);
      }
    },

    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const { login, setEmployees } = adminSlice.actions;
export default adminSlice.reducer;

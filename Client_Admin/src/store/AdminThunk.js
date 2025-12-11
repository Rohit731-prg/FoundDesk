import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axios";
import { toast } from "sonner";

export const loginFunction = createAsyncThunk(
    "admin/login",
    async (data, { rejectWithValue }) => {
        try {
            const promise = axiosInstance.post("/admin/login", data);

            toast.promise(promise, {
                loading: "Loading...",
                success: (res) => "Login successful",
                error: (err) => err?.response?.data?.message || "Login failed",
            });

            const res = await promise;
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

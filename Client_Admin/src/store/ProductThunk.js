import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axios";
import { toast } from "sonner";

export const getAllProducts = createAsyncThunk(
    "item/getAllItems",
    async (data, { }) => {
        try {
            const promise = axiosInstance.get("/item/getAllItems");

            toast.promise(promise, {
                loading: "Loading...",
                success: (res) => "Products fetched successfully",
                error: (err) => err?.response?.data?.message || "Login failed",
            });

            const res = await promise;
            console.log("Fetched products:", res.data.items);
            return res.data;
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    }
);

export const postNewProduct = createAsyncThunk(
    "item/createItem",
    async (data, { rejectWithValue }) => {
        try {
            const promise = axiosInstance.post("/item/createItem", data);

            toast.promise(promise, {
                loading: "Loading...",
                success: (res) => res.data.message,
                error: (err) => err?.response?.data?.message || "Login failed",
            });

            const res = await promise;
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);
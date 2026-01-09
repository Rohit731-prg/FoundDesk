import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axios";

export const getAllClaims = createAsyncThunk(
    "claim/getAllClaims",
    async () => {
        try {
            const response = axiosInstance.get("claim/getAllClaims");
            toast.promise(response, {
                loading: "loading...",
                success: "Claims fetch successfully !",
                error: (err) => err.response.data.message || err.message || "Internal Server error"
            });
            const res = await response;
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log("Error from getAllClaims function:", error)
        }
    }
)
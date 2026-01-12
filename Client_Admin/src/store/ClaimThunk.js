import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axios";
import { toast } from "sonner";

export const getAllClaims = createAsyncThunk(
    "claim/getAllClaims",
    async () => {
        try {
            const response = axiosInstance.get(`claim/getAllClaims`);
            toast.promise(response, {
                loading: "loading...",
                success: "Claims fetch successfully !",
                error: (err) => err.response.data.message || err.message || "Internal Server error"
            });
            const res = await response;
            console.log(res.data.claims)
            return res.data.claims;
        } catch (error) {
            console.log("Error from getAllClaims function:", error)
        }
    }
);

export const deleteClaim = createAsyncThunk(
    "claim/deleteClaim",
    async (id, { dispatch }) => {
        try {
            const response = axiosInstance.delete(`claim/deleteClaim/${id}`);
            toast.promise(response, {
                loading: "loading...",
                success: (res) => res.data.message || "Claim deleted successfully !",
                error: (err) => err.response.data.message || err.message || "Internal Server error"
            });
            const res = await response;
            dispatch(getAllClaims());
            return res.data;
        } catch (error) {
            console.log("Error from deleteClaim function:", error)
        }
    }
);

export const updateClaimStatus = createAsyncThunk(
    "claim/updateClaimStatus",
    async ({ id, status }, { dispatch }) => {
        try {
            const response = axiosInstance.put(`claim/changeStatus/${id}`, { status });
            toast.promise(response, {
                loading: "loading...",
                success: (res) => res.data.message || "Claim status updated successfully !",
                error: (err) => err.response.data.message || err.message || "Internal Server error"
            });
            const res = await response;
            dispatch(getAllClaims());
            return res.data;
        } catch (error) {
            console.log("Error from updateClaimStatus function:", error)
        }
    }
)
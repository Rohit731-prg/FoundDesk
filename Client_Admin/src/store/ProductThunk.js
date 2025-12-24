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
                error: (err) => err?.response?.data?.message || "import failed",
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
    async (data, { dispatch }) => {
        try {
            const newForm = new FormData();
            newForm.append("title", data.title);
            newForm.append("description", data.description);
            newForm.append("category", data.category);
            newForm.append("location", data.location);
            newForm.append("image", data.image);
            console.log(data.title);
            const promise = axiosInstance.post("/item/createItem", newForm, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.promise(promise, {
                loading: "Loading...",
                success: (res) => res.data.message,
                error: (err) => err?.response?.data?.message || "create failed",
            });

            await promise;
            dispatch(getAllProducts());
            return true;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "item/deleteItem",
    async (id, { dispatch }) => {
        try {
            const promise = axiosInstance.delete(`/item/deleteItem/${id}`);

            toast.promise(promise, {
                loading: "Loading...",
                success: (res) => res.data.message,
                error: (err) => err?.response?.data?.message || "delete failed",
            });

            await promise;
            dispatch(getAllProducts());
            return true;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateProductStatus = createAsyncThunk(
    "item/updateItem",
    async (data, { dispatch }) => {
        try {
            const promise = axiosInstance.put(`/item/updateItem/${data.id}`, data);

            toast.promise(promise, {
                loading: "Loading...",
                success: (res) => res.data.message,
                error: (err) => err?.response?.data?.message || "update failed",
            });

            await promise;
            dispatch(getAllProducts());
            return true;
        } catch (error) {
            console.log(error);
        }
    }
)
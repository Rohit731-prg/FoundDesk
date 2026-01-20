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

export const getAllAdmis = createAsyncThunk(
    "admin/getAll",
    async () => {
        try {
            console.log("function called")
            const response = axiosInstance.get("/admin/getAllAdmis");
            toast.promise(response, {
                loading: "Loading...",
                success: "Admis fetch succussfully...!",
                error: (err) => err.response.data.message || err.message || "Internal Server Error"
            });
            const admins = await response;
            console.log("admins: ", admins);
            return admins.data.admins;
        } catch (error) {
            console.log("Error from getAllAdmins: ", error)
        }
    }
)

export const addNewAdmin = createAsyncThunk(
    "admin/create",
    async (data, { dispatch }) => {
        try {
            const formdata = new FormData();
            formdata.append("name", data.name);
            formdata.append("email", data.email);
            formdata.append("phone", data.phone);
            formdata.append("adminID", data.adminID);
            formdata.append("password", data.password);
            formdata.append("role", data.role);
            formdata.append("image", data.image);
            const response = axiosInstance.post("/admin/signup", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            toast.promise(response, {
                loading: "loading...",
                success: (res) => res.data.message || "Admin added successfully...",
                error: (err) => err.response.data.message || err.message || "Internal Server Error"
            });

            await response;
            dispatch(getAllAdmis());
        } catch (error) {
            console.log("Error form add memner: ", error);
        }
    }
)
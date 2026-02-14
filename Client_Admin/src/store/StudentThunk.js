import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axios";
import { toast } from "sonner";

export const getAllStudentsThunk = createAsyncThunk(
    "students/getAllStudents",
    async () => {
        try {
            const response = axiosInstance.get("/user/getAllStudents");
            toast.promise(response, {
                loading: "Fetching students...",
                success: "Students fetched successfully!",
                error: (err) => err.response?.data?.message || err.message || "Internal Server Error",
            });
            const res = await response;
            console.log("response", res.data.students);
            return res.data.students;
        } catch (error) {
            console.log("Error fetching students:", error);
        }
    }
);

export const terminateStudent = createAsyncThunk(
    "students/terminate",
    async (id, { dispatch }) => {
        try {
            const response = axiosInstance.delete(`/admin/terminate/${id}`);
            toast.promise(response, {
                loading: "Terminating student...",
                success: "Student terminated successfully!",
                error: (err) => err.response?.data?.message || err.message || "Internal Server Error",
            });
            await response;
            dispatch(getAllStudentsThunk());
        } catch (error) {
            console.log("Error terminating student:", error);
        }
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Utils/axios";
import { toast } from "sonner";

export const getAllStudents = createAsyncThunk(
    "question/getAllStudnets",
    async () => {
        try {
            const response = axiosInstance.get("question/getStudents");
            toast.promise(response, {
                loading: "loading...",
                success: "Students fetch successfully !",
                error: (err) => err.response.data.message || err.message || "Internal Server error"
            });

            const res = await response;
            return res.data;
        } catch (error) {
            console.log("Error from getSudents: ", error);
        }
    }
);

export const getQuestionsByStudentID = createAsyncThunk(
    "question/getAllQuestion",
    async (id) => {
        try {
            const response = axiosInstance.get(`question/getAllQuestions/${id}`);
            toast.promise(response, {
                loading: "loading...",
                success: "Questions fetch successfully !",
                error: (err) => err.response.data.message || err.message || "Internal Server error"
            });
            const res = await response;
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log("Error from getAllQuestion function:", error)
        }
    }
)
import { createSlice } from "@redux/toolkit";
import axiosInstance from "../Utils/axios";

const initialState = {
    admin: null,
    employees: [],
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: async (state, action) => {
            try {
                const admin = await axiosInstance.post("/admin/signup", action.payload);
                state.admin = admin.data;
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

export const { setAdmin, setEmployees } = adminSlice.actions;
export default adminSlice.reducer;
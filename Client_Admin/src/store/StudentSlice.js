import { createSlice } from "@reduxjs/toolkit";
import { getAllStudentsThunk } from "./StudentThunk";

const initialState = {
    students: [],
    loading: false,
};

export const StudentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllStudentsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllStudentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(getAllStudentsThunk.rejected, (state, action) => {
                state.loading = false;
            })
    }
});

export default StudentSlice.reducer;
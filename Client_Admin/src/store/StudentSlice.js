import { createSlice } from "@reduxjs/toolkit";
import { getAllStudentsThunk, terminateStudent } from "./StudentThunk";

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

            .addCase(terminateStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(terminateStudent.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(terminateStudent.rejected, (state) => {
                state.loading = false;
            })
    }
});

export default StudentSlice.reducer;
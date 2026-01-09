import { createSlice } from "@reduxjs/toolkit";
import { getAllStudents, getQuestionsByStudentID, replyQuestion } from "./QuestionThunk";

const initialState = {
    loading: false,
    students: [],
    studentDetails: null,
    questions: null,
    question: null
}

export const questionReducer = createSlice({
    name: "question",
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            state.question = action.payload
        },
        setStudent: (state, action) => {
            state.studentDetails = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload.students;
            })
            .addCase(getAllStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllStudents.rejected, (state) => {
                state.loading = false;
            })

            .addCase(getQuestionsByStudentID.pending, (state, action) => {
                //
            })
            .addCase(getQuestionsByStudentID.fulfilled, (state, action) => {
                console.log("Slice: ", action.payload)
                state.questions = action.payload;
                console.log("state: ", state.questions)
            })
            .addCase(getQuestionsByStudentID.rejected, (state, action) => {
                //
            })

            .addCase(replyQuestion.pending, (state, action) => {})
            .addCase(replyQuestion.fulfilled, (state, action) => {
                console.log("Slice: ", action.payload)
                state.question = {...state.question, answer: action.payload};
            })
            .addCase(replyQuestion.rejected, (state, action) => {})
    }
});

export const { setQuestion, setStudent } = questionReducer.actions;
export default questionReducer.reducer;
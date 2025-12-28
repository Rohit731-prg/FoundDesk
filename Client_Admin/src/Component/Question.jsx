import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudents,
  getQuestionsByStudentID,
} from "../store/QuestionThunk";
import { setQuestion, setStudent } from "../store/QuestionSlice";

function Question() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.question.students);
  const questions = useSelector((state) => state.question.questions);
  const questionDetails = useSelector((state) => state.question.question);
  const studentDetails = useSelector((state) => state.question.studentDetails);

  const fetchData = async () => {
    if (students.length == 0) {
      dispatch(getAllStudents());
    }
  };

  const fetchQuestion = async (student) => {
    dispatch(setStudent(student.student))
    dispatch(getQuestionsByStudentID(student.student?._id));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <aside className="p-10">
        <p className="text-4xl font-bold">Manage Students Questions here </p>

        <main className="flex flex-row gap-5 mt-10">
          <section className="w-1/3">
            {students ? (
              <div>
                {students.map((student) => (
                  <div
                    onClick={() => fetchQuestion(student)}
                    key={student?._id}
                    className="flex flex-row gap-3 items-center py-2 border-b-2 border-black"
                  >
                    <img
                      src={student?.student?.image}
                      alt=""
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-normal">
                        {student.student.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {student.student.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </section>

          <section>
            {questions ? (
              <div>
                {questions.map((question) => (
                  <div
                    key={question._id}
                    onClick={() => dispatch(setQuestion(question))}
                  >
                    <p>Question: {question.question}</p>
                    <p className="">
                      Ansure:{" "}
                      <span
                        className={`${
                          !question.answer ? "text-red-400" : "text-blue-400"
                        } font-medium`}
                      >
                        {question.answer
                          ? question.answer
                          : "No answer has provide"}
                      </span>
                    </p>
                    <p className="text-[12px] text-slate-600">
                      {question.createdAt.split("T")[0]}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </section>

          <section>{questionDetails ? <div>
                <img src={studentDetails.image} alt="" />
                <div>
                    <p>{studentDetails.name}</p>
                    <p>{studentDetails.email}</p>
                </div>

                <div>
                    <p>Question: </p>
                </div>
          </div> : <div></div>}</section>
        </main>
      </aside>
    </div>
  );
}

export default Question;

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudents,
  getQuestionsByStudentID,
  replyQuestion,
} from "../store/QuestionThunk";
import { setQuestion, setStudent } from "../store/QuestionSlice";
import { FaPen } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { Toaster } from "sonner";

function Question() {
  const [reply, setReply] = useState("");
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
    dispatch(setStudent(student.student));
    dispatch(getQuestionsByStudentID(student.student?._id));
  };

  const setReplyHandler = async (id) => {
    dispatch(replyQuestion({ question: id, reply: reply }));
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <aside className="p-10 w-full">
        {/* Header */}
        <p className="text-3xl font-semibold text-gray-800">
          Manage Student Questions
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Review and respond to student queries efficiently
        </p>

        <main className="flex flex-row gap-10 mt-8">
          {/* Students List */}
          <section className="w-1/4 bg-white rounded-xl border shadow-sm">
            <p className="px-5 py-3 text-sm font-semibold text-gray-700 border-b">
              Students
            </p>

            {students ? (
              <div className="divide-y">
                {students.map((student) => (
                  <div
                    onClick={() => fetchQuestion(student)}
                    key={student?._id}
                    className="flex gap-3 items-center px-5 py-4 cursor-pointer hover:bg-gray-100 transition"
                  >
                    <img
                      src={student?.student?.image}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {student.student.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {student.student.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 text-sm text-gray-500">
                No students available
              </div>
            )}
          </section>

          {/* Questions List */}
          <section className="w-1/4 bg-white rounded-xl border shadow-sm">
            <p className="px-5 py-3 text-sm font-semibold text-gray-700 border-b">
              Questions
            </p>

            {questions ? (
              <div className="divide-y">
                {questions.map((question) => (
                  <div
                    key={question._id}
                    onClick={() => dispatch(setQuestion(question))}
                    className="px-5 py-4 cursor-pointer hover:bg-gray-100 transition"
                  >
                    <p className="text-sm text-gray-800 font-medium truncate">
                      {question.question}
                    </p>

                    <p className="text-xs mt-1">
                      Answer:
                      <span
                        className={`ml-1 font-semibold ${
                          question.answer ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {question.answer ? "Provided" : "Pending"}
                      </span>
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      {question.createdAt.split("T")[0]}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 text-sm text-gray-500">
                Select a student to view questions
              </div>
            )}
          </section>

          {/* Question Details */}
          <section className="w-2/4">
            {questionDetails ? (
              <div className="bg-white border rounded-xl shadow-sm">
                {/* Student Info */}
                <div className="px-8 py-5 flex items-center gap-4 border-b">
                  <img
                    src={studentDetails.image}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {studentDetails.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {studentDetails.email}
                    </p>
                  </div>
                </div>

                {/* Question + Answer */}
                <div className="p-6">
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    Question
                  </p>
                  <p className="text-sm text-gray-700 mb-6">
                    {questionDetails.question}
                  </p>
                  
                  {questionDetails.answer && (
                    <>
                      <p className="text-sm font-medium text-gray-800 mb-4">
                        Answer
                      </p>
                      <p className="text-sm text-gray-700 mb-6">
                        {questionDetails.answer}
                      </p>
                    </>
                  )}

                  <div className="flex items-center gap-3">
                    <FaPen className="text-gray-500" />
                    <input
                      type="text"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write your answer here..."
                      className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => setReplyHandler(questionDetails._id)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <IoMdSend />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-500">
                Select a question to view details
              </div>
            )}
          </section>
        </main>
      </aside>
      <Toaster />
    </div>
  );
}

export default Question;

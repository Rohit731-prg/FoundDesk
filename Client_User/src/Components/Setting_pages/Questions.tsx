import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import useUserStore from '../../Store/UserStore';
import useQuestionStore from '../../Store/QuestionStore';
import { useEffect, useState } from 'react';
import { Toaster } from "sonner";
import { MdDeleteOutline } from "react-icons/md";

function Questions() {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { questions, getAllQuestions, askQuestion } = useQuestionStore();
    const [model, setModel] = useState(false);
    const [question, setQuestion] = useState('');

    const handelSubmit = () => {
        askQuestion(question);
        setQuestion('');
        setModel(false);
    };

    useEffect(() => {
        getAllQuestions();
    }, []);
    return (
        <div className="p-5 relative">

            <button onClick={() => navigate('/setting')}>
                <FaLongArrowAltLeft />
            </button>
            {model && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 transition-opacity"
                        onClick={() => setModel(false)}
                    />

                    {/* Modal */}
                    <div className="relative z-10 w-[90%] max-w-md rounded-xl bg-white p-5 shadow-lg">
                        <button
                            onClick={() => setModel(false)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>

                        <form onSubmit={handelSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Ask your question..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}


            <div className='mt-3 flex flex-row gap-2 '>
                <img src={user?.image} alt="" className='w-20 h-20 rounded-full object-cover' />
                <div>
                    <p className='mt-2 text-lg font-medium'>{user?.name}</p>
                    <p className='text-sm text-gray-500'>{user?.email}</p>
                </div>
            </div>

            <button onClick={() => setModel(!model)} className='mt-3 py-3 w-full bg-blue-500 text-white font-semibold rounded-full'>
                Ask a New Question
            </button>

            <div className='p-3'>
                <p className='text-lg font-semibold'>Your Previous Questions</p>

                {questions ? (
                    <div>
                        {questions.map((question) => (
                            <div key={question._id} className='mt-3 border-b border-gray-300 flex flex-row items-center justify-between py-2'>
                                <div>
                                    <p className='text-md text-gray-600'><span className='text-black font-medium'>Question: </span>{question.question}</p>
                                    <p className={`text-sm ${question.answer ? 'text-gray-500' : 'text-red-400'}`}><span className='text-black font-medium mt-1'>Answer: </span>{question.answer ? question.answer : 'No answer yet'}</p>
                                </div>
                                <button className='p-2 bg-rose-200 text-red-500 rounded-full'>
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className='text-center text-md mt-5 text-gray-500'>No questions found</p>
                    </div>
                )}
            </div>
            <Toaster />
        </div>
    )
}

export default Questions
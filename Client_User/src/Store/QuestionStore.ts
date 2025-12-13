import { axiosIntance } from '@/Utils/axiosInstance';
import type { QuestionInterface } from '@/Utils/interfaces';
import { create } from 'zustand'
import useUserStore from './UserStore';

type Store = {
  questions: null | [QuestionInterface],
  question: null | QuestionInterface,

  getAllQuestions: () => Promise<void>
}

const useQuestionStore = create<Store>()((set) => ({
  questions: null,
  question: null,

  getAllQuestions: async () => {
    try {
        const id = useUserStore.getState().user?._id
        const response = await axiosIntance.get(`/question/getAllQuestions/${id}`);
        set({ questions: response?.data.questions });
    } catch (error) {
        console.log(error as Error);
    }
  }
}));

export default useQuestionStore;
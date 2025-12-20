import { axiosIntance } from '../Utils/axiosInstance';
import type { QuestionInterface } from '../Utils/interfaces';
import { create } from 'zustand'
import useUserStore from './UserStore';
import { toast } from 'sonner';

type Store = {
  questions: null | [QuestionInterface],
  question: null | QuestionInterface,

  getAllQuestions: () => Promise<void>
  askQuestion: (question: string) => Promise<void>
}

const useQuestionStore = create<Store>()((set, get) => ({
  questions: null,
  question: null,

  getAllQuestions: async () => {
    try {
        const id = useUserStore.getState().user?._id
        const response = await axiosIntance.get(`/question/getAllQuestions/${id}`);
        console.log(response.data);
        set({ questions: response?.data });
    } catch (error) {
        console.log(error as Error);
    }
  },

  askQuestion: async (question: string) => {
      const response = axiosIntance.post("/question/askQuestion", { question });
      toast.promise(response, {
          loading: "Asking question...",
          success: (res: any) => res.data.message,
          error: (err: any) =>
            err?.response?.data?.message || "Failed to ask question",
        });
      await response;
      get().getAllQuestions();
  }
}));

export default useQuestionStore;
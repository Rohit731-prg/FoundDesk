import { create } from 'zustand'
import type { userStoreInterface } from '../Utils/storeInterface';
import type { loginInterface } from '../Utils/interfaces';
import { toast } from "react-toastify";
import { axiosIntance } from '../Utils/axiosInstance';


type Store = {
  user: userStoreInterface | null,
  loginUser: (user: loginInterface) => void
}

const useUserStore = create<Store>()((set, get) => ({
  user: null,

  loginUser: async (user: loginInterface) => {
    console.log(user);
    try {
        const response = await axiosIntance.post("/user/login", user);
        console.log(response);
        set({ user: response.data.user });
        toast.success("Login successful");
    } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
    }
  }
}));

export default useUserStore;
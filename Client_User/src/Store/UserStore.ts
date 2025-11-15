import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { userStoreInterface } from '../Utils/storeInterface';
import type { loginInterface } from '../Utils/interfaces';
import { toast } from "react-toastify";
import { axiosIntance } from '../Utils/axiosInstance';

type Store = {
  user: userStoreInterface | null,
  loginUser: (user: loginInterface) => Promise<boolean | undefined>,
  logoutUser: () => Promise<boolean | undefined>
}

const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,

      loginUser: async (user: loginInterface) => {
        try {
          const response = await axiosIntance.post("/user/login", user);
          set({ user: response.data.user });
          toast.success("Login successful");
          return true;
        } catch (error) {
          console.log(error);
          toast.error((error as Error).message);
          return false;
        }
      },

      logoutUser: async () => {
        try {
          await axiosIntance.get("/user/logout");
          set({ user: null });
          toast.success("Logout successful");
          return true;
        } catch (error) {
          console.log(error);
          toast.error((error as Error).message);
          return false;
        }
      }
    }),

    {
      name: "user-store", // key name in localStorage
      partialize: (state) => ({ user: state.user }) // only persist user
    }
  )
);

export default useUserStore;

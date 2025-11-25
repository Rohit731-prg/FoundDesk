import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { userStoreInterface } from '../Utils/storeInterface';
import type { loginInterface, signUpInterface } from '../Utils/interfaces';
import { toast } from "react-toastify";
import { axiosIntance } from '../Utils/axiosInstance';

type Store = {
  user: userStoreInterface | null,

  signUp: (user: signUpInterface) => Promise<boolean | undefined>,
  loginUser: (user: loginInterface) => Promise<boolean | undefined>,
  logoutUser: () => Promise<boolean | undefined>
}

const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,

      signUp: async (user: signUpInterface) => {
        try {
          const newDataForm = new FormData();
          newDataForm.append("name", user.name);
          newDataForm.append("email", user.email);
          newDataForm.append("collage_id", user.collage_id);
          newDataForm.append("password", user.password);
          newDataForm.append("confirm_password", user.confirm_password);
          newDataForm.append("image", user.image as File);
          newDataForm.append("role", "student");
          const response = await axiosIntance.post("/user/signup", newDataForm);
          toast.success(response.data.message);
          return true;
        } catch (error) {
          console.log(error);
          toast.error((error as Error).message);
          return false;
        }
      },

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

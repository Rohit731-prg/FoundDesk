import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { userStoreInterface } from '../Utils/storeInterface';
import type { loginInterface, signUpInterface } from '../Utils/interfaces';
import { axiosIntance } from '../Utils/axiosInstance';
import { toast } from "sonner";

type Store = {
  user: userStoreInterface | null,

  signUp: (user: signUpInterface) => Promise<boolean | undefined>,
  loginUser: (user: loginInterface) => Promise<boolean | undefined>,
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>,
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
          const response = axiosIntance.post("/user/signup", newDataForm);

          toast.promise(response, {
            loading: "Signing up...",
            success: (res: any) => res.data.message,
            error: (err: any) =>
              err?.response?.data?.message || "Failed to sign up",
          })
          return true;
        } catch (error) {
          console.log(error);
          toast.error((error as Error).message);
          return false;
        }
      },

      loginUser: async (user: loginInterface) => {
        try {
          const response = axiosIntance.post("/user/login", user);

          toast.promise(response, {
            loading: "Logging in...",
            success: (res: any) => res.data.message,
            error: (err: any) =>
              err?.response?.data?.message || "Failed to login",
          })
          const resolvedResponse = await response;
          set({ user: resolvedResponse.data.user });
          toast.success("Login successful");
          return true;
        } catch (error) {
          console.log(error);
          toast.error((error as any)?.response?.data?.message || "Login failed");
          return false;
        }
      },

      updatePassword: async (oldPassword: string, newPassword: string) => {
        try {
          const promise = axiosIntance.put("/user/updatePassword", {
            oldPassword,
            newPassword,
          });

          toast.promise(promise, {
            loading: "Updating password...",
            success: (res: any) => res.data.message,
            error: (err: any) =>
              err?.response?.data?.message || "Failed to update password",
          });
          const response = await promise;
          console.log("Password update response:", response);
          set({ user: response?.data?.user });
        } catch (error) {
          console.log("Password update error:", error);
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

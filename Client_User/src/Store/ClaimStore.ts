import type { claimInterface, RequestClaimInterface } from '../Utils/interfaces';
import { create } from 'zustand'
import { toast } from 'sonner';
import { axiosIntance } from '../Utils/axiosInstance';

type Store = {
  claim: null | claimInterface,
  claims: null | [claimInterface],
  requestClaim: (request: RequestClaimInterface) => Promise<boolean>,
  getAllClaim: () => Promise<void>
}

const useClaimStore = create<Store>()((set) => ({
  claim: null,
  claims: null,
  requestClaim: async (request: RequestClaimInterface) => {
    console.log("function is called")
    if (request.proof == null) {
      toast.error("Upload the file");
      console.log("function is reversed");

      return false
    }
    const newFormData = new FormData();
    newFormData.append("proof", request.proof);
    newFormData.append("item_id", request.item_id);
    try {
      const response = axiosIntance.post("claim/claimItem", newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.promise(response, {
        loading: "Claiming the request...",
        success: (res: any) => res.data.message,
        error: (err: any) =>
          err?.response?.data?.message || "Internal Server Error",
      });
      await response;
      console.log(response)
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  },

  getAllClaim: async () => {
    try {
      const response = await axiosIntance.get("claim/getAllClaims");
      console.log(response.data.claims)
      set({ claims: response.data.claims });
    } catch (error) {
      console.log(error);
      set({ claims: null });
    }
  }
}));

export default useClaimStore
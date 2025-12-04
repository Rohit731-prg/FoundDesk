import type { claimInterface, RequestClaimInterface } from '@/Utils/interfaces';
import { create } from 'zustand'
import { toast } from 'sonner';
import { axiosIntance } from '@/Utils/axiosInstance';

type Store = {
  claim: null | claimInterface,
  requestClaim: (request: RequestClaimInterface) => void
}

const useClaimStore = create<Store>()((set) => ({
  claim: null, 

  requestClaim: async (request: RequestClaimInterface) => {
    const newFormData = new FormData();
    newFormData.append("item_id", request.item_id);
    newFormData.append("proof", request.proof);

    try {
        const response = axiosIntance.post("claim/claimItem", newFormData);
        toast.promise(response, {
            loading: "Claiming the request...",
            success: (res: any) => res.data.message,
            error: (err: any) =>
              err?.response?.data?.message || "Internal Server Error",
        });
        await response;
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useClaimStore
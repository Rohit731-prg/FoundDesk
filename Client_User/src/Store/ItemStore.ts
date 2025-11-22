import { create } from 'zustand'
import type { itemIterface } from '../Utils/interfaces';

type Store = {
    item: itemIterface | null
    items: itemIterface[] | [],
    getAllItems: () => void
}

const useItemStore = create<Store>()((set) => ({
    item: null,
    items: [],

    getAllItems: async () => {
        try {
            
        } catch (error) {
            
        }
    }
}));

export default useItemStore;
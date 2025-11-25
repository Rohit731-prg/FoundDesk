import { create } from 'zustand'
import type { itemIterface } from '../Utils/interfaces';
import { axiosIntance } from '../Utils/axiosInstance';

type Store = {
    item: itemIterface | null
    items: itemIterface[] | [],
    getAllItems: () => void,
    filterItems: (category: string) => void
    setItem: (item: itemIterface) => void
}

const useItemStore = create<Store>()((set, get) => ({
    item: null,
    items: [],

    getAllItems: async () => {
        try {
            const response = await axiosIntance.get("/item/getAllItems");
            console.log(response.data.items);
            set({ items: response.data.items });
        } catch (error) {
            console.log(error as Error);
        }
    },

    filterItems: async (category: string) => {
        try {
            if ( category == "All" ) {
                get().getAllItems();
                return;
            }
            const response = await axiosIntance.post("/item/getAllItemsByFilter", {category});
            console.log(response.data.items);
            set({ items: response.data.items });
        } catch (error) {
            set({ items: [] });
            console.log(error as Error);
        }
    },

    setItem: (item: itemIterface) => set({ item }),
}));

export default useItemStore;
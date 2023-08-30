import { create, GetState } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import moment from "moment";

export const useAppStore = create(
  persist(
    (set, get) => ({
      setToken: (token) => set({ ...get(), token: token }),
    }),
    {
      name: "howmuch-persist-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

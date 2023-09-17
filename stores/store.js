import { create, GetState } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAppStore = create(
  persist(
    (set, get) => ({
      token: "",
      refreshToken: "",
      setRefreshToken: (token) => set({ ...get(), refreshToken: refreshToken }),
      setToken: (token) => set({ ...get(), token: token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "howmuch-persist-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// export const useAppStore = create(
//   persist(
//     (set) => ({
//       token: null, // 토큰 상태
//       login: (token) => set({ token }), // 로그인 함수
//       logout: () => set({ token: null }), // 로그아웃 함수
//     }),
//     {
//       name: "auth-store", // 저장소 이름
//       version: 1, // 저장소 버전
//     }
//   )
// );

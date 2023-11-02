import { create, GetState } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { API } from "./api";
import { useNavigation } from "@react-navigation/native";

export const useAppStore = create(
  persist(
    (set, get) => ({
      token: "",
      refreshToken: "",
      name: "",
      phoneNumber: null,
      phoneExisted: false,
      expiredTime: null,
      userProfileImg: "",
      userType: "",
      isTermsAgreeAll: false,
      isPrivacyPolicyAgreeAll: false,
      isPrivacyCollectAgreeAll: false,
      isMarketingAlertAgree: false,
      isCoachModalState: true,
      clearAll: () =>
        set({
          ...get(),
          token: "",
          refreshToken: "",
          name: "",
          phoneNumber: null,
          phoneExisted: false,
          expiredTime: null,
          userProfileImg: "",
          userType: "",
          isTermsAgreeAll: false,
          isPrivacyPolicyAgreeAll: false,
          isPrivacyCollectAgreeAll: false,
          isMarketingAlertAgree: false,
          isCoachModalState: true,
        }),
      setPhoneNumber: (phoneNumber) => set({ ...get(), phoneNumber: phoneNumber }),
      setPhoneExisted: (phoneExisted) => set({ ...get(), phoneExisted: phoneExisted }),
      setUserProfileImg: (userProfileImg) => set({ ...get(), userProfileImg: userProfileImg }),
      setUserType: (userType) => set({ ...get(), userType: userType }),
      setIsTermsAgreeAll: (isTermsAgreeAll) => set({ ...get(), isTermsAgreeAll: isTermsAgreeAll }),
      setIsPrivacyPolicyAgreeAll: (isPrivacyPolicyAgreeAll) => set({ ...get(), isPrivacyPolicyAgreeAll: isPrivacyPolicyAgreeAll }),
      setIsPrivacyCollectAgreeAll: (isPrivacyCollectAgreeAll) => set({ ...get(), isPrivacyCollectAgreeAll: isPrivacyCollectAgreeAll }),
      setIsMarketingAlertAgree: (isMarketingAlertAgree) => set({ ...get(), isMarketingAlertAgree: isMarketingAlertAgree }),
      setIsCoachModalState: (isCoachModalState) => set({ ...get(), isCoachModalState: isCoachModalState }),
      setRefreshToken: (refreshToken) => set({ ...get(), refreshToken: refreshToken }),
      setToken: (token) => set({ ...get(), token: token }),
      setExpiredTime: (time) => set({ ...get(), expiredTime: time }),
      setName: (name) => set({ ...get(), name: name }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "howmuch-persist-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// export const checkAndUpdateToken = async () => {
//   const { expiredTime, token, refreshToken, setToken, setExpiredTime, setRefreshToken } = useAppStore.getState();
//   const currentTime = moment();

//   if (expiredTime && currentTime.isBefore(expiredTime)) {
//     console.log(expiredTime);
//     try {
//       const response = await API.post(`/user/reissue`, null, {
//         headers: {
//           Authorization: token,
//           "Refresh-Token": refreshToken,
//         },
//       });

//       const data = response.data;

//       const newToken = data["accessToken"]; // 새로운 토큰 값
//       const newRefreshToken = data["refreshToken"];
//       const newExpiredTime = moment().add(1, "hour"); // 1시간 뒤의 시간으로 설정

//       setToken(newToken);
//       setRefreshToken(newRefreshToken);
//       setExpiredTime(newExpiredTime);
//     } catch (error) {
//       console.error("토큰 갱신 중 오류 발생:", error);
//     }
//   }
// };

// export const checkAndUpdateToken = async () => {
//   const token = useAppStore((state) => state.token);
//   const refreshToken = useAppStore((state) => state.refreshToken);
//   const setToken = useAppStore((state) => state.setToken);
//   const setRefreshToken = useAppStore((state) => state.setRefreshToken);
//   const setExpiredTime = useAppStore((state) => state.setExpiredTime);
//   const clearToken = useAppStore((state) => state.clearToken);
//   const currentTime = moment();
//   const navigation = useNavigation();

//   // if (expiredTime && currentTime.isBefore(expiredTime)) {
//   console.log(refreshToken);
//   try {
//     const response = await API.post(`/user/reissue`, null, {
//       headers: {
//         Authorization: token,
//         "Refresh-Token": refreshToken,
//       },
//     });

//     const data = response.data;
//     const newToken = data["accessToken"];
//     const newRefreshToken = data["refreshToken"];
//     const newExpiredTime = moment().add(1, "hour");

//     setToken(newToken);
//     setRefreshToken(newRefreshToken);
//     setExpiredTime(newExpiredTime);

//     // 토큰을 갱신한 후에도 API 인터셉터에 새로운 토큰을 설정
//     API.defaults.headers.Authorization = newToken;
//   } catch (error) {
//     console.error("토큰 갱신 중 오류 발생:", error);
//     clearToken();
//     navigation.reset({ routes: [{ name: "Login" }] });
//     throw error;
//   }
//   // }
// };

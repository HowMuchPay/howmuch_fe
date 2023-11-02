import axios from "axios";
import { useAppStore } from "./store";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { checkAndUpdateToken } from "./updateToken";

const API_ENDPOINT = "http://43.200.225.232:8080";

const API = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000 * 5, // 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 토큰이 만료되었다면 토큰을 갱신합니다.
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { token, refreshToken, setToken, setRefreshToken, setExpiredTime, clearToken } = useAppStore.getState();
          const navigation = useNavigation();

          await checkAndUpdateToken(token, refreshToken, setToken, setRefreshToken, setExpiredTime, clearToken, navigation);
          isRefreshing = false;
          return API.request(error.config);
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류 발생:", refreshError);
        }
      }
    } else {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { API };

import axios from "axios";
import { checkAndUpdateToken, useAppStore } from "./store";

const API_ENDPOINT = "http://43.200.225.232:8080";

const API = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000 * 3, // 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 토큰이 만료되었다면 토큰을 갱신합니다.
    if (error.response && error.response.status === 403) {
      await checkAndUpdateToken();

      return API.request(error.config);
    }

    return Promise.reject(error);
  }
);

export { API };

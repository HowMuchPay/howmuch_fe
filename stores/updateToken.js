import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "./store";
import moment from "moment";
import { API } from "./api";

export const checkAndUpdateToken = async (token, refreshToken, setToken, setRefreshToken, setExpiredTime, clearToken, navigation) => {
  const currentTime = moment();
  //   const navigation = useNavigation();

  // if (expiredTime && currentTime.isBefore(expiredTime)) {
  console.log(refreshToken);
  try {
    const response = await API.post(`/user/reissue`, null, {
      headers: {
        Authorization: token,
        "Refresh-Token": refreshToken,
      },
    });

    const data = response.data;
    const newToken = data["accessToken"];
    const newRefreshToken = data["refreshToken"];
    const newExpiredTime = data["expiredTime"];

    setToken(newToken);
    setRefreshToken(newRefreshToken);
    setExpiredTime(newExpiredTime);

    console.log("updatetokendata", data);
    // 토큰을 갱신한 후에도 API 인터셉터에 새로운 토큰을 설정
    API.defaults.headers.Authorization = newToken;
  } catch (error) {
    console.error("토큰 갱신 중 오류 발생2:", error);
    clearToken();
    // navigation.reset({ routes: [{ name: "Login" }] });
    throw error;
  }
  // }
};

import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as KakaoLogin from "@react-native-seoul/kakao-login";
import { login, getProfile } from "@react-native-seoul/kakao-login";

import { useAppStore } from "../../stores/store";
import { API } from "../../stores/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const signInWithKakao = async () => {
  const token = await login();
  return token;
};

export default function LoginScreen() {
  const [token, setToken] = useAppStore((state) => [state.token, state.setToken]);
  const [phoneExisted, setPhoneExisted] = useAppStore((state) => [state.phoneExisted, state.setPhoneExisted]);

  const [refreshToken, setRefreshToken] = useAppStore((state) => [state.refreshToken, state.setRefreshToken]);

  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleKakaoLogin = () => {
    setIsLoading(true);
    (async () => {
      setErrorMsg(null);
      const kakaotoken = await signInWithKakao();
      console.log("kakaotoken", kakaotoken);

      const kakaoProfile = await getProfile();
      console.log("kakaoProfile", kakaoProfile);
      console.log("img", kakaoProfile.profileImageUrl);
      let phone_num = kakaoProfile.phoneNumber;
      // 예를 들어 phone_num가 +82 10-3433-5673 일때 이걸 01034335673 이렇게 만들기
      if (phone_num) {
        // phone_num 빈 칸 지우기
        phone_num = phone_num.replace(/ /g, "");
        // phone_num에 -가 있으면 지우기
        phone_num = phone_num.replace(/-/g, "");
        // if phone_num starts with +82, remove it
        if (phone_num.startsWith("+82")) {
          phone_num = phone_num.slice(3);
        }
        // 10 로 시작하면 010으로 바꾸기
        if (phone_num.startsWith("10")) {
          phone_num = "0" + phone_num;
        }
      }

      if (kakaotoken && kakaotoken.accessToken) {
        const name = kakaoProfile.nickname;
        useAppStore.setState({ name }); // 이름 설정
        const body = {
          oauthId: kakaoProfile.id,
          nickname: kakaoProfile.nickname,
          profileImageUrl: kakaoProfile.profileImageUrl,
        };
        const response = await API.post(`/login/kakao`, body);

        const data = response.data;

        console.log("data", data);
        console.log("img", kakaoProfile.profileImageUrl);
        if (data["accessToken"]) {
          setToken(data["accessToken"]);
          setRefreshToken(data["refreshToken"]);
          setPhoneExisted(data["phoneExisted"]);
          console.log("access", data["accessToken"]);
          console.log("refresh", data["refreshToken"]);
          console.log("phoneExisted", data["phoneExisted"]);

          // setRefreshToken(data["refreshToken"]);
          // AsyncStorage.setItem("authToken", data["accessToken"]);
          // AsyncStorage.setItem("refreshToken", data["refreshToken"]);
        }
      }
    })()
      .catch((err) => {
        console.log(err);
        setErrorMsg("로그인에 실패했습니다. " + err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const cleanPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      // 빈 칸 지우기
      phoneNumber = phoneNumber.replace(/ /g, "");
      // - 지우기
      phoneNumber = phoneNumber.replace(/-/g, "");
      // +82로 시작하면 0으로 바꾸기
      if (phoneNumber.startsWith("+82")) {
        phoneNumber = "0" + phoneNumber.slice(3);
      }
      // 10으로 시작하면 010으로 바꾸기
      if (phoneNumber.startsWith("10")) {
        phoneNumber = "0" + phoneNumber;
      }
    }
    return phoneNumber;
  };

  useEffect(() => {
    if (token) {
      if (phoneExisted === true) {
        navigation.navigate("Drawer");
      } else {
        navigation.navigate("LoginPhoneNumScreen");
      }
    }
  }, [token, phoneExisted]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="auto" />

      <Image style={styles.logo} source={require(".././../assets/images/logo1.png")} />
      {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("Drawer");
        }}
      > */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (!isLoading) handleKakaoLogin();
        }}
      >
        <Image style={styles.kakao} source={require(".././../assets/images/kakaotalk.png")} />
        <Text style={styles.kakaoText}>카카오톡으로 시작하기</Text>
      </TouchableOpacity>
      {/* <View style={styles.joinContainer}>
        <Text style={styles.joinText}>회원가입</Text>
        <Text style={styles.joinText}>|</Text>
        <Text style={styles.joinText}>로그인</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 96,
    height: 28,
    marginBottom: 70,
  },
  buttonContainer: {
    width: 335,
    height: 56,
    backgroundColor: "#fee500",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 50,
  },
  kakao: {
    width: 40,
    height: 40,
  },
  kakaoText: {
    fontFamily: "font-B",
    fontSize: 14,
  },
  joinContainer: {
    width: 125,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  joinText: {
    fontFamily: "font-R",
    fontSize: 14,
    color: "#5F5F5F",
  },
});

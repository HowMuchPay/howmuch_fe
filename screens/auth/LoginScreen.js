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
  const [phoneNumber, setPhoneNumber] = useAppStore((state) => [state.phoneNumber, state.setPhoneNumber]);
  const [refreshToken, setRefreshToken] = useAppStore((state) => [state.refreshToken, state.setRefreshToken]);
  const [userType, setUserType] = useAppStore((state) => [state.userType, state.setUserType]);
  const [userProfileImg, setUserProfileImg] = useAppStore((state) => [state.userProfileImg, state.setUserProfileImg]);

  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleKakaoLogin = () => {
    setIsLoading(true);
    (async () => {
      setErrorMsg(null);
      const kakaotoken = await signInWithKakao();

      const kakaoProfile = await getProfile();
      // console.log("kakaoProfile", kakaoProfile);
      // console.log("img", kakaoProfile.profileImageUrl);
      let phone_num = kakaoProfile.phoneNumber;

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

        // console.log("data", data);
        // console.log("img", kakaoProfile.profileImageUrl);
        if (data["accessToken"]) {
          setToken(data["accessToken"]);
          setRefreshToken(data["refreshToken"]);
          setPhoneNumber(data["phoneNumber"]);
          setUserType(data["roleType"]);
          setUserProfileImg(kakaoProfile.profileImageUrl);

          // console.log("access", data["accessToken"]);
          // console.log("refresh", data["refreshToken"]);
          console.log("userdata", data);

          if (data["phoneNumber"] == null) {
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginPhoneNumScreen" }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "Drawer" }],
            });
          }
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

  // useEffect(() => {
  //   if (token) {
  //     console.log("phone", phoneNumber);
  //     if (phoneNumber == null) {
  //       navigation.reset({ routes: [{ name: "LoginPhoneNumScreen" }] });
  //     } else {
  //       navigation.reset({ routes: [{ name: "Drawer" }] });
  //     }
  //   }
  // }, [token, phoneNumber]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="auto" />

      <Image style={styles.logo} source={require(".././../assets/images/logo1.png")} />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (!isLoading) handleKakaoLogin();
        }}
      >
        <Image style={styles.kakao} source={require(".././../assets/images/kakaotalk.png")} />
        <Text style={styles.kakaoText}>카카오톡으로 시작하기</Text>
      </TouchableOpacity>
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
    width: "90%",
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

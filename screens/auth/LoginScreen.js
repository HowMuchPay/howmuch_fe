import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as KakaoLogin from "@react-native-seoul/kakao-login";
import { login, getProfile } from "@react-native-seoul/kakao-login";

import { useAppStore } from "../../stores/store";
import { API } from "../../stores/api";

const signInWithKakao = async () => {
  const token = await login();
  return token;
};

export default function LoginScreen() {
  const [token, setToken] = useAppStore((state) => [state.token, state.setToken]);
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
        const body = {
          phone_num: phone_num,
        };
        const response = await API.get(`/login/callback/kakao?code=`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        // const response = await API.post(`/user/reissue`, body, {
        //   headers: {
        //     Authorization: kakaotoken.accessToken,
        //   },
        // });
        const data = response.data;

        // console.log("data", data)
        if (data["has_user"]) {
          setToken(data["token"]["access_token"]);
        } else if (data["access_token"]) {
          setToken(data["access_token"]);
        } else {
          throw setErrorMsg("로그인에 실패했습니다. " + JSON.stringify(data));
        }
      } else setErrorMsg("로그인에 실패했습니다. 정보를 가져올 수 없습니다.");
    })()
      .catch((err) => {
        // console.log(err);
        setErrorMsg("로그인에 실패했습니다. " + err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (token) navigation.navigate("Drawer");
  }, [token]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require(".././../assets/images/logo1.png")} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("Drawer");
        }}
      >
        {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (!isLoading) handleKakaoLogin();
        }}
      > */}
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

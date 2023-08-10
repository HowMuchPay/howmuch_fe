import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import * as KakaoLogins from "@react-native-seoul/kakao-login";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     clientId: 'edb8647a8a046e4f9c835ca0036fba22',
  //     redirectUri: 'http://localhost:19000',
  //     scopes: ['profile_nickname', 'profile_image'],
  //   },
  //   { authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize' }
  // );

  // const handleKakaoLogin = () => {
  //   promptAsync();
  // };

  // useEffect(() => {
  //   if (response !== null) {
  //     console.log(response);
  //   }
  // }, [response]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require(".././../assets/images/logo1.png")}
      />
      {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("Drawer");
        }}
      > */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("KakaoLogin");
        }}
      >
        <Image
          style={styles.kakao}
          source={require(".././../assets/images/kakaotalk.png")}
        />
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

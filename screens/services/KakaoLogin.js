import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import WebView from "react-native-webview";
import axios from "axios";
// import * as KakaoLogins from "@react-native-seoul/kakao-login";
import * as KakaoLogin from "@react-native-seoul/kakao-login";

// const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
// const REST_API_KEY = "edb8647a8a046e4f9c835ca0036fba22";
// const REDIRECT_URI = 'http://localhost:8080/login/callback/kakao'
// const REDIRECT_URI = "http://localhost:19000";

const KakaoLoginExample = ({ navigation }) => {
  // function LogInProgress(data) {

  //     // access code는 url에 붙어 장황하게 날아온다.
  //     // substringd으로 url에서 code=뒤를 substring하면 된다.
  //     const exp = "code=";
  //     var condition = data.indexOf(exp);

  //     if (condition !== -1) {
  //         var request_code = data.substring(condition + exp.length);
  //         // console.log("access code :: " + request_code);
  //         // 토큰값 받기
  //         requestToken(request_code);
  //     }

  // };

  // const requestToken = async (request_code) => {
  //     var returnValue = "none";
  //     var request_token_url = "https://kauth.kakao.com/oauth/token";

  //     axios({
  //         method: "post",
  //         url: request_token_url,
  //         params: {
  //             grant_type: 'authorization_code',
  //             client_id: REST_API_KEY,
  //             redirect_uri: REDIRECT_URI,
  //             code: request_code,
  //         },

  //     }).then(function (response) {
  //         returnValue = response.data.access_token;

  //     }).catch(function (error) {
  //         console.log('error', error);

  //     });

  // };

  const exampleKakaoLogin = async () => {
    KakaoLogin.login()
      .then((result) => {
        console.log("Login Success", JSON.stringify(result));
        getProfile();
      })
      .catch((error) => {
        if (error.code === "E_CANCELLED_OPERATION") {
          console.log("Login Cancel", error.message);
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message);
        }
      });
  };

  const getProfile = () => {
    KakaoLogin.getProfile()
      .then((result) => {
        console.log("GetProfile Success", JSON.stringify(result));
      })
      .catch((error) => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => {
          exampleKakaoLogin();
        }}
      >
        <Text>click</Text>
      </TouchableOpacity>
    </View>
    // <View style={{ flex: 1 }}>

    //     <WebView
    //         originWhitelist={['*']}
    //         scalesPageToFit={false}
    //         style={{ marginTop: 30 }}
    //         source={{ uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}}
    //         injectedJavaScript={INJECTED_JAVASCRIPT}
    //         javaScriptEnabled={true}
    //         onMessage={(event) => { LogInProgress(event.nativeEvent["url"]); }}
    //     />
    // </View>
  );
};

export default KakaoLoginExample;

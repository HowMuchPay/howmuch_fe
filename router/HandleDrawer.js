import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainScreen from "../screens/MainScreen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { API } from "../stores/api";
import { useAppStore } from "../stores/store";

const Drawer = createDrawerNavigator();

function SideScreen() {
  const store = useAppStore();
  const token = store.token;
  const userImg = store.userProfileImg;
  const clearToken = useAppStore((state) => state.clearToken);
  const navigation = useNavigation();
  const name = useAppStore((state) => state.name); // 이름 가져오기

  const handleLogout = async () => {
    try {
      // axios를 사용하여 로그아웃 API 요청 보내기
      const response = await API.post("/user/logout/me", null, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        clearToken();

        navigation.reset({ routes: [{ name: "Login" }] });
        // navigation.navigate("Login");
      } else {
        console.error("로그아웃 실패: 서버 응답 오류");
      }
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    }
  };

  // useEffect(() => {
  //   navigation.navigate("Login");
  // }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Image style={{ width: 40, height: 40, borderRadius: 100 }} source={{ uri: userImg }} resizeMode="cover" />
        </View>
        <Text style={styles.profileText}>{name}님 안녕하세요!</Text>
      </View>
      <MenuArea />
      <View style={styles.footerContainer}>
        <View>
          <Text style={styles.footerText}>
            앱 버전 정보 <Text style={styles.footerVersion}>1.00 ver</Text>{" "}
          </Text>
        </View>
        <Pressable onPress={handleLogout}>
          <Text style={styles.footerText}>로그아웃</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("RemoveAccountScreen")}>
          <Text style={styles.footerText}>탈퇴하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function MenuArea() {
  const navigation = useNavigation();

  return (
    <View style={styles.menuContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("NoticeListScreen");
        }}
      >
        <Text style={styles.menuText}>공지사항</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("TermsOfServiceDrawerScreen");
        }}
      >
        <Text style={styles.menuText}>약관 및 정책</Text>
      </Pressable>
      <View>{/* <Text style={styles.menuText}>알람설정</Text> */}</View>
    </View>
  );
}

export default function HandleDrawer() {
  const store = useAppStore();
  const token = store.token;
  const clearToken = useAppStore((state) => state.clearToken);
  const navigation = useNavigation();
  // useEffect(() => {
  //   // 앱이 시작될 때 토큰을 clear 하고 싶은 경우 여기에서 clearToken 함수를 호출합니다.

  // }, []);

  // useEffect(() => {
  //   console.log("token", token);
  // API.get(`/home`, {
  //   headers: {
  //     Authorization: token,
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((results) => {
  //     const data = results.data;
  //     console.log(results);
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     if (err.response && err.response.status === 403) {
  //       // 403 에러가 발생한 경우 토큰을 삭제하고 로그인 페이지로 이동합니다.
  //       clearToken();
  //       navigation.navigate("Login");
  //     }
  //   });
  // }, []);

  return (
    <Drawer.Navigator initialRouteName="Main" useLegacyImplementation={true} screenOptions={{ drawerPosition: "left", headerShown: false }} drawerContent={() => <SideScreen />}>
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="SideScreen" component={SideScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    paddingTop: hp(17),
    // height: 740,
    // backgroundColor: "#1d1d1d"
  },
  profileContainer: {
    marginBottom: 60,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f3ff",
    borderRadius: 50,
    marginBottom: 15,
  },
  profileText: {
    fontSize: 20,
    fontFamily: "font-B",
  },
  menuContainer: {
    height: 90,
    justifyContent: "space-between",
    marginBottom: 120,
  },
  menuText: {
    fontSize: 17,
    fontFamily: "font-M",
  },
  footerContainer: {
    height: 110,
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 17,
    fontFamily: "font-M",
  },
  footerVersion: {
    color: "#5F5F5F",
    fontSize: 17,
    fontFamily: "font-M",
  },
});

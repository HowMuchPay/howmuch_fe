import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import HandleDrawer from "./HandleDrawer";

import MyEventScreen from "../screens/MyEventScreen";
import { Button, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import BackIcon from "../assets/images/icon_back.png";
import KakaoLogin from "../screens/services/KakaoLogin";
import FriendEventScreen from "../screens/FriendEventScreen";
import Modal from "react-native-modal";
import ComingEventScreen from "../screens/ComingEventScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalendarScreen from "../screens/CalendarScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import NewAddEventScreen from "../screens/NewAddEventScreen";
import AskRelationScreen01 from "../screens/AskRelationScreen01";
import NotAskRelationScreen from "../screens/NotAskRelationScreen";
import AddMyEventScreen from "../screens/AddMyEventScreen";
import ContactSelectScreen from "../screens/ContactSelectScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { useAppStore } from "../stores/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HeaderTitle(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        alignSelf: "stretch",
      }}
    >
      <Text style={{ color: "#1f1f1f", fontFamily: "font-M" }}>{props.title}</Text>
    </View>
  );
}

function MyEventPlusButton() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_plus_black.png")} />
      </TouchableOpacity>

      <Modal isVisible={modalVisible === true} transparent={true} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.recommendModalBox}>
          <Text style={styles.recommendModalTitle}>다음 작업을 선택해주세요</Text>

          <View style={styles.recommendModalBtnBox}>
            <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#f3f3ff" }]}>
              <Text style={styles.recommendModalBtnText}>엑셀 내보내기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddMyEventScreen");
              }}
              style={[styles.recommendModalBtn, { backgroundColor: "#6D61FF" }]}
            >
              <Text style={[styles.recommendModalBtnText, { color: "#fff" }]}>신규 등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function FriendEventPlusButton() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_plus_black.png")} />
      </TouchableOpacity>

      <Modal isVisible={modalVisible === true} transparent={true} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.recommendModalBox}>
          <Text style={styles.recommendModalTitle}>경조사비를 추천 받으시겠습니까?</Text>

          <View style={styles.recommendModalBtnBox}>
            <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#f3f3ff" }]} onPress={() => navigation.navigate("NotAskRelationScreen")}>
              <Text style={styles.recommendModalBtnText}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#6D61FF" }]} onPress={() => navigation.navigate("AskRelationScreen01")}>
              <Text style={[styles.recommendModalBtnText, { color: "#fff" }]}>네</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function BackBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <Image source={BackIcon} style={{ height: 24, width: 24 }} />
    </TouchableOpacity>
  );
}

const TopTab = createMaterialTopTabNavigator();

function TotalPage() {
  return (
    <TopTab.Navigator
      initialRouteName="Calendar"
      style={{ paddingTop: 80, backgroundColor: "#F3F3FF" }}
      screenOptions={{
        tabBarPressOpacity: 1, // 탭을 터치했을 때 그림자 효과 없애기
        tabBarPressColor: "transparent", // 탭을 터치했을 때 효과 없애기
        tabBarLabelStyle: { fontSize: 16, fontFamily: "font-B" },
        tabBarStyle: {
          backgroundColor: "#F3F3FF",
          marginLeft: 20,
          marginRight: 20,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIndicatorStyle: { backgroundColor: "#6D61FF" },
      }}
    >
      <TopTab.Screen name="Calendar" component={CalendarScreen} options={{ title: "일정" }} />
      <TopTab.Screen name="Statistics" component={StatisticsScreen} options={{ title: "통계" }} />
    </TopTab.Navigator>
  );
}

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useAppStore((state) => [state.token, state.setToken]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (token) navigation.navigate("Drawer");
  // }, [token]);

  useEffect(() => {
    const accessToken = AsyncStorage.getItem("accessToken");

    setToken(accessToken);
  }, []);

  StatusBar.setBarStyle("dark-content");

  return (
    <Stack.Navigator initialRouteName={token ? "Drawer" : "Login"} screenOptions={{ headerTransparent: true }}>
      {/* <Stack.Screen name="Boarding" component={Boarding}/> */}
      {/* <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} /> */}

      <Stack.Screen name="Drawer" component={HandleDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="MyEvent"
        component={MyEventScreen}
        options={{
          title: "나의 경조사",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
          headerRight: () => <MyEventPlusButton />,
        }}
      />
      <Stack.Screen
        name="FriendEvent"
        component={FriendEventScreen}
        options={{
          title: "지인의 경조사",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
          headerRight: () => <FriendEventPlusButton />,
        }}
      />
      <Stack.Screen
        name="ComingEvent"
        component={ComingEventScreen}
        options={{
          title: "디데이",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="TotalPage"
        component={TotalPage}
        options={{
          title: "캘린더",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="NewAddEventPage"
        component={NewAddEventScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: "#fff" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AskRelationScreen01"
        component={AskRelationScreen01}
        options={{
          title: "",
          headerStyle: { backgroundColor: "transparent" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="NotAskRelationScreen"
        component={NotAskRelationScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: "transparent" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddMyEventScreen"
        component={AddMyEventScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: "transparent" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen
        name="ContactSelectScreen"
        component={ContactSelectScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: "transparent" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  searchModalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 45,
  },
  searchModalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 20,
    marginTop: 10,
  },
  searchModalInputFlex: {
    width: "100%",
    borderRadius: 20,
    height: 50,
    backgroundColor: "#f4f4f4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  searchModalInput: {
    marginLeft: 14,
  },

  //경조사비 추천 모달
  recommendModalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 30,
  },
  recommendModalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 26,
    marginTop: 10,
    textAlign: "center",
  },
  recommendModalBtnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "95%"
  },
  recommendModalBtn: {
    borderRadius: 10,
    textAlign: "center",
  },
  recommendModalBtnText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    width: 123,
  },
});

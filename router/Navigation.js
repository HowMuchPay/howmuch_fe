import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import HandleDrawer from "./HandleDrawer";

import MyEventScreen from "../screens/MyEventScreen";
import { Button, Image, Text, TouchableOpacity, View, StyleSheet, Pressable, TouchableHighlight } from "react-native";
import { StatusBar } from "react-native";
import BackIcon from "../assets/images/icon_back.png";
import FriendEventScreen from "../screens/FriendEventScreen";
import Modal from "react-native-modal";
import ComingEventScreen from "../screens/ComingEventScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalendarScreen from "../screens/CalendarScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import NewAddEventScreen from "../screens/NewAddEventScreen";
import AskRelationScreen from "../screens/AskRelationScreen";
import NotAskRelationScreen from "../screens/NotAskRelationScreen";
import AddMyEventScreen from "../screens/AddMyEventScreen";
import ContactSelectScreen from "../screens/ContactSelectScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { useAppStore } from "../stores/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyEventDetailScreen, MyEventPersonPlusButton } from "../screens/MyEventDetailScreen";
import AddDetailPersonScreen from "../screens/AddDetailPersonScreen";
import SearchMyEventScreen from "../screens/SearchMyEventScreen";
import MainScreen from "../screens/MainScreen";
import AllEventScreen from "../screens/AllEventScreen";
import FriendEventDetailScreen from "../screens/FriendEventDetailScreen";
import RemoveAccountScreen from "../screens/auth/RemoveAccountScreen";
import SearchMyAllEventScreen from "../screens/SearchMyAllEventScreen";
import SearchFriendEventScreen from "../screens/SearchFriendEventScreen";
import Boarding from "../screens/auth/Boarding";
import LoginPhoneNumScreen from "../screens/auth/LoginPhoneNumScreen";
import TermsScreen from "../screens/auth/TermsScreen";
import TermsOfServiceScreen from "../screens/auth/TermsOfServiceScreen";
import TermsPrivacyPolicyScreen from "../screens/auth/TermsPrivacyPolicyScreen";
import TermsPrivacyCollectScreen from "../screens/auth/TermsPrivacyCollectScreen";
import TermsOfServiceDrawerScreen from "../screens/TermsOfServiceDrawerScreen";
import NoticeListScreen from "../screens/NoticeListScreen";
import TotalScreen from "../screens/TotalScreen";
import AddNoticeScreen from "../screens/AddNoticeScreen";

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

      <Modal isVisible={modalVisible === true} transparent={true} onBackdropPress={() => setModalVisible(false)} useNativeDriverForBackdrop={true} animationIn="slideInUp">
        <View style={styles.recommendModalBox}>
          <Text style={styles.recommendModalTitle}>다음 작업을 선택해주세요</Text>

          <View style={styles.recommendModalBtnBox}>
            <TouchableHighlight underlayColor="#6D61FF" style={[styles.recommendModalBtn, { backgroundColor: "#f3f3ff" }]}>
              <Text style={styles.recommendModalBtnText}>엑셀 내보내기</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="#6D61FF"
              onPress={() => {
                navigation.navigate("AddMyEventScreen");
              }}
              style={[styles.recommendModalBtn, { backgroundColor: "#f3f3ff" }]}
            >
              <Text style={[styles.recommendModalBtnText]}>신규 등록하기</Text>
            </TouchableHighlight>
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

      <Modal isVisible={modalVisible === true} transparent={true} onBackdropPress={() => setModalVisible(false)} useNativeDriverForBackdrop={true}>
        <View style={styles.recommendModalBox}>
          <Text style={styles.recommendModalTitle}>경조사비를 추천 받으시겠습니까?</Text>

          <View style={styles.recommendModalBtnBox}>
            <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#f3f3ff" }]} onPress={() => navigation.navigate("NotAskRelationScreen")}>
              <Text style={styles.recommendModalBtnText}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#6D61FF" }]} onPress={() => navigation.navigate("AskRelationScreen")}>
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

function MainBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={navigation.navigate("Drawer")}>
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

const CustomHeaderButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icon} style={{ height: 24, width: 24 }} />
    </TouchableOpacity>
  );
};

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useAppStore((state) => [state.token, state.setToken]);
  const store = useAppStore();
  const userType = store.userType;
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (token) navigation.navigate("Drawer");
  // }, [token]);

  const handleCustomButtonPress = () => {
    // Handle custom button press logic here
    // For example, navigate to Drawer screen
    navigation.navigate("Drawer");
  };

  StatusBar.setBarStyle("dark-content");
  console.log("token", token);
  console.log(userType);
  return (
    <Stack.Navigator initialRouteName={token ? "Drawer" : "Login"} screenOptions={{ headerTransparent: true }}>
      {/* <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Drawer" component={HandleDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

      {/* <Stack.Screen name="Boarding" component={Boarding} options={{ headerShown: false }} />

      <Stack.Screen name="LoginPhoneNumScreen" component={LoginPhoneNumScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsPrivacyPolicyScreen" component={TermsPrivacyPolicyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsPrivacyCollectScreen" component={TermsPrivacyCollectScreen} options={{ headerShown: false }} /> */}

      {/* <Stack.Screen name="Drawer" component={HandleDrawer} options={{ headerShown: false }} /> */}

      <Stack.Screen
        name="NoticeListScreen"
        component={NoticeListScreen}
        options={{
          title: "공지사항",
          headerStyle: { backgroundColor: "#fff" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerRight: () => {
            if (userType === "ROLE_ADMIN") {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("AddNoticeScreen")}>
                  <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_plus_black.png")} />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddNoticeScreen"
        component={AddNoticeScreen}
        options={{
          title: "공지사항 등록",
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
        name="TermsOfServiceDrawerScreen"
        component={TermsOfServiceDrawerScreen}
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
        name="MyEvent"
        component={MyEventScreen}
        options={({ route }) => ({
          title: "나의 경조사",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <CustomHeaderButton onPress={handleCustomButtonPress} icon={BackIcon} />,
          headerBackTitleVisible: false,
          headerRight: () => <MyEventPlusButton />,
        })}
      />
      <Stack.Screen
        name="TotalPage"
        component={TotalScreen}
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
        name="MyEventDetailScreen"
        component={MyEventDetailScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerRight: () => <MyEventPersonPlusButton />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="AddDetailPersonScreen"
        component={AddDetailPersonScreen}
        options={{
          title: "신규인원 추가",
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
        name="FriendEvent"
        component={FriendEventScreen}
        options={({ route }) => ({
          title: "지인의 경조사",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <CustomHeaderButton onPress={handleCustomButtonPress} icon={BackIcon} />,
          headerBackTitleVisible: false,
          headerRight: () => <FriendEventPlusButton />,
        })}
      />
      <Stack.Screen
        name="FriendEventDetailScreen"
        component={FriendEventDetailScreen}
        options={{
          title: "",
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
        name="AllEvent"
        component={AllEventScreen}
        options={{
          title: "전체 경조사",
          headerStyle: { backgroundColor: "#F3F3FF" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "font-B",
            fontSize: 17,
            color: "#1f1f1f",
          },
          headerLeft: () => <BackBtn />,
          headerBackTitleVisible: false,
          // headerRight: () => <MyEventPlusButton />,
        }}
      />
      <Stack.Screen
        name="SearchMyEventScreen"
        component={SearchMyEventScreen}
        options={{
          title: "검색",
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
        name="SearchMyAllEventScreen"
        component={SearchMyAllEventScreen}
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
        name="SearchFriendEventScreen"
        component={SearchFriendEventScreen}
        options={{
          title: "검색",
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
        name="AskRelationScreen"
        component={AskRelationScreen}
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

      <Stack.Screen
        name="RemoveAccountScreen"
        component={RemoveAccountScreen}
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

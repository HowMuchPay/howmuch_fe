import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Navigation from "./router/Navigation";
import { useAppStore } from "./stores/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const setToken = useAppStore((state) => state.setToken);

  const store = useAppStore();
  const token = store.token;

  useEffect(() => {
    const restoreToken = async () => {
      try {
        // const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setToken(token);
        }
      } catch (error) {
        console.error("Error restoring token:", error);
      }
    };

    restoreToken();
  }, [setToken]);

  let [fontsLoaded] = useFonts({
    "font-L": require("./assets/fonts/Pretendard-Light.ttf"),
    "font-R": require("./assets/fonts/Pretendard-Regular.ttf"),
    "font-M": require("./assets/fonts/Pretendard-Medium.ttf"),
    "font-SM": require("./assets/fonts/Pretendard-SemiBold.ttf"),
    "font-B": require("./assets/fonts/Pretendard-Bold.ttf"),
  });

  useEffect(() => {
    try {
      setTimeout(() => {
        setAppIsReady(true);
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hide();
    }
  }, [appIsReady, fontsLoaded]);

  // if (!appIsReady) {
  //   return (
  //     <View style={[styles.container, { backgroundColor: "#6D61FF" }]}>
  //       <StatusBar barStyle="auto" />
  //     </View>
  //   );
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer style={styles.container} onReady={onLayoutRootView}>
        <StatusBar barStyle="auto" />
        <Navigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

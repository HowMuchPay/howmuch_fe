import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Navigation from "./router/Navigation";
import { useAppStore } from "./stores/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer style={styles.container} onReady={onLayoutRootView}>
      <StatusBar backgroundColor="#F3F3FF" barStyle="dark-content" />
      <Navigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

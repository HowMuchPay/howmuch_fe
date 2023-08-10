import { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet,} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/auth/LoginScreen';
import HandleDrawer from './router/HandleDrawer';
import Navigation from './router/Navigation';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    "font-L": require("./assets/fonts/Pretendard-Light.ttf"),
    "font-R": require("./assets/fonts/Pretendard-Regular.ttf"),
    "font-M": require("./assets/fonts/Pretendard-Medium.ttf"),
    "font-SM": require("./assets/fonts/Pretendard-SemiBold.ttf"),
    "font-B": require("./assets/fonts/Pretendard-Bold.ttf"),
  })
  

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
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
  }, [appIsReady,fontsLoaded]);

  if (!appIsReady) {
    return null;
  }


  return (
      <NavigationContainer style={styles.container}  onReady={onLayoutRootView}>
       <Navigation/>
      </NavigationContainer>      
    
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
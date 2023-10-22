import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, FlatList, Animated, Image, TouchableOpacity, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "../../stores/store";

const DATA = [
  {
    title: "오잉 이전 직장동료에게 \n청첩장이 왔네?!",
    description: "Loren ipsum is simply dummy text of the printing and typesetting industry.",
    images: require("../../assets/images/boarding_1.png"),
  },
  {
    title: "퇴사하고 연락한 적 없고 \n그다지 친하지도 않았는데….",
    description: "Loren ipsum is simply dummy text of the printing and typesetting industry.",
    images: require("../../assets/images/boarding_2.png"),
  },
  {
    title: "정말 난감하네...! \n얼마나 내야 할지 고민이야",
    description: "Loren ipsum is simply dummy text of the printing and typesetting industry.",
    images: require("../../assets/images/boarding_3.png"),
  },
];

export default function Boarding() {
  const scrollX = new Animated.Value(0);
  const animation = React.useRef(null);
  const navigation = useNavigation();
  const store = useAppStore();
  const token = store.token;
  const phoneNumber = store.phoneNumber;
  useEffect(() => {
    console.log("phone", phoneNumber);
    if (token) {
      navigation.reset({ routes: [{ name: "Drawer" }] });
      // setTimeout(() => {
      //   if (phoneNumber == null) {
      //     // navigation.navigate("Drawer");
      //     navigation.reset({ routes: [{ name: "LoginPhoneNumScreen" }] });
      //   } else {
      //     navigation.reset({ routes: [{ name: "Drawer" }] });

      //     // navigation.replace("LoginPhoneNumScreen");
      //   }
      // }, 1500);
    } else null;
  }, [token]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: wp(100), height: hp(100), backgroundColor: "#fff", paddingTop: hp(10) }}>
        <Text style={{ marginTop: hp(5), fontFamily: "font-B", fontSize: 26, lineHeight: 38, paddingLeft: 20 }}>{item.title}</Text>

        <View style={{ alignItems: "center", marginTop: 62 }}>
          <Image style={{ width: 230, height: 230 }} source={item.images} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      />
      <View style={{ position: "absolute", bottom: 200, flexDirection: "row" }}>
        {DATA.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * wp(100), index * wp(100), (index + 1) * wp(100)],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const scale = scrollX.interpolate({
            inputRange: [(index - 1) * wp(100), index * wp(100), (index + 1) * wp(100)],
            outputRange: [1, 1, 1],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={{
                width: 8,
                height: 8,
                marginHorizontal: 6,
                backgroundColor: "#000",
                borderRadius: 100,
                opacity: opacity,
                transform: [
                  {
                    scale: scale,
                  },
                ],
              }}
            />
          );
        })}
      </View>

      <Pressable style={styles.nextBtn} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.nextBtnText}>다음</Text>
      </Pressable>
      <StatusBar style="auto" />
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
  // 다음 버튼
  nextBtn: {
    position: "relative",
    bottom: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: 57,
    backgroundColor: "#6d61ff",
    borderRadius: 20,
  },
  nextBtnText: {
    color: "#fff",
    fontFamily: "font-M",
    fontSize: 16,
    paddingHorizontal: 100,
  },
});

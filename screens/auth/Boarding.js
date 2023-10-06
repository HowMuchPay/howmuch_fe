import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View, FlatList, StyleSheet, Animated, Alert, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";

const DATA = [
  { title: "title1", description: "애매한 사이인데 \n축의금을 얼마 내야 하지.. \n고민되시나요?" },
  { title: "title2", description: "축의금을 관리하기\n번거로우신가요?" },
  { title: "title3", description: "축의금 관리\n얼마나에서 함께 시작해요" },
];

export default function Boarding() {
  const scrollX = new Animated.Value(0);
  const animation = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
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
      <View style={{ flexDirection: "row", marginBottom: 150 }}>
        {DATA.map((item, index) => {
          const bgcolor = scrollX.interpolate({
            inputRange: [(index - 1) * wp(100), index * wp(100), (index + 1) * wp(100)],
            outputRange: ["rgb(104, 169, 77)", "rgb(35, 22, 77)", "rgb(104, 169, 77)"],
            extrapolate: "clamp",
          });
          const animatedStyles = {
            backgroundColor: bgcolor,
          };
          console.log(animatedStyles);
          return (
            <View style={{ alignItems: "center" }}>
              <Animated.View key={index} style={[styles.circle]} />
            </View>
          );
        })}
      </View>
      {/* <TouchableOpacity onPress={() => {}} style={styles.skipbtn}>
        <Text>건너뛰기</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 8,
    height: 8,
    marginHorizontal: wp(2),
    borderRadius: 100,
    backgroundColor: "#333",
  },
  description: {
    marginLeft: 26,
    marginTop: hp(30),
    fontSize: 24,
    lineHeight: 34,
    width: 375,
    textAlign: "left",
    fontFamily: "font-SM",
  },
  skipbtn: {
    textAlign: "center",
    color: "#000",
    fontSize: 16,
    fontFamily: "font-R",
    marginBottom: 100,
  },
});

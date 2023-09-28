import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, StatusBar, Pressable } from "react-native";
import checkIcon from "../../assets/images/check_icon.svg";
import checkColorIcon from "../../assets/images/check_color_icon.svg";
import { WithLocalSvg } from "react-native-svg";

export default function RemoveAccountScreen() {
  const [checkState, setCheckState] = useState(false);

  const toggleCheck = () => {
    setCheckState(!checkState);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.inner}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.addText, { color: "#6D61FF" }]}>탈퇴</Text>
          <Text style={styles.addText}>하기 전에</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.addText, { color: "#6D61FF" }]}>꼭 </Text>
          <Text style={styles.addText}>확인해 주세요</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text style={{ marginRight: 10, fontSize: 20 }}>•</Text>
            <Text style={styles.noticeText}>탈퇴 시 얼마나에서 작성된 모든 데이터는 삭제 됩니다.</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginTop: 18 }}>
            <Text style={{ marginRight: 10, fontSize: 20 }}>•</Text>
            <Text style={styles.noticeText}>탈퇴 후에는 데이터 복구 및 확인이 불가능합니다.</Text>
          </View>
        </View>

        <View style={{ position: "relative" }}>
          <Pressable style={{ marginHorizontal: 20, marginVertical: 20 }} onPress={toggleCheck}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              {checkState ? (
                <WithLocalSvg width={20} height={20} asset={checkColorIcon} style={{ marginRight: 10 }} />
              ) : (
                <WithLocalSvg width={20} height={20} asset={checkIcon} style={{ marginRight: 10 }} />
              )}
              <Text style={{ fontFamily: "font-M", fontSize: 13, color: "#5f5f5f" }}>정말 탈퇴 하시겠습니까?</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    position: "relative",
  },
  inner: {
    margin: 20,
    // backgroundColor: "#fff",
  },
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },
  noticeText: {
    fontSize: 16,
    fontFamily: "font-R",
  },
});

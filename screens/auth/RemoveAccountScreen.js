import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Pressable } from "react-native";
import checkIcon from "../../assets/images/check_icon.svg";
import checkColorIcon from "../../assets/images/check_color_icon.svg";
import { WithLocalSvg } from "react-native-svg";
import { API } from "../../stores/api";
import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "../../stores/store";
import { StatusBar } from "expo-status-bar";

export default function RemoveAccountScreen() {
  const [checkState, setCheckState] = useState(false);
  const navigation = useNavigation();
  const store = useAppStore();
  const token = store.token;
  const clearToken = useAppStore((state) => state.clearToken);

  const toggleCheck = () => {
    setCheckState(!checkState);
  };

  const handleRemove = () => {
    if (checkState) {
      API.delete("/user/delete", {
        headers: {
          Authorization: token, // 토큰을 Bearer 스타일로 보냅니다.
        },
      })
        .then((response) => {
          console.log("탈퇴 성공!");
          clearToken();
          navigation.navigate("Boarding");
        })
        .catch((error) => {
          // 탈퇴 실패 시 처리
          console.error("탈퇴 실패:", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="auto" />

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 10, fontSize: 20 }}>•</Text>
            <Text style={styles.noticeText}>탈퇴 시 얼마나에서 작성된 모든 데이터는 삭제됩니다.</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <Text style={{ marginRight: 10, fontSize: 20 }}>•</Text>
            <Text style={styles.noticeText}>탈퇴 후에는 데이터 복구 및 확인이 불가능합니다.</Text>
          </View>
        </View>

        <View style={{ position: "relative", marginTop: 200 }}>
          <Pressable style={{ marginHorizontal: 5, marginVertical: 20, top: "50%", position: "relative" }} onPress={toggleCheck}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {checkState ? (
                <WithLocalSvg width={20} height={20} asset={checkColorIcon} style={{ marginRight: 10 }} />
              ) : (
                <WithLocalSvg width={20} height={20} asset={checkIcon} style={{ marginRight: 10 }} />
              )}
              <Text style={{ fontFamily: "font-M", fontSize: 14, color: "#5f5f5f" }}>정말 탈퇴 하시겠습니까?</Text>
            </View>
          </Pressable>

          <TouchableOpacity style={[styles.nextBtn, { opacity: checkState ? 1 : 0.3 }]} onPress={handleRemove} disabled={!checkState}>
            <Text style={styles.nextBtnText}>탈퇴하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    position: "relative",
  },
  inner: {
    margin: 20,
    // backgroundColor: "#fff",
    paddingTop: 80,
  },
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },
  noticeText: {
    fontSize: 15,
    fontFamily: "font-R",
  },

  // 다음 버튼
  nextBtn: {
    top: "65%",
    position: "relative",
    width: "100%",
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
  },
});

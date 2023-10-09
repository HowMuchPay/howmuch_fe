import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import rightArrowIcon from "../assets/images/right_arrow_icon.png";
import { useAppStore } from "../stores/store";
import { useIsFocused } from "@react-navigation/native";
import { API } from "../stores/api";

export default function NoticeListScreen() {
  const store = useAppStore();
  const token = store.token;
  const isFocused = useIsFocused();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get("/event/notice", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log("notice", newData);
      setData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <Pressable style={styles.listBox}>
          <View>
            <Text style={styles.title}>서비스 정기검진 안내</Text>
            <Text style={styles.date}>2023.10.09</Text>
          </View>
          <Image source={rightArrowIcon} style={{ width: 20, height: 20, marginBottom: 26 }} />
        </Pressable>
        <Pressable style={styles.listBox}>
          <View>
            <Text style={styles.title}>서비스 정기검진 안내</Text>
            <Text style={styles.date}>2023.10.09</Text>
          </View>
          <Image source={rightArrowIcon} style={{ width: 20, height: 20, marginBottom: 26 }} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    // height: 740,
    backgroundColor: "#fff",
  },
  inner: {
    margin: 20,
    paddingTop: 60,
  },
  listBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
    marginTop: 26,
  },
  title: {
    fontSize: 16,
    fontFamily: "font-M",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontFamily: "font-R",
    color: "#8e8e8e",
    marginBottom: 26,
  },
});

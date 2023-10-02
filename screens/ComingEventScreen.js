import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { API } from "../stores/api";
import { useAppStore } from "../stores/store";

export default function ComingEventScreen() {
  const route = useRoute();
  const store = useAppStore();
  const token = store.token;

  const { eventId, eventType } = route.params;
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("id", eventId);
    console.log("event", eventType);
    fetchData();
    console.log(token);
  }, [isFocused]);

  const fetchData = async () => {
    let apiEndpoint = `/event/acquaintance/${eventId}/detail`;

    if (eventType === "myEvent") {
      apiEndpoint = `/event/my/${eventId}/detail`;
    }

    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get(apiEndpoint, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data;

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log("comingData", newData);
      setData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.comingBox}>
          <View style={styles.comingRelationBox}>
            <Text style={styles.comingRelation}>친구</Text>
          </View>
          <View style={styles.comingTitleBox}>
            <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_cake.png")} />
            <Text style={styles.comingTitle}>박지영님의 생일</Text>
            <Text style={styles.comingDate}>2023년 07월 10일</Text>
            <View style={styles.comingDdayBox}>
              <Text style={styles.comingDday}>D-14일</Text>
            </View>
          </View>
          <View style={styles.comingPayBox}>
            <View style={styles.comingPayLine}></View>
            <View style={styles.comingPayTextBox}>
              <Text style={styles.comingPayMoney}>50,000원</Text>
              <Text style={styles.comingPayMoneyDes}>을 낼 거예요</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.modifyBtn}>
          <Text style={styles.modifyBtnText}>수정하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3FF",
  },
  inner: {
    margin: 20,
    paddingTop: 100,
  },

  // 이벤트 박스
  comingBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    // height: 380,
    marginBottom: 40,
    padding: 20,
  },
  comingRelationBox: {
    alignItems: "flex-start",
    borderRadius: 5,
  },
  comingRelation: {
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "font-B",
    color: "#6d61ff",
    backgroundColor: "#f3f3ff",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  comingTitleBox: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  comingTitle: {
    color: "#1f1f1f",
    fontSize: 20,
    fontFamily: "font-B",
    marginTop: 20,
    marginBottom: 12,
  },
  comingDate: {
    color: "#8e8e8e",
    fontSize: 17,
    fontFamily: "font-B",
  },
  comingDdayBox: {
    borderRadius: 16,
    backgroundColor: "#f3f3ff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 26,
    marginBottom: 26,
  },
  comingDday: {
    fontSize: 17,
    fontFamily: "font-B",
    color: "#6d61ff",
    lineHeight: 20,
  },
  comingPayBox: {
    marginBottom: 30,
  },
  comingPayLine: {
    borderStyle: "dashed",
    width: "100%",
    borderTopWidth: 0.5,
    alignItems: "center",
    height: 2,
    borderColor: "#ccc",
    marginBottom: 40,
  },
  comingPayTextBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
  comingPayMoney: {
    fontFamily: "font-B",
    fontSize: 17,
    color: "#6d61ff",
  },
  comingPayMoneyDes: {
    fontFamily: "font-B",
    fontSize: 17,
    color: "#1f1f1f",
  },

  // 수정하기 버튼
  modifyBtn: {
    paddingTop: 19,
    paddingBottom: 19,
    // paddingLeft: 150,
    // paddingRight: 150,
    backgroundColor: "#6d61ff",
    borderRadius: 20,
    textAlign: "center",
  },
  modifyBtnText: {
    fontFamily: "font-B",
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});

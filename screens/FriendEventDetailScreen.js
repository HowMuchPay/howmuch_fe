import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { API } from "../stores/api";
import { useAppStore } from "../stores/store";
import event0 from "../assets/images/detail_event_icon_0.png";
import event1 from "../assets/images/detail_event_icon_1.png";
import event2 from "../assets/images/detail_event_icon_2.png";
import event3 from "../assets/images/detail_event_icon_3.png";
import event4 from "../assets/images/detail_event_icon_4.png";

export default function FriendEventDetailScreen() {
  const route = useRoute();
  const store = useAppStore();
  const token = store.token;
  const isFocused = useIsFocused();

  const { id, eventNum } = route.params;

  const [data, setData] = useState([]);
  const currentDate = new Date();

  let selectedEvent;

  useEffect(() => {
    fetchData();
    console.log("event", eventNum);
  }, [isFocused]);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get(`/event/acquaintance/${id}/detail`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data;

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log("newdata", newData);
      setData(newData);
      if (eventNum === 0) {
        selectedEvent = event0;
      } else if (eventNum === 1) {
        selectedEvent = event1;
      } else if (eventNum === 2) {
        selectedEvent = event2;
      } else if (eventNum === 3) {
        selectedEvent = event3;
      } else if (eventNum === 4) {
        selectedEvent = event4;
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {data && data.acType !== undefined && (
          <View style={styles.comingBox}>
            <View style={styles.comingRelationBox}>
              <Text style={styles.comingRelation}>{data.acType === 0 ? "가족" : data.acType === 1 ? "친구" : data.acType === 2 ? "동료" : data.acType === 3 ? "친척" : "기타"}</Text>
            </View>
            <View style={styles.comingTitleBox}>
              <Image
                style={{ width: 24, height: 24 }}
                source={eventNum === 0 ? event0 : eventNum === 1 ? event1 : eventNum === 2 ? event2 : eventNum === 3 ? event3 : eventNum === 4 ? event4 : null}
              />
              <Text style={styles.comingTitle}>{data.acEventDisplayName}</Text>
              <Text style={styles.comingDate}>
                {data.eventAt.split("-")[0]}년 {data.eventAt.split("-")[1]}월 {data.eventAt.split("-")[2]}일
              </Text>
              <Text style={styles.comingDate}>{data.eventTime === null ? "시간 미정" : data.eventTime}</Text>

              <View style={styles.comingDdayBox}>
                <Text style={styles.comingDday}>D{data["d-day"] < 0 ? data["d-day"] : "+" + data["d-day"]}</Text>
              </View>
            </View>
            <View style={styles.comingPayBox}>
              <View style={styles.comingPayLine}></View>
              {data.payAmount === 0 ? (
                <View style={styles.comingPayTextBox}>
                  <Text style={styles.comingPayMoneyDes}>아직 얼마나 낼지 못 정했어요</Text>
                </View>
              ) : (
                <View style={styles.comingPayTextBox}>
                  <Text style={styles.comingPayMoney}>{data.payAmount.toLocaleString()}원</Text>
                  <Text style={styles.comingPayMoneyDes}>{currentDate < new Date(data.eventAt) ? "을 낼 거예요" : "을 냈어요"}</Text>
                </View>
              )}
            </View>
          </View>
        )}
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
    fontFamily: "font-M",
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

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button, Pressable, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import Modal from "react-native-modal";
import { useAppStore } from "../stores/store";
import { API } from "../stores/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import { WithLocalSvg } from "react-native-svg";
import event0 from "../assets/images/event_icon_0.png";
import event1 from "../assets/images/event_icon_1.png";
import event2 from "../assets/images/event_icon_2.png";
import event3 from "../assets/images/event_icon_3.png";
import event4 from "../assets/images/event_icon_4.png";
import trashIcon from "../assets/images/trash_icon.svg";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

export default function SearchMyAllEventScreen() {
  const route = useRoute();
  const store = useAppStore();
  const token = store.token;
  const [data, setData] = useState(null);
  const isFocused = useIsFocused();

  const { name } = route.params;

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get(`/event/my/people/filter?name=${name}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log("total", newData.allMyEvents);
      console.log("new", newData);

      setData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={data ? [data] : []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.inner}>
          {item ? (
            <>
              <View style={styles.nowGetMoneyBox}>
                <Text style={styles.nowGetMoneyTitle}>{name}님께</Text>
                <View style={styles.nowGetMoneyTitleFlex}>
                  <Text style={[styles.nowGetMoneyTitle, styles.accentColor]}>총 {data.totalReceiveAmount.toLocaleString()}원</Text>
                  <Text style={styles.nowGetMoneyTitle}>을</Text>
                </View>
                <Text style={styles.nowGetMoneyTitle}>받았어요.</Text>
              </View>
              <View>
                {item && item.allMyEvents && Object.keys(item.allMyEvents).length === 0 ? (
                  <View style={[styles.payListBox, { height: 460, alignItems: "center", justifyContent: "center" }]}>
                    <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#cccccc" }}>이벤트 목록이 없습니다.</Text>
                  </View>
                ) : (
                  <PayList data={item} />
                )}
              </View>
            </>
          ) : null}
        </View>
      )}
    />
  );
}

function PayList({ data }) {
  const navigation = useNavigation();
  function formatKey(key) {
    const [year, month] = key.split("-");
    return `${year}년 ${parseInt(month, 10)}월`;
  }

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${month}월 ${day}일`;
  }

  return (
    <FlatList
      style={styles.allContainer}
      data={Object.keys(data.allMyEvents)}
      keyExtractor={(key) => key}
      renderItem={({ item: key, index }) => {
        const events = data.allMyEvents[key];
        const formattedKey = formatKey(key);

        const noEventMessage = (
          <View style={[styles.payListBox, { height: 480, alignItems: "center", justifyContent: "center" }]}>
            <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#cccccc" }}>이벤트 목록이 없습니다.</Text>
          </View>
        );

        return (
          <View key={key} style={{ paddingHorizontal: 20 }}>
            {index !== 0 ? <View style={{ height: 0.3, backgroundColor: "#ccc", marginVertical: 30 }}></View> : null}

            <View style={{}}>
              <Text style={{ fontFamily: "font-B", fontSize: 14, color: "#1f1f1f", marginBottom: 10 }}>{formattedKey}</Text>

              <FlatList
                data={events}
                renderItem={(data, rowMap) => {
                  let selectedEvent;

                  if (data.item.eventCategory === 0) {
                    selectedEvent = event0;
                  } else if (data.item.eventCategory === 1) {
                    selectedEvent = event1;
                  } else if (data.item.eventCategory === 2) {
                    selectedEvent = event2;
                  } else if (data.item.eventCategory === 3) {
                    selectedEvent = event3;
                  } else if (data.item.eventCategory === 4) {
                    selectedEvent = event4;
                  }

                  return (
                    <View style={styles.rowFront}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}>
                          <Image style={{ width: 40, height: 40, marginRight: 15 }} source={selectedEvent} />
                        </View>
                        <View style={{}}>
                          <Text style={{ fontSize: 14, fontFamily: "font-M", color: "#1f1f1f" }}>{data.item.myEventDisplayName}</Text>
                          <Text style={{ fontSize: 13, fontFamily: "font-R", color: "#5f5f5f" }}>{formatDate(data.item.eventAt)}</Text>
                        </View>
                      </View>
                      {data.item.receiveAmount === 0}
                      <Text style={{ fontSize: 15, color: "#1f1f1f", fontFamily: "font-B" }}>{data.item.receiveAmount !== 0 ? `+${data.item.receiveAmount.toLocaleString()}원` : `0원`}</Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    borderRadius: 20,
    minHeight: 500,
  },
  container: {
    // flex: 1,
    backgroundColor: "#F3F3FF",
    // minHeight: 740,
    // backgroundColor:"#1d1d1d"
  },
  inner: {
    margin: 20,
    // backgroundColor:"#f5d5f7",

    paddingTop: 80,
  },

  //현재까지 받은 금액
  nowGetMoneyBox: {
    marginBottom: 50,
  },
  nowGetMoneyTitleFlex: {
    flexDirection: "row",
  },
  nowGetMoneyTitle: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 36,
  },
  accentColor: {
    color: "#6D61FF",
  },

  //필터박스
  filterFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
  },
  filterSelectBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterSelectTitle: {
    fontSize: 17,
    fontFamily: "font-B",
    color: "#1F1F1F",
    marginRight: 4,
  },
  filterSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  filterSearchIcon: {
    marginRight: 18,
  },

  // 이벤트 리스트
  payListBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 40,
    marginBottom: 40,
  },

  rowFront: {
    // width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // height: 60,
    paddingVertical: 20,
    // borderWidth: 1,
  },

  rowBack: {
    alignItems: "center",
    // backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingLeft: 15,
  },

  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: "100%",
  },
  backRightBtnLeft: {
    right: -10,
    height: "100%",
  },

  //모달창
  bottomModalFlex: {
    justifyContent: "flex-end",
    margin: 0,
  },
  bottomModalBox: {
    backgroundColor: "#fff",
    padding: 20,
    // height:390,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalGroupSelect: {
    marginTop: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 17,
    fontFamily: "font-B",
    color: "#1F1F1F",
    marginBottom: 18,
    paddingLeft: 10,
  },
  modalBtnFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    maxWidth: "95%",
  },
  modalSelectBtn: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: "#F3F3FF",
    borderRadius: 18,
    marginRight: 15,
    marginBottom: 10,
  },
  modalBtnTitle: {
    fontSize: 14,
    fontFamily: "font-M",
    color: "#1F1F1F",
  },

  // 검색 모달창
  searchModalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 45,
  },
  searchModalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 20,
    marginTop: 10,
  },
  searchModalInputFlex: {
    width: "100%",
    borderRadius: 20,
    height: 50,
    backgroundColor: "#f4f4f4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  searchModalInput: {
    marginLeft: 14,
  },

  //검색
  eventInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    // backgroundColor: "#fff",
    color: "#000",
    // paddingHorizontal: 50,
    // paddingVertical: 20,
    height: 30,
    width: 200,
    fontFamily: "font-M",
    paddingHorizontal: 30,
    paddingBottom: 7,
  },
});

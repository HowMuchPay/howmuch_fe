import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";

import Modal from "react-native-modal";
import { useAppStore } from "../stores/store";
import { API } from "../stores/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";

export default function MyEventScreen() {
  const store = useAppStore();
  const token = store.token;

  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/event/my`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((results) => {
        const data = results.data;
        // console.log(results);
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        {data ? (
          <>
            <NowGetMoneyBox data={data} />
            <PayListBox />
            {Object.keys(data.allMyEvents).length === 0 ? (
              <View style={[styles.payListBox, { height: 460, alignItems: "center", justifyContent: "center" }]}>
                <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#cccccc" }}>이벤트 목록이 없습니다.</Text>
              </View>
            ) : (
              <PayList data={data} />
            )}
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

function NowGetMoneyBox({ data }) {
  // console.log("re", data);
  return (
    <View style={styles.nowGetMoneyBox}>
      <Text style={styles.nowGetMoneyTitle}>현재까지</Text>
      <View style={styles.nowGetMoneyTitleFlex}>
        <Text style={[styles.nowGetMoneyTitle, styles.accentColor]}>총 {data.totalReceiveAmount}원</Text>
        <Text style={styles.nowGetMoneyTitle}>을</Text>
      </View>
      <Text style={styles.nowGetMoneyTitle}>받았어요.</Text>
    </View>
  );
}

function PayListBox({ data }) {
  const [modalVisible, setModalVisible] = useState(null);

  const handleButtonPress = (number) => {
    setModalVisible(number);
  };

  let groupList = [
    { id: "all", title: "전체", pressed: true },
    { id: "family", title: "가족", pressed: false },
    { id: "friend", title: "친구", pressed: false },
    { id: "work", title: "직장", pressed: false },
    { id: "etc", title: "기타", pressed: false },
  ];

  let eventList = [
    { id: "all", title: "전체", pressed: true },
    { id: "marry", title: "결혼", pressed: false },
    { id: "firstBirth", title: "돌잔치", pressed: false },
    { id: "worthy", title: "상", pressed: false },
    { id: "birthday", title: "생일", pressed: false },
    { id: "etc", title: "기타", pressed: false },
  ];

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterFlex}>
        <TouchableOpacity style={styles.filterSelectBox} onPress={() => handleButtonPress(1)}>
          <Text style={styles.filterSelectTitle}>전체 내역</Text>
          <Image style={{ width: 12, height: 12 }} source={require("../assets/images/icon_arrow.png")} />
        </TouchableOpacity>
        <View>
          <Modal
            isVisible={modalVisible === 1}
            transparent={true}
            onBackdropPress={() => setModalVisible(null)}
            onSwipeComplete={() => setModalVisible(null)}
            swipeDirection="down"
            style={styles.bottomModalFlex}
          >
            <View style={styles.bottomModalBox}>
              <TouchableOpacity
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  alignItems: "center",
                  marginBottom: 30,
                  height: 20,
                  width: 100,
                }}
                onPress={() => setModalVisible(null)}
              >
                <Image style={{ width: 37, height: 2 }} source={require("../assets/images/icon_close_bar.png")} />
              </TouchableOpacity>

              <SelectBtnBox title={"그룹별"} btnArr={groupList} />
              <SelectBtnBox title={"경조사별"} btnArr={eventList} />
            </View>
          </Modal>
        </View>

        <View style={styles.filterSearchBox}>
          <TouchableOpacity style={styles.filterSearchIcon} onPress={() => handleButtonPress(2)}>
            <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_search_black.png")} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterRefreshIcon}>
            <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_rotate_right.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function SelectBtnBox(props) {
  const [buttons, setButtons] = useState(props.btnArr);

  const handleButtonPress = (buttonId) => {
    setButtons((prevButtons) => prevButtons.map((button) => (button.id === buttonId ? { ...button, pressed: !button.pressed } : button)));
  };

  return (
    <View style={styles.modalGroupSelect}>
      <Text style={styles.modalTitle}>{props.title}</Text>
      <View style={styles.modalBtnFlex}>
        {buttons.map((button, idx) => {
          return (
            <TouchableOpacity style={[styles.modalSelectBtn, { backgroundColor: button.pressed ? "#6D61FF" : "#F3F3FF" }]} key={button.id} onPress={() => handleButtonPress(button.id)}>
              <Text style={[styles.modalBtnTitle, { color: button.pressed ? "#fff" : "#1F1F1F" }]}>{button.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function PayList({ data }) {
  console.log("pay", data.allMyEvents);

  // const sortedKeys = Object.keys(data.allMyEvents).sort((a, b) => {
  //   const dateA = new Date(a);
  //   const dateB = new Date(b);
  //   return dateB - dateA; // 내림차순 정렬
  // });

  function formatKey(key) {
    const [year, month] = key.split("-");
    return `${year}년 ${parseInt(month, 10)}월`;
  }

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${month}월 ${day}일`;
  }

  return (
    <ScrollView style={styles.payListBox}>
      {Object.keys(data.allMyEvents).map((key, index) => {
        const events = data.allMyEvents[key]; // 특정 키에 해당하는 배열
        const formattedKey = formatKey(key); // 키를 변환하여 형식화
        return (
          <View key={key} style={{ paddingHorizontal: 20 }}>
            {index !== 0 ? <View style={{ height: 0.3, backgroundColor: "#ccc", marginVertical: 30 }}></View> : null}

            <View style={{}}>
              <Text style={{ fontFamily: "font-B", fontSize: 14, color: "#1f1f1f", marginBottom: 10 }}>{formattedKey}</Text>

              <SwipeListView
                data={events}
                renderItem={(data, rowMap) => {
                  const eventNameParts = data.item.myEventDisplayName.split("의");
                  const modifiedString = eventNameParts[0] + "님의" + eventNameParts[1];

                  return (
                    <View style={styles.rowFront}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ width: 40, height: 40, backgroundColor: "blue", borderRadius: 50, marginRight: 10 }}></View>
                        <View style={{}}>
                          <Text style={{ fontSize: 14, fontFamily: "font-M", color: "#1f1f1f" }}>{modifiedString}</Text>
                          <Text style={{ fontSize: 13, fontFamily: "font-R", color: "#5f5f5f" }}>{formatDate(data.item.eventAt)}</Text>
                        </View>
                      </View>
                      {data.item.receiveAmount === 0}
                      <Text style={{ fontSize: 15, color: "#1f1f1f", fontFamily: "font-B" }}>{data.item.receiveAmount !== 0 ? `+${data.item.receiveAmount.toLocaleString()}원` : `0원`}</Text>
                    </View>
                  );
                }}
                renderHiddenItem={(data, rowMap) => (
                  <View style={styles.rowBack}>
                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
                      <Text style={styles.backTextWhite}>Close</Text>
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-70}
                disableRightSwipe
              />

              {/* {events.length > 0 && <View style={{ height: 0.3, backgroundColor: "#ccc", marginVertical: 30 }}></View>} */}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F3F3FF",
    // minHeight: 740,
    // backgroundColor:"#1d1d1d"
  },
  inner: {
    margin: 20,
    // backgroundColor:"#f5d5f7",

    paddingTop: 60,
  },

  //현재까지 받은 금액
  nowGetMoneyBox: {
    marginBottom: 40,
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
    backgroundColor: "blue",
    right: 0,
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
});

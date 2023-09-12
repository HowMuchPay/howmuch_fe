import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import event0 from "../assets/images/detail_event_icon_0.svg";
import event1 from "../assets/images/detail_event_icon_1.svg";
import event2 from "../assets/images/detail_event_icon_2.svg";
import event3 from "../assets/images/detail_event_icon_3.svg";
import event4 from "../assets/images/detail_event_icon_4.svg";
import trashIcon from "../assets/images/trash_icon.svg";
import { API } from "../stores/api";
import Modal from "react-native-modal";

export default function MyEventDetailScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.eventBox}>
          <View style={styles.eventTextBox}>
            <WithLocalSvg width={22} height={22} asset={event0} style={{ marginBottom: 15 }} />
            <Text style={styles.eventTitle}>나의 결혼식</Text>
            <Text style={styles.eventDes}>2023년 08월 12일</Text>
            <Text style={styles.eventDes}>오전 10시 30분</Text>

            <View style={styles.ddayBtn}>
              <Text style={styles.dday}>D+98일</Text>
            </View>
          </View>
        </View>

        <View>
          <PayFilterBox />
          {/* <PayList /> */}
        </View>
      </View>
    </View>
  );
}

function PayFilterBox({ setData, token }) {
  const [modalVisible, setModalVisible] = useState(null);
  const [groupNumList, setGroupNumList] = useState(null);
  const [eventNumList, setEventNumList] = useState(null);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get("/event/my", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log(newData);
      setData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  const handleButtonPress = (number) => {
    setModalVisible(number);
  };

  const handleModalClose = () => {
    console.log("gr", groupNumList);
    let groupResult;
    let eventResult;

    if (groupNumList.includes(5)) {
      groupResult = "0,1,2";
    } else if (groupNumList.length === 0) {
      groupResult = "0,1,2";
    } else {
      groupResult = groupNumList.sort((a, b) => a - b).join(",");
    }

    if (eventNumList.includes(5)) {
      eventResult = "0,1,2,3,4";
    } else if (eventNumList.length === 0) {
      eventResult = "0,1,2,3,4";
    } else {
      eventResult = eventNumList.sort((a, b) => a - b).join(",");
    }

    console.log("gropu", groupResult);
    console.log("event", eventNumList);
    API.get(`/event/my/filter?myTypes=${groupResult}&eventCategories=${eventResult}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("성공적으로 get 요청을 보냈습니다.", response.data.allMyEvents);
        setData(response.data);
      })
      .catch((error) => {
        console.error("get 요청을 보내는 중 오류가 발생했습니다.", error);
      });

    // Modal 닫기
    setModalVisible(null);
  };

  let groupList = [
    { id: 5, title: "전체", pressed: false },
    { id: 0, title: "나", pressed: false },
    { id: 1, title: "가족", pressed: false },
    { id: 2, title: "기타", pressed: false },
  ];

  let eventList = [
    { id: 5, title: "전체", pressed: false },
    { id: 0, title: "결혼", pressed: false },
    { id: 3, title: "돌잔치", pressed: false },
    { id: 1, title: "상", pressed: false },
    { id: 2, title: "생일", pressed: false },
    { id: 4, title: "기타", pressed: false },
  ];

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterFlex}>
        <TouchableOpacity style={styles.filterSelectBox} onPress={() => handleButtonPress(1)}>
          <Text style={styles.filterSelectTitle}>전체 내역</Text>
          <Image style={{ width: 12, height: 12 }} source={require("../assets/images/icon_arrow.png")} />
        </TouchableOpacity>
        <View>
          <Modal isVisible={modalVisible === 1} transparent={true} onBackdropPress={handleModalClose} onSwipeComplete={handleModalClose} swipeDirection="down" style={styles.bottomModalFlex}>
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

              {/* <SelectGroupBtnBox title={"그룹별"} btnArr={groupList} setGroupNumList={setGroupNumList} />
              <SelectEventBtnBox title={"경조사별"} btnArr={eventList} setEventNumList={setEventNumList} /> */}
            </View>
          </Modal>
        </View>

        <View style={styles.filterSearchBox}>
          <TouchableOpacity style={styles.filterSearchIcon} onPress={() => handleButtonPress(2)}>
            <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_search_black.png")} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterRefreshIcon} onPress={() => fetchData()}>
            <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_rotate_right.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// function PayList(){}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3FF",
    flex: 1,
  },
  inner: {
    margin: 20,
    paddingTop: 60,
  },
  eventBox: {
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 50,
  },
  eventTextBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },
  eventTitle: {
    fontFamily: "font-B",
    color: "#1f1f1f",
    fontSize: 20,
    marginBottom: 12,
  },
  eventDes: {
    fontFamily: "font-M",
    color: "#8e8e8e",
    fontSize: 16,
  },
  ddayBtn: {
    marginTop: 15,
    backgroundColor: "#f3f3ff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "center",
    borderRadius: 20,
  },
  dday: {
    color: "#6D61FF",
    fontSize: 16,
    fontFamily: "font-B",
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
});

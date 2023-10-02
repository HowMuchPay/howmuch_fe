import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button, Pressable, FlatList, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Modal from "react-native-modal";
import { useAppStore } from "../stores/store";
import { API } from "../stores/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwipeListView } from "react-native-swipe-list-view";
import { WithLocalSvg } from "react-native-svg";
import event0 from "../assets/images/event_icon_0.svg";
import event1 from "../assets/images/event_icon_1.svg";
import event2 from "../assets/images/event_icon_2.svg";
import event3 from "../assets/images/event_icon_3.svg";
import event4 from "../assets/images/event_icon_4.svg";
import trashIcon from "../assets/images/trash_icon.svg";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";

export default function AllEventScreen() {
  const store = useAppStore();
  const token = store.token;
  const [data, setData] = useState(null);
  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get("/home/statistics", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log(newData.allAcEvents);
      setData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  const handleDelete = async (id) => {
    // 먼저 확인 대화 상자(alert)를 띄워 사용자에게 물어봅니다.
    Alert.alert(
      "삭제 확인",
      "삭제하시겠습니까?",
      [
        {
          text: "아니오",
          style: "cancel",
        },
        {
          text: "네",
          onPress: async () => {
            try {
              // 삭제 요청을 보냅니다.
              const response = await API.delete(`/event/acquaintance/${id}`, {
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
              });
              console.log("성공적으로 delete 요청을 보냈습니다.", response.data);

              fetchData();
            } catch (error) {
              console.log(id);
              console.error("delete 요청을 보내는 중 오류가 발생했습니다.", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleFilter = (groupNumList, eventNumList) => {
    API.get(`/event/acquaintance/filter?acTypes=${groupNumList}&eventCategories=${eventNumList}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("성공적으로 get 요청을 보냈습니다.", response.data.allAcEvents);
        setData(response.data);
      })
      .catch((error) => {
        console.error("get 요청을 보내는 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <FlatList // ScrollView를 FlatList로 변경
      style={styles.container}
      data={data ? [data] : []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.inner}>
          {item ? (
            <>
              <View>
                <PayListBox handleFilter={handleFilter} fetchData={fetchData} handleSearchChange={handleSearchChange} searchText={searchText} />
                {item && item.allAcEvents && Object.keys(item.allAcEvents).length === 0 ? (
                  <View style={[styles.payListBox, { height: 460, alignItems: "center", justifyContent: "center" }]}>
                    <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#cccccc" }}>이벤트 목록이 없습니다.</Text>
                  </View>
                ) : (
                  <PayList data={item} handleDelete={handleDelete} searchText={searchText} />
                )}
              </View>
            </>
          ) : null}
        </View>
      )}
    />
  );
}

function PayListBox({ handleFilter, fetchData, handleSearchChange, searchText }) {
  const [modalVisible, setModalVisible] = useState(null);
  const [groupNumList, setGroupNumList] = useState(null);
  const [eventNumList, setEventNumList] = useState(null);

  const navigation = useNavigation();

  const handleButtonPress = useCallback((number) => {
    setModalVisible(number);
  }, []);

  const handleModalClose = () => {
    let groupResult;
    let eventResult;

    if (groupNumList.includes(5)) {
      groupResult = "0,1,2,3,4";
    } else if (groupNumList.length === 0) {
      groupResult = "0,1,2,3,4";
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

    handleFilter(groupResult, eventResult);

    // Modal 닫기
    setModalVisible(null);
  };

  let groupList = [
    { id: 5, title: "전체", pressed: false },
    { id: 0, title: "가족", pressed: false },
    { id: 1, title: "친구", pressed: false },
    { id: 2, title: "직장", pressed: false },
    { id: 3, title: "친척", pressed: false },
    { id: 4, title: "기타", pressed: false },
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
          <Modal
            isVisible={modalVisible === 1}
            transparent={true}
            useNativeDriverForBackdrop={true}
            onBackdropPress={handleModalClose}
            onSwipeComplete={handleModalClose}
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

              <SelectGroupBtnBox title={"그룹별"} btnArr={groupList} setGroupNumList={setGroupNumList} />
              <SelectEventBtnBox title={"경조사별"} btnArr={eventList} setEventNumList={setEventNumList} />
            </View>
          </Modal>
        </View>

        <View style={styles.filterSearchBox}>
          {/* <View>
            <TextInput style={styles.eventInput} fontSize={15} onChangeText={handleSearchChange} value={searchText} placeholder="이름을 입력해주세요" placeholderTextColor="#ccc" />
            <Image style={{ width: 22, height: 22, position: "absolute", top: 0, left: 0 }} source={require("../assets/images/icon_search_black.png")} />
          </View> */}
          <TouchableOpacity style={styles.filterSearchIcon} onPress={() => navigation.navigate("SearchMyEventScreen")}>
            <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_search_black.png")} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterRefreshIcon} onPress={fetchData}>
            <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_rotate_right.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function SelectGroupBtnBox(props) {
  const [buttons, setButtons] = useState(props.btnArr);
  const [activeIds, setActiveIds] = useState([]);

  const handleGroupButtonPress = (buttonId) => {
    setButtons((prevButtons) => prevButtons.map((button) => (button.id === buttonId ? { ...button, pressed: !button.pressed } : button)));
    setActiveIds((prevActiveIds) => (prevActiveIds.includes(buttonId) ? prevActiveIds.filter((id) => id !== buttonId) : [...prevActiveIds, buttonId]));
  };
  // console.log("활성화된 ID들:gr", activeIds);

  props.setGroupNumList(activeIds);

  return (
    <View style={styles.modalGroupSelect}>
      <Text style={styles.modalTitle}>{props.title}</Text>
      <View style={styles.modalBtnFlex}>
        {buttons.map((button, idx) => {
          return (
            <TouchableOpacity style={[styles.modalSelectBtn, { backgroundColor: button.pressed ? "#6D61FF" : "#F3F3FF" }]} key={button.id} onPress={() => handleGroupButtonPress(button.id)}>
              <Text style={[styles.modalBtnTitle, { color: button.pressed ? "#fff" : "#1F1F1F" }]}>{button.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function SelectEventBtnBox(props) {
  const [buttons, setButtons] = useState(props.btnArr);
  const [activeIds, setActiveIds] = useState([]);

  const handleEventButtonPress = (buttonId) => {
    setButtons((prevButtons) => prevButtons.map((button) => (button.id === buttonId ? { ...button, pressed: !button.pressed } : button)));
    setActiveIds((prevActiveIds) => (prevActiveIds.includes(buttonId) ? prevActiveIds.filter((id) => id !== buttonId) : [...prevActiveIds, buttonId]));
  };
  // console.log("활성화된 ID들:ev", activeIds);

  props.setEventNumList(activeIds);
  return (
    <View style={styles.modalGroupSelect}>
      <Text style={styles.modalTitle}>{props.title}</Text>
      <View style={styles.modalBtnFlex}>
        {buttons.map((button, idx) => {
          return (
            <TouchableOpacity style={[styles.modalSelectBtn, { backgroundColor: button.pressed ? "#6D61FF" : "#F3F3FF" }]} key={button.id} onPress={() => handleEventButtonPress(button.id)}>
              <Text style={[styles.modalBtnTitle, { color: button.pressed ? "#fff" : "#1F1F1F" }]}>{button.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function PayList({ data, handleDelete, searchText }) {
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
      data={Object.keys(data.allAcEvents)}
      keyExtractor={(key) => key}
      renderItem={({ item: key, index }) => {
        const events = data.allAcEvents[key];
        const formattedKey = formatKey(key);

        // 검색어에 따라 이벤트 필터링
        // const filteredEvents = searchText ? events.filter((event) => event.myEventDisplayName.toLowerCase().includes(searchText.toLowerCase())) : events;

        // const noEventMessage = (
        //   <View style={[styles.payListBox, { height: 480, alignItems: "center", justifyContent: "center" }]}>
        //     <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#cccccc" }}>이벤트 목록이 없습니다.</Text>
        //   </View>
        // );

        // if (filteredEvents.length === 0) {
        //   return null;
        // }

        // console.log("filter", filteredEvents);
        // console.log("filter", filteredEvents.length);
        return (
          <View key={key} style={{ paddingHorizontal: 20 }}>
            {index !== 0 ? <View style={{ height: 0.3, backgroundColor: "#ccc", marginVertical: 30 }}></View> : null}
            {/* 
            {filteredEvents.length === 0 && (
              <View style={[styles.payListBox, { height: 480, alignItems: "center", justifyContent: "center" }]}>
                <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#cccccc" }}>이벤트 목록이 없습니다.</Text>
              </View>
            )} */}

            <View style={{}}>
              <Text style={{ fontFamily: "font-B", fontSize: 14, color: "#1f1f1f", marginBottom: 10 }}>{formattedKey}</Text>

              <SwipeListView
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
                    <Pressable style={styles.rowFront} /*onPress={() => navigation.navigate("MyEventDetailScreen", { id: data.item.id, eventNum: data.item.eventCategory })}*/>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}>
                          <WithLocalSvg width={40} height={40} asset={selectedEvent} style={{ marginRight: 15 }} />
                        </View>
                        <View style={{}}>
                          <Text style={{ fontSize: 14, fontFamily: "font-M", color: "#1f1f1f" }}>{data.item.acEventDisplayName}</Text>
                          <Text style={{ fontSize: 13, fontFamily: "font-R", color: "#5f5f5f" }}>{formatDate(data.item.eventAt)}</Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 15, color: "#1f1f1f", fontFamily: "font-B" }}>{data.item.payAmount !== 0 ? `+${data.item.payAmount.toLocaleString()}원` : `0원`}</Text>
                    </Pressable>
                  );
                }}
                renderHiddenItem={(data, rowMap) => (
                  <View style={styles.rowBack}>
                    {console.log(data.item.id)}
                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => handleDelete(data.item.id)}>
                      <WithLocalSvg width={24} height={24} asset={trashIcon} />
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-70}
                disableRightSwipe
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
    maxWidth: "100%",
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

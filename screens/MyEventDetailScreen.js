import { View, Text, TouchableOpacity, Image, FlatList, Pressable, Alert, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { SwipeListView } from "react-native-swipe-list-view";
import event0 from "../assets/images/detail_event_icon_0.png";
import event1 from "../assets/images/detail_event_icon_1.png";
import event2 from "../assets/images/detail_event_icon_2.png";
import event3 from "../assets/images/detail_event_icon_3.png";
import event4 from "../assets/images/detail_event_icon_4.png";
import trashIcon from "../assets/images/trash_icon.svg";
import { API } from "../stores/api";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "../stores/store";

let eventId;
let eventNumber;

function MyEventDetailScreen({ route }) {
  const [data, setData] = useState(null);
  const store = useAppStore();
  const token = store.token;

  const { id, eventNum } = route.params;
  const [isSearching, setIsSearching] = useState(false);
  eventId = id;
  eventNumber = eventNum;

  let selectedEvent;

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (route.params?.shouldFetchData) {
      fetchData();
    }
  }, [route.params?.shouldFetchData]);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get(`/event/my/${id}/details?sort=asc`, {
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

  const handleDelete = async (eventId = id, detailId) => {
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
              const response = await API.delete(`/event/my/${eventId}/details/${detailId}`, {
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
              });
              console.log("성공적으로 delete 요청을 보냈습니다.", response.data);

              fetchData();
            } catch (error) {
              console.error("delete 요청을 보내는 중 오류가 발생했습니다.", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSearchClose = (query) => {
    setIsSearching(!!query);

    const endpoint = query ? `/event/my/${id}/details/filter?name=${query}` : `/event/my/${id}/details?sort=asc`;

    API.get(endpoint, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("성공적으로 get 요청을 보냈습니다.", response.data);
        if (query) {
          // 검색 결과 데이터에 "myEventInfo" 정보를 추가
          const searchDataWithEventInfo = {
            myEventInfo: data ? data.myEventInfo : null, // 이전 데이터의 "myEventInfo"를 유지하거나 초기화
            myDetails: response.data,
          };

          setData(searchDataWithEventInfo);
        } else {
          // 전체 데이터를 설정
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("get 요청을 보내는 중 오류가 발생했습니다.", error);
      });
  };

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <FlatList
      style={styles.container}
      data={data ? [data] : []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.inner}>
          {console.log("test", item.myEventInfo)}
          <View style={styles.eventBox}>
            <View style={styles.eventTextBox}>
              <Image style={{ width: 22, height: 22, marginBottom: 10 }} source={selectedEvent} />

              {/* <WithLocalSvg width={25} height={25} asset={selectedEvent} style={{ marginBottom: 15 }} /> */}
              <Text style={styles.eventTitle}>{item.myEventInfo.myEventDisplayName}</Text>
              <Text style={styles.eventDes}>{formatDate(item.myEventInfo.eventAt)}</Text>
              <Text style={styles.eventDes}>{item.myEventInfo.eventTime === null ? "시간 미정" : item.myEventInfo.eventTime}</Text>

              <View style={styles.ddayBtn}>
                <Text style={styles.dday}>D{item.myEventInfo.remainedDay < 0 ? item.myEventInfo.remainedDay : "+" + item.myEventInfo.remainedDay}일</Text>
              </View>
            </View>
          </View>

          <View>
            <PayFilterBox id={id} fetchData={fetchData} handleSearchClose={handleSearchClose} />
            {item && item.myDetails && item.myDetails.length === 0 ? (
              <View style={[styles.payListBox, { height: 460, alignItems: "center", justifyContent: "center" }]}>
                <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#cccccc" }}>상세 목록이 없습니다.</Text>
              </View>
            ) : (
              <PayList data={data} handleDelete={handleDelete} />
            )}
          </View>
        </View>
      )}
    />
  );
}

function PayFilterBox({ id, fetchData, handleSearchClose }) {
  const [modalVisible, setModalVisible] = useState(null);
  const [text, setText] = useState("");

  const handleButtonPress = (number) => {
    setModalVisible(number);
  };

  const handleModalClose = () => {
    // API.get(`/event/my/filter?myTypes=${groupResult}&eventCategories=${eventResult}`, {
    //   headers: {
    //     Authorization: token,
    //   },
    // })
    //   .then((response) => {
    //     console.log("성공적으로 get 요청을 보냈습니다.", response.data.allMyEvents);
    //     setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("get 요청을 보내는 중 오류가 발생했습니다.", error);
    //   });

    // Modal 닫기
    setModalVisible(null);
  };

  const handleTextChange = (inputText) => {
    setText(inputText); // 텍스트를 state에 저장
  };

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

      <Modal
        useNativeDriverForBackdrop={true}
        isVisible={modalVisible === 2}
        transparent={true}
        onBackdropPress={() => {
          handleSearchClose(text);
          setModalVisible(null);
        }}
      >
        <View style={styles.searchModalBox}>
          <Text style={styles.searchModalTitle}>검색하기</Text>
          <View style={styles.searchModalInputFlex}>
            <Image style={{ width: 18, height: 18 }} source={require("../assets/images/icon_search.png")} />
            <TextInput style={styles.searchModalInput} placeholder="이름을 입력해주세요" value={text} onChangeText={handleTextChange} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function PayList({ data, handleDelete }) {
  // console.log("pay", data);
  return (
    <FlatList
      style={styles.allContainer}
      data={data.myDetails}
      renderItem={(item, index) => {
        return (
          <View style={{ paddingHorizontal: 20 }}>
            <SwipeListView
              data={[item]}
              renderItem={(data, index) => {
                return (
                  <Pressable style={styles.rowFront}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <View style={{}}>
                        <Text style={{ fontSize: 15, fontFamily: "font-M", color: "#1f1f1f" }}>{data.item.item.acquaintanceNickname}</Text>
                      </View>
                    </View>
                    {/* {data.receiveAmount === 0} */}
                    <Text style={{ fontSize: 15, color: "#1f1f1f", fontFamily: "font-B" }}>{data.item.item.receiveAmount !== 0 ? `+${data.item.item.receiveAmount.toLocaleString()}원` : `0원`}</Text>
                  </Pressable>
                );
              }}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => handleDelete(undefined, data.item.item.id)}>
                    <WithLocalSvg width={24} height={24} asset={trashIcon} />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-70}
              disableRightSwipe
            />
            {index !== 0 ? <View style={{ height: 0.3, backgroundColor: "#ccc", marginVertical: 10 }}></View> : null}
          </View>
        );
      }}
    />
  );
}

function MyEventPersonPlusButton() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_plus_black.png")} />
      </TouchableOpacity>

      <Modal isVisible={modalVisible === true} transparent={true} useNativeDriverForBackdrop={true} onBackdropPress={() => setModalVisible(false)} animationIn="slideInUp">
        <View style={styles.recommendModalBox}>
          <Text style={styles.recommendModalTitle}>신규 인원을 추가하시겠습니까?</Text>

          <View style={styles.recommendModalBtnBox}>
            <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#f3f3ff" }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.recommendModalBtnText}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#6D61FF" }]} onPress={() => navigation.navigate("AddDetailPersonScreen", { id: eventId, eventNum: eventNumber })}>
              <Text style={[styles.recommendModalBtnText, { color: "#fff" }]}>네</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export { MyEventDetailScreen, MyEventPersonPlusButton };
const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    minHeight: 500,
  },
  container: {
    backgroundColor: "#F3F3FF",
    flex: 1,
  },
  inner: {
    margin: 20,
    paddingTop: 80,
  },
  eventBox: {
    paddingBottom: 40,
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

  //이름 리스트
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

  //경조사비 추천 모달
  recommendModalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 30,
  },
  recommendModalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 26,
    marginTop: 10,
    textAlign: "center",
  },
  recommendModalBtnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "95%"
  },
  recommendModalBtn: {
    borderRadius: 10,
    textAlign: "center",
  },
  recommendModalBtnText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    width: 123,
  },
});

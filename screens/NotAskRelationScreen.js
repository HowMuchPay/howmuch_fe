import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import CalendarSelectComponent from "../components/CalendarSelectComponent";
import NameInputComponent from "../components/NameInputComponent";
import EventTypeSelectComponent from "../components/EventTypeSelectComponent";
import MoneyInputComponent from "../components/MoneyInputComponent";
import EventNameInputComponent from "../components/EventNameInputComponent";
import Modal from "react-native-modal";
import TimeSelectComponent from "../components/TimeSelectComponent";
import { useNavigation } from "@react-navigation/native";
import { API } from "../stores/api";
import { useAppStore } from "../stores/store";
import FriendRelationSelectComponent from "../components/FriendRelationSelectComponent";

export default function NotAskRelationScreen() {
  const [countUp, setCountUp] = useState(0);
  const [progress, setProgress] = useState(0.2);
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCountUp = () => {
    setCountUp(6);
  };

  const handleButtonClick = (data) => {
    handleAddData(data);
    // 버튼을 클릭할 때마다 텍스트와 프로그레스 바가 변경되도록 설정
    if (postData.length > 3 && postData[2] === 0 && postData[3] !== 4) {
      console.log("tt");
      return null;
    } else {
      setCountUp(countUp + 1);
      setProgress(progress + 0.1); // 0.1씩 증가시키거나 원하는 값으로 변경 가능
    }
  };

  const handleAddData = (data) => {
    setPostData([...postData, data]);
    console.log(postData);
  };

  const modalOpenClick = () => {
    setModalVisible((prevVisible) => !prevVisible);
  };

  // count가 3일 때의 스타일
  const changeBackground = countUp === 0 || countUp === 1 || countUp === 4 || countUp === 5 || countUp === 6 ? styles.changeColor : null;

  const componentData = {
    countUp,
    handleButtonClick,
    handleAddData,
    postData,
    modalOpenClick,
    modalVisible,
    handleCountUp,
  };

  return (
    <View style={[styles.container, changeBackground]}>
      <View style={styles.inner}>
        <Progress.Bar progress={progress} width={null} height={4} color={"#6D61FF"} unfilledColor={"#E7E7FF"} borderWidth={0} style={{ marginTop: 50, marginBottom: 75 }} />
        <ComponentBasedOnCount {...componentData} />
        <ModalComponent modalOpenClick={modalOpenClick} modalVisible={modalVisible} postData={postData} />
      </View>
    </View>
  );
}

const ComponentBasedOnCount = ({ countUp, handleButtonClick, postData, modalOpenClick, handleAddData, modalVisible, handleCountUp }) => {
  switch (countUp) {
    case 1:
      return <TimeSelectComponent handleButtonClick={handleButtonClick} />;
    case 2:
      return <FriendRelationSelectComponent handleButtonClick={handleButtonClick} />;
    case 3:
      return <EventTypeSelectComponent handleButtonClick={handleButtonClick} />;
    case 4:
      return <NameInputComponent handleButtonClick={handleButtonClick} handleAddData={handleAddData} myType={postData[2]} eventType={postData[3]} modalOpenClick={modalOpenClick} type={"friend"} />;
    case 5:
      if (postData[3] === 4) {
        return <EventNameInputComponent handleButtonClick={handleButtonClick} handleAddData={handleAddData} modalOpenClick={modalOpenClick} type={"friend"} />;
      } else {
        handleCountUp();
      }
    case 6:
      return <MoneyInputComponent handleButtonClick={handleButtonClick} handleAddData={handleAddData} modalOpenClick={modalOpenClick} recommend={false} />;
    default:
      return <CalendarSelectComponent handleButtonClick={handleButtonClick} />;
  }
};

const ModalComponent = ({ modalOpenClick, modalVisible, postData }) => {
  const store = useAppStore();
  const token = store.token;
  const navigation = useNavigation();
  let eventData;
  const handlePostData = () => {
    // 여기서 데이터를 준비합니다.
    console.log("post", postData);
    if (postData.length === 6) {
      eventData = {
        acName: postData[4],
        acType: postData[2],
        eventCategory: postData[3],
        payAmount: postData[5] === null ? postData[5] : parseInt(postData[5].replace(/,/g, ""), 10),
        eventAt: postData[0],
        eventName: null,
        eventTime: postData[1],
      };
    } else if (postData.length === 7) {
      eventData = {
        acName: postData[4],
        acType: postData[2],
        eventCategory: postData[3],
        payAmount: postData[6] === null ? postData[6] : parseInt(postData[6].replace(/,/g, ""), 10),
        eventAt: postData[0],
        eventName: postData[5],
        eventTime: postData[1],
      };
    }
    console.log(eventData);

    API.post("/event/acquaintance", eventData, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("성공적으로 POST 요청을 보냈습니다.", response.data);
        navigation.replace("FriendEvent");
      })
      .catch((error) => {
        console.error("POST 요청을 보내는 중 오류가 발생했습니다.", error);
        navigation.replace("FriendEvent");
      });

    // 모달을 닫습니다.
    modalOpenClick();
  };

  return (
    <>
      <Modal isVisible={modalVisible === true} transparent={true} useNativeDriverForBackdrop={true}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>저장이 완료되었습니다!</Text>

          <View style={styles.modalBtnBox}>
            <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#6d61ff" }]} onPress={handlePostData}>
              <Text style={styles.modalBtnText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const NoticesModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const modalOpenClick = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      useNativeDriverForBackdrop={true}
      isVisible={modalVisible === true}
      transparent={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
      style={styles.bottomModalFlex}
    >
      <View style={styles.bottomModalBox}>
        <TouchableOpacity
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
            marginBottom: 0,
            height: 20,
            width: 100,
          }}
          onPress={() => setModalVisible(false)}
        >
          <Image style={{ width: 37, height: 2 }} source={require("../assets/images/icon_close_bar.png")} />
        </TouchableOpacity>

        <View style={styles.bottomModalInner}>
          <Image style={{ width: 40, height: 40 }} source={require("../assets/images/icon_bell.png")} />
          <Text style={styles.bottomModalTitle}>지인에게 나의 경조사를 알리시겠어요?</Text>
          <Text style={styles.bottomModalText}>나의 경조사를 알리려면 연락처를 연동해야 합니다.</Text>

          <View style={styles.bottomModalBtnFlex}>
            <TouchableOpacity style={styles.bottomModalBtn}>
              <Text style={styles.bottomModalBtnText}>아니요</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ContactSelectScreen")} style={[styles.bottomModalBtn, { backgroundColor: "#6D61FF" }]}>
              <Text style={[styles.bottomModalBtnText, { color: "#fff" }]}>네</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    position: "relative",
  },
  changeColor: {
    backgroundColor: "#F3F3FF",
  },
  inner: {
    margin: 20,
    // backgroundColor: "#fff",
  },
  addTextBox: {
    marginTop: 75,
  },
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },
  addBtnBox: {
    width: "97%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 80,
  },
  addBtn: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 41,
    paddingRight: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
  },
  addBtnText: {
    fontFamily: "font-M",
    fontSize: 14,
    width: 80,
    textAlign: "center",
  },

  //바텀 모달창
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

  bottomModalInner: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomModalTitle: {
    fontSize: 17,
    fontFamily: "font-B",
    color: "#1F1F1F",
    marginBottom: 10,
    marginTop: 15,
  },
  bottomModalText: {
    fontSize: 14,
    fontFamily: "font-M",
    color: "#8e8e8e",
    marginBottom: 18,
  },
  bottomModalBtnFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    marginTop: 10,
  },
  bottomModalBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F3F3FF",
    width: 140,
    height: 57,
  },
  bottomModalBtnText: {
    fontSize: 14,
    fontFamily: "font-M",
    color: "#1f1f1f",
  },
  //모달창
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 30,
    marginTop: 10,
    textAlign: "center",
  },
  modalBtnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalBtn: {
    borderRadius: 10,
    textAlign: "center",
    width: "100%",
    alignItems: "center",
  },
  modalBtnText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
});

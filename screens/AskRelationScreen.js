import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import CalendarSelectComponent from "../components/CalendarSelectComponent";
import NameInputComponent from "../components/NameInputComponent";
import RelationSelectComponent from "../components/RelationSelectComponent";
import EventTypeSelectComponent from "../components/EventTypeSelectComponent";
import AskSelectComponent from "../components/AskSelectComponent";
import MoneyInputComponent from "../components/MoneyInputComponent";
import AgeInputComponent from "../components/AgeInputComponent";
import IncomeInputComponent from "../components/IncomeInputComponent";
import QuestionComponent01 from "../components/QuestionComponent01";
import QuestionComponent02 from "../components/QuestionComponent02";
import QuestionComponent03 from "../components/QuestionComponent03";
import QuestionComponent04 from "../components/QuestionComponent04";
import QuestionComponent05 from "../components/QuestionComponent05";
import TimeSelectComponent from "../components/TimeSelectComponent";
import FriendRelationSelectComponent from "../components/FriendRelationSelectComponent";
import EventNameInputComponent from "../components/EventNameInputComponent";
import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "../stores/store";
import Modal from "react-native-modal";
import { API } from "../stores/api";

export default function AskRelationScreen() {
  const [countUp, setCountUp] = useState(0);
  const [progress, setProgress] = useState(0.15);
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = (data) => {
    handleAddData(data);
    // 버튼을 클릭할 때마다 텍스트와 프로그레스 바가 변경되도록 설정
    setCountUp(countUp + 1);
    setProgress(progress + 0.075); // 0.1씩 증가시키거나 원하는 값으로 변경 가능
  };

  const handleAddData = (data) => {
    setPostData([...postData, data]);
    console.log(postData);
  };

  const modalOpenClick = () => {
    setModalVisible((prevVisible) => !prevVisible);
  };

  const handleCountUp = () => {
    setCountUp(13);
  };

  // count가 3일 때의 스타일
  const changeBackground = countUp === 0 || countUp === 1 || countUp === 7 || countUp === 8 || countUp === 11 || countUp === 12 || countUp === 13 ? styles.changeColor : null;

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
      return <IncomeInputComponent handleButtonClick={handleButtonClick} eventType={"friend"} />;
    case 2:
      return <QuestionComponent01 handleButtonClick={handleButtonClick} />;
    case 3:
      return <QuestionComponent02 handleButtonClick={handleButtonClick} />;
    case 4:
      return <QuestionComponent03 handleButtonClick={handleButtonClick} />;
    case 5:
      return <QuestionComponent04 handleButtonClick={handleButtonClick} />;
    case 6:
      return <QuestionComponent05 handleButtonClick={handleButtonClick} />;
    case 7:
      return <CalendarSelectComponent handleButtonClick={handleButtonClick} />;
    case 8:
      return <TimeSelectComponent handleButtonClick={handleButtonClick} />;
    case 9:
      return <FriendRelationSelectComponent handleButtonClick={handleButtonClick} />;
    case 10:
      return <EventTypeSelectComponent handleButtonClick={handleButtonClick} />;
    case 11:
      return <NameInputComponent handleButtonClick={handleButtonClick} handleAddData={handleAddData} myType={postData[2]} eventType={postData[3]} modalOpenClick={modalOpenClick} type={"friend"} />;
    case 12:
      if (postData[10] === 4) {
        return <EventNameInputComponent handleButtonClick={handleButtonClick} handleAddData={handleAddData} modalOpenClick={modalOpenClick} type={"friend"} postData={postData} />;
      } else {
        handleCountUp();
      }
    case 13:
      return <MoneyInputComponent handleButtonClick={handleButtonClick} handleAddData={handleAddData} modalOpenClick={modalOpenClick} recommend={true} postData={postData} />;
    default:
      return <AgeInputComponent handleButtonClick={handleButtonClick} />;
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
    console.log("postlength", postData.length);
    if (postData.length === 13) {
      eventData = {
        acName: postData[11],
        acType: postData[9],
        eventCategory: postData[10],
        payAmount: postData[12] === null ? postData[12] : parseInt(postData[12].replace(/,/g, ""), 10),
        eventAt: postData[7],
        eventName: null,
        // eventTime: postData[1],
      };
    } else if (postData.length === 14) {
      eventData = {
        acName: postData[11],
        acType: postData[9],
        eventCategory: postData[10],
        payAmount: postData[13] === null ? postData[13] : parseInt(postData[13].replace(/,/g, ""), 10),
        eventAt: postData[7],
        eventName: postData[12],
        // eventTime: postData[1],
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
        navigation.navigate("FriendEvent");
      })
      .catch((error) => {
        console.error("POST 요청을 보내는 중 오류가 발생했습니다.", error);
        navigation.navigate("FriendEvent");
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

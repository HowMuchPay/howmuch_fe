import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Progress from "react-native-progress";
import CalendarSelectComponent from "../components/CalendarSelectComponent";
import NameInputComponent from "../components/NameInputComponent";
import RelationSelectComponent from "../components/RelationSelectComponent";
import EventTypeSelectComponent from "../components/EventTypeSelectComponent";
import EventNameInputComponent from "../components/EventNameInputComponent";
import Modal from "react-native-modal";
import TimeSelectComponent from "../components/TimeSelectComponent";
import { useNavigation } from "@react-navigation/native";
import { API } from "../stores/api";
import { useAppStore } from "../stores/store";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";

import { asPickerFormat } from "../utils/utils";
import { BUTTON_HEIGHT, VIEW_WIDTH } from "../utils/values";
import TimePicker from "../components/TimePicker";
import WheelPicker from "react-native-wheely";
import { StatusBar } from "expo-status-bar";

export default function AddMyEventScreen() {
  const [countUp, setCountUp] = useState(0);
  const [progress, setProgress] = useState(0.2);
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["40%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleButtonClick = (data) => {
    handleAddData(data);
    // 버튼을 클릭할 때마다 텍스트와 프로그레스 바가 변경되도록 설정
    if (postData.length > 3 && postData[2] === 0 && postData[3] !== 4) {
      console.log("tt");
      return null;
    } else {
      setCountUp(countUp + 1);
      setProgress(progress + 0.17); // 0.1씩 증가시키거나 원하는 값으로 변경 가능
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
  const changeBackground = countUp === 0 || countUp === 1 || countUp === 4 || countUp === 5 ? styles.changeColor : null;

  return (
    <View style={[styles.container, changeBackground]}>
      <StatusBar barStyle="auto" />

      <View style={styles.inner}>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Text>modal</Text>
        </TouchableOpacity>

        <Progress.Bar progress={progress} width={null} height={4} color={"#6D61FF"} unfilledColor={"#E7E7FF"} borderWidth={0} style={{ marginTop: 50, marginBottom: 75 }} />
        <ComponentBasedOnCount countUp={countUp} handleButtonClick={handleButtonClick} handleAddData={handleAddData} postData={postData} modalOpenClick={modalOpenClick} modalVisible={modalVisible} />
        <ModalComponent modalOpenClick={modalOpenClick} modalVisible={modalVisible} postData={postData} />
      </View>
      <BottomModal bottomSheetModalRef={bottomSheetModalRef} handlePresentModalPress={handlePresentModalPress} handleSheetChanges={handleSheetChanges} snapPoints={snapPoints} />
    </View>
  );
}

const ComponentBasedOnCount = ({ countUp, handleButtonClick, postData, modalOpenClick, handleAddData, modalVisible }) => {
  switch (countUp) {
    case 1:
      return <TimeSelectComponent handleButtonClick={handleButtonClick} />;
    case 2:
      return <RelationSelectComponent handleButtonClick={handleButtonClick} />;
    case 3:
      return <EventTypeSelectComponent handleButtonClick={handleButtonClick} />;
    case 4:
      if (postData[2] === 0) {
        if (postData[3] === 4) {
          return <EventNameInputComponent handleAddData={handleAddData} modalOpenClick={modalOpenClick} type="my" />;
        } else {
          if (modalVisible === false) {
            modalOpenClick(); // modalOpenClick 함수 호출
          }
          return null; // 컴포넌트를 반환하지 않음
        }
      } else {
        return <NameInputComponent handleButtonClick={handleButtonClick} handleAddData={handleAddData} myType={postData[2]} eventType={postData[3]} modalOpenClick={modalOpenClick} type={"my"} />;
      }
    case 5:
      return <EventNameInputComponent handleAddData={handleAddData} modalOpenClick={modalOpenClick} type="my" />;
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
    if (postData.length === 4) {
      eventData = {
        eventAt: postData[0],
        myType: postData[2],
        eventCategory: postData[3],
        myEventName: null,
        myEventCharacterName: null,
        eventTime: postData[1],
      };
    } else if (postData.length === 5 && postData[2] === 0) {
      eventData = {
        eventAt: postData[0],
        myType: postData[2],
        eventCategory: postData[3],
        myEventName: postData[4],
        myEventCharacterName: null,
        eventTime: postData[1],
      };
    } else if (postData.length === 5 && postData[2] !== 0) {
      eventData = {
        eventAt: postData[0],
        myType: postData[2],
        eventCategory: postData[3],
        myEventName: null,
        myEventCharacterName: postData[4],
        eventTime: postData[1],
      };
    } else if (postData.length === 6) {
      eventData = {
        eventAt: postData[0],
        myType: postData[2],
        eventCategory: postData[3],
        myEventName: postData[5],
        myEventCharacterName: postData[4],
        eventTime: postData[1],
      };
    }
    console.log(eventData);

    API.post("/event/my", eventData, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("성공적으로 POST 요청을 보냈습니다.", response.data);
        navigation.navigate("MyEvent");
      })
      .catch((error) => {
        console.error("POST 요청을 보내는 중 오류가 발생했습니다.", error);
        navigation.navigate("MyEvent");
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

const BottomModal = ({ bottomSheetModalRef, handlePresentModalPress, handleSheetChanges, snapPoints }) => {
  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />, []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [time, setTime] = useState(asPickerFormat(new Date()));
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal enableContentPanningGesture={false} ref={bottomSheetModalRef} backdropComponent={renderBackdrop} index={0} snapPoints={snapPoints} onChange={handleSheetChanges}>
        <WheelPicker selectedIndex={selectedIndex} options={["Berlin", "London", "Amsterdam"]} onChange={(index) => setSelectedIndex(index)} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
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

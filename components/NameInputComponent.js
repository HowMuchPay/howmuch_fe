import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function NameInputComponent({ handleButtonClick, eventType, myType, modalOpenClick, handleAddData, type }) {
  const [showButton, setShowButton] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const TextButtonClick = (value) => {
    setShowButton(inputValue.trim() !== "");
  };

  const handleConfirmClick = () => {
    // console.log("TextInput의 값:", inputValue);
    if (type === "friend") {
      handleButtonClick(inputValue);
    } else {
      if (eventType === 4) {
        handleButtonClick(inputValue);
      } else {
        modalOpenClick();
        handleAddData(inputValue);
      }
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.addText}>경조사에 해당하는 분의</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.addText, { color: "#6D61FF" }]}>성함(애칭)</Text>
        <Text style={styles.addText}>을 입력해주세요</Text>
      </View>
      <View style={styles.nameInputBox}>
        <TextInput style={styles.nameInput} placeholder="이름을 입력해주세요" onSubmitEditing={TextButtonClick} value={inputValue} onChangeText={(text) => setInputValue(text)} />
      </View>

      {showButton && (
        // <TouchableOpacity onPress={eventType === "friend" ? handleButtonClick : modalOpenClick} style={styles.nextBtn}>
        <TouchableOpacity onPress={handleConfirmClick} style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>확인</Text>
        </TouchableOpacity>
      )}

      {/* <Modal
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
      </Modal> */}
    </>
  );
}

const styles = StyleSheet.create({
  addTextBox: {
    marginTop: 75,
  },
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },

  //이름 입력 input
  nameInputBox: {
    marginTop: 80,
  },
  nameInput: {
    borderRadius: 20,
    borderColor: "#E7E7FF",
    borderWidth: 1,
    backgroundColor: "#fff",
    color: "#000",
    padding: 20,
    height: 64,
    fontFamily: "font-M",
  },
  // 다음 버튼
  nextBtn: {
    top: "60%",
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 57,
    backgroundColor: "#6d61ff",
    borderRadius: 20,
  },
  nextBtnText: {
    color: "#fff",
    fontFamily: "font-M",
    fontSize: 16,
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
});

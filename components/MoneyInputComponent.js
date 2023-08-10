import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import Modal from "react-native-modal";

export default function MoneyInputComponent({handleButtonClick}) {
  const [textInputValue, setTextInputValue] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const TextButtonClick = (value) => {
    setTextInputValue(value);
    setShowButton(true);
  };

  const modalOpenClick = () => {
    setModalVisible(true);
  };
  return (
    <>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.addText}>지불할</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <Text style={[styles.addText, {color: "#6D61FF"}]}>경조사비</Text>
        <Text style={styles.addText}>를 입력해주세요</Text>
      </View>
      <View style={styles.nameInputBox}>
        <TextInput
          style={styles.nameInput}
          placeholder="경조사비를 입력해주세요"
          //   onSubmitEditing={handleButtonClick}
          value={textInputValue}
        />
      </View>
      <View style={styles.moneyBtnFlex}>
        <TouchableOpacity
          onPress={() => TextButtonClick("미정")}
          style={[styles.moneyBtn]}
        >
          <Text style={styles.moneyBtnText}>미정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => TextButtonClick("10000")}
          style={[styles.moneyBtn]}
        >
          <Text style={styles.moneyBtnText}>+1만</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => TextButtonClick("50000")}
          style={[styles.moneyBtn]}
        >
          <Text style={styles.moneyBtnText}>+5만</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => TextButtonClick("100000")}
          style={[styles.moneyBtn]}
        >
          <Text style={styles.moneyBtnText}>+10만</Text>
        </TouchableOpacity>
      </View>

      {showButton && (
        <TouchableOpacity onPress={modalOpenClick} style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>확인</Text>
        </TouchableOpacity>
      )}
      <Modal isVisible={modalVisible === true} transparent={true}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>저장이 완료되었습니다!</Text>

          <View style={styles.modalBtnBox}>
            <TouchableOpacity
              style={[styles.modalBtn, {backgroundColor: "#6d61ff"}]}
            >
              <Text style={styles.modalBtnText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  //추천 금액
  moneyBtnFlex: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "96%",
  },
  moneyBtn: {
    width: 64,
    height: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    // paddingTop: 11,
    // paddingBottom: 11,
    borderColor: "#e7e7ff",
  },
  moneyBtnText: {
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    color: "#978eff",
  },

  // 다음 버튼
  nextBtn: {
    top: "45%",
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

  //확인 모달
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 26,
    marginTop: 30,
    textAlign: "center",
  },
  modalBtnBox: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    width: "95%",
  },
  modalBtn: {
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
  },
  modalBtnText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    width: 123,
    color: "#fff",
  },
});

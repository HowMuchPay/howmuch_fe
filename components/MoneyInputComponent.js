import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";

export default function MoneyInputComponent({ handleButtonClick, handleAddData, modalOpenClick }) {
  const [textInputValue, setTextInputValue] = useState("");
  const [showButton, setShowButton] = useState(false);

  const TextButtonClick = (value) => {
    if (value === "미정") {
      setTextInputValue(value);
    } else {
      if (/^\d+$/.test(value)) {
        setTextInputValue(value.toLocaleString());
      }
    }
    setShowButton(true);
  };

  const handleConfirmClick = () => {
    // console.log("TextInput의 값:", inputValue);
    modalOpenClick();
    if (textInputValue === "미정") {
      handleAddData(null);
    } else {
      handleAddData(textInputValue);
    }
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onChangeText = (text) => {
    const numericValue = parseFloat(text.replace(/,/g, ""));

    if (!isNaN(numericValue)) {
      // 숫자인 경우에만 포맷팅하여 표시
      const formattedText = formatNumber(numericValue);
      setTextInputValue(formattedText);
      setShowButton(true);
    } else {
      // 숫자가 아닌 경우 또는 빈 문자열인 경우 그대로 표시
      setTextInputValue(text);
    }

    // textInputValue 값이 빈 문자열인 경우에만 setShowButton(false) 호출
    if (text === "") {
      setShowButton(false);
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.addText}>지불할</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.addText, { color: "#6D61FF" }]}>경조사비</Text>
        <Text style={styles.addText}>를 입력해주세요</Text>
      </View>
      <View style={styles.nameInputBox}>
        <TextInput
          style={styles.nameInput}
          placeholder="경조사비를 입력해주세요"
          //   onSubmitEditing={handleButtonClick}
          keyboardType="numeric"
          value={textInputValue}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.moneyBtnFlex}>
        <TouchableOpacity onPress={() => TextButtonClick("미정")} style={[styles.moneyBtn]}>
          <Text style={styles.moneyBtnText}>미정</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TextButtonClick(10000)} style={[styles.moneyBtn]}>
          <Text style={styles.moneyBtnText}>+1만</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TextButtonClick(50000)} style={[styles.moneyBtn]}>
          <Text style={styles.moneyBtnText}>+5만</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TextButtonClick(100000)} style={[styles.moneyBtn]}>
          <Text style={styles.moneyBtnText}>+10만</Text>
        </TouchableOpacity>
      </View>

      {showButton && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleConfirmClick}>
          <Text style={styles.nextBtnText}>확인</Text>
        </TouchableOpacity>
      )}
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
    top: "30%",
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

import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function EventNameInputComponent({ handleButtonClick, handleAddData, modalOpenClick, type }) {
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
      modalOpenClick();
      handleAddData(inputValue);
    }
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.addText}>경조사 명을</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.addText, { color: "#6D61FF" }]}>자유롭게</Text>
        <Text style={styles.addText}> 적어주세요</Text>
      </View>
      <View style={styles.nameInputBox}>
        <TextInput style={styles.nameInput} placeholder="ex)내친구 철수 생일" onSubmitEditing={TextButtonClick} value={inputValue} onChangeText={(text) => setInputValue(text)} />
      </View>

      {showButton && (
        // <TouchableOpacity onPress={eventType === "friend" ? handleButtonClick : modalOpenClick} style={styles.nextBtn}>
        <TouchableOpacity onPress={handleConfirmClick} style={styles.nextBtn}>
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
});

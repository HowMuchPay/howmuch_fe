import {View, Text, StyleSheet, TextInput} from "react-native";
import React from "react";

export default function EventNameInputComponent({handleButtonClick}) {
  return (
    <>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.addText}>경조사 명을</Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <Text style={[styles.addText, {color: "#6D61FF"}]}>자유롭게</Text>
        <Text style={styles.addText}> 적어주세요</Text>
      </View>
      <View style={styles.nameInputBox}>
        <TextInput
          style={styles.nameInput}
          placeholder="ex)내친구 철수 생일"
          onSubmitEditing={handleButtonClick}
        />
      </View>
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
});

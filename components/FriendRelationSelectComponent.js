import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function FriendRelationSelectComponent({ handleButtonClick }) {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.addText, { color: "#6D61FF" }]}>관계</Text>
        <Text style={styles.addText}>를</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.addText}>선택해주세요</Text>
      </View>

      <View style={styles.relationBtnFlex}>
        <TouchableOpacity onPress={() => handleButtonClick(3)} style={styles.relationBtn}>
          <Text style={styles.relationBtnText}>친척</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonClick(1)} style={styles.relationBtn}>
          <Text style={styles.relationBtnText}>친구</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonClick(2)} style={styles.relationBtn}>
          <Text style={styles.relationBtnText}>직장</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonClick(4)} style={styles.relationBtn}>
          <Text style={styles.relationBtnText}>기타</Text>
        </TouchableOpacity>
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
  //관계 선택 버튼
  relationBtnFlex: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 50,
  },
  relationBtn: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3FF",
    width: 163,
    height: 57,
    marginRight: 10,
    marginBottom: 17,
  },
  relationBtnText: {
    fontFamily: "font-M",
    fontSize: 16,
  },
});

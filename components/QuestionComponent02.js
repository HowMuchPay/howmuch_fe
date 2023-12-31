import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function QuestionComponent02({ handleButtonClick }) {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.addText, { color: "#6D61FF" }]}>1촌 이내 가족</Text>
        <Text style={styles.addText}>들과도</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.addText}>함께 </Text>
        <Text style={[styles.addText, { color: "#6D61FF" }]}>만난 적</Text>
        <Text style={styles.addText}>이 있나요?</Text>
      </View>
      <View style={styles.addBtnBox}>
        <TouchableOpacity onPress={() => handleButtonClick(0)} style={[styles.addBtn, { backgroundColor: "#F3F3FF", marginBottom: 15 }]}>
          <Text style={styles.addBtnText}>네</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleButtonClick(1)} style={[styles.addBtn, { backgroundColor: "#F3F3FF" }]}>
          <Text style={[styles.addBtnText]}>아니요</Text>
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
});

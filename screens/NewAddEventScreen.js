import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function NewAddEventScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.addTextBox}>
          <Text style={styles.addText}>입력하고자 하는</Text>
          <Text style={styles.addText}>경조사를 선택해주세요</Text>
        </View>

        <View style={styles.addBtnBox}>
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: "#F3F3FF" }]}
            onPress={() => {
              navigation.navigate("AddMyEventScreen");
            }}
          >
            <Text style={styles.addBtnText}>나의 경조사</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.addBtn, { backgroundColor: "#6D61FF" }]}>
            <Text style={[styles.addBtnText, { color: "#fff" }]}>지인의 경조사</Text>
          </TouchableOpacity>

          <Modal isVisible={modalVisible === true} transparent={true} onBackdropPress={() => setModalVisible(false)}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>경조사비를 추천 받으시겠습니까?</Text>

              <View style={styles.modalBtnBox}>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#f3f3ff" }]} onPress={() => navigation.navigate("NotAskRelationScreen")}>
                  <Text style={styles.modalBtnText}>아니요</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#6D61FF" }]} onPress={() => navigation.navigate("AskRelationScreen")}>
                  <Text style={[styles.modalBtnText, { color: "#fff" }]}>네</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    margin: 20,
    backgroundColor: "#fff",
  },
  addTextBox: {
    marginTop: 170,
  },
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },
  addBtnBox: {
    width: "97%",
    flexDirection: "row",
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
  },
  addBtnText: {
    fontFamily: "font-M",
    fontSize: 14,
    width: 80,
    textAlign: "center",
  },
  //모달창
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 45,
  },
  modalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  modalBtnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "95%"
  },
  modalBtn: {
    borderRadius: 10,
    textAlign: "center",
  },
  modalBtnText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    width: 123,
  },
});

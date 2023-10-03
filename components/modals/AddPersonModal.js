import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const AddPersonModal = ({ visible, id, eventNum }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(visible);
  return (
    <Modal isVisible={modalVisible === true} transparent={true}>
      <View style={styles.recommendModalBox}>
        <Text style={styles.recommendModalTitle}>신규인원이 저장되었습니다.</Text>

        <View style={styles.recommendModalBtnBox}>
          <TouchableOpacity
            style={[styles.recommendModalBtn, { backgroundColor: "#6D61FF" }]}
            onPress={() => navigation.navigate("MyEventDetailScreen", { id: id, eventNum: eventNum, shouldFetchData: true })}
          >
            <Text style={[styles.recommendModalBtnText, { color: "#fff" }]}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddPersonModal;

const styles = StyleSheet.create({
  //경조사비 추천 모달
  recommendModalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 30,
  },
  recommendModalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 26,
    marginTop: 10,
    textAlign: "center",
  },
  recommendModalBtnBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "95%",
  },
  recommendModalBtn: {
    borderRadius: 10,
    textAlign: "center",
    flex: 1,
  },
  recommendModalBtnText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    // width: 123,
  },
});

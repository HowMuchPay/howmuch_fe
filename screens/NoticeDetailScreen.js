import { View, Text, Pressable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAppStore } from "../stores/store";
import { API } from "../stores/api";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function NoticeDetailScreen({ route }) {
  const { id } = route.params;
  const store = useAppStore();
  const token = store.token;
  const isFocused = useIsFocused();
  const [data, setData] = useState(null);
  const userType = store.userType;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get(`/event/notice/${id}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log("noticedetail", newData);
      setData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  const handleModalConfirm = () => {
    setModalVisible(false); // 모달 상태를 false로 변경하여 모달을 닫습니다.
  };

  const handleDelete = () => {
    API.delete(`/admin/notice/${id}`, {
      headers: {
        Authorization: token, // 토큰을 Bearer 스타일로 보냅니다.
      },
    })
      .then((response) => {
        console.log("삭제 성공!");
        setModalVisible(false);
        navigation.navigate("NoticeListScreen");
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };

  return (
    <ScrollView styles={styles.container} contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}>
      {data && (
        <View style={styles.inner}>
          <Text style={styles.title}>{data.title}</Text>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={styles.date}>{data.updatedAt}</Text>
            {userType === "ROLE_ADMIN" ? (
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={{ marginRight: 20, marginBottom: 20 }}
                  onPress={() => {
                    navigation.navigate("NoticeUpdateScreen", { id: id, contents: data.content, titles: data.title });
                  }}
                >
                  <Text style={styles.btnText}>수정</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.btnText}>삭제</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
          <View style={{ width: "100%", height: 0.5, backgroundColor: "#ccc", marginBottom: 20 }}></View>
          <Text style={styles.des}>{data.content}</Text>
        </View>
      )}
      {modalVisible && <DeleteModal modalVisible={modalVisible} onConfirm={handleModalConfirm} onDelete={handleDelete} />}
    </ScrollView>
  );
}

const DeleteModal = ({ modalVisible, onConfirm, onDelete }) => {
  return (
    <Modal isVisible={modalVisible} transparent={true} useNativeDriverForBackdrop={true}>
      <View style={styles.recommendModalBox}>
        <Text style={styles.recommendModalTitle}>삭제된 공지사항은 복구할 수 없습니다.</Text>
        <Text style={styles.recommendModalTitle}>그래도 삭제하시겠습니까?</Text>

        <View style={styles.recommendModalBtnBox}>
          <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#f3f3ff" }]} onPress={onConfirm}>
            <Text style={[styles.recommendModalBtnText, { color: "#000" }]}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.recommendModalBtn, { backgroundColor: "#6D61FF" }]} onPress={onDelete}>
            <Text style={[styles.recommendModalBtnText, { color: "#fff" }]}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  inner: {
    margin: 20,
    paddingTop: 100,
  },
  listBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
    marginTop: 26,
  },
  title: {
    fontSize: 18,
    fontFamily: "font-M",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    fontFamily: "font-R",
    color: "#8e8e8e",
    marginBottom: 20,
  },
  des: {
    fontSize: 16,
    fontFamily: "font-M",
    marginBottom: 8,
    lineHeight: 24,
  },
  btnText: {
    fontFamily: "font-M",
    fontSize: 15,
  },
  recommendModalBox: {
    backgroundColor: "#fff",
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    paddingBottom: 30,
    paddingTop: 30,
  },
  recommendModalTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    // marginBottom: 26,
    // marginTop: 10,
    textAlign: "center",
    lineHeight: 28,
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
    // flex: 1,
    marginTop: 25,
  },
  recommendModalBtnText: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "font-M",
    fontSize: 14,
    textAlign: "center",
    width: 123,
  },
});

import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { API } from "../stores/api";
import { useAppStore } from "../stores/store";
import { useNavigation } from "@react-navigation/native";

export default function AddNoticeScreen() {
  const [title, setTitle] = useState(""); // 제목 state
  const [content, setContent] = useState("");
  const store = useAppStore();
  const token = store.token;
  const navigation = useNavigation();
  const handlePost = () => {
    const postData = {
      title: title,
      content: content,
    };

    API.post(`/admin/notice`, postData, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        console.log("성공적으로 POST 요청을 보냈습니다.", response.data);
        navigation.navigate("NoticeListScreen");
      })
      .catch((error) => {
        console.error("POST 요청을 보내는 중 오류가 발생했습니다.", error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TextInput
          style={styles.contentInput}
          placeholder="제목을 입력해 주세요"
          value={title} // 제목 입력값과 연결
          onChangeText={(text) => setTitle(text)} // 제목 입력값 변경 시 state 업데이트
        />

        <View style={{ width: "100%", height: 0.5, backgroundColor: "#ccc", marginVertical: 20 }}></View>
        <TextInput
          style={styles.contentInput}
          multiline={true}
          textAlignVertical="top"
          placeholder="내용을 입력해 주세요"
          value={content} // 내용 입력값과 연결
          onChangeText={(text) => setContent(text)} // 내용 입력값 변경 시 state 업데이트
        />
      </View>

      <Pressable onPress={handlePost} style={styles.nextBtn}>
        <Text style={styles.nextBtnText}>등록</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    // height: 740,
    // padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    margin: 20,
    paddingTop: 60,
  },
  contentInput: {
    fontSize: 16,
    fontFamily: "font-R",
    lineHeight: 24,
  },
  // 다음 버튼
  nextBtn: {
    position: "absolute",
    bottom: 40,
    width: "95%",
    marginLeft: 10,
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

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import inputCheckIcon from "../assets/images/input_check_icon.svg";
import AddPersonModal from "../components/modals/AddPersonModal";
import { API } from "../stores/api";
import { useAppStore } from "../stores/store";
import { useNavigation } from "@react-navigation/native";

const AddDetailPersonScreen = ({ route }) => {
  const store = useAppStore();
  const token = store.token;
  const [text, setText] = useState("");
  const [nameBorderColor, setNameBorderColor] = useState("#E7E7FF");
  const [checkIcon, setCheckIcon] = useState(false);
  const [amount, setAmount] = useState(0);
  const [modal, setModal] = useState(false);

  const { id, eventNum } = route.params;
  const navigation = useNavigation();

  console.log(id);

  const handleSubmint = (name, amount) => {
    const postData = {
      acquaintanceNickname: name,
      receiveAmount: amount,
    };

    API.post(`/event/my/${id}/details`, postData, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // navigation.navigate("AddDetailPersonScreen", { id: id, eventNum: eventNum });
        console.log("성공적으로 post 요청을 보냈습니다.", response.data);
      })
      .catch((error) => {
        console.error("get 요청을 보내는 중 오류가 발생했습니다.", error);
      });
  };

  const handleTextChange = (inputText) => {
    // 특수 문자가 포함되어 있지 않으면 업데이트
    if (!/[!@#$%^&*(),.?":{}|<>;]/.test(inputText)) {
      setText(inputText);
      setNameBorderColor("#E7E7FF");
      setCheckIcon(false);
    } else {
      setNameBorderColor("#E21068");
      setCheckIcon(true);
    }
  };

  const handleAmountChange = (inputNumber) => {
    // 입력된 텍스트를 숫자로 변환하여 상태 업데이트
    const parsedNumber = parseFloat(inputNumber.replace(/,/g, "")); // 쉼표 제거 후 파싱
    setAmount(parsedNumber || 0); // 숫자가 아니면 0으로 설정
  };

  const isButtonDisabled = !text || amount === 0;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.inner}>
        <View style={styles.nameInputBox}>
          <Text style={styles.inputTitle}>이름</Text>
          <View>
            <TextInput
              style={[styles.nameInput, { borderColor: nameBorderColor }]}
              placeholder="이름을 입력해주세요."
              placeholderTextColor="#ccc"
              fontSize={17}
              onChangeText={handleTextChange}
              value={text}
              returnKeyType="done"
            />
            {checkIcon === true ? <WithLocalSvg width={24} height={24} asset={inputCheckIcon} style={{ position: "absolute", top: 19, right: 20 }} /> : null}
            {checkIcon === true ? <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 13, fontFamily: "font-M", color: "#E21068" }}>이름을 다시 입력해 주세요.</Text> : null}
          </View>
        </View>
        <View></View>
        <View style={{ marginTop: 24 }}>
          <Text style={styles.inputTitle}>금액</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="금액을 입력해주세요."
            placeholderTextColor="#ccc"
            fontSize={17}
            keyboardType="numeric"
            value={amount.toLocaleString()}
            onChangeText={handleAmountChange}
            returnKeyType="done"
          />
        </View>
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: isButtonDisabled ? "#F3F3FF" : "#6D61FF" }]}
          disabled={isButtonDisabled}
          activeOpacity={1}
          onPress={() => {
            handleSubmint(text, amount);
            setModal(true);
          }}
        >
          <Text style={styles.nextBtnText}>저장</Text>
        </TouchableOpacity>
        {modal === true ? <AddPersonModal visible={true} id={id} eventNum={eventNum} /> : null}
      </View>
    </View>
  );
};

export default AddDetailPersonScreen;

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    minHeight: 500,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  inner: {
    margin: 20,
    paddingTop: 60,
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
  inputTitle: {
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  // 다음 버튼
  nextBtn: {
    top: "80%",
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

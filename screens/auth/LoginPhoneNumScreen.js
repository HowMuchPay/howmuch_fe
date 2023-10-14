import { View, Text, StyleSheet, TextInput, Alert, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { WithLocalSvg } from "react-native-svg";
import inputCheckIcon from "../../assets/images/input_check_icon.svg";
import { useAppStore } from "../../stores/store";
import { API } from "../../stores/api";
import { useNavigation } from "@react-navigation/native";

export default function LoginPhoneNumScreen() {
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const [inputBorderColor, setInputBorderColor] = useState("#E7E7FF");
  const [checkIcon, setCheckIcon] = useState(false);
  const [isTouchable, setIsTouchable] = useState(false);
  const store = useAppStore();
  const token = store.token;
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useAppStore((state) => [state.phoneNumber, state.setPhoneNumber]);

  const handleInputChange = (input) => {
    // 숫자만 허용하도록 정규식을 사용하여 유효성을 검사합니다.
    const formattedInput = input.replace(/\D/g, "");

    if (formattedInput.length <= 11) {
      // 11자리인 경우에만 포맷팅하여 저장합니다.
      if (formattedInput.length === 11) {
        setFormattedPhoneNumber(formattedInput.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
      } else {
        setFormattedPhoneNumber("");
      }
      setPhoneNumber(formattedInput);
    }
  };

  const handleInputSubmit = () => {
    if (/^010\d{4}\d{4}$|^010-\d{4}-\d{4}$/.test(phoneNumber)) {
      setFormattedPhoneNumber(phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
      setCheckIcon(false);
      setIsTouchable(true);
      setInputBorderColor("#E7E7FF");
    } else {
      setCheckIcon(true);
      setIsTouchable(false);
      setInputBorderColor("#E21068");
    }
  };

  const putPhoneNum = (phoneNumber) => {
    console.log(phoneNumber);
    API.put(`/user/phone?phone=${phoneNumber}`, null, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        // "Refresh-Token": `Bearer ${refreshToken}`,
      },
    })
      .then((response) => {
        console.log("성공적으로 put 요청을 보냈습니다.", response.data);
        navigation.navigate("TermsScreen");
      })
      .catch((error) => {
        console.error("put 요청을 보내는 중 오류가 발생했습니다.", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={{ flexDirection: "row", marginTop: 80 }}>
          <Text style={[styles.addText, { color: "#6D61FF" }]}>휴대폰 번호</Text>
          <Text style={styles.addText}>를</Text>
        </View>
        <Text style={styles.addText}>입력해 주세요</Text>

        <View style={styles.phoneInputBox}>
          <TextInput
            style={[styles.phoneInput, { borderColor: inputBorderColor }]}
            maxLength={13}
            placeholder="ex) 010-1234-1234"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handleInputChange}
            onSubmitEditing={handleInputSubmit}
          />
          {checkIcon ? <WithLocalSvg width={24} height={24} asset={inputCheckIcon} style={{ position: "absolute", top: 19, right: 20 }} /> : null}
          {checkIcon ? <Text style={styles.warningText}>핸드폰 번호를 다시 입력해 주세요.</Text> : null}
        </View>
      </View>

      <StatusBar style="auto" />
      <Pressable
        onPress={() => {
          putPhoneNum(phoneNumber);
        }}
        style={[styles.nextBtn, { opacity: isTouchable ? 1 : 0.5 }]}
        disabled={!isTouchable}
      >
        <Text style={styles.nextBtnText}>다음</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  inner: {
    margin: 20,
    // backgroundColor: "#fff",
    position: "relative",
  },
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },
  //번호 입력 input
  phoneInputBox: {
    marginTop: 40,
  },
  phoneInput: {
    borderRadius: 20,
    // borderColor: "#E7E7FF",
    borderWidth: 1,
    backgroundColor: "#fff",
    color: "#000",
    padding: 20,
    height: 64,
    fontFamily: "font-M",
  },
  warningText: {
    fontSize: 13,
    fontFamily: "font-M",
    color: "#E21068",
    marginLeft: 10,
    marginTop: 10,
  },
  nextBtn: {
    position: "absolute",
    bottom: "5%",
    marginLeft: 10,
    width: "95%",
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

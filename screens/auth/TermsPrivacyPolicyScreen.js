import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppStore } from "../../stores/store";

export default function TermsPrivacyPolicyScreen({ navigation }) {
  const handleAgree = () => {
    useAppStore.setState({ isPrivacyPolicyAgreeAll: true });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inner}>
        <Text style={styles.text}>얼마나 개인정보 처리</Text>
        <Text style={[styles.text, { marginVertical: 20 }]}>1. 개인정보 처리 방침이란?</Text>
        <Text style={styles.text}>
          얼마나 팀은(이하 ‘팀’)은 이용자의 ‘동의를 기반으로 개인정보를 수집, 이용 및 제공' 하고 있으며 ‘이용자의 권리(개인정보 자기 결정권)를 적극적으로 보장합니다. 팀은 정보통신서비스제공자가
          준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다. ‘개인정보처리방침'이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수
          있도록 회사가 준수해야 할 지침을 의미합니다. 본 개인정보처리방침은 팀이 제공하는 얼마나 계정 기반의 서비스 (이하 ‘서비스'라 함)에 적용됩니다.
        </Text>

        <Text style={[styles.text, { marginVertical: 20 }]}>2. 개인정보 수집</Text>

        <Text style={styles.text}>
          서비스 제공을 위한 필요 최소한의 개인정보를 수집하고 있습니다. 회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와 같은 서비스 제공을 위해
          필요한 최소한의 개인정보를 수집하고 있습니다.
        </Text>

        <Text style={[styles.text, { marginVertical: 20 }]}>[얼마나 회원가입]</Text>

        <Text style={styles.text}>필수</Text>
        <Text style={styles.text}>(카카오톡에 기재된) 프로필 이름, 연락처, 이메일</Text>

        <Text style={[styles.text, { marginVertical: 20 }]}>[경조사 작성]</Text>

        <Text style={styles.text}>선택</Text>
        <Text style={styles.text}>나이, 월수입, 지인과의 관계, 지인 친밀도, 경조사 종류</Text>
      </ScrollView>
      <Pressable onPress={handleAgree} style={styles.nextBtn}>
        <Text style={styles.nextBtnText}>동의</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  inner: {
    marginTop: 30,
    marginBottom: 50,
  },
  text: {
    fontSize: 14,
    fontFamily: "font-R",
    lineHeight: 22,
  },
  // 다음 버튼
  nextBtn: {
    position: "relative",
    bottom: 40,
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

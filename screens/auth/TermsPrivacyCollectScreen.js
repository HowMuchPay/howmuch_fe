import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppStore } from "../../stores/store";

export default function TermsPrivacyCollectScreen({ navigation }) {
  const handleAgree = () => {
    useAppStore.setState({ isPrivacyCollectAgreeAll: true });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inner}>
        <Text style={styles.text}>
          본인은 “얼마나” (이하 ‘팀'이라 합니다.)가 제공하는 서비스 “얼마나”(이하 “서비스"라고 합니다.)를 이용하기 위해, 다음과 같이 기관이 본인의 개인정보를 수집/이용하고, 개인정보의 취급을 위탁하는
          것에 동의합니다.
        </Text>

        <View style={[{ marginVertical: 10 }]}></View>

        <Text style={styles.text}>(1) 수집항목</Text>

        <Text style={styles.text}>필수: 카카오톡 로그인 정보(이름, 메일, 성별, 생년월일), 휴대폰 번호 </Text>
        <Text style={styles.text}>선택: 나이,월수입, 지인관계, 친밀도 </Text>
        <View style={[{ marginVertical: 10 }]}></View>

        <Text style={styles.text}>(2) 이용목적</Text>

        <Text style={styles.text}>서비스 통합 이용 </Text>
        <Text style={styles.text}>서비스 관련 적정값 추천</Text>
        <Text style={styles.text}>이용 Application 정보 등에 대한 분석 및 세분화를 통한, 이용자의 서비스 이용 선호도 분석</Text>
        <View style={[{ marginVertical: 10 }]}></View>

        <Text style={styles.text}>(3) 개인정보의 보유기간 및 이용기간</Text>

        <Text style={styles.text}>이용하는 기간에 한하여 보유 및 이용 법령에서 정하는 경우 해당 기간까지 보유(상세사항은 팀의 개인정보취급방침에 기재된 바에 따름) </Text>

        <View style={[{ marginVertical: 10 }]}></View>

        <Text style={styles.text}>(4) 상기 개인정보 수집 및 이용과 취급위탁에 동의하지 않으실 경우, 서비스를 이용하실 수 없습니다</Text>

        <View style={[{ marginVertical: 10 }]}></View>

        <Text style={styles.text}>*얼마나 서비스와 관련된 개인정보의 취급과 관련된 사항은 팀의 개인정보처리방침에 따릅니다. 세부내용은 개인정보처리방침을 확인해주십시오.</Text>
        <View style={[{ marginVertical: 10 }]}></View>

        <Text style={styles.text}>위 사항과 관련하여 본인은 필수적으로 수집 및 이용되는 개인정보에 관한 설명을 모두 이해하였고, 얼마나팀에 귀하의 개인정보를 제공하는 것에 동의하십니까?</Text>
        <View style={[{ marginVertical: 50 }]}></View>
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

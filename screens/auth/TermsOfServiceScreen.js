import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAppStore } from "../../stores/store";

export default function TermsOfServiceScreen({ navigation }) {
  const handleAgree = () => {
    useAppStore.setState({ isTermsAgreeAll: true });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inner}>
        <Text style={styles.text}>제 1장. 총칙</Text>
        <Text style={[styles.text, { marginVertical: 20 }]}>제 1조. 목적</Text>
        <Text style={styles.text}>
          본 이용 약관은 서비스 이용자가 얼마나 프로젝트 팀 (이하 ‘팀’이라고 합니다.) 얼마나 서비스(이하 ‘서비스’라고 합니다)에 얼마나 회원(본 약관에 동의하고 회원 등록을 완료한 얼마나 서비스 회원.
          이하 ‘회원’ 이라고 합니다.)으로 가입하거나, 얼마나 회원이 본 이용 약관에 동의하고 얼마나 서비스 내에서 서비스를 이용함에 있어 팀과 회원의 권리 및 의무, 책임 사항을 규정함을 목적으로 합니다.
        </Text>

        <Text style={[styles.text, { marginVertical: 20 }]}>제 2조. 용어의 정의</Text>

        <Text style={styles.text}>① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</Text>

        <Text style={styles.text}>1. ‘얼마나’ 라 함은 팀이 운영하는 스마트 기기 어플리케이션을 말합니다. </Text>
        <Text style={styles.text}>2. ‘얼마나’ 닉네임은 얼마나 서비스에서 카카오 간편로그인을 통해 식별한 카카오톡 닉네임을 의미합니다.  </Text>
        <Text style={styles.text}>3. ‘이용자’는 팀이 제공하는 얼마나 서비스를 이용하는 이용자를 말합니다.  </Text>
        <Text style={styles.text}>
          4. ‘’(또는 ‘경조사 알림 서비스’)는 회원 또는 회원의 대리인이 경조사의 내용을 작성하고 청첩장, 부고장, 초대장등을 알림으로 전달하여 사용자의 지인에게 초대 및 공지를 할 수 있도록 다양한
          서비스를 제공하는 모바일 서비스를 말합니다.  
        </Text>
        <Text style={styles.text}>
          5. ‘나의 경조사’는 앱을 사용자는 당사자와 관련된 결혼식, 상, 생일등의 경조사에서 송금, 현금등의 형태로 경조사비를 기록한 내역을 확인할 수 있는 서비스를 말합니다. 
        </Text>
        <Text style={styles.text}>6. ‘지인의 경조사’ (또는 ‘지인 경조사 확인’)은 내가 참여한 지인의 경조사에서 경조사비로 얼마를 냈는지 전체 내역을 확인할 수 있는 서비스를 말합니다.  </Text>
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

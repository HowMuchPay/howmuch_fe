import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import { WithLocalSvg } from "react-native-svg";
import arrowIcon from "../../assets/images/right_arrow_icon.svg";

import checkIcon from "../../assets/images/check_icon.svg";
import checkColorIcon from "../../assets/images/check_color_icon.svg";
import { useNavigation } from "@react-navigation/native";
import { useAppStore } from "../../stores/store";

const windowHeight = Dimensions.get("window").height;

export default function TermsScreen() {
  const store = useAppStore();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={{ flexDirection: "row", marginTop: 80 }}>
          <Text style={[styles.addText, { color: "#6D61FF" }]}>약관</Text>
          <Text style={styles.addText}>을</Text>
        </View>
        <Text style={styles.addText}>확인해 주세요</Text>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginVertical: 10 }}>
            <Pressable style={{}} onPress={() => store.setIsTermsAgreeAll(!store.isTermsAgreeAll)}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                {store.isTermsAgreeAll ? (
                  <WithLocalSvg width={28} height={28} asset={checkColorIcon} style={{ marginRight: 10 }} />
                ) : (
                  <WithLocalSvg width={28} height={28} asset={checkIcon} style={{ marginRight: 10 }} />
                )}
              </View>
            </Pressable>
            <Pressable style={{ flexDirection: "row", alignItems: "flex-start" }} onPress={() => navigation.navigate("TermsOfServiceScreen")}>
              <Text style={{ fontFamily: "font-M", fontSize: 16, color: "#1f1f1f", marginTop: 1 }}>[필수] 얼마나 이용약관 전체동의</Text>
              <WithLocalSvg width={15} height={15} asset={arrowIcon} style={{ marginLeft: 20, marginTop: 5 }} />
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", alignItems: "flex-start", marginVertical: 10 }}>
            <Pressable style={{}} onPress={() => store.setIsPrivacyPolicyAgreeAll(!store.isPrivacyPolicyAgreeAll)}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                {store.isPrivacyPolicyAgreeAll ? (
                  <WithLocalSvg width={28} height={28} asset={checkColorIcon} style={{ marginRight: 10 }} />
                ) : (
                  <WithLocalSvg width={28} height={28} asset={checkIcon} style={{ marginRight: 10 }} />
                )}
              </View>
            </Pressable>
            <Pressable style={{ flexDirection: "row", alignItems: "flex-start" }} onPress={() => navigation.navigate("TermsPrivacyPolicyScreen")}>
              <Text style={{ fontFamily: "font-M", fontSize: 16, color: "#1f1f1f", marginTop: 1 }}>[필수] 개인정보 처리방침 전체동의</Text>
              <WithLocalSvg width={15} height={15} asset={arrowIcon} style={{ marginLeft: 20, marginTop: 5 }} />
            </Pressable>
          </View>

          <View style={{ flexDirection: "row", alignItems: "flex-start", marginVertical: 10 }}>
            <Pressable style={{}} onPress={() => store.setIsPrivacyCollectAgreeAll(!store.isPrivacyCollectAgreeAll)}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                {store.isPrivacyCollectAgreeAll ? (
                  <WithLocalSvg width={28} height={28} asset={checkColorIcon} style={{ marginRight: 10 }} />
                ) : (
                  <WithLocalSvg width={28} height={28} asset={checkIcon} style={{ marginRight: 10 }} />
                )}
              </View>
            </Pressable>
            <Pressable style={{ flexDirection: "row", alignItems: "flex-start" }} onPress={() => navigation.navigate("TermsPrivacyCollectScreen")}>
              <Text style={{ fontFamily: "font-M", fontSize: 16, color: "#1f1f1f", marginTop: 1 }}>[선택] 개인정보 수집 이용에 전체동의</Text>
              <WithLocalSvg width={15} height={15} asset={arrowIcon} style={{ marginLeft: 20, marginTop: 5 }} />
            </Pressable>
          </View>

          <Pressable style={{ marginVertical: 10 }} onPress={() => store.setIsMarketingAlertAgree(!store.isMarketingAlertAgree)}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              {store.isMarketingAlertAgree ? (
                <WithLocalSvg width={28} height={28} asset={checkColorIcon} style={{ marginRight: 10 }} />
              ) : (
                <WithLocalSvg width={28} height={28} asset={checkIcon} style={{ marginRight: 10 }} />
              )}
              <Text style={{ fontFamily: "font-M", fontSize: 16, color: "#1f1f1f", marginTop: 1 }}>[선택] 마케팅 수신 알림 동의</Text>
            </View>
            <Text style={{ fontFamily: "font-R", fontSize: 14, color: "#8e8e8e", marginTop: 5, marginLeft: 38 }}>앱 푸시, 야간(21시 ~ 08시) 푸시 동의</Text>
          </Pressable>

          <View style={{ position: "relative", top: windowHeight - 650 }}>
            <Pressable
              style={{ paddingBottom: 40 }}
              onPress={() => {
                if (store.isTermsAgreeAll && store.isPrivacyPolicyAgreeAll && store.isPrivacyCollectAgreeAll && store.isMarketingAlertAgree) {
                  // 모든 상태가 true인 경우, 모두 false로 변경
                  store.setIsTermsAgreeAll(false);
                  store.setIsPrivacyPolicyAgreeAll(false);
                  store.setIsPrivacyCollectAgreeAll(false);
                  store.setIsMarketingAlertAgree(false);
                } else {
                  // 모든 상태가 false인 경우, 모두 true로 변경
                  store.setIsTermsAgreeAll(true);
                  store.setIsPrivacyPolicyAgreeAll(true);
                  store.setIsPrivacyCollectAgreeAll(true);
                  store.setIsMarketingAlertAgree(true);
                }
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                {store.isTermsAgreeAll && store.isPrivacyPolicyAgreeAll && store.isPrivacyCollectAgreeAll && store.isMarketingAlertAgree ? (
                  <WithLocalSvg width={28} height={28} asset={checkColorIcon} style={{ marginRight: 10 }} />
                ) : (
                  <WithLocalSvg width={28} height={28} asset={checkIcon} style={{ marginRight: 10 }} />
                )}
                <Text style={{ fontFamily: "font-M", fontSize: 16, color: "#1f1f1f", marginTop: 1 }}>약관 전체동의</Text>
              </View>
            </Pressable>

            <Pressable
              style={[
                styles.nextBtn,
                {
                  opacity: store.isTermsAgreeAll && store.isPrivacyPolicyAgreeAll ? 1 : 0.5,
                },
              ]}
              onPress={() => {
                if (store.isTermsAgreeAll && store.isPrivacyPolicyAgreeAll) {
                  navigation.navigate("Drawer");
                }
              }}
              disabled={!store.isTermsAgreeAll || !store.isPrivacyPolicyAgreeAll}
            >
              <Text style={styles.nextBtnText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </View>
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
  // 다음 버튼
  nextBtn: {
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

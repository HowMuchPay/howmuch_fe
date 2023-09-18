import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useIsFocused, useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Contacts from "expo-contacts";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CircularProgress from "react-native-circular-progress-indicator";
import { useAppStore } from "../stores/store";
import { API } from "../stores/api";

export default function MainScreen({}) {
  const navigation = useNavigation();

  const logoImg = require("../assets/images/menuBurger.png");

  const sendMoneyImg = require("../assets/images/icon_send_money.png");
  const getMoneyImg = require("../assets/images/icon_get_money.png");

  const store = useAppStore();
  const token = store.token;

  const [data, setData] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status === "granted") {
  //       console.log("성공");
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.PhoneNumbers],
  //       });

  //       if (data.length > 0) {
  //         const contact = data[0];
  //         console.log(contact);
  //       }
  //     }
  //   })();

  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get("/home", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log(newData);
      setData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Image style={styles.menuBar} source={logoImg} />
        </TouchableOpacity>

        <Text style={styles.pageTitle}>얼마나 주고 받았을까?</Text>

        <View style={styles.payBoxContainer}>
          <PayShowBox
            title={"나의 경조사"}
            money={data ? `${data.userTotalReceiveAmount.toLocaleString()}원` : "0원"}
            iconImg={getMoneyImg}
            navigate={() => {
              navigation.navigate("MyEvent");
            }}
          />
          <PayShowBox
            title={"지인의 경조사"}
            money={data ? `${data.userTotalPayAmount.toLocaleString()}원` : "0원"}
            iconImg={sendMoneyImg}
            navigate={() => {
              navigation.navigate("FriendEvent");
            }}
          />
        </View>

        {data ? <StatisticsBox percentage={data.payPercentage} /> : null}

        {data ? <ComingEventBox data={data} /> : null}

        <View style={styles.payBoxContainer}>
          <CalendarBox />
          <AddEventBox />
        </View>
      </View>
    </ScrollView>
  );
}

function PayShowBox(props) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.payShowBox}>
        <View style={styles.payText}>
          <View style={styles.payTitleBox}>
            <Text style={styles.payTitle}>{props.title}</Text>
          </View>
          <Text style={styles.payMoney}>{props.money}</Text>
          <TouchableOpacity style={styles.moreBtn} onPress={props.navigate}>
            <Text style={{ fontFamily: "font-M", color: "#8E8E8E" }}>자세히 보기 {">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnIcon}>
          <Image style={{ width: 48, height: 48 }} source={props.iconImg} />
        </View>
      </View>
    </>
  );
}

function StatisticsBox({ percentage }) {
  const percentageTextFormat = (percentage) => {
    if (percentage > 50) {
      return (
        <>
          <Text style={styles.totalTitle}>받은 경조사비보다</Text>
          <Text style={styles.totalTitle}>낸 경조사비가 더 많아요!</Text>
        </>
      );
    } else if (percentage == 50) {
      return (
        <>
          <Text style={styles.totalTitle}>적당하게</Text>
          <Text style={styles.totalTitle}>반반 내셨어요!</Text>
        </>
      );
    } else if (percentage < 50 && percentage !== 0) {
      return (
        <>
          <Text style={styles.totalTitle}>낸 경조사비보다</Text>
          <Text style={styles.totalTitle}>받은 경조사비가 더 많아요!</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.totalTitle}>아직 경조사비를</Text>
          <Text style={styles.totalTitle}>주고받지 않았어요.</Text>
        </>
      );
    }
  };
  return (
    <>
      <View style={styles.totalBox}>
        <View style={styles.totalTextBox}>
          <View>{percentageTextFormat(percentage)}</View>
          <Pressable style={{ marginTop: 10 }}>
            <Text style={{ fontFamily: "font-M", color: "#8E8E8E" }}>자세히 보기 {">"}</Text>
          </Pressable>
        </View>

        <View style={styles.circleBox}>
          <CircularProgress
            value={percentage}
            radius={55}
            progressValueColor={"#000"}
            activeStrokeColor={"#978EFF"}
            valueSuffix={"%"}
            inActiveStrokeColor={"#E7E7FF"}
            activeStrokeWidth={18}
            inActiveStrokeWidth={18}
            progressValueStyle={{ fontFamily: "font-M", fontSize: 22 }}
          />
        </View>
      </View>
    </>
  );
}

function ComingEventBox({ data }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (data.acEventDisplayName === null) {
          return null;
        } else {
          navigation.navigate("ComingEvent");
        }
      }}
    >
      <View style={styles.comingBox}>
        <View style={styles.comingInner}>
          <View style={styles.comingInfo}>
            {/* <Image style={{ width: 24, height: 24, marginRight: 10 }} source={require("../assets/images/icon_congrats.png")} /> */}
            <Text style={styles.comingText}>{data.acEventDisplayName === null ? "경조사 디데이를 등록해보세요" : data.acEventDisplayName}</Text>
          </View>

          {data.acEventDisplayName === null ? null : (
            <View style={styles.comingDateBox}>
              <Text style={styles.comingDate}>{data.dday === 0 ? "당일" : `D-${data.dday}일`}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function CalendarBox() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.calendarBox}
      onPress={() => {
        navigation.navigate("TotalPage");
      }}
    >
      <Image style={{ width: 22, height: 22, marginBottom: 10 }} source={require("../assets/images/icon_calendar.png")} />
      <Text style={styles.calendarText}>캘린더</Text>
    </TouchableOpacity>
  );
}

function AddEventBox() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.addEventBox}
      onPress={() => {
        navigation.navigate("NewAddEventPage");
      }}
    >
      <Image style={{ width: 22, height: 22, marginBottom: 10 }} source={require("../assets/images/icon_plus_gray.png")} />
      <Text style={styles.addEventText}>경조사를 입력하세요</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F3F3FF",
    // minHeight: 740,
    // backgroundColor:"#1d1d1d"
  },
  inner: {
    margin: 20,
    // backgroundColor:"#f5d5f7",
  },

  // 햄버거 메뉴
  menuBar: {
    width: 24,
    height: 24,
    marginBottom: hp(2.5),
  },

  pageTitle: {
    fontFamily: "font-B",
    fontSize: hp("3.25%"),
    lineHeight: 36,
    marginBottom: hp(2.5),
  },

  // 나의 경조사, 지인의 경조사 박스
  payBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  payShowBox: {
    width: "48%",
    height: 170,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#00000025",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },

  payText: {
    height: hp(30),
    padding: 20,
    flex: 0.6,
    justifyContent: "space-between",
  },
  payTitleBox: {
    width: 80,
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    borderRadius: 5,
  },
  payTitle: {
    color: "#978EFF",
    fontSize: 13,
    fontFamily: "font-B",
    borderRadius: 5,
    lineHeight: 19,
    // paddingLeft: 5,
    textAlign: "left",
  },
  payMoney: {
    color: "#1f1f1f",
    fontFamily: "font-B",
    fontSize: 17,
  },
  moreBtn: {
    color: "#8e8e8e",
    fontSize: 12,
  },
  btnIcon: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: "#F3F3FF",
    position: "absolute",
    right: 20,
    bottom: 20,
  },

  // 전체 통계 박스
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 170,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#00000025",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderColor: "#8E8E8E",
    borderBottomWidth: 1,
    color: "#8E8E8E",
    fontFamily: "font-M",
  },
  searchIcon: {
    position: "absolute",
    right: 25,
    top: 28,
  },
  circleBox: {
    marginTop: 12,
    // backgroundColor: "red",
    // borderRadius: 50,
    // width: 115,
    // height: 115,
    // alignItems: "center",
    // justifyContent: "center",
  },
  totalTextBox: {
    marginTop: 25,
  },
  totalTitle: {
    fontFamily: "font-B",
    fontSize: 17,
  },

  // 다가오는 이벤트 박스
  comingBox: {
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 15,
    shadowColor: "#00000025",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },
  comingInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  comingInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  comingText: {
    fontFamily: "font-B",
    fontSize: 15,
    color: "#1F1F1F",
    lineHeight: 30,
  },
  comingDateBox: {
    // width: 82,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F3FF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  comingDate: {
    fontSize: 14,
    color: "#6D61FF",
    fontFamily: "font-B",
    textAlign: "center",
  },

  // 캘린더박스
  calendarBox: {
    width: "48%",
    height: hp(16),
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00000025",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },

  calendarText: {
    fontFamily: "font-M",
    fontSize: 13,
    color: "#1F1F1F",
  },

  // 경조사 추가 박스
  addEventBox: {
    width: "48%",
    height: hp(16),
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderStyle: "dashed",
    shadowColor: "#00000025",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },
  addEventText: {
    fontFamily: "font-R",
    fontSize: 13,
    color: "#cccccc",
  },
});

import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { useAppStore } from "../stores/store";
import { API } from "../stores/api";
import { useIsFocused } from "@react-navigation/native";
import leftArrowIcon from "../assets/images/left_arrow_icon.png";
import rightArrowIcon from "../assets/images/right_arrow_icon.png";
import event0 from "../assets/images/event_icon_0.png";
import event1 from "../assets/images/event_icon_1.png";
import event2 from "../assets/images/event_icon_2.png";
import event3 from "../assets/images/event_icon_3.png";
import event4 from "../assets/images/event_icon_4.png";

LocaleConfig.locales["fr"] = {
  monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

export default function CalendarScreen() {
  const store = useAppStore();
  const token = store.token;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const offset = 1000 * 60 * 60 * 9;
  //한국 시간 계산
  const today = new Date(new Date().getTime() + offset);
  const [data, setData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState([]);

  const renderCustomArrow = (direction) => {
    if (direction === "left") {
      // 좌측 화살표 아이콘을 렌더링
      return (
        <>
          <Image source={leftArrowIcon} style={{ width: 20, height: 20 }} />
        </>
      );
    } else if (direction === "right") {
      // 우측 화살표 아이콘을 렌더링
      return (
        <View>
          <Image source={rightArrowIcon} style={{ width: 20, height: 20 }} />
        </View>
      );
    }
  };

  const customMonthTextStyle = {
    fontFamily: "font-B",
    fontSize: 16,
  };
  const customWeekdayStyle = {
    color: "black", // 원하는 색상으로 변경
    marginTop: 20,
    marginBottom: 5,
  };

  todayFormat = today.toISOString().split("T")[0];

  const [selectedDay, setSelectedDay] = useState({
    dateString: todayFormat,
    day: todayFormat.split("-")[2],
    month: todayFormat.split("-")[1],
    timestamp: 1688428800000,
    year: todayFormat.split("-")[0],
  });
  const [selectedMonth, setSelectedMonth] = useState({
    year: todayFormat.split("-")[0],
    month: todayFormat.split("-")[1],
  });

  useEffect(() => {
    fetchData(selectedMonth.year, selectedMonth.month);
  }, []);

  useEffect(() => {
    setSelectedEvent(data.filter((event) => event.eventAt === selectedDay.dateString) || null);
  }, [data]);

  const fetchData = async (year, month) => {
    setIsLoading(true);

    try {
      const date = `${year}-${month}`;
      // console.log(date);
      const response = await API.get(`/calendar/schedule?time=${date}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      // console.log(newData);
      setData(newData);

      const updatedMarkedDates = {};
      newData.forEach((event) => {
        updatedMarkedDates[event.eventAt] = { marked: true, dotColor: "#6D61FF" };
      });
      setMarkedDates(updatedMarkedDates);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6D61FF" />
        </View>
      )} */}
      <View style={styles.inner}>
        <Calendar
          style={styles.calendar}
          renderArrow={renderCustomArrow}
          monthFormat={"yyyy년 MM월"}
          onDayPress={(day) => {
            setSelectedDay(day);
            setSelectedDate(day.dateString);

            setSelectedEvent(data.filter((event) => event.eventAt === day.dateString) || null);
          }}
          onMonthChange={(date) => {
            setSelectedDay(date);
            setSelectedMonth({ year: date.dateString.split("-")[0], month: date.dateString.split("-")[1] });
            fetchData(date.dateString.split("-")[0], date.dateString.split("-")[1]);
          }}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              selectedColor: "#6D61FF", // 선택된 날짜의 색상을 빨간색으로 지정
              selectedBackground: true, // 선택된 날짜에 배경색 적용
            },
          }}
          theme={{
            todayTextColor: "#6D61FF",
            arrowColor: "#EB4C60",
            dayWidth: 22,

            "stylesheet.calendar.header": {
              monthText: customMonthTextStyle,
              dayHeader: customWeekdayStyle,
            },
          }}
        />

        <View style={styles.dayEventContainer}>
          <View style={styles.dayEventBox}>
            <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#1f1f1f" }}>
              {selectedDay.dateString.split("-")[1]}월 {selectedDay.dateString.split("-")[2]}일
            </Text>
            {selectedEvent.length !== 0 ? (
              selectedEvent.map((event, index) => {
                let eventCategory;
                // console.log("Evet", event);
                if (event.eventCategory === 0) {
                  eventCategory = event0;
                } else if (event.eventCategory === 1) {
                  eventCategory = event1;
                } else if (event.eventCategory === 2) {
                  eventCategory = event2;
                } else if (event.eventCategory === 3) {
                  eventCategory = event3;
                } else if (event.eventCategory === 4) {
                  eventCategory = event4;
                }

                return (
                  <View key={index} style={styles.rowFront}>
                    {/* <Image style={{ width: 40, height: 40, marginRight: 15 }} source={selectedEvent} /> */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <View style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10, backgroundColor: "#F3F3FF" }}>
                        <Image style={{ width: 40, height: 40, marginRight: 15 }} source={eventCategory} />
                      </View>
                      <Text style={{ fontSize: 14, fontFamily: "font-M", color: "#1f1f1f" }}>{event.eventDisplayName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                      {event.type === "myEvent" ? (
                        <Text style={{ fontSize: 15, color: "#E21068", fontFamily: "font-B" }}>{event.amount !== 0 ? `+ ${event.amount.toLocaleString()}원` : `0원`}</Text>
                      ) : (
                        <Text style={{ fontSize: 15, color: "#6D61FF", fontFamily: "font-B" }}>{event.amount !== 0 ? `- ${event.amount.toLocaleString()}원` : `0원`}</Text>
                      )}
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={{ alignItems: "center", marginVertical: 20 }}>
                <Text style={{ fontFamily: "font-SM", fontSize: 14, color: "#5f5f5f" }}>주고받은 내역이 없습니다.</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F3F3FF",
  },
  inner: {
    margin: 20,
    // backgroundColor:"#f5d5f7",
  },
  calendar: {
    borderRadius: 15,
    height: 380,
  },
  dayEventContainer: {
    marginTop: 20,
    backgroundColor: "#F3F3FF",
  },
  dayEventBox: {
    width: "100%",
    // height: 230,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  dayText: {
    fontSize: 14,
    fontFamily: "font-B",
    color: "#1f1f1f",
  },
  rowFront: {
    // width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // height: 60,
    paddingVertical: 20,
    // borderWidth: 1,
  },
});

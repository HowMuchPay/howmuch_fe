import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import leftArrowIcon from "../assets/images/left_arrow_icon.png";
import rightArrowIcon from "../assets/images/right_arrow_icon.png";
import lineImg from "../assets/images/line01.png";
import event0 from "../assets/images/event_icon_0.png";
import event1 from "../assets/images/event_icon_1.png";
import event2 from "../assets/images/event_icon_2.png";
import event3 from "../assets/images/event_icon_3.png";
import event4 from "../assets/images/event_icon_4.png";
import { Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useAppStore } from "../stores/store";
import { API } from "../stores/api";

export default function StatisticsScreen() {
  const currentYear = new Date().getFullYear();
  const isFocused = useIsFocused();
  const store = useAppStore();
  const token = store.token;
  const [statisticsData, setStatisticsData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYearMonth, setCurrentYearMonth] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const [totalPayment, setTotalPayment] = useState(0);
  const [totalReceiveAmount, setTotalReceiveAmount] = useState(0);

  useEffect(() => {
    fetchData(currentYearMonth.year, currentYearMonth.month);
  }, [currentYearMonth]);

  useEffect(() => {
    // statisticsData가 업데이트될 때마다 totalPayment 및 totalReceiveAmount 업데이트
    setTotalPayment(statisticsData.totalPayment);
    setTotalReceiveAmount(statisticsData.totalReceiveAmount);
  }, [statisticsData]);

  const fetchData = async (year, month) => {
    try {
      const formattedMonth = String(month).padStart(2, "0");
      const date = `${year}-${formattedMonth}`;
      console.log("date", date);
      const response = await API.get(`/calendar/statistics?time=${date}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data; // 새로운 데이터

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log(response);
      console.log("statistic", newData);
      console.log("res", newData.statisticsListResponse);
      setStatisticsData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  // const monthlyStats = {
  //   "2023-7": { stat1: 50, stat2: 100 }, // 예시 데이터
  //   "2023-8": { stat1: 70, stat2: 120 }, // 예시 데이터
  //   // ... 이하 월별 통계 데이터 추가
  // };

  const handlePrevMonth = () => {
    const prevMonth = currentYearMonth.month === 1 ? 12 : currentYearMonth.month - 1;
    const prevYear = prevMonth === 12 ? currentYearMonth.year - 1 : currentYearMonth.year;
    setCurrentYearMonth({ year: prevYear, month: prevMonth });
  };

  const handleNextMonth = () => {
    const nextMonth = currentYearMonth.month === 12 ? 1 : currentYearMonth.month + 1;
    const nextYear = nextMonth === 1 ? currentYearMonth.year + 1 : currentYearMonth.year;
    setCurrentYearMonth({ year: nextYear, month: nextMonth });
  };

  // const data = [monthlyStats[`${currentYearMonth.year}-${currentYearMonth.month}`]?.stat1 || 0, monthlyStats[`${currentYearMonth.year}-${currentYearMonth.month}`]?.stat2 || 0];
  const data = [totalReceiveAmount, totalPayment];

  // const sliceColors = ["#fbd203", "#ffb300"];

  const EventListByDate = ({ eventData }) => {
    console.log("event", eventData);
    return (
      <View>
        {Object.keys(eventData).map((date) => (
          <View key={date}>
            <Text style={{ fontSize: 16, fontFamily: "font-B", color: "#1f1f1f" }}>{date.split("-")[2]}일</Text>
            <View>
              {eventData[date].map((event, index) => {
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
                  <View key={index}>
                    <View style={styles.rowFront}>
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
                    <Image source={lineImg} style={{ width: "100%", marginVertical: 15 }} />
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    );
  };
  return (
    <>
      {statisticsData && (
        <ScrollView style={styles.container}>
          {/* <PieChart widthAndHeight={250} series={[123, 321, 123, 789, 537]} sliceColor={["#fbd203", "#ffb300", "#ff9100", "#ff6c00", "#ff3c00"]} coverRadius={0.45} coverFill={"#FFF"} /> */}
          <View style={styles.PieChartInner}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity onPress={handlePrevMonth}>
                <Image source={leftArrowIcon} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
              <Text style={styles.statisticTitle}>{`${currentYearMonth.year}년 ${currentYearMonth.month}월`}</Text>
              <TouchableOpacity onPress={handleNextMonth}>
                <Image source={rightArrowIcon} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.pieCharthBox}>
              {console.log(data)}
              {/* <PieChart series={data} width={200} height={200} coverRadius={0.45} coverFill={"#FFF"} sliceColor={sliceColors} /> */}
              {data[0] + data[1] !== 0 ? (
                <PieChart widthAndHeight={160} series={data} sliceColor={["#FFCEE1", "#978EFF"]} coverRadius={0.45} coverFill={"#FFF"} />
              ) : (
                <PieChart widthAndHeight={160} series={[40, 60]} sliceColor={["#F3F3FF", "#E7E7FF"]} coverRadius={0.45} coverFill={"#FFF"} />
              )}
            </View>

            <View style={styles.moneyBox}>
              <View style={styles.moneyDes}>
                <Text style={[styles.payTitle, { backgroundColor: "#E7E7FF", color: "#6D61FF" }]}>냈어요</Text>
                <Text style={styles.payAmount}>
                  {" "}
                  {statisticsData.totalPayment === 0 ? (
                    <Text style={styles.payAmount}>0원</Text>
                  ) : (
                    <Text style={styles.payAmount}> - {statisticsData.totalPayment !== undefined && statisticsData.totalPayment.toLocaleString()}원</Text>
                  )}
                </Text>
              </View>
              <View style={styles.moneyDes}>
                <Text style={[styles.payTitle, { backgroundColor: "#FFEDF4", color: "#E21068" }]}>받았어요</Text>
                {statisticsData.totalReceiveAmount === 0 ? (
                  <Text style={styles.payAmount}>0원</Text>
                ) : (
                  <Text style={styles.payAmount}> + {statisticsData.totalReceiveAmount !== undefined && statisticsData.totalReceiveAmount.toLocaleString()}원</Text>
                )}
              </View>
            </View>

            <Image source={lineImg} style={{ width: "100%", marginVertical: 46 }} />

            <Text style={styles.statisticEvent}>
              {statisticsData.mostEventCategory && statisticsData.mostEventCategory.length !== 0 ? (
                <>
                  {statisticsData.mostEventCategory
                    .map((event, index) => {
                      if (index === statisticsData.mostEventCategory.length - 1) {
                        return event;
                      }
                      return event + ",";
                    })
                    .join("")}
                  <Text>에 가장 많은 비용을 지출했어요</Text>
                </>
              ) : (
                <Text>주고 받은 내역이 없습니다</Text>
              )}
            </Text>
          </View>

          <View style={styles.eventListInner}>
            <Text style={styles.eventListMonth}>{currentYearMonth.month}월 내역</Text>
            <Image source={lineImg} style={{ width: "100%", marginVertical: 15 }} />
            {statisticsData.statisticsListResponse !== undefined && statisticsData.statisticsListResponse !== null ? (
              <EventListByDate eventData={statisticsData.statisticsListResponse} />
            ) : (
              <View style={{ alignItems: "center", marginVertical: 20 }}>
                <Text style={{ fontFamily: "font-SM", fontSize: 14, color: "#5f5f5f" }}>주고받은 내역이 없습니다.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F3F3FF",
    // marginTop: 20,
  },
  PieChartInner: {
    margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    // backgroundColor: "#f5d5f7",
  },
  statisticTitle: {
    fontSize: 16,
    marginHorizontal: 85,
    fontFamily: "font-B",
  },
  pieCharthBox: {
    alignItems: "center",
    marginVertical: 60,
  },
  moneyBox: {
    // alignItems: "center",
  },
  moneyDes: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "space-between",
    // alignItems: "flex-start",
  },
  payTitle: {
    // paddingHorizontal: 12,
    textAlign: "center",
    paddingVertical: 1,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: "font-SM",
    width: 60,
    marginRight: 10,
  },
  payAmount: {
    fontSize: 16,
    fontFamily: "font-B",
    textAlign: "center",
    color: "#1F1F1F",
  },
  statisticEvent: {
    fontFamily: "font-M",
    fontSize: 16,
    color: "#1f1f1f",
    marginBottom: 45,
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
    height: 230,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  dayText: {
    fontSize: 14,
    fontFamily: "font-B",
    color: "#1f1f1f",
  },

  // 경조사 내역
  eventListInner: {
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  eventListMonth: {
    marginTop: 10,
    fontSize: 17,
    fontFamily: "font-SM",
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

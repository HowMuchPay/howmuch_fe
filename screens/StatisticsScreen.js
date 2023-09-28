import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PieChart from "react-native-pie-chart";
import leftArrowIcon from "../assets/images/left_arrow_icon.png";
import rightArrowIcon from "../assets/images/right_arrow_icon.png";
import lineImg from "../assets/images/line01.png";

import { Image } from "react-native";

export default function StatisticsScreen() {
  const currentYear = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYearMonth, setCurrentYearMonth] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const monthlyStats = {
    "2023-7": { stat1: 50, stat2: 100 }, // 예시 데이터
    "2023-8": { stat1: 70, stat2: 120 }, // 예시 데이터
    // ... 이하 월별 통계 데이터 추가
  };

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

  const data = [monthlyStats[`${currentYearMonth.year}-${currentYearMonth.month}`]?.stat1 || 0, monthlyStats[`${currentYearMonth.year}-${currentYearMonth.month}`]?.stat2 || 0];

  const sliceColors = ["#fbd203", "#ffb300"];

  return (
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
            <Text style={styles.payAmount}> - 400,000원</Text>
          </View>
          <View style={styles.moneyDes}>
            <Text style={[styles.payTitle, { backgroundColor: "#FFEDF4", color: "#E21068" }]}>받았어요</Text>
            <Text style={styles.payAmount}> + 200,000원</Text>
          </View>
        </View>

        <Image source={lineImg} style={{ width: "100%", marginVertical: 46 }} />

        <Text style={styles.statisticEvent}>결혼에 가장 많은 비용을 지출했어요</Text>
      </View>

      <View style={styles.eventListInner}>
        <Text style={styles.eventListMonth}>{currentYearMonth.month}월 내역</Text>
        <Image source={lineImg} style={{ width: "100%", marginVertical: 15 }} />
      </View>
    </ScrollView>
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
});

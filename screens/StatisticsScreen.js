import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PieChart from "react-native-pie-chart";

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
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <Text>{"<"}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, marginHorizontal: 20 }}>{`${currentYearMonth.year}년 ${currentYearMonth.month}월 통계`}</Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          {console.log(data)}
          {/* <PieChart series={data} width={200} height={200} coverRadius={0.45} coverFill={"#FFF"} sliceColor={sliceColors} /> */}
          {data[0] + data[1] !== 0 ? <PieChart widthAndHeight={250} series={data} sliceColor={["#fbd203", "#ffb300"]} coverRadius={0.45} coverFill={"#FFF"} /> : <Text>데이터가 없습니다</Text>}
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
});

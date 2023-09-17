import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Image } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, addHours } from "date-fns";

const CalendarSelectComponent = ({ handleButtonClick }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateChange, setDateChange] = useState(new Date());
  const [showButton, setShowButton] = useState(false);

  // const formatDate = (rawDate) => {
  //   let date = new Date(rawDate);

  //   let year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   let day = date.getDate();

  //   return `${year}년 ${month}월 ${day}일`;
  // };
  const handleClick = () => {
    const data = format(dateChange, "yyyy-MM-dd"); // 데이터 생성 또는 가져오기
    handleButtonClick(data);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const koreanDate = addHours(selectedDate, 9);
      const currentDate = koreanDate;

      setDate(koreanDate);

      if (Platform.OS == "android") {
        toggleDatePicker();
        const formattedDate = koreanDate;
        setDateChange(formattedDate);

        // 날짜가 선택되면 버튼을 보이도록 상태를 변경
        setShowButton(true);
      }
    } else {
      toggleDatePicker();
    }
  };

  return (
    <>
      <View style={styles.addTextBox}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.addText, { color: "#6D61FF" }]}>일정</Text>
          <Text style={styles.addText}>을 설정해주세요</Text>
        </View>
      </View>
      <View style={styles.nameInputBox}>
        <TouchableOpacity onPress={toggleDatePicker} style={styles.calendarInputFlex}>
          <TextInput
            pointerEvents="none"
            style={styles.calendarInput}
            placeholder="날짜를 선택해주세요"
            // onSubmitEditing={handleButtonClick}
            editable={false}
            // onChangeText={setDateChange}
            value={format(dateChange, "yyyy년 MM월 dd일")}
            placeholderTextColor="#000"
          />
          <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_calendar.png")} />
          {showDatePicker && Platform.OS === "android" && <DateTimePicker mode="date" display="spinner" value={date} onChange={onChange} style={styles.datePicker} />}
        </TouchableOpacity>
      </View>

      {showButton && (
        <TouchableOpacity onPress={handleClick} style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>다음</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },

  //캘린더 인풋
  calendarInputFlex: {
    width: "100%",
    borderRadius: 20,
    borderColor: "#E7E7FF",
    borderWidth: 1,
    backgroundColor: "#fff",
    color: "#000",
    padding: 20,
    height: 64,
    fontFamily: "font-M",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 75,
  },
  calendarInput: {
    // borderRadius: 20,
    // borderColor: "#E7E7FF",
    // borderWidth: 1,
    // backgroundColor: "#fff",
    // padding: 20,
    color: "#000",
    height: 64,
    fontFamily: "font-M",
  },

  // 다음 버튼
  nextBtn: {
    top: "85%",
    position: "relative",
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

export default CalendarSelectComponent;

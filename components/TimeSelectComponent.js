import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Image, Pressable } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, addHours } from "date-fns";
import { WithLocalSvg } from "react-native-svg";
import checkIcon from "../assets/images/check_icon.svg";
import checkColorIcon from "../assets/images/check_color_icon.svg";

const TimeSelectComponent = ({ handleButtonClick }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateChange, setDateChange] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [notDecide, setNotDecide] = useState(false);
  const [time, setTime] = useState("");
  const handleClick = () => {
    if (notDecide) {
      handleButtonClick(null);
    } else {
      handleButtonClick(time);
    }
  };

  const toggleNotDecide = () => {
    setNotDecide(!notDecide);
    setShowButton(!showButton);
  };
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate(selectedDate);
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();

      const amPm = hours >= 12 ? "오후" : "오전";
      const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환

      const timeWithAmPm = minutes === 0 ? `${amPm} ${formattedHours}시` : `${amPm} ${formattedHours}시 ${minutes}분`;

      console.log(timeWithAmPm);

      if (Platform.OS == "android") {
        toggleDatePicker();
        setDateChange(timeWithAmPm);

        setTime(timeWithAmPm);
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
          <Text style={[styles.addText, { color: "#6D61FF" }]}>시간</Text>
          <Text style={styles.addText}>을 설정해주세요</Text>
        </View>
      </View>
      <View style={styles.nameInputBox}>
        <TouchableOpacity onPress={toggleDatePicker} style={styles.calendarInputFlex}>
          <TextInput
            pointerEvents="none"
            style={styles.calendarInput}
            placeholder="시간을 선택해주세요"
            // onSubmitEditing={handleButtonClick}
            editable={false}
            // onChangeText={setDateChange}
            value={notDecide ? "시간 미정" : dateChange}
            placeholderTextColor="#000"
          />
          {/* <Image style={{ width: 24, height: 24 }} source={require("../assets/images/icon_calendar.png")} /> */}
          {showDatePicker && Platform.OS === "android" && <DateTimePicker mode="time" display="spinner" value={date} onChange={onChange} style={styles.datePicker} />}
        </TouchableOpacity>
        <Pressable style={{ marginHorizontal: 20, marginVertical: 20 }} onPress={toggleNotDecide}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            {notDecide ? (
              <WithLocalSvg width={20} height={20} asset={checkColorIcon} style={{ marginRight: 10 }} />
            ) : (
              <WithLocalSvg width={20} height={20} asset={checkIcon} style={{ marginRight: 10 }} />
            )}
            <Text style={{ fontFamily: "font-M", fontSize: 13, color: "#5f5f5f" }}>아직 시간을 정하지 못했어요</Text>
          </View>
        </Pressable>

        {showButton && (
          <TouchableOpacity onPress={handleClick} style={styles.nextBtn}>
            <Text style={styles.nextBtnText}>다음</Text>
          </TouchableOpacity>
        )}
      </View>
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
    top: "65%",
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

export default TimeSelectComponent;

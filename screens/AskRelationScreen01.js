import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";
import CalendarSelectComponent from "../components/CalendarSelectComponent";
import NameInputComponent from "../components/NameInputComponent";
import RelationSelectComponent from "../components/RelationSelectComponent";
import EventTypeSelectComponent from "../components/EventTypeSelectComponent";
import AskSelectComponent from "../components/AskSelectComponent";
import MoneyInputComponent from "../components/MoneyInputComponent";

export default function AskRelationScreen01() {
  const [countUp, setCountUp] = useState(0);
  const [progress, setProgress] = useState(0.15);
  const [postData, setPostData] = useState([]);

  const handleButtonClick = () => {
    console.log("dd");
    // 버튼을 클릭할 때마다 텍스트와 프로그레스 바가 변경되도록 설정
    setCountUp(countUp + 1);
    setProgress(progress + 0.13); // 0.1씩 증가시키거나 원하는 값으로 변경 가능
    console.log("data", data);
  };

  // count가 3일 때의 스타일
  const changeBackground = countUp === 3 || countUp === 4 || countUp === 7 ? styles.changeColor : null;

  return (
    <View style={[styles.container, changeBackground]}>
      <View style={styles.inner}>
        <Progress.Bar progress={progress} width={null} height={4} color={"#6D61FF"} unfilledColor={"#E7E7FF"} borderWidth={0} style={{ marginTop: 50, marginBottom: 75 }} />
        <ComponentBasedOnCount countUp={countUp} handleButtonClick={handleButtonClick} />
      </View>
    </View>
  );
}

const ComponentBasedOnCount = ({ countUp, handleButtonClick }) => {
  switch (countUp) {
    case 3:
      return <NameInputComponent handleButtonClick={handleButtonClick} eventType={"friend"} />;
    case 4:
      return <CalendarSelectComponent handleButtonClick={handleButtonClick} />;
    case 5:
      return <RelationSelectComponent handleButtonClick={handleButtonClick} />;
    case 6:
      return <EventTypeSelectComponent handleButtonClick={handleButtonClick} />;
    case 7:
      return <MoneyInputComponent handleButtonClick={handleButtonClick} />;

    default:
      return <AskSelectComponent handleButtonClick={handleButtonClick} countUp={countUp} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    position: "relative",
  },
  changeColor: {
    backgroundColor: "#F3F3FF",
  },
  inner: {
    margin: 20,
    // backgroundColor: "#fff",
  },
  addTextBox: {
    marginTop: 75,
  },
  addText: {
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 40,
  },
  addBtnBox: {
    width: "97%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 80,
  },
  addBtn: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 41,
    paddingRight: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "100%",
  },
  addBtnText: {
    fontFamily: "font-M",
    fontSize: 14,
    width: 80,
    textAlign: "center",
  },
});

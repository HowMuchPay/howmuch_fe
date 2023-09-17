import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { WithLocalSvg } from "react-native-svg";
import searchIcon from "../assets/images/search_icon.svg";
import clearIcon from "../assets/images/clear_icon.svg";

const SearchEventScreen = () => {
  const [text, setText] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);

  const handleTextChange = (inputText) => {
    setText(inputText); // 텍스트를 state에 저장

    if (inputText !== "") {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
  };

  const handleClearText = () => {
    setText(""); // 텍스트를 지우고 버튼 숨김
    setShowClearButton(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.nameInputBox}>
          <View>
            <TextInput style={styles.nameInput} placeholder="검색할 이름을 입력해주세요" placeholderTextColor="#ccc" fontSize={17} onChangeText={handleTextChange} value={text} />
            <WithLocalSvg width={24} height={24} asset={searchIcon} style={{ position: "absolute", top: 20, left: 20 }} />
            {showClearButton && (
              <Pressable onPress={handleClearText} style={{ position: "absolute", top: 20, right: 20 }}>
                <WithLocalSvg width={24} height={24} asset={clearIcon} />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchEventScreen;

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    // minHeight: 740,
    // backgroundColor:"#1d1d1d"
  },
  inner: {
    marginHorizontal: 20,
    // backgroundColor:"#f5d5f7",
    // paddingTop: 60,
  },

  //이름 입력 input
  nameInputBox: {
    marginTop: 80,
  },
  nameInput: {
    borderRadius: 20,
    borderColor: "#E7E7FF",
    borderWidth: 1,
    backgroundColor: "#fff",
    color: "#000",
    paddingHorizontal: 50,
    paddingVertical: 20,
    height: 64,
    fontFamily: "font-M",
  },
});

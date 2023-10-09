import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { WithLocalSvg } from "react-native-svg";
import searchIcon from "../assets/images/search_icon.svg";
import clearIcon from "../assets/images/clear_icon.svg";
import { useAppStore } from "../stores/store";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { API } from "../stores/api";
import { FlatList } from "react-native";
import lineImg from "../assets/images/line01.png";
import searchImg from "../assets/images/icon_search_gray.png";

const SearchFriendEventScreen = () => {
  const [text, setText] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const store = useAppStore();
  const token = store.token;

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
    console.log(token);
  }, [isFocused]);

  const fetchData = async () => {
    try {
      // 데이터를 가져오는 axios 요청을 보냅니다.
      const response = await API.get(`/event/acquaintance/name`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data;

      // 상태를 업데이트하고 화면을 다시 렌더링합니다.
      console.log("nameData", newData);
      setData(newData);
      setFilteredData(newData);
    } catch (error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  const handleTextChange = (inputText) => {
    setText(inputText); // 텍스트를 state에 저장

    if (inputText !== "") {
      setShowClearButton(true);
      const filteredNames = data.filter((name) => name.toLowerCase().includes(inputText.toLowerCase()));
      setFilteredData(filteredNames);
    } else {
      setShowClearButton(false);
      setFilteredData(data);
    }
  };

  const handleClearText = () => {
    setText(""); // 텍스트를 지우고 버튼 숨김
    setShowClearButton(false);
    setFilteredData(data);
  };

  const renderAutocompleteItem = ({ item }) => {
    // 검색 텍스트와 일치하는 부분과 일치하지 않는 부분으로 나눔
    const parts = item.split(new RegExp(`(${text})`, "gi"));

    return (
      <>
        <Pressable
          onPress={() =>
            navigation.navigate("SearchMyAllEventScreen", {
              name: item,
            })
          }
          style={styles.nameBox}
        >
          <Image source={searchImg} style={{ width: 24, height: 24 }} />
          <Text style={styles.autocompleteItem}>
            {parts.map((part, index) =>
              // 일치하는 부분에는 빨간색 스타일 적용
              part.toLowerCase() === text.toLowerCase() ? (
                <Text key={index} style={{ color: "#6D61FF" }}>
                  {part}
                </Text>
              ) : (
                // 일치하지 않는 부분에는 기본 스타일 적용
                <Text key={index}>{part}</Text>
              )
            )}
          </Text>
        </Pressable>
        <Image source={lineImg} style={{ width: "100%" }} />
      </>
    );
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
          <FlatList data={filteredData} renderItem={renderAutocompleteItem} keyExtractor={(item, index) => index} style={styles.nameList} />
        </View>
      </View>
    </View>
  );
};

export default SearchFriendEventScreen;

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
    paddingTop: 30,
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

  nameList: {
    backgroundColor: "#fff",
    minHeight: 600,
    marginVertical: 20,
    padding: 20,
    borderRadius: 20,
  },
  nameBox: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  autocompleteItem: {
    marginLeft: 5,
    fontFamily: "font-R",
    fontSize: 16,
    marginTop: 3,
  },
});

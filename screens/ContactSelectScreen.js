import {View, Text} from "react-native";
import React from "react";
import {StyleSheet} from "react-native";

export default function ContactSelectScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.screenTitle}>누구에게 보낼까요?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    paddingTop: 50,
    position: "relative",
  },
  inner: {
    margin: 20,
  },
  screenTitle: {
    marginTop: 15,
    fontSize: 26,
    fontFamily: "font-B",
  },
});

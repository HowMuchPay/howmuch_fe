import { View, Text } from "react-native";
import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CalendarScreen from "./CalendarScreen";
import StatisticsScreen from "./StatisticsScreen";

export default function TotalScreen() {
  const TopTab = createMaterialTopTabNavigator();

  return (
    <TopTab.Navigator
      initialRouteName="Calendar"
      style={{ paddingTop: 80, backgroundColor: "#F3F3FF" }}
      screenOptions={{
        tabBarPressOpacity: 1, // 탭을 터치했을 때 그림자 효과 없애기
        tabBarPressColor: "transparent", // 탭을 터치했을 때 효과 없애기
        tabBarLabelStyle: { fontSize: 16, fontFamily: "font-B" },
        tabBarStyle: {
          backgroundColor: "#F3F3FF",
          marginLeft: 20,
          marginRight: 20,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarIndicatorStyle: { backgroundColor: "#6D61FF" },
      }}
    >
      <TopTab.Screen name="Calendar" component={CalendarScreen} options={{ title: "일정" }} />
      <TopTab.Screen name="Statistics" component={StatisticsScreen} options={{ title: "통계" }} />
    </TopTab.Navigator>
  );
}

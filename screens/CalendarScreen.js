import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ScrollView } from 'react-native-gesture-handler';

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일', '월','화','수','목','금','토'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

export default function CalendarScreen() {
  const offset = 1000 * 60 * 60 * 9
  //한국 시간 계산
  const today = new Date((new Date()).getTime() + offset);  
    
  todayFormat = today.toISOString().split('T')[0];
  console.log(today)
  const [selectedDay, setSelectedDay] = useState({  
  "dateString": todayFormat,
  "day": todayFormat.split('-')[2],
  "month": todayFormat.split('-')[1],
  "timestamp": 1688428800000,
  "year": todayFormat.split('-')[0],
    });
  return (
    <ScrollView style={styles.container}>
        <View style={styles.inner}>
            <Calendar style={styles.calendar}
             monthFormat = { 'yyyy년 MM월' } 
             onDayPress={(day) => {setSelectedDay(day)}}
             markedDates={{
                '2023-07-10': {marked: true},
                
              }}
              theme={{
                dayWidth: 22, // 날짜 컴포넌트의 너비
                // 다른 스타일 속성들
                // ...
              }}
            />

            <CalendarEventCard selectedDay={selectedDay}/>
        </View>
    </ScrollView>
  )
}

function CalendarEventCard(props){
    return(
        <View style={styles.dayEventContainer}>
            <View style={styles.dayEventBox}>
                <Text style={{fontSize:16,fontFamily:"font-B",color:"#1f1f1f"}}>{props.selectedDay.dateString.split('-')[1]}월 {props.selectedDay.dateString.split('-')[2]}일</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container :{
      // flex: 1,
      backgroundColor: "#F3F3FF",
    },
    inner :{
        margin: 20,
        // backgroundColor:"#f5d5f7",
    },
    calendar :{
        borderRadius : 15,
        height: 380
    },
    dayEventContainer :{
      marginTop : 20,
      backgroundColor: "#F3F3FF",
    },
    dayEventBox :{
        width: "100%",
        height: 230,
        backgroundColor: "#fff",
        borderRadius : 20,
        padding: 20
    },
    dayText :{
        fontSize: 14,
        fontFamily: "font-B",
        color: "#1f1f1f"
    }
})
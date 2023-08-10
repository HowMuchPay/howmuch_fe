import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'


export default function ComingEventScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.comingBox}>
          <View style={styles.comingRelationBox}>
            <Text style={styles.comingRelation}>친구</Text>
          </View>
          <View style={styles.comingTitleBox}>
            <Image style={{width:24,height:24}}source={require('../assets/images/icon_cake.png')}/>
            <Text style={styles.comingTitle}>박지영님의 생일</Text>
            <Text style={styles.comingDate}>2023년 07월 10일</Text>
            <View style={styles.comingDdayBox}>
              <Text style={styles.comingDday}>D-14일</Text>
            </View>
          </View>
          <View style={styles.comingPayBox}>
            <View style={styles.comingPayLine}></View>
            <View style={styles.comingPayTextBox}>
              <Text style={styles.comingPayMoney}>50,000원</Text>
              <Text style={styles.comingPayMoneyDes}>을 낼 거예요</Text>
            </View>
            
          </View>
        </View>
        <TouchableOpacity style={styles.modifyBtn}>
          <Text style={styles.modifyBtnText}>수정하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container :{
    
    backgroundColor: "#F3F3FF",
  },
  inner :{
    margin: 20,
    paddingTop: 100
  },

  // 이벤트 박스
  comingBox :{
    backgroundColor: "#fff",
    borderRadius: 20,
    // height: 380,
    marginBottom: 40,
    padding:20
  },
  comingRelationBox :{
    alignItems: "flex-start",
    borderRadius: 5
    
  },
  comingRelation :{
    fontSize: 14,
    fontFamily: "font-B",
    color: "#6d61ff",
    backgroundColor: "#f3f3ff",
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 3,
    paddingRight: 3,
  },
  comingTitleBox :{
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    
  },
  comingTitle :{
    color: "#1f1f1f",
    fontSize: 20,
    fontFamily: "font-B",
    marginTop: 20,
    marginBottom: 12
  },
  comingDate :{
    color: "#8e8e8e",
    fontSize: 17,
    fontFamily:"font-B"
  },
  comingDdayBox :{
    borderRadius: 16,
    backgroundColor: "#f3f3ff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 26,
    marginBottom: 26
  },
  comingDday :{
    fontSize: 17,
    fontFamily: "font-B",
    color: "#6d61ff",
    lineHeight: 20
  },
  comingPayBox :{
    marginBottom: 30
  },
  comingPayLine :{
    borderStyle:"dashed",
    width: "100%",
    borderTopWidth: 0.5,
    alignItems: "center",
    height: 2,
    borderColor: "#ccc",
    marginBottom: 40
  },
  comingPayTextBox :{
    flexDirection: "row",
    justifyContent: "center"
  },
  comingPayMoney :{
    fontFamily:"font-B",
    fontSize: 17,
    color: "#6d61ff"
  },
  comingPayMoneyDes :{
    fontFamily: "font-B",
    fontSize: 17,
    color: "#1f1f1f"
  },

  // 수정하기 버튼
  modifyBtn :{
    paddingTop: 19,
    paddingBottom: 19,
    paddingLeft: 150,
    paddingRight: 150,
    backgroundColor: "#6d61ff",
    borderRadius: 20,
    textAlign: "center"
  },
  modifyBtnText :{
    fontFamily: "font-B",
    fontSize: 14,
    color: "#fff",
    
  }


})
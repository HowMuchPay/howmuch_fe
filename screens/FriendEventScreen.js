import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

import Modal from 'react-native-modal';
import BottomModal from '../components/BottomModal';
import { TextInput } from 'react-native-gesture-handler';



export default function FriendEventScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inner}>
        <NowGetMoneyBox />
        <PayListBox />
      </View>
    </ScrollView>
  )
}

function NowGetMoneyBox(){
  return(
    <View style={styles.nowGetMoneyBox}>
      <Text style={styles.nowGetMoneyTitle}>
        현재까지
      </Text>
      <View style={styles.nowGetMoneyTitleFlex}>
        <Text style={[styles.nowGetMoneyTitle, styles.accentColor]}>
          총 6,100,000원
        </Text>
        <Text style={styles.nowGetMoneyTitle}>을</Text>
      </View>
      <Text style={styles.nowGetMoneyTitle}>냈어요.</Text>
    </View>
  )
}

function PayListBox(){
  const [modalVisible, setModalVisible] = useState(null);

  const handleButtonPress = (number) => {
    setModalVisible(number);
  };

  let groupList = [
    { id: "all", title:"전체", pressed: true },
    { id: "family", title:"가족", pressed: false },
    { id: "friend", title:"친구", pressed: false },
    { id: "work", title:"직장", pressed: false },
    { id: "etc", title:"기타", pressed: false },
  ];

  let eventList = [
    { id: "all", title:"전체", pressed: true },
    { id: "marry", title:"결혼", pressed: false },
    { id: "firstBirth", title:"돌잔치", pressed: false },
    { id: "worthy", title:"상", pressed: false },
    { id: "birthday", title:"생일", pressed: false },
    { id: "etc", title:"기타", pressed: false },
  ];

  return(
    <View style={styles.filterContainer}>
      <View style={styles.filterFlex}>
        <TouchableOpacity style={styles.filterSelectBox} onPress={() => handleButtonPress(1)}>
          <Text style={styles.filterSelectTitle}>전체 내역</Text>
          <Image style={{width:12,height:12}}source={require('../assets/images/icon_arrow.png')}/>
        </TouchableOpacity>
       <View>
        <Modal
          isVisible={modalVisible === 1}
          transparent={true}
          onBackdropPress = {()  =>  setModalVisible (null)} 
          onSwipeComplete = { ( )  =>  setModalVisible ( null ) } 
          swipeDirection = {"down"}
          
          style={styles.bottomModalFlex}>
            
            <View style={styles.bottomModalBox}>
              <TouchableOpacity style={{marginLeft:"auto",marginRight:"auto", alignItems:"center", marginBottom:30,height:20,width:100}}  onPress={() => setModalVisible(null)} >
                <Image style={{width:37,height: 2}}source={require('../assets/images/icon_close_bar.png')}/>
              </TouchableOpacity>

              <SelectBtnBox title={"그룹별"} btnArr={groupList}/>
              <SelectBtnBox title={"경조사별"} btnArr={eventList}/>
            </View>
        </Modal>
       </View>
        
        <View style={styles.filterSearchBox}>
          <TouchableOpacity style={styles.filterSearchIcon} onPress={() => handleButtonPress(2)}>
            <Image style={{width:24,height:24}}source={require('../assets/images/icon_search_black.png')}/>
          </TouchableOpacity>
          <View>
            <Modal
              isVisible={modalVisible === 2}
              transparent={true}
              onBackdropPress = {()  =>  setModalVisible (null)} 
              >
                
                <View style={styles.searchModalBox}>
                  <Text style={styles.searchModalTitle}>검색하기</Text>
                  <View style={styles.searchModalInputFlex}>
                    <Image style={{width:18,height:18}}source={require('../assets/images/icon_search.png')}/>
                    <TextInput style={styles.searchModalInput} placeholder='검색어를 입력해주세요'/>
                  </View>
                </View>
            </Modal>
          </View>

          <TouchableOpacity  style={styles.filterRefreshIcon}>
            <Image style={{width:24,height:24}}source={require('../assets/images/icon_rotate_right.png')}/>
          </TouchableOpacity>
        </View>
      </View>

      <PayList />

    </View>
  )
}

function SelectBtnBox(props){
  const [buttons, setButtons] = useState(props.btnArr);


  const handleButtonPress = (buttonId) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === buttonId ? { ...button, pressed: !button.pressed } : button
      )
    );
  };

  return (
    <View style={styles.modalGroupSelect}>
      <Text style={styles.modalTitle}>{props.title}</Text>
      <View style={styles.modalBtnFlex}>
        {buttons.map((button, idx) => {
          return (
            <TouchableOpacity style={[styles.modalSelectBtn,{ backgroundColor: button.pressed ? '#6D61FF' : '#F3F3FF' }]} key={button.id} onPress={() => handleButtonPress(button.id)}>
              <Text style={[styles.modalBtnTitle,{color: button.pressed ? '#fff' : '#1F1F1F' }]}>{button.title}</Text>
            </TouchableOpacity>
          )

        })}
      </View>
    </View>
  )
}


function PayList(){
  return (
    <View style={styles.payListBox}>

    </View>
  )

}



const styles = StyleSheet.create({
  container :{
    // flex: 1,
    
    backgroundColor: "#F3F3FF",
    // minHeight: 740,
    // backgroundColor:"#1d1d1d"
  },
  inner :{
    margin: 20,
    // backgroundColor:"#f5d5f7",
    
    paddingTop: 60,
    
  },

  //현재까지 받은 금액
  nowGetMoneyBox :{
    marginBottom : 40
  },
  nowGetMoneyTitleFlex :{
    flexDirection: "row"
  },
  nowGetMoneyTitle :{
    fontSize: 26,
    fontFamily: "font-B",
    lineHeight: 36
    
  },
  accentColor :{
    color: "#6D61FF"
  },


  //필터박스
  filterFlex :{
    flexDirection : "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5
  },
  filterSelectBox :{
    flexDirection : "row",   
    alignItems: "center",
    justifyContent : "space-between"
  },
  filterSelectTitle :{
    fontSize: 17,
    fontFamily: "font-B",
    color: "#1F1F1F",
    marginRight: 4
  
  },
  filterSearchBox :{
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-around"
  },
  filterSearchIcon :{
    marginRight: 18
  },

  // 이벤트 리스트
  payListBox :{
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 520,
    marginBottom: 40,
  },

  //모달창
  bottomModalFlex: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomModalBox: {
    
    backgroundColor: '#fff', 
    padding: 20,
    // height:390, 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
    
  },
  modalGroupSelect :{
    marginTop: 10,
    marginBottom: 20
  },
  modalTitle :{
    fontSize: 17,
    fontFamily: "font-B",
    color: "#1F1F1F",
    marginBottom: 18,
    paddingLeft: 10
  },
  modalBtnFlex :{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    maxWidth: "95%",
    
  },
  modalSelectBtn :{
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: "#F3F3FF",
    borderRadius: 18,
    marginRight: 15,
    marginBottom: 10
  },
  modalBtnTitle :{
    fontSize: 14,
    fontFamily: "font-M",
    color: "#1F1F1F",
  },

  // 검색 모달창
  searchModalBox :{
    backgroundColor: '#fff', 
    padding: 20,
    maxWidth: 300,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",    
    borderRadius: 20,
    paddingBottom: 45
  },
  searchModalTitle :{
    fontFamily: "font-M",
    fontSize: 17,
    marginBottom: 20,
    marginTop:10,
  },
  searchModalInputFlex :{
    width: "100%",
    borderRadius: 20,
    height: 50,
    backgroundColor: "#f4f4f4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  searchModalInput :{
    marginLeft: 14
  }
})
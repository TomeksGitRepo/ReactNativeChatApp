import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage"
import serverAddress from '../utils/serverAddres';
import axios from 'axios'

import Logo from "../../assets/images/LoginScreen/logo-02.png"; //TODO change this

import UserPreviewContainer from '../components/UserPreviewContainer'
import GroupsPreviewContainer from "../components/GroupsPreviewContainer";

async function filterSingleChats(array) {
 let result = array.filter((item) => {
    // //console.log('item in filterSingleChats: ', item)
    // //console.log('item.isSingleChat in filterSingleChats: ', item.isSingleChat)
    return item.isSingleChat === true}
    )

  return result
}

async function filterGroupChats(array) {
  let result = array.filter((item) => {
    // //console.log('item in filterSingleChats: ', item)
    // //console.log('item.isSingleChat in filterSingleChats: ', item.isSingleChat)
    return item.isSingleChat !== true}
    )
    //console.log('result in filterGroupChats:', result)

  return result
}

const ChatMainScreen = ({ navigation }) => {
  const [currentView, setCurrentView] = useState('Chats');
  const [allChatsData,setAllChatsData ] = useState([])
  const [singleChats, setSingleChats] = useState([])
  const [groupChats, setGroupChats] = useState([])

  useEffect(() => {
    async function getChats() {
    let userId = await AsyncStorage.getItem("userID");
    //console.log('userId in useEffect ChatMainScreen: ', userId)
    
    let request = await axios.post(`${serverAddress}/api/database/user/getAllChats`, {"userId": userId })
    let allChats = request.data

    //console.log('allChat in useEffect ChatMainScreen: ', allChats)
    return allChats
  }
  getChats().then(result => {
    setAllChatsData( result )
    filterSingleChats(result).then((filteredResult) => {
      setSingleChats(filteredResult)
      //console.log('singleChats in useEffect:', singleChats)
     } ).catch(e => console.log(e))

    filterGroupChats(result).then((filteredResult) => {
      setGroupChats(filteredResult)
      //console.log('groupChats in useEffect:', groupChats)
     
    }).catch(e => console.log(e))
    
  }).catch(err => console.log(err))

  let timerID = setInterval(() => {
   getChats().then(result => {
    setAllChatsData( result )
    filterSingleChats(result).then((filteredResult) => {
      setSingleChats(filteredResult)
      //console.log('singleChats in useEffect:', singleChats)
     } ).catch(e => console.log(e))

    filterGroupChats(result).then((filteredResult) => {
      setGroupChats(filteredResult)
      //console.log('groupChats in useEffect:', groupChats)
    }).catch(e => console.log(e))
    
  }).catch(err => console.log(err))
  }, 10000)
  return function cleanup() {
    clearInterval(timerID)
  }
  }, [])


  ////console.log("navigation:", navigation);
  if( currentView === 'Chats') {
    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={{...styles.headerStyle, textDecorationLine: 'underline'}} onPress={() => setCurrentView('Chats')}>Czaty</Text>
          <Text style={styles.headerStyle} onPress={() => setCurrentView('Groups')}>Grupy</Text>
        </View>
        <View style={styles.row, {backgroundColor: 'white', flex: 6, width: '100%'}}><UserPreviewContainer navigation={navigation} singleUserChats={singleChats} /></View>
        <TouchableOpacity style={styles.plusImageContainer} onPress={() => navigation.navigate('SingleChatForm')}>
        <Image source={require("../../assets/images/ChatMainScreen/plusSign.png")} style={styles.imagePlusSign} />
        </TouchableOpacity>
      </View>
      
    );
  } else if (currentView === 'Groups') {
    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.headerStyle} onPress={() => setCurrentView('Chats')}>Czaty</Text>
          <Text style={{...styles.headerStyle, textDecorationLine: 'underline'}} onPress={() => setCurrentView('Groups')}>Grupy</Text>
        </View>
        <View style={styles.row, {backgroundColor: 'white', flex: 6, width: '100%'}}><GroupsPreviewContainer gropuChats={groupChats} /></View>
        <TouchableOpacity style={styles.plusImageContainer}>
        <Image source={require("../../assets/images/ChatMainScreen/plusSign.png")} style={styles.imagePlusSign} />
        </TouchableOpacity>
      </View>
      
    );
  }
  

};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#157ca5",
    height: "100%",
  },
  imagePlusSign: {
    height: 55,
    width:  55,
  },
  plusImageContainer: {
    marginRight: 7,
    marginBottom: 7,
    position:'absolute',
    bottom: 0, 
    right: 0,
    backgroundColor: 'transparent'
  },
  button: {
    flex: 1,
    width: "100%",
  },
  headerStyle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    margin: 50
  }
});

export default ChatMainScreen;

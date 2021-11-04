import React, {useState, useEffect, useRef, useReducer} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ImageBackground,
  FlatList,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage"
import axios from 'axios';



import Logo from "../../assets/images/LoginScreen/logo-02.png"; 

import ChatMessageBox from '../components/ChatMessageBox';


import sendButton from '../../assets/images/SingleChatScreen/singleButtonSend.png'

import serverAddress from '../utils/serverAddres'


async function getUserID() {
  let userId = await AsyncStorage.getItem("userID");
  //console.log('userId getUserId in SingleChatScreen:', userId)
  return userId
}

async function sendMessage(chatID, messageText, userID) {
  //console.log('chatID in sendMessage in SingleChatScreen:', chatID)
  //console.log('textMessage in sendMessage in SingleChatScreen:', messageText)
  //console.log('userID in sendMessage in SingleChatScreen:', userID)

  axios.post(serverAddress + '/api/database/createMessage', {chatId : chatID, messageText, authorId : userID}).then((result) => {
    console.log('result from post message save:', result)
  }).catch(e => console.log('error saving message to server:', e))
}

const SingleChatScreen = ({ navigation,  }) => {
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('')
  const [userID, setUserID] = useState('')
  const [currentChatID, setCurrentChatID] = useState('')


  useEffect(() => {
    const PropMessages = navigation.getParam('messages')
    //console.log('PropMessages in SingleChatScreen:', PropMessages )
    const chatID = navigation.getParam('chatID')
    setCurrentChatID(chatID)
   setMessages(PropMessages)
   getUserID().then((result) => setUserID(result)).catch(e => console.log(e))

  }, []);
  

  // //console.log('PropMessages: ', PropMessages)
  // //console.log('messages: ', messages)

    //TODO: make some dummy  messages apper as if in coversation


  //console.log('messages in SingleChatScreen before return:', messages)
  return (
      <View style={styles.column}>
      <ScrollView style={styles.column} >
      <FlatList keyExtractor={item => item.textBody} style={{width: '100%'}} data={messages} renderItem={({item}) =><ChatMessageBox authorID={item.authorID} body={item.messageText} time={item.sendTime} isMyMessage={item.authorID === userID}/> } />
      <View style={styles.row}>
      <TextInput value={inputValue} onChange={(text) => setInputValue(text)} style={{height: 50, width: '75%', backgroundColor: 'white', borderRadius: 15, ...styles.inputStyle ,alignSelf: 'center', right: 5}} onEndEditing={(e) => {
        // //console.log('Input end editing.');
        // //console.log('e =>', e.nativeEvent.text);
        let date = new Date();
        setMessages([...messages, {authorID: userID, messageText: e.nativeEvent.text, sendTime: date.toISOString() }])

        let message = e.nativeEvent.text;
        sendMessage(currentChatID, message, userID)
        setInputValue('')

      
      }} />
      <Image source={sendButton} style={{width: '25%', height: 50, alignSelf: "center"}} />
      </View>
      </ScrollView>
   
     
      </View>
  )

};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#157ca5",
    height: "100%"
  },
  myMessages: {
    alignItems: "flex-start",
  },
  secendPersonMessage: {
    alignItems: "flex-end",
    alignSelf: 'flex-end'
  },
  imagePlusSign: {
    height: 55,
    width:  55,
  },
  messageBubble: {
      backgroundColor: 'white',
      borderRadius: 15,
      flexShrink: 7,
      flexDirection: 'column',
      padding: 10
  },
  ImageBackgroundMe: {
    width: 300,
    height: 100,
    position: 'relative',
    padding: 15
  },
  ImageBackgroundThem: {
    width: 300,
    height: 100,
    position: 'relative',
    padding: 15,
    alignSelf: 'flex-end'
  },
  inputStyle: {
    fontSize: 25
  }
});

export default SingleChatScreen;

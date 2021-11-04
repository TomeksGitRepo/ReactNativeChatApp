import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Button } from "react-native";
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import UserChatPreview from '../components/UserChatPreview'
import serverAddress from '../utils/serverAddres';
import face1 from '../../assets/images/ChatMainScreen/dummyImages/face1.png';



const NewSingleChatForm = ({navigation}) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [retypedPassword, setRetypedPassword] = useState('')
    //TODO remove user making request to server for all users.
    const [allUsers, setAllUsers] = useState([])
    const [userID, setUserID ] = useState('')

 async function getUserId() {
  let userId = await AsyncStorage.getItem("userID");
  setUserID(userId)
 }

  async function getAllUsers() {
    let request =  await axios.get(`${serverAddress}/api/database/user/getAllUsers`)
    let allUsersData = request.data;

    console.log('allUser in useEffect in NewSingleChatForm', allUsersData)
    await setAllUsers(allUsersData)
  }

    useEffect(() => {
      getAllUsers().then(() => console.log('allUsers in NewSingleChatForm: ', allUsers)).catch(e => console.log(e))
      getUserId()
    }, [])

  return (
    <View style={styles.row}>
    <FlatList data={allUsers} renderItem={({item}) =>  {
    return (
      <TouchableOpacity onPress={() => {
        //console.log('item in TouchableOpacity onPress in NewSingleChatForm', item)
        let chatName = `${userID}-${item._id}`
        console.log("item._id in onPress in NewSingleChatForm:", item._id )
        if (userID == null || item._id == null) {
          console.log('userID or item._id cant be null, userID:', userID, 'item._id:', item._id)
          return
        }
        let result = axios.post(`${serverAddress}/api/database/createChat`, {chatName, "adminID": userID, "isSingleChat": "true", "otherAdmins":[item._id]  } ).then(result => {
          console.log('result in post(/api/database/createChat):', result )
          navigation.navigate('ChatMain')
        }).catch(e => console.log('error in sending to server:', e))
        //console.log('result in TouchableOpacity onPress: ', result)
      
      }}>
    <UserChatPreview imageSource={face1} userName={item.userName} lastMessage="" navigation={navigation } createNewChat={true}  /> 
    </TouchableOpacity>
    
    )
    } 
 }> 
    </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    top: 50,
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#157ca5',
    height: '100%'
  },
  image: {
    height: 200,
    width: 200,

  },
  button: {
      flex: 1,
      width: '100%'
  }
});

export default NewSingleChatForm;

import React from "react";
import { View,  StyleSheet, FlatList } from "react-native";
import UserChatPreview from './UserChatPreview'

import face1 from '../../assets/images/ChatMainScreen/dummyImages/face1.png';
import face2 from '../../assets/images/ChatMainScreen/dummyImages/face2.jpg'
import face3 from '../../assets/images/ChatMainScreen/dummyImages/face3.jpg'
import face4 from '../../assets/images/ChatMainScreen/dummyImages/face4.jpg'

//TODO just message template
// const ChatPropertiesObject = {
//   messages: {
//       data: [
//           {authorID: "JA", body: "Cześć co słychać", time: Date.now() },
//           {authorID: "Claudia", body: "Wszystko w porządku, jak mogę pomóc?", time: Date.now() },
//       ]
//   }
// }

//Just UserChatPreview template
//<UserChatPreview imageSource={face1} userName="Claudia" lastMessage="Ta apka jest super." navigation={navigation} messages={{...ChatPropertiesObject.messages}}  />


const UserPreviewContainer = ({navigation, singleUserChats }) => {
  //console.log('singleUserChats in UserPreviewContainer:',  singleUserChats)
  
  return (
    <View style={styles.row}>
    <FlatList data={singleUserChats} renderItem={({item}) => {
    let lastMessageText = item.messages.length > 1 ?  item.messages[item.messages.length - 1].messageText : ""
    return <UserChatPreview imageSource={face1} userName={item.usersInvolved[0].userName} lastMessage={lastMessageText} messages={item.messages} navigation={navigation} chatID={item._id}   />  
    } 
  }> 
    </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5

  },
  column: {
    top: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    padding: 20,
    alignSelf: 'auto',
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  inputText: {
      fontSize: 22,
      color: 'white',
  }
});

export default UserPreviewContainer;

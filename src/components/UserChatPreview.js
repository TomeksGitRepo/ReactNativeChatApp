import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground } from "react-native";

function shortenTextIfTooLong(text) {
  if (text.length > 30) {
    return `${text.substring(0,30)}...`
  }
  
  return text
}



const UserChatPreview = ({navigation, imageSource, userName, lastMessage, messages, createNewChat = false, chatID  }) => {
  //console.log('messages in UserChatPreview: ', messages)
  let result = createNewChat === true ? (
    <View style={styles.row} >
    <Image source={imageSource} style={styles.roundedImage}/>
    <View style={styles.column}>
    <View style={styles.row}>
    <Text style={styles.userNameText}>{userName}</Text>
    </View>
    <View style={styles.row}>
    <Text style={styles.lastMessageText}>{shortenTextIfTooLong(lastMessage)}</Text>
    </View>
    </View>
        </View>
     
  ) :
   (
    <View style={styles.row} >
    <TouchableOpacity  style={styles.row} onPress={() => navigation.navigate('SingleChat', {messages, chatID})} >
    <Image source={imageSource} style={styles.roundedImage}/>
    <View style={styles.column}>
    <View style={styles.row}>
    <Text style={styles.userNameText}>{userName}</Text>
    </View>
    <View style={styles.row}>
    <Text style={styles.lastMessageText}>{shortenTextIfTooLong(lastMessage)}</Text>
    </View>
    </View>
    </TouchableOpacity>
        </View>
     
  );

  return result;
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginBottom: 10,
    alignSelf: 'stretch'

  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
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
  roundedImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red"
  },
  userNameText: {
      fontSize: 22,
      fontWeight: 'bold',
      left: 20
  },
  lastMessageText: {
    fontSize: 15,
    left: 20
}
});

export default UserChatPreview;

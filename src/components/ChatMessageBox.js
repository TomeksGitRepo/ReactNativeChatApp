import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";

import LeftSidePointerBackgroundImage from "../../assets/images/SingleChatScreen/dymek_lewa.png";
import RightSidePointerBackgroundImage from "../../assets/images/SingleChatScreen/dymek_prawa.png";

const ChatMessageBox = ({ isMyMessage, authorID, body, time }) => {
  const ownMessage = isMyMessage;
  if(ownMessage == undefined) {
      ownMessage = true;
  }
  //console.log('isMyMessage in ChatMessageBox:', ownMessage)

  if (ownMessage) {
    return (
      <ImageBackground
        style={styles.ImageBackgroundMe}
        source={LeftSidePointerBackgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.myMessages}>
          <Text>{body}</Text>
          <Text>{new Date(time).toLocaleTimeString()}</Text>
        </View>
      </ImageBackground>
    );
  } else {
      return (
    <ImageBackground
      style={styles.ImageBackgroundThem}
      source={RightSidePointerBackgroundImage}
      resizeMode="stretch"
    >
      <View style={styles.secendPersonMessage}>
        <Text>{authorID}</Text>
        <Text>{body}</Text>
        <Text>{new Date(time).toLocaleTimeString()}</Text>
      </View>
    </ImageBackground>
      )
  }
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
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
    alignSelf: "auto",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputText: {
    fontSize: 22,
    color: "white",
  },
  myMessages: {
    alignItems: "flex-start",
    left: 15
  },
  secendPersonMessage: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  ImageBackgroundMe: {
    width: 300,
    height: 100,
    position: "relative",
    padding: 15
  },
  ImageBackgroundThem: {
    width: 300,
    height: 100,
    position: "relative",
    padding: 15,
    alignSelf: "flex-end",
  },
});

export default ChatMessageBox;

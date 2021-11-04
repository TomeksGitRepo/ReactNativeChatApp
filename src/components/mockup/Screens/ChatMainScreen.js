import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const image= require("../../../../design/mockupImages/ChatMainScreen.png")

const ChatMainScreen = ({navigation}) => {

    return (
        <View style={styles.canvas}>
         <TouchableOpacity style={styles.canvas} onPress={() => navigation.navigate('ChatDetail')}>
         <Image style={styles.image} source={image} />
         </TouchableOpacity>
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
    top: 50,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: '80%',
    width: '80%',
    display: 'flex',
    flex: 1
  },
  textWrap: {
    flexWrap: 'wrap'
  },
  canvas: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: 'auto',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#157ca5'
  },
});

export default ChatMainScreen;

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import Logo from '../../assets/images/LoginScreen/logo-02.png'; //TODO change this


import backgroundImage from '../../assets/images/LoginScreen/ramka-02.png'

const InputElement = ({navigation, placeholder, icon, password, dataChange}) => {
  return (
    <View style={styles.row}>
    <ImageBackground source={backgroundImage} style={styles.image} >  
    <Image source={icon} />
    {password ? <TextInput style={styles.inputText} placeholder={placeholder} secureTextEntry={true} onChangeText={text => dataChange(text)}  /> : <TextInput style={styles.inputText} placeholder={placeholder} onChangeText={text => dataChange(text)}  /> }
    </ImageBackground>
        </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginBottom: 10

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

export default InputElement;

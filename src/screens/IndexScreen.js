import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native";

import image1 from '../../assets/images/IndexScreen/numbers/1-02.png'
import image2 from '../../assets/images/IndexScreen/numbers/2-02.png'
import image3 from '../../assets/images/IndexScreen/numbers/3-02.png'
import image4 from '../../assets/images/IndexScreen/numbers/4-02.png'
import image5 from '../../assets/images/IndexScreen/numbers/5-02.png'
import image6 from '../../assets/images/IndexScreen/numbers/6-02.png'
import image7 from '../../assets/images/IndexScreen/numbers/7-02.png'
import image8 from '../../assets/images/IndexScreen/numbers/8-02.png'
import image9 from '../../assets/images/IndexScreen/numbers/9-02.png'
import image10 from '../../assets/images/IndexScreen/numbers/9+-02.png'

import AsyncStorage from "@react-native-community/async-storage"

import RegisterForNotifications from '../utils/registerForNotifications'

const imageNumbers = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];
let randomNumberNews = Math.floor(Math.random() * 10) ;
let randomNumberChat = Math.floor(Math.random() * 10) ;

const IndexScreen = ({navigation}) => {
  // useEffect(() => {
  //   registerForNotifications()
  // }, [])
  //console.log('navigation:', navigation)
  return (
    <View>
      <View style={styles.row}>
     <View style={styles.column} >
    
      <TouchableOpacity onPress={() => navigation.navigate('News') } style={styles.image} >
          <Image
            style={styles.image}
            source={require("../../assets/images/IndexScreen/papirus.jpg")}
          />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('News')  } style={{height: 20}} >
         
          <Text>Aktualności</Text>
          
          </TouchableOpacity>
          <Image source={imageNumbers[randomNumberNews]} style={{width: 20, height: 20, position: 'relative', top: 0, right: 0}}/>
          </View>
          
          <View style={styles.column}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatMain') } style={styles.image} >
          <Image
          style={styles.image}
          source={require("../../assets/images/IndexScreen/chat.png")}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatMain')  } style={{height: 20}} >
       
        <Text>Chat</Text>
      
        </TouchableOpacity>
        <Image source={imageNumbers[randomNumberChat]} style={{width: 20, height: 20, position: 'relative', top: 0, right: 0}}/>
        </View>
      </View>
      <View style={styles.buttonRow}>
      <Button onPress={async () => {
        try {
          await AsyncStorage.setItem('userID', "").then(() => navigation.navigate('Login'))
        } catch (e) {
          console.log(e)
        }
      }} title='Wyloguj'>Wyloguj</Button>
      
      </View>
      <RegisterForNotifications />
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
  buttonRow: {
    top: 150,
    display: "flex",
    flexDirection: "row",
    flex: 1,
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
    height: 50,
    width: 50,
    display: 'flex'
  },
  textWrap: {
    flexWrap: 'wrap'
  }
});

export default IndexScreen;

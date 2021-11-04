import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../../assets/images/LoginScreen/logo-02.png'; 
import Input from '../components/InputElement'

import serverAddres from '../utils/serverAddres';

import ludek from '../../assets/images/LoginScreen/ludek-02.png'
import lock from '../../assets/images/LoginScreen/klodka-02.png'

const LoginScreen = ({navigation}) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')


  return (
    <View style={styles.column}>
        <ScrollView>
        <View style={styles.imageCenterContainer}>
        <Image source={Logo} style={styles.image} />
        </View>
        <Input placeholder='Nazwa użytkownika' icon={ludek} dataChange={ (text) => setUserName(text)}/>
        <Text>Username: {username}</Text>
        <Input placeholder='Hasło' icon={lock} dataChange={setPassword} password/>
        <Text>Password: {password}</Text>
        <Button style={styles.button} title="Zaloguj Się" onPress={async () => {
          let URLaddress = `${serverAddres}/api/database/user/getUserId`
          //console.log('URLaddress: ', URLaddress)
           let userID = await axios.post( URLaddress, {"login": username, "password": password})     
          console.log('userID in LoginScreen before storage:', userID)
          try {
            AsyncStorage.setItem('userID', userID.data).then(() => navigation.navigate('Index') )
            
          } catch (e) {
            //TODO inform user login failed
            console.log(e)
          }

          //console.log('userID.data', userID.data)
          //navigation.navigate('Loading')

        }}  />
        <Text>Nie masz konta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Zarejestruj się</Text>
        </TouchableOpacity>
        </ScrollView>
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
    // justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: '#157ca5',
    height: '100%'
  },
  imageCenterContainer : {
    justifyContent: "space-between",
    alignItems: "center"
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

export default LoginScreen;

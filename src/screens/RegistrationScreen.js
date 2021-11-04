import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from "react-native";
import Logo from '../../assets/images/LoginScreen/logo-02.png'; 
import Input from '../components/InputElement'


import ludek from '../../assets/images/LoginScreen/ludek-02.png'
import lock from '../../assets/images/LoginScreen/klodka-02.png'

import axios from 'axios'

import serverAddress from '../utils/serverAddres'



const RegistrationScreen = ({navigation}) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [retypedPassword, setRetypedPassword] = useState('')

    validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    validateRetypedPassword = (retypedPassword, password) => {
      return password === retypedPassword
    }

  return (
    <View style={styles.column}>
    <ScrollView >
        <View style={styles.imageCenterContainer}>
        <Image source={Logo} style={styles.image} />
        </View>
        <Input placeholder='Email' icon={ludek} dataChange={ (text) => setEmail(text)}/>
        {validateEmail(email) ? null : <Text>Email niepoprawny</Text>  }
        <Input placeholder='Nazwa użytkownika' icon={ludek} dataChange={ (text) => setUserName(text)}/>
        <Text>Username: {username}</Text>
        <Input placeholder='Hasło' icon={lock} dataChange={(text) => setPassword(text)} password/>
        <Text>Password: {password}</Text>
        <Input placeholder='Powtórz hasło' icon={lock} dataChange={(text) => setRetypedPassword(text)} password/>
       { validateRetypedPassword(retypedPassword, password) ? null : <Text>Hasła nie są identyczne</Text>}
        <Button style={styles.button} title="Zarejestruj się" onPress={() => {
          if (!validateEmail(email) || !validateRetypedPassword(retypedPassword, password) ) {
            return null;
          }
        console.log(`
        username===${username}
        password===${password}
        `)
      let result = axios.post(`${serverAddress}/api/database/createUser`, {
        "userName": username,
        "password": password,
        "avatarImageURL": 'http://www.wp.pl'
      }).then((result) => {
        console.log('result in RegistrationScreen axios.post:', result)
        navigation.navigate('Index')
      }).catch((e) => console.log('error in result in RegistrationScreen axios.post: ', e))
      
      }
        }  />
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

export default RegistrationScreen;

import React, {useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ScrollView } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import Logo from '../../assets/images/LoginScreen/logo-02.png'; //TODO change this

import image1 from '../../assets/images/LoadingScreen/1.png'
import image2 from '../../assets/images/LoadingScreen/2.png'
import image3 from '../../assets/images/LoadingScreen/3.png'
import image4 from '../../assets/images/LoadingScreen/4.png'
import image5 from '../../assets/images/LoadingScreen/5.png'
import image6 from '../../assets/images/LoadingScreen/6.png'
import image7 from '../../assets/images/LoadingScreen/7.png'
import image8 from '../../assets/images/LoadingScreen/8.png'

// const images = [image1, image2, image3, image4, image5, image6, image7, image8];
const images = [
  require('../../assets/images/LoadingScreen/1.png'),
  require('../../assets/images/LoadingScreen/2.png'),
  require('../../assets/images/LoadingScreen/3.png'),
  require('../../assets/images/LoadingScreen/4.png'),
  require('../../assets/images/LoadingScreen/5.png'),
  require('../../assets/images/LoadingScreen/6.png'),
  require('../../assets/images/LoadingScreen/7.png'),
  require('../../assets/images/LoadingScreen/8.png')
]

const LoadingScreen = ({navigation}) => {
   // const preloadImages = [<Image source={images[0]} style={styles.imageGlass} />, <Image source={images[1]} style={styles.imageGlass} />, <Image source={images[2]} style={styles.imageGlass} />, <Image source={images[3]} style={styles.imageGlass} />, <Image source={images[4]} style={styles.imageGlass} />, <Image source={images[5]} style={styles.imageGlass} />, <Image source={images[6]} style={styles.imageGlass} />, <Image source={images[7]} style={styles.imageGlass} />,  ]

    const [currentImage, setCurrentImage] = useState(0)
    const currentImageRef = useRef(currentImage)
    currentImageRef.current = currentImage;

    const [userID, setUserID] = useState('')

    useEffect(() => {
    AsyncStorage.getItem('userID').then(ID => setUserID(ID))
    
    }, [])
    
  if (currentImageRef.current + 1 < 9) {
    console.log('currentImageRef.current + 1:', currentImageRef.current + 1)
      setTimeout(() => {
        setCurrentImage(currentImageRef.current + 1)
      }, 300)   
  } else {
    //console.log('userId in LoadingScgreen:', userID)
    if (!userID) {
      navigation.navigate('Login')
      return (
        <View style={styles.column}>
        <Image source={Logo} style={styles.imageLogo} />
        <Text style={styles.textStyle}>Wczytywanie...</Text>
        {<Image source={images[7]} style={styles.imageGlass} />}
      </View>
    );
    }
    
  }

  if (currentImageRef.current + 1 == 8) {
    setTimeout(() => {
      navigation.navigate('Index')
    }, 100)
    
    return (
        <View style={styles.column}>
        <Image source={Logo} style={styles.imageLogo} /> 
        <Text style={styles.textStyle}>Wczytywanie...</Text>
        {<Image source={images[7]} style={styles.imageGlass} />}
      </View>
    );
  }

  return (
    <View style={styles.column}>
        <Image source={Logo} style={styles.imageLogo} />
        <Text style={styles.textStyle}>Wczytywanie...</Text>
        <Image source={images[currentImage]} style={styles.imageGlass} />
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
  imageLogo: {
    height: 100,
    width: 100,
  },
  button: {
      flex: 1,
      width: '100%'
  },
  textStyle: {
      fontSize: 25,
      color: 'white'
  },
  imageGlass: {
    height: 400,
    width: 300,
  },
});

export default LoadingScreen;

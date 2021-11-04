import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const image1= require("../../../../design/mockupImages/Glass1.png")

const LoadingScreen1 = ({navigation}) => {

    const [currentImage, setCurrentImage ] = useState(1)

    setTimeout(() => {
        navigation.navigate('Loading2')
    }, 2000)

  

    return (
        <View style={styles.canvas}>
         <TouchableOpacity style={styles.canvas}>
         {}
         <Image style={styles.image} source={image1} />
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
    height: '100%',
    width: '70%',
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

export default LoadingScreen1;

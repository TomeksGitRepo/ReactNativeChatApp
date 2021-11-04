import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {WebView} from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js'

const NewsDeatailScreen = ({navigation}) => {
    
  const news = navigation.getParam('news')
  const passwords = navigation.getParam('passwords')
  const [isPDF, setIsPDF] = useState(false)
  const [PDFLink, setPDFLink] = useState("")
  let passwordFound;

  onMessage = ( e ) => {
    console.log('In onMessage function')
    console.log( "On Message", e.nativeEvent.data )
    setPDFLink(e.nativeEvent.data)
    setIsPDF(true)
}
 
  ////console.log('news: ', news)
  console.log('news.link: ', news.link)
  console.log('passwords in NewsDeatailScreen: ', passwords)

  if (news.link.includes('xxxx')) {
    const removedTrailingSlashes = news.link.replace(/\/+$/, '').replace(/ /g,'')
    passwordFound = passwords['xxxx'][removedTrailingSlashes]
    console.log('passwordFound: ', passwordFound)
  } else if (news.link.includes('xxxx')) {
    const removedTrailingSlashes = news.link.replace(/\/+$/, '').replace(/ /g,'')
    passwordFound = passwords['xxxx'][removedTrailingSlashes]
    console.log('passwordFound: ', passwordFound)
  } else if (news.link.includes('xxxx')) {
    const removedTrailingSlashes = news.link.replace(/\/+$/, '').replace(/ /g,'')
    passwordFound = passwords['xxxx'][removedTrailingSlashes]
    console.log('passwordFound: ', passwordFound)
  }



  const fillOutPassword = `
  jQuery('input[name="post_password"]').attr('value', '${passwordFound}')
  jQuery('input[name="Submit"]').click()
  jQuery("a").each(function() {
    if (jQuery(this)[0].href.endsWith('.pdf')) {
      jQuery(this).bind('click touchstart', function(e) {
        e.preventDefault()
        e.stopPropagation()
        window.ReactNativeWebView.postMessage(this.href) 
        return false
      })
  }
})
  `
 // e.preventDefault()
 // window.ReactNativeWebView.postMessage('Data from webview!!!')
 
 if (isPDF) {
   return (
    <PDFReader
        source={{
          uri:PDFLink 
        }}
      />
   )
      }

  return (
    
    <WebView 
    source={{ uri: news.link}}
    injectedJavaScript={fillOutPassword}
    onMessage={onMessage} />

  )
}

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
    height: 50,
    width: 50,
    display: 'flex'
  },
  textWrap: {
    flexWrap: 'wrap'
  }
});

export default NewsDeatailScreen;

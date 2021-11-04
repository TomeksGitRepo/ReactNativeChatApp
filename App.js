import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, Alert, Button, Platform } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import IndexScreen from './src/screens/IndexScreen';
import NewsScreen from './src/screens/NewsScreen';
import NewsDeatailScreen from './src/screens/NewsDetailScreen';
import LoginScreenMockup from './src/components/mockup/Screens/LoginScreen';
import RegistrationScreenMockup from './src/components/mockup/Screens/RegistrationScreen';
import LoadingScreen1 from './src/components/mockup/Screens/LoadingScreen1';
import LoadingScreen2 from './src/components/mockup/Screens/LoadingScreen2';
import LoadingScreen3 from './src/components/mockup/Screens/LoadingScreen3';
import ChatMainScreenMockup from './src/components/mockup/Screens/ChatMainScreen';
import ChatDetailScreen from './src/components/mockup/Screens/ChatDetailScreen';
import LoginScreen from './src/screens/LoginScreen'
import RegistratioScreen from './src/screens/RegistrationScreen'
import ChatMainScreen from './src/screens/ChatMainScreen'
import SingleChatScreen from './src/screens/SingleChatScreen'
import LoadingScreen from './src/screens/LoadingScreen';
import NewSingleChatForm from './src/screens/NewSingleChatForm'

const navigator = createStackNavigator({
  Index: IndexScreen,
  News: NewsScreen,
  NewsDetail: NewsDeatailScreen,
  LoginMockup: LoginScreenMockup,
  RegistrationMockup: RegistrationScreenMockup,
  Loading1: LoadingScreen1,
  Loading2: LoadingScreen2,
  Loading3: LoadingScreen3,
  ChatMainMockup: ChatMainScreenMockup,
  ChatDetail: ChatDetailScreen,
  Login: LoginScreen,
  Registration: RegistratioScreen,
  ChatMain: ChatMainScreen,
  SingleChat: SingleChatScreen,
  Loading: LoadingScreen,
  SingleChatForm: NewSingleChatForm 
}, {
  initialRouteName: "Loading",
  defaultNavigationOptions: {
    title: 'xxxx'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = createAppContainer(navigator)

export default App;



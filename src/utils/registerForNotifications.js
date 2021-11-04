import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"

import serverAddress from '../utils/serverAddres'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function RegisterForNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [lastExpoPushToken, setlastExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  exports = {
    expoPushToken
   }

   function setOlderExpoPushToken(newToken) {
    console.log('newToken in setOlderExpoPushToken:', newToken)
    setlastExpoPushToken(newToken)
    //console.log('lastExpoPushToken in setOlderExpoPushToken:', lastExpoPushToken)
   }

   async function setlastSendToServerUserNotificationToken(value) {
    try {
        AsyncStorage.setItem('lastSendToServerUserNotificationToken', value)    
      } catch (e) {
        console.log(e)
      }   
   }

   async function sendTokenToServer(userId, userNotificationToken) {
    let request = await axios.post(`${serverAddress}/api/database/updateUserNotificationToken`, {"userId": userId, "userNotificationToken" : userNotificationToken })
    if (request.data === "Token updated on server") {
      console.log('Token successfuly updated on server')
    } else {
      console.log('Problem with saving token on server')
    }
   }

   async function compareTokens(newToken, oldToken) {
    console.log('newToken and oldToken in compareTokens newToken',newToken, 'and oldToken:', oldToken  )
    if (newToken && newToken !== oldToken) {
      let userId;
      try {
         userId= await AsyncStorage.getItem("userID")
       } catch (e) {
        console.log(e)
      }
      sendTokenToServer(userId, newToken).then(() => console.log('Token succefuly saved on server')).catch((e) => console.log('error while sending token to server', e))
      console.log('userPushToken send to server')
      try {
        AsyncStorage.setItem('lastSendToServerUserNotificationToken', newToken)
      } catch (e) {
        console.log(e)
      }    
    } else if (newToken === oldToken) {
      console.log('expoPushToken === lastExpoPushToken in registerForNotifications')
    }
    return;
  }

  function logCurrentStorage() {
  AsyncStorage.getAllKeys().then((keyArray) => {
    AsyncStorage.multiGet(keyArray).then((keyValArray) => {
      let myStorage= {};
      for (let keyVal of keyValArray) {
        myStorage[keyVal[0]] = keyVal[1]
      }

      console.log('CURRENT STORAGE: ', myStorage);
    })
  });
}

  async function getlastSendToServerUserNotificationToken() {
    return AsyncStorage.getItem('lastSendToServerUserNotificationToken').then((result) => {
    // console.log('onButton press result in getlastSendToServerUserNotificationToken:', result)
      result = result != undefined ? result : 'Result is not set'
      if (result) {
        console.log('Can set setOlderExpoPushToken result is:', result)
        setOlderExpoPushToken(result)
      } else {
        console.log('Cant set setOlderExpoPushToken result is:', result)
      }
      
      return result 
    }).catch(e => console.log('error in AsyncStorage.get in registerForNotifications', e))
  }

  async function resetUserIdStorage() {
    try {
    await AsyncStorage.setItem("lastSendToServerUserNotificationToken", "")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      console.log('in registerForPushNotificationsAsync.then')
      setExpoPushToken(token)
      getlastSendToServerUserNotificationToken().then( result => {
        if (!result) {
          console.log('result is undefined returning.')
          return
        }
        console.log('expo result in getlastSendToServerUserNotificationToken:', result)
        compareTokens(token, result) 
      }).catch((e) => console.log('error in getlastSendToServerUserNotificationToken ', e )).catch(e => console.log('error in registerForPushNotificationsAsync:', e))
     // console.log('expo token in registerForPushNotificationsAsync:', token)
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <View>
      <Text>registerForNotifications expoPushToken: {expoPushToken} </Text>
      <Text>registerForNotifications lastExpoPushToken: {lastExpoPushToken} </Text>
    </View>
    //<Button title="Reset userID in storage" onPress={resetUserIdStorage} />
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-around',
    //   }}>
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>Title: {notification && notification.request.content.title} </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    //   </View>
    //   <Button
    //     title="Press to schedule a notification"
    //     onPress={async () => {
    //       await sendPushNotification(expoPushToken);
    //     }}
    //   />
    // </View>
    //
    //
    //Buttons to debug
    //<Button title="getOldToken" onPress={getlastSendToServerUserNotificationToken} />
    //<Button title="Show all AsyncStorage" onPress={logCurrentStorage} />
    
  );
}

async function sendPushNotification(expoPushToken) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}



import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import {WebView} from 'react-native-webview'
import axios from "axios";
import Axios from "axios";

// Ngrok 부분이기 때문에 다시 할때마다 재생성 해줘야함 ngrok http 3000
const PUSH_REGISTRATION_ENDPOINT = "http://ec2-13-125-245-120.ap-northeast-2.compute.amazonaws.com:3000/token";
const MESSAGE_ENPOINT = "http://ec2-13-125-245-120.ap-northeast-2.compute.amazonaws.com:3000/message";

export default function App() {
  const [notification, setNotification] = useState(null);
  const registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    return axios.post(PUSH_REGISTRATION_ENDPOINT, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      token: {
        value: token,
      },
      user: {
        username: "Chobby",
        name: "Woobin Kim",
      },
    });
    const notificationSubscription = Notifications.addListener(
      handleNotification
    );
  };
  const handleNotification = (notification) => {
    setNotification(notification);
  };
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  const sendMessage = async (message) => {
    axios.post(MESSAGE_ENPOINT, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      message,
    });
  };
  const getMeals = async() => {
    const data = await Axios.get('http://13.125.245.120:3000/')
    const res = data.data.match(/[^<p>.*?</p>]/g).join("").match(/[^a-zA-Z!="'오늘의 급식]/g).join("").trim()
    sendMessage(res)
    // .then(res => res.data.match(/[^<p>.*?</p>]/g).join("").match(/[^a-zA-Z!="'오늘의 급식]/g).join("").trim())
    // .then(res => sendMessage(res))
  }
  useEffect(() => { 
    getMeals()
  },[])
  return (
    <SafeAreaView style={{flex:1}}>
        <WebView 
          source={{ uri: 'http://www.samil.hs.kr/main.php' }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "gray",
    width: 300,
    height: 50,
    color: "white",
  },
});
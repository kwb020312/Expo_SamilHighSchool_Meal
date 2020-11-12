import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import Axios from 'axios';

const PUSH_REGISTRATION_ENDPOINT = 'https://qj3bq4y8hg.execute-api.ap-northeast-2.amazonaws.com/Chobby_v1/users/token';
const MESSAGE_ENPOINT = 'https://qj3bq4y8hg.execute-api.ap-northeast-2.amazonaws.com/Chobby_v1/users/message';

export default function App() {
	const [notification, setNotification] = useState(null);
	const handleNotification = (notification) => {
		setNotification(notification);
	};
	const sendMessage = async () => {
		axios.post(MESSAGE_ENPOINT);
	};
	const registerForPushNotificationsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		if (status !== 'granted') {
			return;
		}
		let token = await Notifications.getExpoPushTokenAsync();
		alert(token);
		axios.post(PUSH_REGISTRATION_ENDPOINT, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			token: {
				value: token
			},
			user: {
				username: 'Chobby',
				name: 'Woobin Kim'
			}
		});
		await sendMessage();
		const notificationSubscription = Notifications.addListener(handleNotification);
	};
	useEffect(() => {
		registerForPushNotificationsAsync();
	}, []);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<WebView source={{ uri: 'http://www.samil.hs.kr/main.php' }} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: {
		backgroundColor: 'gray',
		width: 300,
		height: 50,
		color: 'white'
	}
});

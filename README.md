# Ngrok

```javascript
npm i -g ngrok
// ngrok 이란 자신의 로컬 서버를 퍼블릭 dns 로 바꾸어주는 패키지 이다.

ngrok http 3000 
// 매 실행마다 입력해주어 ./App.js
const PUSH_REGISTRATION_ENDPOINT
const MESSAGE_ENPOINT
// 의 엔드포인트 들을 나온 주소에 맞게 수정해주어야 한다
```

# WebView

```javascript
import {WebView} from 'react-native-webview'
<WebView source={{ uri: 'http://www.samil.hs.kr/main.php' }}/>
```
해당 웹뷰 페이지를 열어 모달창의 느낌을 준다.

# 토큰발급

```javascript
import { Notifications } from "expo";
// ---
let token = await Notifications.getExpoPushTokenAsync();
// Notifications.getExpoPushTokenAsync() 를 통하여 토큰을 발급받음
```

# EC2 인스턴스를 API 로 사용

### http://13.125.245.120:3000/
오늘 삼일상업 고등학교 식단표를 불러온다

<img src="./gitImages/todayLunch.PNG">

# 알람 전송

```javascript
{
    to,
    sound,
    title,
    body,
    data
}
// 가 들어있는 객체를
expo.chunkPushNotifications(객체)
// 로 넣어준 후
await expo.sendPushNotificationsAsync(객체)
// 로 쏘아준다면 to 에 들어있는 값에 해당하는 유저에게 알람이 간다.
```
<img src="./gitImages/sendAlarm.PNG">

<img src="./gitImages/Alarm.PNG">


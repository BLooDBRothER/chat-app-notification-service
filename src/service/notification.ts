import admin from "firebase-admin";

async function sendPushNotification(token: string, title: string, body: string, payload: object) {
    const message = {
        "notification": {
            title,
            body
        },
        android: {
            notification: {
              channel_id: 'default',
              tag: 'message',
            },
          },
        data: {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            type: 'MESSAGE',
            payload: JSON.stringify(payload)
        },
        token,
    };
    try {
        await admin.messaging().send(message);
    }
    catch (err) {
        console.log(`[Error]: FCM | Error while sending notification ${err}`);
    }
}

export default sendPushNotification;

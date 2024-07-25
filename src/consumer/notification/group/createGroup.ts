import GroupType from "@/model/group";
import UserType from "@/model/user";
import sendPushNotification from "@/service/notification";
import amqplib from "amqplib";

import { firestore } from "firebase-admin";

const createGroupNotification = async (queue: string, msg: amqplib.ConsumeMessage) => {

    console.log(`[Info]: RabbitMQ | Consuming Msg on the queue ${queue}...`);
    const { groupId } = JSON.parse(msg.content.toString());
    const groupDocument = await firestore().collection("groups").doc(groupId).get();
    const groupData = groupDocument.data() as GroupType;

    const userIds = groupData.pending_request;

    userIds.forEach(async userId => {
        const userDocument = await firestore().collection("users").doc(userId).get();
        const userData = userDocument.data() as UserType;

        const title = `New Project! - ${groupData.name}`;
        const body = `Hey ${userData.username}! You have been requested to join the new project`;

        const msgPayload = {
            type: queue,
            groupId
        }

        sendPushNotification(userData.fcmToken, title, body, msgPayload);
    })

}


export default createGroupNotification;

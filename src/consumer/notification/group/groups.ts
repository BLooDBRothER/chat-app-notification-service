import GroupType from "@/model/group";
import UserType from "@/model/user";
import sendPushNotification from "@/service/notification";
import amqplib from "amqplib";

import { firestore } from "firebase-admin";

const GroupNotification = () => {

    const createGroupNotification = async (queue: string, msg: amqplib.ConsumeMessage) => {
        console.log(`[Info]: RabbitMQ | Consuming Msg on the queue ${queue} | ${msg.content.toString()}`);

        const { groupId } = JSON.parse(msg.content.toString());

        const groupDocument = await firestore().collection("groups").doc(groupId).get();
        const groupData = groupDocument.data() as GroupType;
    
        const userIds = groupData.pendingRequest;
    
        userIds.forEach(async userId => {
            const userDocument = await firestore().collection("users").doc(userId).get();
            const userData = userDocument.data() as UserType;
    
            const title = `New Group! - ${groupData.name}`;
            const body = `Hey ${userData.username}! You have been requested to join the - ${groupData.name}`;
    
            const msgPayload = {
                type: queue,
            }
    
            sendPushNotification(userData.fcmToken, title, body, msgPayload);
        });
    }

    const userAcceptGroupNotification = async (queue: string, msg: amqplib.ConsumeMessage) => {
        console.log(`[Info]: RabbitMQ | Consuming Msg on the queue ${queue} | ${msg.content}`);
        
        const { groupId, userId: acceptedUserId } = JSON.parse(msg.content.toString());

        const groupDocument = await firestore().collection("groups").doc(groupId).get();
        const groupData = groupDocument.data() as GroupType;

        const userDocument = await firestore().collection("users").doc(acceptedUserId).get();
        const acceptedUserData = userDocument.data() as UserType;

        const userIds = [...groupData.admin, ...groupData.users];
    
        userIds.forEach(async userId => {
            if(userId === acceptedUserId) {
                return;
            }

            const userDocument = await firestore().collection("users").doc(userId).get();
            const userData = userDocument.data() as UserType;
    
            const title = `Hurray Guess who joined!`;
            const body = `Welcome ${acceptedUserData.username}! to the ${groupData.name}`;

            const msgPayload = {
                type: queue,
                msgData: {
                    groupId
                }
            }
    
            sendPushNotification(userData.fcmToken, title, body, msgPayload);
        });
    }

    return { createGroupNotification, userAcceptGroupNotification };
}


export default GroupNotification;

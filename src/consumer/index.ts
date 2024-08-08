import rabbitMq from "@/rabbitMq/rabbitMq";
import { QUEUE } from "@/constants/rabbitMq";
import GroupNotification from "./notification/group/groups";

const groupNotification = GroupNotification();

const initAllConsumers = async () => {
    const consumers = {
        [QUEUE.GROUP_CREATE]: groupNotification.createGroupNotification,
        [QUEUE.USER_GROUP_ACCEPT]: groupNotification.userAcceptGroupNotification
    }

    await rabbitMq.initConnection();

    Object.entries(consumers).forEach(([queue, consumerCallback]) => {
        rabbitMq.receiveMessage(queue, consumerCallback);
    })

}

export default initAllConsumers;

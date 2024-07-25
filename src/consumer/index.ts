import rabbitMq from "@/rabbitMq/rabbitMq";
import createGroupNotification from "./notification/group/createGroup";
import { QUEUE } from "@/constants/rabbitMq";

const initAllConsumers = async () => {
    const consumers = {
        [QUEUE.GROUP_CREATE]: createGroupNotification,
    }

    await rabbitMq.initConnection();

    Object.entries(consumers).forEach(([queue, consumerCallback]) => {
        rabbitMq.receiveMessage(queue, consumerCallback);
    })

}

export default initAllConsumers;

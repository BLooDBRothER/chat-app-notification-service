import amqplib, { credentials } from "amqplib";
import { error } from "console";

const RabbitMQ = () => {
    let _channel: amqplib.Channel ;

    enum QUEUE {
        "GROUP_CREATE" = "GROUP_CREATE"
    }

    const initConnection = async () => {
        if(_channel) {
            return;
        }

        if(!process.env.RABBITMQ_DEFAULT_USER || !process.env.RABBITMQ_DEFAULT_PASS) {
            throw error("No credential for rabbitmq")
        }

        const connection = await amqplib.connect("amqp://localhost", {
            credentials: credentials.plain(process.env.RABBITMQ_DEFAULT_USER, "admin"),
        });

        console.log(`[Info]: RabbitMQ | Connected...`);

        _channel = await connection.createChannel();
    }

    const receiveMessage = async (queue: string, callback: (queue: string, data: amqplib.ConsumeMessage) => void) => {
        console.log(`[Info]: RabbitMQ | Attaching to queue ${queue}...`);

        await _channel.assertQueue(queue, {
            durable: true
        });

        _channel.consume(
            queue,
            function (msg) {
                if (!msg) {
                    return;
                }
                callback(queue, msg);
            },
            {
                noAck: true,
            },
        );
    }

    return { QUEUE, initConnection, receiveMessage }
};

const rabbitMq = RabbitMQ();

export default rabbitMq;

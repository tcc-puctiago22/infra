const { Kafka } = require("kafkajs")
require('dotenv').config()

const {
    KAFKA_CLIENTID,
    KAFKA_TOPIC_EMAIL,
    KAFKA_TOPIC_SCHEDULE,
    KAFKA_PARTITIONS,
    KAFKA_BROKERS_HOST_1,
    KAFKA_BROKERS_HOST_PORT_1
} = process.env;


const payload = { clientId: KAFKA_CLIENTID, brokers: [KAFKA_BROKERS_HOST_1.concat(":").concat(KAFKA_BROKERS_HOST_PORT_1)] };
const kafka = new Kafka(payload)
const admin = kafka.admin()

console.log(payload)

// check kafkaup http://localhost:19000/
const adminConect = async () => {
    await admin.connect();
}


const listTopic = async () => {
    return await admin.listTopics()
}

const createTopics = async () => {

    await admin.createTopics({
        topics: [{
            topic: KAFKA_TOPIC_EMAIL,
            "numPartitions": KAFKA_PARTITIONS
        }],
    })

    return await admin.createTopics({
        topics: [{
            topic: KAFKA_TOPIC_SCHEDULE,
            "numPartitions": KAFKA_PARTITIONS
        }],
    })

};


const init = async () => {

    try {
        
        let list = await listTopic();
        console.log(list)

        if (list.length == 0) {
            await createTopics();
        }

        process.exit(0)

    } catch (error) {
        console.error(error);
        process.exit(0)

    }
}


init();

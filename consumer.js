const { kafka } = require("./client");
const groupId = process.argv[2];

const TOPICS = ["rider-updates"];
// const groupId = "user-1";

async function init() {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  await consumer.subscribe({ topics: TOPICS, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(`${groupId}: [${topic}]: PART:${partition}: `, message.value.toString());
    },
  });
}

init();

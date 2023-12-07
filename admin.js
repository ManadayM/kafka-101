const { kafka } = require("./client");

const TOPIC = "rider-updates";

async function init() {
  const admin = kafka.admin();

  console.log("Admin is connecting.");
  await admin.connect();
  console.log("Admin connection established.");

  console.log(`Creating Topic [${TOPIC}]`);
  await admin.createTopics({
    topics: [
      {
        topic: TOPIC,
        numPartitions: 2,
      },
    ],
  });

  console.log(`Topic [${TOPIC}] created successfully`);

  console.log("Admin is disconnecting.");
  await admin.disconnect();
}

init();

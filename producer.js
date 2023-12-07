const { kafka } = require("./client");
const readline = require("readline");

const TOPIC = "rider-updates";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer connected successfully");

  rl.setPrompt("> ");
  rl.prompt();
  
  rl.on("line", handleInput);
  rl.on("close", handleClose);

  async function handleInput(line) {
    const [riderName, location] = line.split(" ");

    await producer.send({
      topic: TOPIC,
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-updates",
          value: JSON.stringify({ name: riderName, loc: location }),
        },
      ],
    });
  }

  async function handleClose() {
    await producer.disconnect();
  }
}

init();

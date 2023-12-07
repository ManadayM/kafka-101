require('dotenv').config()
console.log(process.env)

const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "my-app",
  brokers: [`${process.env.IP}:${process.env.KAFKA_PORT}`],
});

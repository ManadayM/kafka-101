# Kafka 101

## Prerequisite

- Node.js
- Docker
- VS Code

## Setup

- Start Zookeeper Container

```bash
docker run -p 2181:2181 zookeeper
```

- Start Kafka Container using the following command. Replace `<PRIVATE_IP>` with your IP address.

```bash
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

## Run the app

### Admin (`admin.js`)
Kafka admin setups `Topic` and `Partitions`. Run the following command to setup Kafka topic.

```shell
node admin.js
```

### Consumer (`consumer.js`)

Kafka `Consumer` subscribes to a `Topic`.

```bash
# Here, "user-1" is a group id of Kafka Consumer Group.
node consumer.js user-1
```

Executing this command in 2 terminal windows will register 2 consumers on the `user-1` consumer group. As we have 2 partitions configured, each consumer will have access to one partition only.

```bash
node consumer.js user-2
```

Executing this command in a terminal window will register a single consumer on the `user-2` consuer group. However, this time consumer will have access to events from both the partitions as there's only one consumer against 2 partitions.

### Producer (`producer.js`)

Running the following command will show a newline prompt.

```bash
node producer.js 
```

Enter the following sample input and observe the events being logged on the consumer's side (consumer's terminal window).

```bash
> tony north
> johny south
> andrew north
```

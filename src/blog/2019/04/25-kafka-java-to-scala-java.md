---
title: Kafka - java to scala - java
date: 2019-04-25 12:14 +0200
tags: kafka, java, producer, consumer
series: Kafka - java to scala
---

## Quick recap on aims

This series goes through conversion of java kafka clients to scala - step by step - hopefully learning other useful scala stuff on the way.

You will need to have the correct initial setup - see [the introduction](/2019/04/25/kafka-java-to-scala-introduction/)

## Basic Java clients

On the course one of the first things you develop is a basic consumer and producer in java. Here we will examine the provided solution examples for these two clients - as a basis to what we want to convert to scala later.

## Producer

Take a look inside the solution/basic-producer folder.

There is one main java file here - [BasicProducer.java](https://github.com/confluentinc/training-developer-src/blob/master/solution/basic-producer/src/main/java/clients/BasicProducer.java)

The main method does three main things:

```java
Properties settings = new Properties();
settings.put("client.id", "basic-producer-v0.1.0");
settings.put("bootstrap.servers", "kafka:9092");
settings.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
settings.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
```

This sets up the configuration of the kafka producer that we want an says we are working with records that use String both as key and value.

```java
final KafkaProducer<String, String> producer = new KafkaProducer<>(settings);
```

This creates the producer with the supplied configuration.

```java
final String topic = "hello-world-topic";

for(int i=1; i<=5; i++){
    final String key = "key-" + i;
    final String value = "value-" + i;
    final ProducerRecord<String, String> record = new ProducerRecord<>(topic, key, value);
    producer.send(record);
}
```

This posts 5 messages to the topic `hello-world-topic`

### Running the producer

If you have a recent gradle already installed then you can simply run `gradle build` in the solutions/basic-producer folder.

If not - you can use gradle in docker to build (use a gradle container and mount the source as a volume).

The build creates amongst other things a distribution directory.

Let's copy the distribution into the kafka node so that we can run it within the kafka network set up by docker-compose:

```shell
docker cp build/distributions/basic-producer.tar labs_kafka_1:/tmp
```

Now - let's get a shell in the same docker container:

```shell
docker exec -it labs_kafka_1 /bin/bash
```

And finally - let's extract and run the producer:

```shell
cd /tmp
tar xf basic-producer.tar
cd basic-producer
bin/basic-producer
```

The output isn't wildly exciting:

```
*** Starting Basic Producer ***
### Stopping Basic Producer ###
```

So - let's see if we can see what was added to the topic using a consumer.

## Consumer

Take a look inside the solution/basic-consumer folder.

There is one main java file here - [BasicConsumer.java](https://github.com/confluentinc/training-developer-src/blob/master/solution/basic-consumer/src/main/java/clients/BasicConsumer.java)

The main method does three main things:

```java
Properties settings = new Properties();
settings.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");
settings.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "true");
settings.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, "1000");
settings.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
settings.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
settings.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
```

This sets up the configuration of the kafka consumer that we want an says we are working with records that use String both as key and value.

```java
KafkaConsumer<String, String> consumer = new KafkaConsumer<>(settings);
```

This creates the consumer with the supplied configuration.

```java
consumer.subscribe(Arrays.asList("hello-world-topic"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records)
        System.out.printf("offset = %d, key = %s, value = %s\n",    record.offset(), record.key(), record.value());
}
```

This subscribes to the topic `hello-world-topic` and prints out whatever it finds there.

### Running the consumer

Build with `gradle build` in the solutions/basic-consumer folder.

Copy the distribution into the kafka node so that we can run it within the kafka network set up by docker-compose:

```shell
docker cp build/distributions/basic-consumer.tar labs_kafka_1:/tmp
```

Now - let's get a shell in the same docker container:

```shell
docker exec -it labs_kafka_1 /bin/bash
```

And finally - let's extract and run the consumer:

```shell
cd /tmp
tar xf basic-consumer.tar
cd basic-consumer
bin/basic-consumer
```

The output now shows the messages that the basic producer sent to the topic:

```
*** Starting Basic Consumer ***
offset = 0, key = key-1, value = value-1
offset = 1, key = key-2, value = value-2
offset = 2, key = key-3, value = value-3
offset = 3, key = key-4, value = value-4
offset = 4, key = key-5, value = value-5
```

Since the consumer listens until interrupted - break out with Ctrl-C.

## Summary

So - we have now a basic consumer and producer in java. Our next step will be a basic scala variant.
---
title: Kafka - java to scala - akka streams kafka
date: 2019-05-15 12:10 +0200
tags: scala, akka, akka streams, kafka, producer, consumer
series: Kafka - java to scala
---

This series goes through conversion of java kafka clients to scala - step by step - hopefully learning other useful scala stuff on the way.

In the [last post](/2019/05/08/kafka-java-to-scala-akka-streams-basics/) we took a look at akka streams in general.

Let's apply that to our producer and consumer.

We'll start with the same project setup as we used in [the configuration project](/2019/05/03/kafka-java-to-scala-scala-v2/).

There are two changes to `build.sbt`:

- Set the `name` to `akka-streams-producer`/`akka-streams-consumer` as appropriate
- Add the dependency `"com.typesafe.akka" %% "akka-stream-kafka" % "1.0.3"`

The project directory (assembly.sbt and build.properties) are the same as before.

The src/main/resources/logback.xml is also the same.

The src/main/resources/application.conf files are very similar. We change the client/group IDs, the topic and we remove the serializer/deserializer. The reason for this is that the typing of the message would require a lot of changes in code to match so doesn't really need to be a configurable.

## Config

### Producer

```
bootstrap-servers = "kafka:9092"
topic = "akka-streams-topic"
```

### Consumer

```
client-id = "akka-streams-consumer"
group-id = "akka-streams-consumer"
bootstrap-servers = "kafka:9092"
topic = "akka-streams-topic"
enable-auto-commit = "true"
auto-commit-interval-ms = "1000"
auto-offset-reset = "earliest"
```

## Code

OK - so how does the code look now?

### Producer

We still have a config case class and we still load the config with pureconfig (note - the kafka libraries for akka-streams can read application.conf themselves if you format it for them - see [producer](https://doc.akka.io/docs/alpakka-kafka/current/producer.html#settings) and [consumer](https://doc.akka.io/docs/alpakka-kafka/current/consumer.html#settings) documentation).

However - once we have a configuration - we change the code to look something like this:

```scala
      println("*** Starting Producer ***")

      implicit val sys = ActorSystem()
      implicit val mat = ActorMaterializer()

      val keySerializer = Serdes.String().serializer()
      val valueSerializer = Serdes.Integer().serializer().asInstanceOf[Serializer[Int]]

      val producerSettings = ProducerSettings(sys, keySerializer, valueSerializer)
        .withBootstrapServers(config.bootstrapServers)

      Source
        .fromIterator(() => (0 to 10000).toIterator)
        .map(i => i * 2)
        .map { i =>
          ProducerMessage.Message(new ProducerRecord[String, Int](config.topic, i), i)
        }
        .via(Producer.flexiFlow(producerSettings))
        .runWith {
          Sink.foreach(res => println(s"Wrote ${res.passThrough} to ${config.topic}"))
        }
```

Here - we set up our implicit requirements for our akka system. We then get the key and value serializers from the Serdes package (serializer/deserializer).

The next step is to build a settings object. For the producer that's simple - it takes a system and serializers and then we set the bootstrap server. We have no other options we want to set here - but we could add them (we'll see this in the consumer shortly).

Finally we set up our akka stream:

- Source: an akka streams source that is the sequence of integers from 0 to 10000
- Flow: doubles the value
- Flow: creates a producer message with a record of [String, Int]
- Flow: send the message to the producer which sends it to kafka
- Sink: consume each response from kafka and print what was done

### Consumer

Again - the consumer is very similar up to the point we have successfully loaded a config.

Once we have that then the code looks something like this:

```scala
      println("*** Starting Basic Consumer ***")

      implicit val sys = ActorSystem()
      implicit val mat = ActorMaterializer()

      val keyDeserializer = Serdes.String().deserializer()
      val valueDeserializer = Serdes.Integer().deserializer().asInstanceOf[Deserializer[Int]]

      val consumerSettings =
        ConsumerSettings(sys, keyDeserializer, valueDeserializer)
          .withBootstrapServers(config.bootstrapServers)
          .withProperties(
            AUTO_OFFSET_RESET_CONFIG -> config.autoOffsetReset,
            ENABLE_AUTO_COMMIT_CONFIG      -> config.enableAutoCommit,
            AUTO_COMMIT_INTERVAL_MS_CONFIG -> config.autoCommitIntervalMs
          )
          .withGroupId(config.groupId)
          .withClientId(config.clientId)

      val subscription = Subscriptions.topics(Set(config.topic))

      Consumer
        .plainSource[String, Int](consumerSettings, subscription)
        .map(msg => msg.value())
        .runForeach(w => println(s"Consumed message with value $w"))
```

Here - we again set up our implicit requirements for our akka system. We then get the key and value deserializers from the Serdes package (serializer/deserializer).

The next step is to build a settings object. For the consumer - it also takes a system and deserializers and then we set the bootstrap server. We also want to set some other properties - which we do with a call to withProperties. Finally we set the group id.

Now we can define our subscription then set up the following akka stream:

- Source: a kafka implementation of an akka stream source that will read the kafka topic messages based on the configuration and subscription definition
- Flow: extracts only the value
- Sink: print what was seen

### Build and Run

For each client - we can check it compiles:

```shell
sbt compile
```

Package it:

```shell
sbt assembly
```

Copy it into the container:

```shell
docker cp target/scala-2.12/akka-streams-producer-assembly-0.1.jar labs_kafka_1:/tmp
```

```shell
docker cp target/scala-2.12/akka-streams-consumer-assembly-0.1.jar labs_kafka_1:/tmp
```

Connect to the container in a shell:

```shell
docker exec -it labs_kafka_1 /bin/bash
```

Run the producer:

```shell
cd /tmp
java -jar akka-streams-producer-assembly-0.1.jar
```

This should give the following output:

```
*** Starting Producer ***
Wrote 0 to akka-streams-topic
Wrote 2 to akka-streams-topic
...
Wrote 19998 to akka-streams-topic
Wrote 20000 to akka-streams-topic
```

And then the consumer:

```shell
java -jar akka-streams-consumer-assembly-0.1.jar
```

This should give the following output (offsets may vary if you have the same docker instances as earlier or have removed and re-started them):

```
*** Starting Basic Consumer ***
Consumed message with value 0
Consumed message with value 2
...
Consumed message with value 19998
Consumed message with value 20000
```

## Summary

Moving to akka streams allows us to create our processing almost as a line by line recipe - and also handles the asynchronicity of the calls to the producer/consumer in an akka streams context.

In this case - each recipe is simple - but in more complex situations you can use composition to be able to keep the code simple to understand.

## Links

- [Producer project](https://github.com/chrissearle/kafka-java-to-scala/tree/master/akka-streams-kafka/producer)
- [Consumer project](https://github.com/chrissearle/kafka-java-to-scala/tree/master/akka-streams-kafka/consumer)

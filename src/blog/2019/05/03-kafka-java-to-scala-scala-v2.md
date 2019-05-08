---
title: Kafka - java to scala - scala v2 - config
date: 2019-05-03 11:33 +0200
tags: kafka, scala, producer, consumer, pureconfig
series: Kafka - java to scala
---

This series goes through conversion of java kafka clients to scala - step by step - hopefully learning other useful scala stuff on the way.

In the previous step we created a basic producer and consumer in scala but it was very close to a line by line conversion. Let's try for something that is closer to normal scala - and let's get the config values out to a configuration file.

## App boilerplate

First change - instead of having an object with a main method - let's actually state that it's an app.

```scala
object X {
    def main(args: Array[String]): Unit = {
        // Application code
    }
}
```

changes to

```scala
object X extends App {
    // Application code
}
```

## Pure Config

The config values are present in the code - let's do something about that.

For this we'll use the [PureConfig](https://pureconfig.github.io/) library.

### Dependency

We need to add the following to `build.sbt`:

```
  "com.github.pureconfig" %% "pureconfig" % "0.10.2"
```

This is added to the list of libraryDependencies that is already present.

### Configuration file

We can add our configuration values to a file under `src/main/resources` called `application.conf`.

#### Producer

```
client-id = "pureconfig-producer"
bootstrap-servers = "kafka:9092"
topic = "pureconfig-topic"
serializer = "org.apache.kafka.common.serialization.StringSerializer"
```

#### Consumer

```
group-id = "pureconfig-consumer"
bootstrap-servers = "kafka:9092"
topic = "pureconfig-topic"
deserializer = "org.apache.kafka.common.serialization.StringDeserializer"
enable-auto-commit = "true"
auto-commit-interval-ms = "1000"
auto-offset-reset = "earliest"
```

### Loading configuration

PureConfig can load the values into a matching case class.

#### Producer

```scala
case class Config(clientId: String,
                  bootstrapServers: String,
                  topic: String,
                  serializer: String)
```

#### Consumer

```scala
case class Config(groupId: String,
                  bootstrapServers: String,
                  enableAutoCommit: String,
                  autoCommitIntervalMs: String,
                  autoOffsetReset: String,
                  deserializer: String,
                  topic: String
                 )
```

### Loading successful?

We can choose how to handle a config load so that we know if the configuation was loaded OK or not.

One method we can call is `loadConfigOrThrow` which will throw an exception if it can't load the configuration.

```scala
val conf = pureconfig.loadConfigOrThrow[Config]
```

Another option is to just use loadConfig - this returns in effect an Either - where the left choice is ConfigReaderFailures and the right choice is configuration matching the case class asked for.

```scala
pureconfig.loadConfig[Config] match {
    case Left(errors) => ...
    case Right(config: Config) => ...
}
```

## Updated clients

We'll throw in some other small tidying up - this gives the following clients:

### Producer

```scala
package clients

import java.time.Duration
import java.util.Properties

import org.apache.kafka.clients.producer.ProducerConfig._
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerRecord}

import pureconfig.generic.auto._

case class Config(clientId: String,
                  bootstrapServers: String,
                  topic: String,
                  serializer: String) {

  def asProperties: Properties = {
    val props = new Properties()

    props.put(CLIENT_ID_CONFIG, clientId)
    props.put(BOOTSTRAP_SERVERS_CONFIG, bootstrapServers)
    props.put(KEY_SERIALIZER_CLASS_CONFIG, serializer)
    props.put(VALUE_SERIALIZER_CLASS_CONFIG, serializer)

    props
  }
}

object PureConfigProducer extends App {

  pureconfig.loadConfig[Config] match {
    case Left(errors) =>
      println(errors)
      System.exit(1)

    case Right(config: Config) =>
      println("*** Starting Basic Producer ***")

      val producer = new KafkaProducer[String, String](config.asProperties)

      (1 to 5).map { i =>
        val key = s"key-$i"
        val value = s"value-$i"

        val record = new ProducerRecord[String, String](config.topic, key, value)

        producer.send(record)
      }

      producer.close(Duration.ofMillis(100))

      println("### Stopping Basic Producer ###")
  }
}
```

### Consumer

```scala
package clients

import java.time.Duration
import java.util.Properties

import org.apache.kafka.clients.consumer.ConsumerConfig._
import org.apache.kafka.clients.consumer.KafkaConsumer

import scala.collection.JavaConverters._

import pureconfig.generic.auto._

case class Config(groupId: String,
                  bootstrapServers: String,
                  enableAutoCommit: String,
                  autoCommitIntervalMs: String,
                  autoOffsetReset: String,
                  deserializer: String,
                  topic: String
                 ) {
  def asProperties: Properties = {
    val props = new Properties()

    props.put(GROUP_ID_CONFIG, groupId)
    props.put(BOOTSTRAP_SERVERS_CONFIG, bootstrapServers)
    props.put(ENABLE_AUTO_COMMIT_CONFIG, enableAutoCommit)
    props.put(AUTO_COMMIT_INTERVAL_MS_CONFIG, autoCommitIntervalMs)
    props.put(AUTO_OFFSET_RESET_CONFIG, autoOffsetReset)
    props.put(KEY_DESERIALIZER_CLASS_CONFIG, deserializer)
    props.put(VALUE_DESERIALIZER_CLASS_CONFIG, deserializer)

    props
  }
}

object PureConfigConsumer extends App {
  pureconfig.loadConfig[Config] match {
    case Left(errors) =>
      println(errors)
      System.exit(1)

    case Right(config: Config) =>
      println("*** Starting Basic Consumer ***")

      val consumer = new KafkaConsumer[String, String](config.asProperties)

      try {
        consumer.subscribe(List(config.topic).asJava)

        while (true) {
          val records = consumer.poll(Duration.ofMillis(100)).asScala

          for (record <- records) {
            println(s"offset = ${record.offset}, key = ${record.key}, value = ${record.value}")
          }
        }
      } finally {
        consumer.close()
      }

  }
}
```

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
docker cp target/scala-2.12/pureconfig-producer-assembly-0.1.jar labs_kafka_1:/tmp
```
```shell
docker cp target/scala-2.12/pureconfig-consumer-assembly-0.1.jar labs_kafka_1:/tmp
```

Connect to the container in a shell:

```shell
docker exec -it labs_kafka_1 /bin/bash
```

Run the producer:

```shell
cd /tmp
java -jar pureconfig-producer-assembly-0.1.jar
```

This should give the following output:

```
*** Starting Basic Producer ***
### Stopping Basic Producer ###
```

And then the consumer:

```shell
java -jar pureconfig-consumer-assembly-0.1.jar
```

This should give the following output (offsets may vary if you have the same docker instances as earlier or have removed and re-started them):

```
offset = 5, key = key-1, value = value-1
offset = 6, key = key-2, value = value-2
offset = 7, key = key-3, value = value-3
offset = 8, key = key-4, value = value-4
offset = 9, key = key-5, value = value-5
```

## Summary

In this step we tidied up the producer and consumer a little and moved our configuration out to a config file.

## Links

* [Producer project](producer.tar.gz)
* [Consumer project](consumer.tar.gz)


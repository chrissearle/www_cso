---
title: Kafka - java to scala - scala v1
date: 2019-04-30 12:08 +0200
tags: kafka, scala, producer, consumer
series: Kafka - java to scala
---

## Quick recap on aims

This series goes through conversion of java kafka clients to scala - step by step - hopefully learning other useful scala stuff on the way.

In the previous step we created a basic producer and consumer in java. Let's try for a direct conversion (almost line by line) to scala as a first step.

## Producer

### Project Structure

Scala uses sbt instead of gradle.

First we create the project structure.

Create an empty directory as the root for this project.

#### build.sbt

Now - add a file called `build.sbt` - this defines the dependencies etc.

```scala
name := "basic-producer"

version := "0.1"

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(
  "org.apache.kafka" % "kafka-clients" % "2.2.0",
  "ch.qos.logback" % "logback-classic" % "1.2.3",
  "ch.qos.logback" % "logback-core" % "1.2.3",
)
```

#### project/build.properties

Create a directory called project and inside that a file called `build.properties` - this will configure which sbt version we want to use.

```
sbt.version=1.2.8
```

#### project/assembly.sbt

The java project used the gradle application plugin to build the deliverable with dependencies etc. We'll use the scala assembly plugin for the same reason. The file `assembly.sbt` also lives in the project directory beside the build.properties file.

```
addSbtPlugin("com.eed3si9n" % "sbt-assembly" % "0.14.9")
```

### Project Code

Create the source and resources directories:

```shell
mkdir -p src/main/scala/clients
mkdir -p src/main/resources
```

In resources we have one file - the logback configuration `logback.xml`. It will just dump warn and above to STDOUT.

```xml
<configuration>
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} TKD [%thread] %-5level %logger{36} - %msg%n
      </pattern>
    </encoder>
  </appender>

  <root level="warn">
    <appender-ref ref="STDOUT" />
  </root>
</configuration>
```

#### Scala producer

Now for the actual scala code.

We'll create BasicProducer.scala in the src/main/scala/clients directory.

```scala
package clients

import java.time.Duration
import java.util.Properties

import org.apache.kafka.clients.producer.ProducerConfig.{BOOTSTRAP_SERVERS_CONFIG, CLIENT_ID_CONFIG, KEY_SERIALIZER_CLASS_CONFIG, VALUE_SERIALIZER_CLASS_CONFIG}
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerRecord}
import org.apache.kafka.common.serialization.StringSerializer

object BasicProducer {

  def main(args: Array[String]): Unit = {

    println("*** Starting Basic Producer ***")

    val settings = new Properties()

    settings.put(CLIENT_ID_CONFIG, "basic-producer")
    settings.put(BOOTSTRAP_SERVERS_CONFIG, "kafka:9092")
    settings.put(KEY_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getCanonicalName)
    settings.put(VALUE_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getCanonicalName)

    val producer = new KafkaProducer[String, String](settings)

    val topic = "basic-topic"

    for (i <- 1 to 5) {
      val key = "key-" + i
      val value = "value-" + i

      val record = new ProducerRecord[String, String](topic, key, value)

      producer.send(record)
    }

    producer.close(Duration.ofMillis(100))

    println("### Stopping Basic Producer ###")

  }
}
```

If you compare this to the java version - this is almost line for line the same code.

Let's make sure it compiles:

```shell
sbt compile
```

And then - let's create the deliverable - the assembly plugin will create a fat jar for us.

```shell
sbt assembly
```

The jar file is created under target/scala-2.12/basic-producer-assembly-0.1.jar - we need to copy this into the docker container:

```shell
docker cp target/scala-2.12/basic-producer-assembly-0.1.jar labs_kafka_1:/tmp
```

Now - let's get a shell in the same docker container:

```shell
docker exec -it labs_kafka_1 /bin/bash
```

And finally - let's run the producer:

```shell
cd /tmp
java -jar basic-producer-assembly-0.1.jar
```

The output here is almost the same as for the java - apart from one log line (since we've configured logback):

```
*** Starting Basic Producer ***
09:02:35.258 TKD [kafka-producer-network-thread | basic-producer] WARN  o.apache.kafka.clients.NetworkClient - [Producer clientId=basic-producer] Error while fetching metadata with correlation id 1 : {basic-topic=LEADER_NOT_AVAILABLE}
### Stopping Basic Producer ###
```

The warning there is coming from the process of the topic being autocreated on the first call - if we had created the topic before running this code then it would not have shown that warning.

## Consumer

### Project Structure

We will use almost the same project structure for the consumer as for the producer.

Create an empty directory as the root for this project.

#### build.sbt

The only difference in build.sbt is the name:

```scala
name := "basic-consumer"
```

#### project

`project/build.properties` and `project/assembly.sbt` are the same as for producer.

### Project Code

Create the same source and resources directories:

```shell
mkdir -p src/main/scala/clients
mkdir -p src/main/resources
```

In resources we have the same logback.xml configuration file.

#### Scala consumer

Now for the actual scala code.

We'll create BasicConsumer.scala in the src/main/scala/clients directory.

```scala
package clients

import java.time.Duration
import java.util.Properties

import org.apache.kafka.clients.consumer.ConsumerConfig._
import org.apache.kafka.clients.consumer.KafkaConsumer
import org.apache.kafka.common.serialization.StringDeserializer

import scala.collection.JavaConverters._

object BasicConsumer {

  def main(args: Array[String]): Unit = {

    println("*** Starting Basic Consumer ***")

    val settings = new Properties()

    settings.put(GROUP_ID_CONFIG, "basic-consumer-v0.1.0")
    settings.put(BOOTSTRAP_SERVERS_CONFIG, "kafka:9092")
    settings.put(ENABLE_AUTO_COMMIT_CONFIG, "true")
    settings.put(AUTO_COMMIT_INTERVAL_MS_CONFIG, "1000")
    settings.put(AUTO_OFFSET_RESET_CONFIG, "earliest")
    settings.put(KEY_DESERIALIZER_CLASS_CONFIG, classOf[StringDeserializer])
    settings.put(VALUE_DESERIALIZER_CLASS_CONFIG, classOf[StringDeserializer])

    val consumer = new KafkaConsumer[String, String](settings)

    val topic = "basic-topic"

    try {
      consumer.subscribe(List(topic).asJava)

      while (true) {
        val records = consumer.poll(Duration.ofMillis(100))

        for (record <- records.asScala) {
          println(s"offset = ${record.offset}, key = ${record.key}, value = ${record.value}")
        }
      }
    } finally {
      consumer.close()
    }
  }
}
```

If you compare this to the java version - this is again doing the same thing as the java consumer code.

Let's make sure it compiles:

```shell
sbt compile
```

And then - let's create the deliverable - the assembly plugin will create a fat jar for us.

```shell
sbt assembly
```

The jar file is created under target/scala-2.12/basic-consumer-assembly-0.1.jar - we need to copy this into the docker container:

```shell
docker cp target/scala-2.12/basic-consumer-assembly-0.1.jar labs_kafka_1:/tmp
```

Now - let's get a shell in the same docker container:

```shell
docker exec -it labs_kafka_1 /bin/bash
```

And finally - let's run the consumer:

```shell
cd /tmp
java -jar basic-consumer-assembly-0.1.jar
```

The output here is almost the same as for the java:

```
*** Starting Basic Consumer ***
offset = 0, key = key-1, value = value-1
offset = 1, key = key-2, value = value-2
offset = 2, key = key-3, value = value-3
offset = 3, key = key-4, value = value-4
offset = 4, key = key-5, value = value-5
```

## Summary

In this step we converted the producer and consumer to scala.

So far all that has done is to make this a little harder for java coders to understand :)

But moving forward we'll look at improving the code, better scala, akka, streams etc etc.

## Links

* [Producer project](producer.tar.gz)
* [Consumer project](consumer.tar.gz)



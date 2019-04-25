---
title: Kafka - java to scala - introduction
date: 2019-04-25 12:02 +0200
tags: kafka, java, scala
series: Kafka - java to scala
---

## Background

I was recently a participant on a [Confluent on-premesis kafka course](https://www.confluent.io/training/). While working through the labs (which are in java), for fun I tried the same code in kotlin. That was fun - but I thought it could be a nice exercise to convert from java to scala - step by step - and maybe learn some new scala stuff on the way. It will assume some level of kafka knowledge - what is a producer, consumer, topic etc.

It is written from my viewpoint - someone who has played with scala, likes it, but has never really had time to get into it - so this will be somewhat of a discovery journey for me too.

We'll start with some information on how to get setup - then over a series of posts - test some java code, convert it to scala and then add more to it.

## Initial setup

Firstly you will need the lab code - we'll be using the java suggested solutions provided by confluent as the starting point.

Clone this git repo: https://github.com/confluentinc/training-developer-src.git

## Docker

We will also use the lab docker setup to run kafka and the other systems that we will be using so you will need docker up and running.

In the repo just cloned in the labs directory there is a docker-compose.yml file - to start the system:

    docker-compose up -d

Make sure you have a good amount of memory available to docker - 4-5 Gb minimum :)

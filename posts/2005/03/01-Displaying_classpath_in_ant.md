---
title: Displaying classpath in ant
date: 2005-03-01 12:43:35 +0100
tags: java, ant
---

Something I always forget :-)

Given

    <path id="class.path">

use

    <property name="cp" refid="class.path"/>
    <echo message="Classpath is ${cp}"/>

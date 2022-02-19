---
title: Mac OSX VPN DNS
date: 2020-01-09 12:12 +0100
tags: mac, osx, vpn, dns
---

When you connect your OSX mac to a VPN using the inbuilt VPN setup - as long as you get the service order correct it should pick up the DNS servers. But it often doesn't.

I've tried lots of articles on the net about this - restarting different processes, changing different configurations - sometimes they work, sometimes they don't (and the ones that worked often don't work the next time).

The script on [this post](https://serverfault.com/questions/274882/cant-resolve-host-through-vpn-connection-from-mac-os-x/660309#660309) is so far the only way I have found to reliably get a DNS lookup to work.

Just in case the post is unavailable in future - here's a [local copy of the script](reset_dns) - just remember to replace the VPN name with your VPN name.

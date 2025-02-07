---
date: '2012-03-11'
layout: post
tags: null
title: Stack Overflow, stop blocking me
---

![](/static/img/blog/stackblock.png)

Seriously, Stack Overflow, WTF?

For three days now, at PyCon2012, I can't browse any Stack Overflow / Stack
Exchange page. Why? All the wireless networks here at the conference are
unencrypted. Connecting without passing through a secure connection (VPN/SSH
tunnel) is an endeavor I would recommend to no one. Riding an open wireless
network [bareback](http://www.urbandictionary.com/define.php?term=bareback)?
No way.

So, I use [the amazing sshuttle](http://blog.y3xz.com/blog/2011/05/22/poor-
mans-vpn/) which is routed to one of my servers on Amazon EC2. But guess what?
[Stack Exchange blocks all incoming traffic from EC2](http://meta.stackoverflow.com/questions/116109/amazon-web-services-ip-blocks-filtering). Why? Supposedly, to prevent screen-scraping bots.

Now, I'm not intimate with SO/SE's traffic patterns, and I'm sure they are
highly susceptible to content farm scraper bots. But blocking all EC2 IPs is
the most stupid way to do this that anyone can think of. Real scraper bots
that depend on content mining will easily find other IPs to access SO/SE from.

Newsflash - I (and other legit VPN users) don't have a spare bank of public
IPs or VPN endpoints.

A simple solution would be to easily rate limit requests per _any_ IP to a
reasonable rate that normal users would never notice (say, 5 requests/sec).

Until Stack Overflow / Stack Exchange implements a better way of blocking
scrape-bots without blocking legit users - I'll continue to suffer anytime I'm
not under a secure wireless network.
---
categories: null
comments: true
date: '2014-04-24'
title: Feeding data to flightradar24.com
---

I finally got a nice [ADS-B](https://en.wikipedia.org/wiki/Automatic_dependent_surveillance-broadcast) setup working, where I'm also feeding all my data to [flightradar24.com](http://flightradar24.com). Here are some of the technical details on the setup.

## RTL-SDR on TL-WR703n
The receiving endpoint is naturally based on an RTL-SDR dongle. I've grown to like the small form factor dongles, based on the R820T tuner (such as [this one](http://www.ebay.com/itm/NEW-SALE-MINI-RTL-SDR-FM-DAB-DVB-T-Dongle-Stick-RTL2832-R820T-HOT-US-BB-/310851716997)).

As for the host device, I have two requirements for it: it has to be small enough so I can stash it somewhere without getting in the way, and it has to be power efficient. There's no reason to power a hundred watt device just for powering a single dongle.

The obvious choice is to to with the trusty [TL-WR703n](http://wiki.openwrt.org/toh/tp-link/tl-wr703n), of which by now I have a handful waiting to be used for various projects at any given time. It is installed with OpenWrt, with the wireless connections set to 'station' mode, and connected to my regular home WLAN.

![](/static/img/blog/1090setup.jpg)

The software running is [dump1090](https://github.com/antirez/dump1090/), which is an extremely lightweight ADS-B decoder for RTL-SDR, it runs flawlessly on the WR703n. If you're running OpenWrt Barrier Breaker (i.e. trunk) you can install `librtlsdr`  and `dump1090` from opkg, and [Steve Markgraf has also compiled .ipks for Attitude Adjustment](https://steve-m.de/projects/rtl-sdr/openwrt/packages/).)

Unfortunately, `dump1090` doesn't have a daemon mode out of the box, but it's pretty damn easy to hack up a `screen`-based init script:

```bash
#!/bin/sh /etc/rc.common

START=95

start() {
    screen -S dump1090 -d -m -L dump1090 --net >> /dev/null
}

stop() {
    screen -r dump1090 -X quit
}
```

Note that I'm just using the `--net` flag and piping all output to `/dev/null`. This is because I only care about the network ports sending the right data, and I don't want any output being logged to `screen` and filling up the precious flash space on the device.

## Antenna

![](/static/img/blog/1090ant.jpg)

The antenna I'm currently using is a plain simple quarter-wavelength ground plane antenna, created by sticking a copper wire in the central lead of an N connector, and 4 more wires as ground, on each of the screw holes. From there I have a pigtail cable with an N connector on one side, and an RP-SMA on the other. Another adapter is needed to convert from RP-SMA to MCX on the small dongle.

The plan is to mount this antenna on the roof of my building, but I haven't gotten to that yet, so it's just resting on my balcony. Even though I have significant interference from nearby buildings (which should be resolved once it goes on the roof), I'm able to receive all traffic in my vicinity of ~30NM, and in certain directions I am able to receive targets up to 130NM away.

## Feeder software
The feeder software running is [the official linux feeder](http://forum.flightradar24.com/threads/4270-Linux-feeder-software-for-Flightradar24) for flightradar24.com. Unfortunately, there are no builds for any OpenWrt device just yet, and the code closed-source. So what I'm doing is running it as a daemon on one of my remote VPS machines, with the following flags:

```bash
$ fr24feed_x64_241 --fr24key=MY_SHARING_KEY --bs-ip=MY_HOME_STATIC_IP --bs-port=MY_PORT_NUM
```

This will go to my home IP, to a random port number which is forwarded to port 30003 on the WR703n, and pull the data directly from dump1090, which spews out messages in BaseStation format, ready for the feeder software to digest:

```
MSG,3,,,06A065,,,,,,,33000,,,30.33963,34.27800,,,0,0,0,0
MSG,8,,,7415A3,,,,,,,,,,,,,,,,,
MSG,6,,,738484,,,,,,,,,,,,,5051,0,0,0,0
MSG,6,,,7415A3,,,,,,,,,,,,,6130,0,0,0,0
MSG,8,,,738505,,,,,,,,,,,,,,,,,
MSG,8,,,738484,,,,,,,,,,,,,,,,,
MSG,3,,,06A065,,,,,,,33000,,,30.33788,34.27880,,,0,0,0,0
MSG,4,,,738484,,,,,,,,237,299,,,-1536,,0,0,0,0
```
---
categories: null
comments: true
date: '2012-12-02'
layout: post
title: A Primer on Cheap Software Defined Radios
---

I've always been fascinated by radio. I clearly remember discovering [numbers stations](https://en.wikipedia.org/wiki/Numbers_station) at the age of 9 using my grandparent's old shortwave radio, and I was fascinated by the concept of stuff being broadcast over the air - discounting FM radio which was *ordinary*.

Actually, I've always wanted to buy a frequency scanner and learn more about radio, but never got around to actually doing so, something didn't feel right. Last week, the *right* thing I was waiting for was found - an open-source software stack and a $15 USB dongle turn my desktop computer into a [software defined radio](https://en.wikipedia.org/wiki/Software-defined_radio). Essentially, this means that anyone can, very cheaply, pull data out of thin air (literally), and analyze it using **code**.

Up until now, SDR could only be achieved using expensive equipment, and using proprietary drivers and software. The $15 SDR option is a serious breakthrough in making the SDR world more accessible. As with most new technologies, the open-source SDR world is still not very user-friendly, and in this post I'll try to outline the basic stuff a beginner should know when entering this world.

![](http://voltar.org/gnuradio/mixer_diagram.grc.png)

The basis for SDR is [GNU Radio](http://gnuradio.org/redmine/projects/gnuradio/wiki), which is an open source toolkit that provides all the necessary mathematical building blocks to begin implementing SDR. In essence, GNU Radio is a set of APIs that allow to build usable SDR programs. An important part of GNU Radio is the GNU Radio Companion which is a simple GUI that allows to connect various signal processing components into a single graph and generate code from it. The thing is that, for most basic cases, we don't really want to write the signal processing code ourselves.

Let's go back to the hardware part. Up until now, if you wanted to do SDR you had to use expensive receivers, such as the [Icom R2500](http://www.universal-radio.com/catalog/widerxvr/2500.html). Naturally, these proprietary products natively supported Windows PCs, and you could forget about Linux, not to mention seeing any code for the software or drivers. Granted, [USRP](https://en.wikipedia.org/wiki/Universal_Software_Radio_Peripheral) devices were much more open and accessible, but the hardware was still very expensive, and posed a high barrier of entry for novice users that just wanted to play around.

As it turns out, it's possible to use cheap DVT-B USB dongles (like [this](https://dx.com/p/mini-dvb-t-digital-tv-usb-2-0-dongle-with-fm-dab-remote-controller-844092096) one) and hack them into proper SDR receivers. [DVB-T](https://en.wikipedia.org/wiki/DVB-T) is a worldwide standard for digital TV broadcast, and apparently the cheap tuners that are manufactured en masse are just the thing we can use to do [*poor's man SDR*](http://thread.gmane.org/gmane.linux.drivers.video-input-infrastructure/44461/focus=44461).

The software that we use to handle the cheap dongles is [rtl-sdr](http://sdr.osmocom.org/trac/wiki/rtl-sdr) and is the core of the setup. Now, setting up the entire stack is the tricky part. The GNU Radio stack has *lots* of dependencies, both C and Python libs, and has no easy, cross-platform, way of setting up. I actually kind of gave up on my Mac setup, and took me several hours to get shit running on my Linux box. Other than throwing a bunch of links, I really don't have any better installation instructions that the ones out there. There will be lots of errors and dependency issues along the way, it's a matter of sifting through wikis and lots of Googling 'till something works. Here are some links that should cover most of what you'll need:

- [Installing GNU Radio](http://gnuradio.org/redmine/projects/gnuradio/wiki/InstallingGR)
- [Installing GNU Radio OsmoSDR](http://sdr.osmocom.org/trac/wiki/GrOsmoSDR)
- [Building rtl-sdr](http://sdr.osmocom.org/trac/wiki/rtl-sdr#Buildingthesoftware)
- [GNU Radio homebrew recipies](https://github.com/titanous/homebrew-gnuradio) (Mac OS X only, obviously)
- [rtl-sdr community subreddit](http://www.reddit.com/r/rtlsdr/)

Fortunately, all tools use standard autoconf and cmake toolchains, so the installation procedure for most packages will be similar. If all went well, at this point, we'll want to see the following test running smoothly:

```bash
$ rtl_test -t
Found 1 device(s):
  0:  ezcap USB 2.0 DVB-T/DAB/FM dongle

Using device 0: ezcap USB 2.0 DVB-T/DAB/FM dongle
Found Elonics E4000 tuner
Supported gain values (18): -1.0 1.5 4.0 6.5 9.0 11.5 14.0 16.5 19.0 21.5 24.0 29.0 34.0 42.0 43.0 45.0 47.0 49.0
Benchmarking E4000 PLL...
[E4K] PLL not locked for 51000000 Hz!
[E4K] PLL not locked for 2227000000 Hz!
[E4K] PLL not locked for 1114000000 Hz!
[E4K] PLL not locked for 1241000000 Hz!
E4K range: 52 to 2226 MHz
E4K L-band gap: 1114 to 1241 MHz
```

After getting the dongle and the drivers all setup we want to listen to some stuff! As I mentioned earlier, building various signal processing flows is totally beyond the scope for what we're trying to do, all we want is a simple tuner with some knobs to twist, and eventually hear some sound coming out the speakers. The most easiest receiver software I've found so far is [gqrx](http://www.oz9aec.net/index.php/gnu-radio/gqrx-sdr) ([also on Github](https://github.com/csete/gqrx)).

![](https://farm9.staticflickr.com/8027/7144857315_4632536298_z.jpg)

Gqrx is very easy to grok, even for beginners with no experience listening to the radio waves. Start off by picking a frequency that you know should be active, broadcast FM radio is the obvious choice here, and just tinker with the knobs until it sounds reasonable. Learn what the difference between AM and FM is. Learn how the FM filter works. Play with the squelch levels to silence the white noise on channels that aren't always active. From my experience, it takes a while to understand how everything comes together.

After playing around with broadcast FM, you can advance to other  transmissions: air traffic, ham radio, police and fire services, navigation beacons, GPS, GSM, POCSAG, P25. Each of these subjects is an entire post in and of itself.

The final point I want to make is that listening to radio waves has lots of nuances to it. The stock antenna shipped with the dongles is absolutely insufficient to receive anything other than strong signals. If you're serious in doing SDR, you'll have to invest time researching proper antenna setups and reducing noise.

Nonetheless, this cheap SDR setup is mind-blowing in how easy it can be to start playing around with stuff that used to be extremely expensive.
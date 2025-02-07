---
categories: null
comments: true
date: '2014-08-10'
title: Huawei HG610 Capacitor Replacement
---

This post is mostly written for posterity's sake, in case anyone ever runs into this weird problem.

I recently upgraded my home broadband connection to a 100M/3M VDSL line. The equipment given (loaned, actually) by the telco (Bezeq) was full of backdoors and couldn't be liberated in any way - a story in itself for another time. I decided to order a VDSL modem from eBay and put my own OpenWRT-based router behind that, and tell Bezeq they can take their shitty equipment back. I ended up ordering a [Huawei HG610 VDSL modem](http://www.ebay.com/itm/New-Huawei-HG610-VDSL2-ADSL2-2-mode-BCM6368-Chipset-moden-router-/251170480866), the seller was extremely responsive and I got my device within a week (A++++ would buy again, etc...)

Yesterday, the modem suddenly died. Upon closer inspection it was clear that something is wrong, on power up the modem would make a very strong hissing sound, and the connection would drop almost instantaneously. Today I contacted the seller and notified him of the problem. To my surprise, he said I'm not the first customer in Israel using this modem and having this kind of problem with the hardware. He offered to immediately send a replacement unit, and I could ship this one back when I get the new one.

I thanked the seller for his awesome response, but inquired about the nature of the problem. It turns out there's a certain capacitor failure on this device, which apparently is common when used on the Israeli grid, for some reason. Capacitors are a rather easy fix, and I need my connection ASAP. So I decided to fix the device by myself and not burden me or the seller with the entire shipping process.

![](/static/img/blog/hg610.jpg)

Opening the unit, it was very clear that an electrolytic capacitor has busted. In the above image (courtesy of Kirill Romaschenko, thanks!) it is C321, the green capacitor located right next to the yellow coil, adjacent to the ethernet bridge.

It took some work, but I managed to de-solder it from the board. The capacitor is rated at 470 µF / 10V. My hunch is that Bezeq is doing some funky stuff that sends higher voltages over the line, and the modem is falling under the burden. The logical replacement is a new cap with a slightly higher voltage rating. I found a 470 µF / 16V capacitor and soldered it as a replacement. Sure enough, no more hissing, and the device works flawlessly again.

It will be interesting to see if this problem crops up on other devices on the same network.
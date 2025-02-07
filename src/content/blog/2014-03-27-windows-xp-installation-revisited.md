---
categories: null
comments: true
date: '2014-03-27'
layout: post
title: Windows XP Installation Revisited
---

It's been a while since I actually had to use Windows proper. Windows XP is still a damn fine operating system - and superior to its successors in my opinion - but I've largely transitioned to using Linux and OS X exclusively over the past few years. I've kept a few Windows XP images running on VMs for various uses, but have not found a reason to install a native Windows installation up until recently. To my surprise, I forgot many of the skills I used to posses in this environment.

My goal was simple: setup a native Windows installation (XP if possible) alongside an existing Linux installation on one of my desktop machines. Here are some notes I took while working my way through this territory.

## Dual Boot
Since the existing system hosts Linux, I must install Windows alongside with the ability to dual-boot. For this there are two options that work equally well for me.

First, installing Windows on a separate hard drive gives you the simple option of using the BIOS boot order (and boot menu) to control the boot process. Since I use Linux exclusively, and will rarely need access to the Windows installation, I could easily setup the Linux hard drive as the first boot option, and use the special boot menu (`F12` on most BIOSes) to force booting into the secondary hard drive whenever I wanted Windows. For me this suffices. But if you're running on two partitions of the same HD, this might not.

A nicer option would be to customize my existing syslinux setup, and chain-loading Windows from the secondary HD. This means adding a new syslinux config option:

```
LABEL Windows
       MENU LABEL Windows
       COM32 chain.c32
       APPEND mbr:0xa1b2c3d4 swap
```

In this case, we use the hard drive MBR identifier (found by running `fdisk -l /dev/sdX`) to ensure the proper drive is found. `swap` is a required option that overcomes issues when chain-loading across hard drives.

## AHCI
SATA hard drives can pose a problem for Windows XP installations, as they can operate in one of two modes: IDE or AHCI. AHCI is an advanced mode that enables hot-swapping and other advanced features for SATA drives, while IDE mode is the fallback mode. I would have no problem running in IDE mode only if not for the fact that the latest Linux kernels prefer AHCI, actually, and in my case could not even boot in IDE mode.

Unfortunately, Windows XP does not have native support for AHCI in its base image installation, and switching between IDE/AHCI each time I wanted to switch Linux/Windows is definitely not an option. This is a critical issue.

The usual option requires taking a base ISO image, and slipstreaming the required SATA drivers into it. When I tried this using the drivers recommended by my motherboard manufacturer, it failed.

The solution came from using a custom-made ISO, created by a group called ThumperDC (it's a popular option on Pirate Bay and easy to find). This ISO comes with a myriad of driver options that simply work.

It should be noted that while there are various techniques that allow to hack an existing non-AHCI installation to support AHCI, after trying them I must conclude that they are not reliable at all, and rarely work. Your best bet would be to properly support AHCI from the initial installation steps.

## Slipstreaming Drivers
Not only AHCI drivers can be slipstreamed. It would be wise, for example to add any expected drivers beforehand, such that upon first boot most of the components will just work™. For this I recommend using [nLite](http://www.nliteos.com/) which provides an awesome interface for customizing ISOs, not only with drivers but also by adding and removing installation features on demand. It runs only on Windows, so you'll have to bootstrap this process from a Windows VM.

## USB Booting
Finally, I wanted to install the entire thing from a USB drive. Burning a DVD is ghetto, yeah, but I can't even remember where I have any blank DVDs around. Since the standard Windows XP ISOs are not USB bootable, some more work is required.

A handy tool called [WinToFlash](http://wintoflash.com/home/en/) will happily take an ISO and add the required files to make it USB-bootable. Again, runs only on Windows, so use the same VM you used previously.

## Conclusion
This process is cumbersome, and totally not secure in any way, since it requires using pirated proprietary code which might be infested with bad stuff. However, my use case is very specific, and I need the most lightweight setup I could find. Sure, if I used Windows 7 (or 8) things could have gone smoother. But compare the 650MB XP install to Windows 7's 3.5GB. Windows XP is still a beast of an operating system that can do lots of good things for you, if you ever need to venture out of the comfort zone of free and open-source software.
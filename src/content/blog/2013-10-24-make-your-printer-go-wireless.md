---
categories: null
comments: true
date: '2013-10-24'
layout: post
title: Make your printer go wireless for $20
---

I just got a new printer - the cheapest B/W laser printer I could find - and I really wanted to have a network option for it, since I'd like to print from different laptops and computers around my house. However, the premium for a printer with an ethernet/wireless option, in this cheap printer category is around 50-70% of the printer value. Way too much. I'm going to hack my way out of this problem.

For this, we're going to use $20 [TP-Link WR-703N](http://wiki.openwrt.org/toh/tp-link/tl-wr703n) devices, which are actually very small routers, and once flashed with OpenWrt, are capable of doing pretty much anything that you can think of with a Linux kernel, an ethernet port, a WiFi connection, and a USB port. This device is perfect as a wireless printer adapter.

## Install OpenWrt
First of all, we need to flash the device with OpenWrt. Simply follow [these instructions](http://wiki.openwrt.org/toh/tp-link/tl-wr703n#flashing) which describe exactly which binary to download. Flashing it is easily done via the existing default web interface, which unfortunately is only in Chinese. But there are some good screenshots on the [Xinchejian hackerspace wiki](http://wiki.xinchejian.com/wiki/Install_OpenWRT_on_TPlink_WR703N) that you can follow. **Caution:** When flashing, make sure you're aware of the pitfalls of some of the recent firmwares, see the [warnings section](http://wiki.openwrt.org/toh/tp-link/tl-wr703n#warnings.gotchas) for details.

Note that some vendors on eBay are already selling WR703N devices with OpenWrt pre-flashed instead of the stock firmware, in which case you don't have to do any of the above.

## Configure OpenWrt
Now that we have OpenWrt installed, it's time to configure it. By default, the wireless interface will be disabled, leaving on the ethernet port working. Upon connection, you'll be served a `192.168.1.X` IP address via DHCP from the device (which will be on `192.168.1.1`). For our setup, we'll assume we want to located the printer somewhere without having to pull any network cables to it, so we want a setup where the wireless adapter is used as the WAN interface, hooking up to an existing wireless network. We'll also want to create a subnet LAN on `192.168.2.1` to ensure we're not colliding with the existing LAN on `192.168.1.1` (assuming we're also running the same subnet on the existing home network.)

First, we need to open up the wireless configuration on `/etc/config/wireless` and edit it to look like so:

```
config wifi-iface
        option device radio0
        option network wan
        option mode sta
        option ssid MyNetworkName
        option encryption psk2
        option key MyNetworkPassword
```

This configuration means we setup the `radio0` device to hook up as a station (`sta`) to the WAN on the given network. `psk2` assumed WPA2-PSK encryption with the given password.

You also have to make sure you update the physical 802.11 channel on the line in the `radio0` config, where it says:

```
option channel 11
```

It must match your existing wireless channel.

Now we'll add the WAN interface itself in the `/etc/config/network` config:

```
config interface 'wan'
        option ifname 'wlan0'
        option proto 'dhcp'
```

And since we're setting up a new LAN subnet, change the existing LAN interface on the following line to:

```
option ipaddr '192.168.2.1'
```

Last thing is to make sure we can remotely log into the device from the WAN, since hooking up ethernet just to manage it is a PITA. Open the `/etc/config/firewall` config file and add this rule at the end:

```
config rule
        option name 'allow-ssh'
        option src 'wan'
        option target 'ACCEPT'
        option dest_port '22'
```

That's all the basic config we need. After `reboot`, the device should show up on your LAN, and you'll be able to log into it to continue to the next steps.

## Printer configuration

We'll move on to installing the important stuff. The printer setup is based on the [p910nd](http://wiki.openwrt.org/doc/howto/p910nd.server) daemon, which will act as a proxy between the device and the printer. It's main advantage is that it is a non-spooling server (as opposed to, say, CUPS) which means it doesn't need to hold the printing jobs in memory while printing. Remember, WR703N are very limited devices.

In order to setup the printer we need to install both p910nd, as well as the USB kernel mods, but it's all done through the `opkg` package manager:

```
opkg update
opkg install p910nd kmod-usb-printer
```

After this part, if you connect the printer, you should see either the `/dev/usb/lp0` or `/dev/lp0` device. Run `dmesg` to see a successful USB connection, or errors if there were any.

Go on over to the `/etc/config/p910nd` config and enable the printer, and make sure it's pointed to the right device. At this point you'll also have to open port 9100 on the firewall, in the exact same way we did for the SSH port previously. Make sure to restart the firewall after this addition, using `/etc/init.d/firewall restart`.

Now we can start and enable the p910nd daemon, to make it run now, as well as on each boot:

```
/etc/init.d/p910nd start
/etc/init.d/p910dn enable
```

## Configure client
We're almost there. Now we just have to create a new printer device on our client machine, and let's assume you already have all the drivers installed.

These instructions vary by client OS, but generally speaking you need to create a new printer, under the device WAN IP (you can find it by `ssh`-ing into the device and seeing what `ifconfig` reports under the `wlan0` interface), if needed, define port 9100. The protocol selected should be `AppSocket` or `HP JetDirect`.

Try printing a test page. If all went well, you have just saved yourself some money, and learned how to create your own cheap wireless adapter for your printer.
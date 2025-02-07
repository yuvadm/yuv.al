---
categories: null
comments: true
date: '2017-05-23'
title: OpenELEC Installation on Raspberry Pi 3
---

Raspberry Pi boards are immediate candiates for powering media center installations, especially with the Raspberry Pi 3 which comes with a built-in wifi adapter. I've recently installed [OpenELEC](http://openelec.tv/) on a Raspi 3, but required some tweaking in order to get the setup working properly. This short post documents these required changes, and assumes a working base installation of OpenELEC.

## HDMI Flickering

In some cases the HDMI connection between the Pi and the TV/monitor can flicker in a very annoying way. Most of the HDMI configuration can be done in the [`config.txt`](http://elinux.org/RPi_config.txt#Video) file which is usually found in the boot partition, but in OpenELEC's case is found under `/flash/config.txt`. Editing this file requires remounting the partition as writable:

```bash
$ mount -o remount,rw /flash
$ echo foo >> /flash/config.txt
$ mount -o remount,ro /flash
```

As for the flickering, it was fixed by raising the `config_hdmi_boost` config value to `7` from a supposed default of `5`.

## Wireless Connection

For reasons unknown, the OpenELEC support for the Raspi wireless adapter is severly lacking, and any attemt to connect to a wireless network returned a `Network Error`. Oddly enough, when connecting directly via SSH command line (instead of GUI) there are no problems. So I used this to first configure a `connman` profile and then have OpenELEC use it on the next boot. All the details are in [this gist](https://gist.github.com/maoueh/8260199), but generally speaking a profile is created in `/storage/.cache/connman/$NAME.config`:

```
[global]
Name = foo
Description = goo

[service_wifi_foo]
Type = wifi
SSID = YourSSID
Passphrase = YourPassphrase
```

Verify the profile works by running `connmanctl scan wifi` and `connman services` and connecting to the newly created profile `connmanctl connect wifi_*_*_managed_psk`. Once this profile is active, it will be recognized upon reboot and connect automatically, thus working around the weird bugs in the GUI connection.

## LAN Bufferring

Finally, after getting a proper HDMI output and a working WLAN connection, buffering issues were noted when viewing media files from an NFS mount on the local network. No reason an off-the-shelf router can't handle an HD stream, so again this seems to be another required tweak on the Pi.

This time we create a file called `/storage/.xbmc/userdata/advancedsettings.xml` and set some required settings:

```
<advancedsettings>
<network>
<buffermode>1</buffermode>
<cachemembuffersize>20971520</cachemembuffersize>
<readbufferfactor>3.0</readbufferfactor>
</network>
</advancedsettings>
```

This config does several things. First, it tells XBMC to buffer all videos, including videos originating on the LAN (as opposed to `buffermode 0` which only buffers from the WAN). Next, it sets a cache size of `20MB`, which is enough but won't use too much free memory, and finally it raises the read buffer factor from `1` to `3` which will simply buffer more than the default.

All these settings together make OpenELEC on a Raspberry Pi 3 an actual usable media center, which works surprisingly well, compared to the unusable default installation.
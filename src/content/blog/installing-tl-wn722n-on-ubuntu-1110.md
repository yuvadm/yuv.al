---
date: '2011-10-23'
layout: post
tags: null
title: Installing TL-WN722N on Ubuntu 11.10
---

I just finished installing the TL-WN722N TP-Link wiresless USB adapter on a
Ubuntu 11.10 machine. I started off with the instructions on
[http://dwiel.net/blog/tp-link-tl-wn722n-on-ubuntu-10-04](http://dwiel.net/blog/tp-link-tl-wn722n-on-ubuntu-10-04) and at least for me the steps were much more simple.

All I needed to do was:

    
    $ wget http://www.orbit-lab.org/kernel/compat-wireless-2.6-stable/v2.6.38/compat-wireless-2.6.38.2-2.tar.bz2
    $ tar xvf compat-wireless-2.6.38.2-2.tar.bz2
    $ cd compat-wireless-2.6.38.2-2
    $ ./scripts/driver-select ath9k_htc
    $ sudo make
    $ sudo make install
    

That's pretty much it. I suspect other up-to-date versions of compat-wireless
will also do the trick, but for now - this does just fine.
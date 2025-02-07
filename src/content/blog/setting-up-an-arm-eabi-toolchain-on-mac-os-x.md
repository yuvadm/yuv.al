---
categories: null
comments: true
date: '2012-10-07'
title: Setting up an ARM EABI toolchain on Mac OS X
---

![](http://r0ket.badge.events.ccc.de/_media/wiki:r0ket_space_iii.jpg)

[29C3](http://events.ccc.de/2012/08/03/call-for-participation-for-29th-chaos-communication-congress/) is coming up, and after completeing and submitting my talk proposals, I've recently started hacking on my [r0ket badge](http://r0ket.badge.events.ccc.de/), which I managed to get my hands on a year ago at 28C3.

After setting it up and doing some SMD soldering with the RGB flame module, the next step is hacking on the r0ket's firmware, writing [l0dable](http://r0ket.badge.events.ccc.de/l0dables) applications.

The r0ket has an ARM processor and its firmware and applications are cross-compiled using the ARM EABI toolchain. The r0ket wiki has instructions on [how to set up an environment on Mac OS X](http://r0ket.badge.events.ccc.de/build_mac), and I'll try to give some comlementary tips on how to accomplish that.

My preferred option would be to use standard [homebrew](https://github.com/mxcl/homebrew/) formulae as much as possible. Unfortunately, homebrew chose not to include the ARM EABI toolchain in it's offerings. [A homebrew fork](https://github.com/jpc/homebrew) has support for the `arm-none-eabi-gcc` formula, but I found it not up to date.

If you use MacPorts, it might be possible to `sudo port install arm-none-eabi-gcc`, but unfortunately MacPorts and homebrew are mutually exclusive, and I'm definitely sticking with homebrew.

By far, the easiest solution I found was a simple-to-use makefile wrapped up with some patches specifically built for the task of building an ARM EABI toolchain, they can be found [on github](https://github.com/jsnyder/arm-eabi-toolchain).

Make sure you have the proper dependencies first:

``` bash
brew install mpfr gmp libmpc libelf texinfo
```

Then simply clone the repository, and run the makefile:

``` bash
git clone https://github.com/jsnyder/arm-eabi-toolchain
cd arm-eabi-toolchain
make install-cross
```

Remember you're building the entire toolchain, so expect this step to take at least an hour, and your Mac to heat up running 100% CPU. When all the tools are built you can find them located at `~/arm-cs-tools`. Remember to somehow add `~/arm-cs-tools/bin` to your `$PATH`.

The bonus for all this is that I just recently received my [Texas Instruments Stellaris Launchpad](http://www.ti.com/ww/en/launchpad/stellaris_head.html) evaluation kits, and I'll definitely be making heavy use of this toolchain. Not to mention that an ARM-based Arduino board is in the making...
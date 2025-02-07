---
categories: null
comments: true
date: '2012-10-29'
title: An Open Toolchain for the TI Stellaris
---

![](/static/img/blog/stellaris.jpg)

[In my last post](/blog/2012/10/07/setting-up-an-arm-eabi-toolchain-on-mac-os-x/) I set up an ARM EABI toolchain to work with my CCC r0ket badge. Incidentally, I just received my [Texas Instruments Stellaris](http://www.ti.com/stellaris) dev board and wanted to start playing around with it. Unfortunately, TI's development tools are highly bloated, proprietary and almost exclusively geared towards Windows environments. Unacceptable. I wasn't about to download a 1.3GB file just to get a LED blinking on a dev board using my Mac.

As it turns out, all the building blocks are there, and it's just a matter of putting them together. Here's how to get a simple project compiled and flashed on your TI Stellaris by using an open toolchain.

First, we need a cross-compiler. For that, we use the ARM EABI toolchain which can be installed using the amazing [ARM EABI Toolchain Builder](https://github.com/jsnyder/arm-eabi-toolchain). Follow the instructions, and make sure you have the respective `bin` directory in your path.

Next, we need the flashing tools. Fortunately, some code is already available from the [lm4tools](https://github.com/utzig/lm4tools) package. It's dependent on `libusb`, so install that with your favorite package manager, and otherwise it's a breeze to install. `lm4tools` supplies us with both a flashing utility as well as with a USB/ICDI debugging bridge. For now we just want the flashing utility. The package already comes with a readymade binary, which we can try to test, but we'll go ahead and compile our own. It's just more fun that way :)

Finally, we need all the source and header files relevant to the Stellaris. Those all exist in TI's StellarisWare packages, but are a bitch to download. Seriously, I won't even try to link to them. I extracted all the necessary files to [my own Stellaris repo on Github](https://github.com/yuvadm/stellaris), and cloning that should get you everything you need. After cloning the repo, `cd` into one of the projects, such as `boards/ek-lm4f120xl/project0`.

If all is well, running `make` will quickly yield the output binary located in `gcc/project0.bin`. We're now ready to flash. Point to your `lm4flash` util and run:

``` bash
$ ./path/to/lm4flash gcc/project0.bin
```

If the flashing process was successful, the RGB LED on the Stellaris should now be blinking blue and red alternatively. Awesome. A trivial exercise would be to add a green blink to the sequence.

It's cool to have the board running at last, but it's a shame TI doesn't make this stuff more accessible and open. From what I've seen so far, the Stellaris is a pretty neat board, and I hope to write more in the future about the advanced functionality you can get out of it.
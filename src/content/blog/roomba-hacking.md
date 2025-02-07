---
date: '2011-09-23'
tags: null
title: Roomba Hacking
---

So this weekend saw the [2nd hackathon organized by the DC9273 defcon group](http://www.dc9723.org/Hackathon), which took place at the GarageGeeks
home in Holon, Israel.

I came with no real goal in mind, and no specific project I wanted to work on.
As always, the best stuff comes from just browsing around and meeting cool and
interesting people.

So strategically placed by the entrance door, I met Ido Hadanny, which was
running the [Roomba, Where Art Thou](http://www.dc9723.org/Hackathon/roomba_where_are_thou) project. Ido
wanted to build a system to allow him to monitor his iRobot Roomba while away
from home. Sounds cool, and Ido seemed like a decent guy, so I joined in on
the project.

Basically the game plan was to hook up to a open serial interface that the
Roomba so generously provides, and start playing with the API - basically a
set of opcodes and data sent and received over serial.

We started out with a reference Java implementation provided by
[http://hackingroomba.com](http://hackingroomba.com) but quickly figured out
we needed to work closer to the metal, and hack our own code. After some
tinkering with the RXTX serial port library (and an unsuccessful attempt at
getting it to work on my Mac), we managed to start sending out opcodes and
receiving signals from the Roomba. Our main focus was on receiving the Roomba
location sensors, which provide us with a angle and distance delta from the
previous sampling point.

The first day ended on a weak note as we failed to get any substantial data.
But the following day started off with fresh code which was slightly more
stable (i.e. `BetterRoomba.java`), but we still didn't manage to get the data
we wanted. First, we might have been sampling the Roomba sensors too fast,
thus giving us inaccurate results. Secondly, we suspect that we have missed
something on the serial event data handler, and that somehow it is not
synchronized with the input buffers, yielding corrupt data.

So, bottom line - no results, but it was a nice try, and we had a good time.
All the code we used can be found, as usual, on the Githubs -
[https://github.com/yuvadm/roomba-where-art-thou](https://github.com/yuvadm
/roomba-where-art-thou).
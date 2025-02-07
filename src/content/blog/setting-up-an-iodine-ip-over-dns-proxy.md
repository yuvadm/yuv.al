---
date: '2011-11-01'
tags: null
title: Setting up an iodine IP-over-DNS proxy
---

Here's a nice method to bypass any annoying wifi gateways, such as the ones
you find at hotels and airports. A prerequisite is that the gateway allows DNS
requests to be made.

Once we have that in the clear, we'll need root access to a server with full
access to its DNS records. We'll be using iodine and iodined on both sides of
the tunnel.

First of all, we'll need to create the proper DNS records - we're going to
need two of those, one would be a NS record for the DNS lookup, the second is
an A record to the server itself.

I'm using Amazon's Route53 service with the most excellent
[boto](https://github.com/boto/boto) command line tools, so I would do this:

    
    $ route53 add_record ZXXXXXXXXXXXXX iodine.domain.com. NS tunnel.domain.com. 259200 some_comment
    $ route53 add_record ZXXXXXXXXXXXXX tunnel.domain.com. A 111.222.33.4 900 some_comment
    

It obviously doesn't matter what tools you use, you just want these two DNS
records:

    
    iodine      IN  NS  tunnel.mydomain.com.
    tunnel      IN  A   111.222.33.4
    

So now we have the DNS records set up. Now it's time to install iodined on the
server. I'm using a standard Ubuntu server - and if it's 11.04 and up, you're
lucky because iodine has an apt package:

    
    sudo apt-get install iodine
    

By default, the service does not launch on startup, but that good since we
still need to configure it. The service config file is located at
`/etc/defaults/iodine`. Here you'll want to set your `iodined` password and
any command line args. If you want, you can always set `iodined`'s run level -
to launch on startup - by using the `runlevel` tool.

Alternatively, you can always just run `iodined` from the command line in
foreground mode:

    
    iodined -f -P yourpassword 192.168.99.1 iodine.mydomain.com
    

The arguments you're going to need are a password of your choice, an internal
IP that is not in use, and the tunnel domain to listen to. Last thing, you're
going to want to make sure your firewall is open inbound to UDP requests on
port 53.

Once you have that you can go on to [http://code.kryo.se/iodine/check-it](http://code.kryo.se/iodine/check-it)
and test your setup with the `iodine.mydomain.com` domain. If all is good you
can continue to install the client.

Last step, installing the client. I'm on a Mac with
[homebrew](http://mxcl.github.com/homebrew/) installed, so again installing it
is kind of a breeze:

    
    sudo brew install iodine
    

Once that's installed, launch the client:

    
    sudo iodine -P yourpassword iodine.mydomain.com
    

and if all is well you have just set up a fancy IP-over-DNS tunnel! For final
testing try to ping your server via the IP you gave it: `192.168.99.1`. Once
you have the tunnel you can start routing traffic through it. For this you'll
probably want to establish a secure connection, preferably via SSH. Remember
that all DNS requests are non-secure and very easy to sniff over the network.

For further reference you can (should) check out the [iodine README](http://code.kryo.se/iodine/README.html).

Pitfalls
--------

  * Make sure you install the same iodine versions on both the client and the server. If you fail to do so you will get protocol errors. There is no backwards compatibility here.
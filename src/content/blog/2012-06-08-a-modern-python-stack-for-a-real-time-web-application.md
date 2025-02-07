---
date: '2012-06-08'
layout: post
tags: null
title: A modern Python stack for a real-time web application
---

Earlier today I wrote [a detailed answer on Stack Overflow](http://stackoverflow.com/a/10950702/24545) about a suggested Python
stack for building a modern real-time web application. This is based upon the
work I did over the past several months with
[PlantAComment.com](http://plantacomment.com), [which I've also written about recently](http://blog.y3xz.com/blog/2012/05/20/webgl--liquid-galaxy-fun/).

In any case, I've found this stack to be pretty damn solid. Since we were
doing real-time WebGL rendering, and synching that data on a multi-client
landscape, we actually were sending dozens of messages per seconds (granted,
small messages) and that also worked out surprisingly well.

Anyway, enough with the talk, here's the stack. For starters, the entire app
is served on the [Tornado web server](http://www.tornadoweb.org/), which is a
non-blocking web server that excels in this kind of stuff, and also has some
nice "classic" web app support such as authentication, templates, etc., so we
also used it for serving up the entire app itself, and not only the real-time
evented stuff.

Next up is the messaging protocol. We started out using
[socket.io](http://socket.io), which has a default implementation in Node.js,
and is supported on Tornado via
[tornadio2](https://github.com/mrjoes/tornadio2). This worked out fine, but
following a conversation with MrJoes (tornadio2 maintainer), we decided to
switch and use [sock.js](https://github.com/sockjs/sockjs-client), which also
has a Tornado server implementation, [sockjs-tornado](https://github.com/MrJoes/sockjs-tornado). In essence, socket.io's
protocol is known to have some defects, and the fact that anything other than
the Node.js implementation is a second-class citizen just feels awkward.
Sock.js is a fully-tested protocol, and generally feels more solid, so we
decided to go with it.

Most messaging examples in Tornado involve using a class-level variable that
maintains all connections to all connected clients. This is a horrible setup
and should never be used for anything beyond trivial applications. It's like
maintaining data inside your web server because you're too lazy to spin up a
database.

So for all the messaging stuff, we decided to use Redis' [pub-sub capabilites](http://redis.io/commands#pubsub). And since we're in the context
of Tornado, we're also going to need a proper asynchronous interface - which
is done beautifully by the [brukva](https://github.com/evilkost/brukva)
library. As a side note, I should mention that brukva is implemented using
adisp, and does not employ any of the Tornado async building blocks. There is
another project, [tornado-redis](https://github.com/leporo/tornado-redis),
which claims to do just that, but I haven't got around to actually using it.
You might have more luck with that, though. In any case, brukva works just
fine.

(**Update**: Since the original post, tornado-redis has proven to be the superior option, as it uses the standard async tools provided by Tornado.)

And that's pretty much it. We can bring it all together with this
`ConnectionHandler` which has all the functionality we need:

```python
class ConnectionHandler(SockJSConnection):
    def __init__(self, *args, **kwargs):
        super(ConnectionHandler, self).__init__(*args, **kwargs)
        self.client = brukva.Client()
        self.client.connect()
        self.client.subscribe('some_channel')
     
    def on_open(self, info):
        self.client.listen(self.on_chan_message)
     
    def on_message(self, msg):
        # this is a message broadcast from the client
        # handle it as necessary (this implementation ignores them)
        pass
     
    def on_chan_message(self, msg):
        # this is a message received from redis
        # send it to the client
        self.send(msg.body)
     
    def on_close(self):
        self.client.unsubscribe('text_stream')
        self.client.disconnect()
```

And that's how you do real-time messaging with Python.
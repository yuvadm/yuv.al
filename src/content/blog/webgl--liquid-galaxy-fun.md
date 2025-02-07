---
date: '2012-05-20'
tags: null
title: WebGL / Liquid Galaxy Fun
---

The past several weeks have kept me very busy on my latest collaboration with
new-media artists [Omer and Tal Golan](http://omta.co).

![](/static/img/blog/plantacomment.png)

Our project, [PlantAComment.com](http://plantacomment.com) (שיח גלריה, in
Hebrew) is an interactive installation that encourages visitors to plant
thoughts that manifest themselves as trees in a semi-apocalyptic 3D world. The
installation premiered this week at the [2012 Fresh Paint art fair in Tel Aviv](http://www.freshpaint.co.il/en/). Throughout the week, our project has
received much acclaim from visitors of all ages.

On the technical side, the project is a behemoth in terms of how many
technologies we've used to make it all happen. The server-side is based on a
core Tornado web server that handles all HTTP requests, as well as WebSocket
connections. Redis is used both as a back-end store, as well as for pub/sub
for new messages that are received via SMS text messages, as well as Twitter
and G+ posts. With the help of the amazing [Nir Ofek](http://www.linkedin.com/in/nirofek), we've also implemented advanced
semantic analysis on all incoming texts, allowing us to cluster similar
subjects on the same trees. Credits to the beautiful soundscape go to the
most-talented Nir Danan.

The most impressive aspect of the project, by far, is the WebGL implementation
of the 3D world that is able of running in-browser on any WebGL-capable modern
browser. The highlight for the installation was deploying our project on
Google's Liquid Galaxy setup - a 7-machine setup connected to 7 55" LED
screens that run in complete synchronization, showing a 180 degree view of the
world. This is the first time in the world an art project is deployed on this
setup.

Expect to hear more about this project in the near future ;)
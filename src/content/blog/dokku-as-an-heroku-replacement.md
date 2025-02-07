---
categories: null
comments: true
date: '2014-01-10'
title: Dokku as an Heroku replacement
---

For the past year or two, Heroku has been my weapon of choice for quick-and-easy deployment of small projects. The ease of pushing a project to Heroku with everything behind the scenes being taken care of really was astounding.

My gripe with Heroku has always been with larger projects. For someone who's done devops for larger web projects previously, the threshold for when you need to start customizing things is relatively low, and the need to switch your deployment strategy become imminent. However, in this post we won't be talking about larger projects that require their own set of deployment tools.

I'd like to focus on the category of smaller projects. On Heroku you get a single dyno for free, and for many uses (such as [deploying single periodical tasks](http://blog.y3xz.com/blog/2012/11/16/deploying-periodical-tasks-on-heroku/)) this is great. However, even a minuscule side-project might require, at the very least, a single web process adjacent to a single worker process. In Heroku's case, this is $20/month, which might not be worth it for a small project.

Meet [Dokku](https://github.com/progrium/dokku).

Dokku is a lightweight set of bash scripts that facilitates deployments of single applications on a single server using Docker and the open-source Heroku buildpacks to simulate a Heroku-like deployment environment which you can set up on your own boxes. It is by no means feature-complete, but for pushing a single project to a remote box, it definitely gets the job done.  

## Install Dokku

Dokku can be installed only on recent Ubuntu systems due to the various Docker dependencies. Also, due to various bugs, the best system to go with currently is Ubuntu 13.04. Installation is a one-liner:

```bash
$ wget -qO- https://raw.github.com/progrium/dokku/v0.2.1/bootstrap.sh | sudo DOKKU_TAG=v0.2.1 bash
```

Some VPS providers (such as DigitalOcean) provide pre-made "Dokku on Ubuntu" images, but I've found that using the "classic" Dokku bootstrap script works equally well, and it just as easy.

## Plugins

Dokku comes with the most basic set of plugins that provide Git support and nginx virtual hosts. However, most web projects will also require some other necessities, such as a Postgres database, a Redis instance for caching and queuing, and a proper process manager.

All of these exist as Dokku plugins ([redis](https://github.com/luxifer/dokku-redis-plugin), [postgres](https://github.com/Kloadut/dokku-pg-plugin) and [supervisord](https://github.com/statianzo/dokku-supervisord)), but since I use these in every single project, I've added them all as submodules inside [a dokku base project that I use](https://github.com/yuvadm/dokku-base).

If you'd like to use that base installation, you can easily install it with:

```bash
$ wget -qO- https://raw.github.com/yuvadm/dokku-base/master/bootstrap.sh | sudo bash
```

I highly suggest using this installation, since manual installation of the aforementioned plugins sometimes doesn't flow just right.

## Configuring

Once Dokku is installed, we'll need to upload our SSH public key to the Dokku server so that we'll be able to push projects to it:

```bash
cat ~/.ssh/id_rsa.pub | ssh dokku.example.com "sudo sshcommand acl-add dokku yourname"
```

Make sure you use proper SSH credentials when doing this (maybe you'll need to specify a username or a PEM key file).

## Pushing a Project

We're now ready to push a project to Dokku! Let's give it a shot:

```bash
$ cd test-project
$ git remote add dokku dokku@dokku.example.com:test-project
$ git push dokku master
```

If all went well the buildstep should now run, and eventually tell you that your project is now deployed to `http://test-project.dokku.example.com`. Make sure you actually have a proper DNS setting for this, which will usually be a `CNAME` from `*.dokku.example.com` to `dokku.example.com`.

At this point we need to create and attach a Postgresql database and a Redis instance. To run Dokku management commands, either log in to the Dokku server, or run the commands remotely using `ssh -t dokku@dokku.example.com <command>`.

```bash
$ dokku postgresql:start
$ dokku postgresql:create test-project
$ dokku redis:create test-project
```

After completing these steps, you should be able to run `dokku config test-project` and see that you actually have `DATABASE_URL` and a `REDIS_URL` environment variables configured. Make sure your project references them.

Finally, supervisord, should be running out of the box, such that any process in your `Procfile` will be immediately recognized and started and will be restarted in case of redeployment or any other failure.

# Conclusion

Dokku is a really cheap and easy way to deploy medium-sized projects that would otherwise cost a few $$$ on Heroku. It's shaping up to look very stable, and a wide range of plugins for Dokku supply mostly any behavior you need from it.
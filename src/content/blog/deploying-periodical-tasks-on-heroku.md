---
categories: null
comments: true
date: '2012-11-16'
title: Deploying Periodical Tasks on Heroku
---

Heroku is an awesome platform for hosting web applications, that much is obvious. A few days ago I had another application to deploy on Heroku, but with a different usage profile. The application, [a simple breaking news tweeting app](https://github.com/yuvadm/rotter-tweets), periodically scrapes a popular Israeli forum with breaking headlines, and tweets them - a fairly straightforward task. However, this application has no request-response cycle, and in fact has no open web gateway, just a simple task running periodically, every minute in our case.

Naturally, this task needs to run on a 24/7-available server, not just on a random desktop. Sure I have several VMs I can piggyback this task on, but I wanted to find the way to package this little task properly such that I can deploy it easily on Heroku and forget about the whole thing. Since I'm running a single process on a single Heroku dyno, if I could get it to work, it wouldn't cost a thing.

For asyncronous and scheduled tasks in Python, the obvious solution is to use [Celery](http://celeryproject.org/). The core of the setup is a single Celery worker running a periodical task. Since we only have one worker, and we can't spare another process for the Celery heartbeat process (it'd cost another Heroku dyno which isn't free), we'll use the `celery worker` process with the `-B` flag that bundles the worker and the heartbeat into one convenient process.

Celery can't work without a messaging broker, naturally with Heroku we'll use the `redistogo:nano` plan.

Here's the code for a simple worker, `tasks.py`:

``` python
import logging

from celery import Celery
from celery.task import periodic_task
from datetime import timedelta
from os import environ

REDIS_URL = environ.get('REDISTOGO_URL', 'redis://localhost')

celery = Celery('tasks', broker=REDIS_URL)


def fib(n):
    if n > 1:
        return fib(n - 1) + fib(n - 2)
    else:
        return 1


@periodic_task(run_every=timedelta(seconds=10))
def print_fib():
    logging.info(fib(30))
```

To wrap it up, you'll need a `Procfile` with a single line launching the worker:

```
worker: celery -A tasks worker -B --loglevel=info
```

I find this setup to be *very* convenient if I need to deploy a single recurring task, and not care at all about setting up cron jobs or manually configuring deployment environments. Heroku FTW.

All the code, as always, is in a single repo on Github: [https://github.com/yuvadm/heroku-periodical](https://github.com/yuvadm/heroku-periodical). Enjoy!
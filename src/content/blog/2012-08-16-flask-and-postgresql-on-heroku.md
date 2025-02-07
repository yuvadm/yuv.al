---
categories: null
comments: true
date: '2012-08-16'
layout: post
title: Flask and PostgreSQL on Heroku
---

[Heroku](http://heroku.com) is increasingly becoming my favorite platform to deploy simple Python applications on. Heroku actually gives you a completely managed environment where you can deploy an app in literally minutes. Not to mention that the free tier usage on Heroku (1 dyno, Postgres dev plan) can actually get you pretty far.

You can follow the official docs on Heroku that explain [how to get started from scratch](https://devcenter.heroku.com/articles/python/), but I find them lacking some explanation on how to set up Postgres, so here's the complete formula I use to rapidly deploy simple Python apps.

All the code in this post can be found in the [matching repository on Github](https://github.com/yuvadm/heroku-python-skeleton).

I'm going to assume you have a basic project setup, if not just follow the aforementioned tutorial. So now we need to add support for PostgreSQL. We'll do that by using [Flask-SQLAlchemy](http://packages.python.org/Flask-SQLAlchemy/) which will give us everything we need to connect to the Postgres DB as well as an easy to use ORM. So first we need to install the dependency and add it to our `requirements.txt`:

``` bash
$ pip install flask-sqlalchemy psycopg2
# don't forget to update requirements.txt
$ pip freeze > requirements.txt
```

Before we continue we'll have to create the Postgres DB and we'll start off with the free dev plan which allows for up to 10K rows and 20 simultaneous connections:

``` bash
$ heroku addons:add heroku-postgresql:dev
-----> Adding heroku-postgresql:dev to some-app-name... done, v196 (free)
Attached as HEROKU_POSTGRESQL_COLOR
Database has been created and is available
```

Once the database is setup we should promote it such that the `DATABASE_URL` environment variable will be set:

``` bash
$ heroku pg:promote HEROKU_POSTGRESQL_COLOR
Promoting HEROKU_POSTGRESQL_COLOR_URL to DATABASE_URL... done
```

Now we can go ahead and import the library and add the basic connection boilerplate:

``` python
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)
```

For this step, you can optionally use Kenneth Reitz's [flask-heroku](https://github.com/kennethreitz/flask-heroku) library, which handles setting all connection URLs automatically, not only for Postgres, but for other services such as redis, sentry, exceptional and others.

The next step is to commit the boilerplate code and create the actual DB tables:

``` bash
$ git commit -a -m "added DB boilerplate"
$ git push heroku master
# ...
$ heroku run python
```

Once we have a connected Python terminal we can run:

``` python
>>> from app import db
>>> db.create_all()
```

And we're set! From here we can start using SQLAlchemy's code to define models and create, query and delete objects. Here are some examples. We can start off by creating a new `User` model:

``` python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True)

    def __init__(self, name, email):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<Name %r>' % self.name
```


We can create the object itself:

``` python
user = User('John Doe', 'john.doe@example.com')
db.session.add(user)
db.session.commit()
```

We can query objects:

``` python
all_users = User.query.all()
```

And we can delete objects:

``` python
user = User('John Doe', 'john.doe@example.com')
db.session.delete(user)
db.session.commit()
```

And that's all you need to know about setting up a Flask + Postgres app on Heroku.
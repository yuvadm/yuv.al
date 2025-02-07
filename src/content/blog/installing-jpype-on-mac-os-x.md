---
date: '2011-04-29'
layout: post
tags: null
title: Installing JPype on Mac OS X
---

By default, the [JPype](http://jpype.sourceforge.net) installation on Mac OS X
will fail with a GCC error.

In order to successfully install it, some changes need to be made to the
setup.py file:

  1. First, make sure you have some JDK (latest, preferred) installed
  2. Copy the root path of the latest JDK version you want to use (for example: /Developer/SDKs/MacOSX10.6.sdk/System/Library/Frameworks/JavaVM.framework/Versions/1.6.0/)
  3. Edit the setup.py file, like so:

In function `setupMacOSX()`, set:

    self.javaHome = '/Developer/SDKs/MacOSX10.6.sdk/System/Library/Frameworks/JavaVM.framework/Versions/1.6.0/'

and:

    self.libraryDir = [self.javaHome + "/Libraries"]

In function `setupInclusion()`, set:

    self.javaHome + "/Headers",

and:

    self.javaHome + "/Headers/" + self.jdkInclude,

Now you can run the install successfully. Enjoy.

Lion users - check out [http://stackoverflow.com/questions/8525193/cannot-install-jpype-on-osx-lion-to-use-with-neo4j](http://stackoverflow.com/questions/8525193/cannot-install-jpype-on-osx-lion-to-use-with-neo4j)
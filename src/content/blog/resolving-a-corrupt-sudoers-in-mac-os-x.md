---
date: '2012-01-06'
tags: null
title: Resolving a Corrupt sudoers in Mac OS X
---

During 28C3, I was being over-paranoid about the security of my laptop, and I
accidentally did something really really (really) stupid to my `/etc/sudoers`
file, I commented out this line:


    # User privilege specification
    root    ALL=(ALL) ALL
    # %admin  ALL=(ALL) ALL


See what I did there? No more `sudo` for my admin user. End of story. I
thought I was doomed. The only way to resolve this situation, essentially, is
to boot into some sort of safe mode with the Mac OS X installation disk.
Needless to say I didn't have it with me.

Luckily, Mac OS X is built in a way that allows resolving a corrupt `sudoers`,
exploiting the way the OS manages permissions. This method was first described
[here](http://blog.astrails.com/2009/9/29/how-to-fix-a-hosed-etc-sudoers-file-on-mac-osx), props to Astrails for the idea.

The idea is that the while the command line `sudo` works with the `sudoers`
file, the UI authentication does not.

![](https://upload.wikimedia.org/wikipedia/en/6/6f/Mac_OS_X_Authenticate.png)

Exploiting this, you can change the file permissions on `/etc/sudoers` without
needing `sudo` access. All you need to do is open a Finder window, `Shift-Cmd-G` and go to the `/etc` folder. From there, select the `sudoers` file and
open its info pane (`Cmd-I`). Scroll down to the Sharing & Permissions panel,
and unlock it using your admin password. You now can temporarily change the
file permissions such that you'll be able to edit it without `sudo` access.

Now all you need to do is fix the crap that you did to your `sudoers` file,
reset the permissions back to `440` and you're all set.

Next time, if you think you need to edit your `sudoers` file, **DO NOT**.
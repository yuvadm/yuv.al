---
date: '2011-05-02'
layout: post
tags: null
title: Feature-squash-rebase Flow
---

I have a new favorite flow in git. I call it **feature-squash-rebase**. It's
used for taking a feature branch, and applying all it's changes in one commit
onto the master HEAD.

It goes something like this. First, branch out for the new feature:

    git checkout -b feature

Hack away. Commit frequently. Once you're done, return to master:

    git checkout master

Now the magic begins. First, merge the feature branch onto master by using the
squash flag, this will meld all the commits into one giant commit:

    git merge --squash feature

Now you can review the huge diff, and commit when ready:

    git commit -m "new feature"

And once you got that down, reapply your commit onto the master HEAD by using
pull with the rebase flag:

    git pull --rebase

That's it. Push your changes to the rest of the team.

    git push

This flow is not necessary, but it keeps the history super-clean. I don't use
this for heavy features that I want to keep track of. But for short stuff,
this flow is a keeper.
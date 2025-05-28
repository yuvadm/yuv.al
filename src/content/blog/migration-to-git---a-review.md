---
date: '2011-07-29'
tags: null
title: Migration to Git - A Review
---

It's been almost 4 months since we've migrated our SVN repository over to Git.

**TL;DR;? We haven't looked back ever since.**

I can definitely say our workflow has much improved since the migration. We
spend less time merging, we spend less time fussing with SCM quirks, and we
are generally much more productive.

Our repository landscape is pretty simple - we have one authoritative
repository from which we push and pull the master codeline. Production servers
pull from that repository whenever we decide to trigger an update. Local
development branches are managed by the developers on their local machines.
Sharing development branches is something we don't do often, so we don't
directly push and pull branches between devs. Rather, we share them via the
central repo. This also allows us to pull those branches onto staging servers
when necessary (since the dev machines are not generally accessible from the
WAN).

So we're pretty much happy with git. Having that said, we have suffered some
backlash - which has pretty much all come from TortoiseGit. Half of our devs
run on Linux/Mac while the others use Windows. I won't lie, setting up and
running git on windows is (still) not an optimal experience. Windows devs are
generally not keen on running command line git, so they resort to TortoiseGit.
And as mentioned, TortoiseGit has lots of drawbacks. The main problem is that
the Tortoise workflow tries to emulate the classic SVN experience which maps
very badly to the git way of things.

The worst symptom we've experienced was [the infamous partial merge](http://www.randyfay.com/node/89). It boils down to a TortoiseGit user
committing a merge, but unknowingly deselecting files that are thought not to
be relevant ("I didn't touch those files, so the safest way is to not commit
them in the merge"). Bad, bad, **BAD**. In git terms this translates to "these
files should not be merged, so just dump MY version on top of the existing
one". Not only does this mean the you loose the existing changes, but this
means that **git will have no notion of these files ever changing**! This
always comes up with a question from another dev asking "hey, where did my
changes go?" followed by "the logs don't show any changes, but my code isn't
here!". This is by far the worst problems we've had and they have no solution
other than educating each dev that "when doing merge commits, always commit
all files, even if their not yours".

All in all, we are very happy with git - and 4 months into the migration we
can definitely say it has improved our workflow and increased our
productivity.
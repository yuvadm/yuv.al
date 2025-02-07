---
date: '2011-07-20'
layout: post
tags: null
title: Data Mining the Israeli Population Census
---

Fact - the Israeli population census database is freely available for download
on the internet. Allow me to reiterate - **the personal details of every
Israeli citizen are up for grabs** to anyone with an internet connection.

This database contains all the personal data on every citizen in Israel, and
by law should not be available to anyone outside of official government
offices. This, however, is not the case. Since 2001, the census database has
been constantly - illegally - leaked, at least 5 different times. The first
version was distributed under the name "Dvash", while other versions were
named "Rishumon" and "Agron", after the software that allowed for categorized
searches on the database. Searches on the database could be done using various
parameters, including ID number, full or partial name, date of birth, parents,
partners, location, phone number and marital status - and any combination of
those.

The Israeli government claims that the database leakage has been of partial
and incomplete data. The evidence shows otherwise. **All** Israeli citizens
can be found in the leaked databases. This has been the case in every single
version that has leaked over the years. This problem is obviously a systematic
one.

The Israeli Police has investigated the issue several times, and although it
is clear that there is ongoing leakage of the database, investigations turned
up no suspects. Furthermore, [Israel has recently passed an extremely controversial bill allowing for the government to create a national biometric database](http://www.ynetnews.com/articles/0,7340,L-3816629,00.html). This
bill has been met with extreme public criticism, both about the bill itself as
well as with regards to the way it has been passed, hidden from the public
eye, and with no public debate. If up until now the state has failed to secure
its most intimate data, who's to guarantee this fiasco won't happen again?

Nevertheless, currently available data has many interesting uses, besides
locating your high school crush. I'd like to outline some potential
applications that can make use of this data - some of which I may, or may not,
have implemented myself.

**Statistics** - the Israeli Central Statistics Bureau publishes yearly data about the Israeli population. But certain esoteric queries, that are not made public, might be of interest:

  * name popularity by date of birth
  * ID number distribution (ID numbers are not distributed uniformly, and are usually segmented into ID blocks that are sequential inside a specific timeframe)
  * population density (mapping household addresses onto a geographic map)
  * verifying whether [Benford's Law](http://en.wikipedia.org/wiki/Benford%27s_law) applies to the database

**Diffing** - ([def'n](http://en.wikipedia.org/wiki/Diff)) As previously mentioned, the database has been leaked at least 5 times over the past decade. This opens up an interesting angle of investigation. Citizens are never removed from the database. Deceased persons are simply marked as such, but still exist in the database. But by diffing (comparing) different versions of the database, interesting anomalies do show up - _entire families have been erased from the database_. The reason for these discrepancies are unknown, and can only be speculated. A likely explanation is that said deleted persons are families of covert operatives, possibly Mossad agents. This phenomenon has been dubbed [The Redactor's Dilemma](http://www.juliansanchez.com/2009/12/08/the-redactors-dilemma/), and in the context of Israel can also be found in satellite imagery censorship (expect a separate post re: that issue).

**Social Graph** - individual data is, generally, not as interesting as the big picture. Assuming each citizen is a dot, and assuming parental ties are part of the database, lines can be drawn between a person and his parents - rendering the entire paternity graph of the Israeli population. Very simple computer algorithms are able to find the shortest links between dots on a graph. Thus, questions such as "How are X and Y most closely related?" can be answered within seconds (i.e. [Six Degrees of Separation](http://en.wikipedia.org/wiki/Six_degrees_of_separation)). Unfortunately, the Israeli population database is lacking in this aspect, for two reasons. First, Israel exists for only 63 years. Any person which was not a citizen of Israel at that time could not be recorded in the database. Furthermore, the recording of ID numbers of parents has not been consistent during the years. Current data shows that parental links can be traced back, at most, to grandparents. Thus, family links can only be traced as far as cousins (X -> parent -> grandparent -> uncle (parent sibling) -> cousin Y). Nevertheless, interesting data can still be extracted from the partial social graph.

It is important to note that the data, in the distributed form, is not readily
available for these uses, since it is in a proprietary format. However,
extraction of this data for advanced uses is not difficult for a person with
moderate technical knowledge.

Once the raw data is extracted, the options are endless. Any person with
intentions, both good and bad, can use this data as he sees fit. This is
clearly an issue for the Israeli people. The leaked data cannot be recovered.
We must see that we are able to secure our databases, and that only the
minimal amount of citizen data is collected.

Names and address can always change. Biometric data is with us from the moment
we are born to the moment we die. There is no room for mistakes.

Support the fight against the biometric database.
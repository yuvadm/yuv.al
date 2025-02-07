---
date: '2020-05-28'
title: Setting Up New Domains
---

There are many different ways to set up an entire infrastructure around a new domain name. In the past few months I've went through the entire process with several new projects and thought it makes sense to document some choices I've made for anyone who's facing similar setups.

## Domain Registration

Setting up a new domain name starts with... well... registering a new domain name. For most cases I prefer to use [Namecheap](https://www.namecheap.com/) which is a relatively solid domain name registrar that supports a large amount of TLDs, as cheap or as expensive as they come. Any other registrar you feel comfortable with would be equally fine. Probably the only real thing you should consider is security. Since your domain registration service has full control over your domain, having Two-Factor Authentication (2FA) enabled on your account is a must.

Once the domain is registered, I immediately change the nameservers to a proper DNS service which we'll cover in the next section.

## DNS

So let's talk DNS records. I prefer to keep a separation of responsibilites, and while domain registration services are good at what they do, DNS should be handled by more robust services. [Cloudflare](https://www.cloudflare.com/) is the obvious choice as it provides world-class DNS services with extremely fast propagation times. You can use the free plan, host your DNS records there, and not have to worry about anything else, even if you don't use their capabilities as a CDN or a DDoS mitigation service.

Another important feature with using Cloudflare as a DNS service, is their support for root domain CNAME flattening, which will be important in the next step.

In the past I've also used [AWS Route 53](https://aws.amazon.com/route53/) which is an equally good DNS service if you're already using AWS, but consider it does cost some money and requires you to setup billing on an AWS account. $0.5/month per hosted zone (i.e. domain) isn't much, but it starts to add up with each additional domain, and for no good reason IMO.

Keep in mind that using modern DNS services such as Cloudflare or Route53 enables you to use secure API access to update DNS records, which you can then use in Dynamic DNS scenarios. OpenWRT, for example, has native `ddns` scripts that work well with both services, although many others are supported as well.

Finally, Cloudflare also has native support for DNSSEC. Sure, not many services need it, but for those who do it's great to have support for it.

## Static Web Content

So you have a domain name set up with proper DNS records, probably the first thing you'll want is some form of a landing page. Running your landing page on [Netlify](https://www.netlify.com/) using the so-called [*Jamstack*](https://www.netlify.com/jamstack/) is the fastest and most modern way you can get a basic web page up and running at literally zero cost. This is a relatively new tool for me, but I've grown to like it a lot. The process looks something like this:

  1. Hack up some basic HTML page
  2. Commit it to a git repository and push it to Github
  3. Connect Netlify to that repository, you don't even need any build step if it's just an HTML page
  4. Point your root domain and `www.` subdomain to your new `foo.netlify.app` domain
  5. Done

Any changes to the page that are pushed to Github will be built and deployed auto-magically on Netlify.

Obviously, Netlify supports much more advanced setups. Say what you want about Javascript - I probably agree with it all - but the simplicity of the *Jamstack* is very compelling.

## Mail

At some point you'll want to receive and send e-mail on your domain. While most people would probably go with something like Gsuite, I much prefer to use a proper e-mail service such as [Fastmail](https://www.fastmail.com/) which has been nothing short of fantastic. For a few dollars a month you get a robust e-mail service that you can connect to any custom domain of your choice. You can set up wildcard addresses that all route to your inbox, or set up custom aliases and route them to any other address you like, even those that are external to Fastmail in the case of any project collaborators.

The only setup you actually need to do is connect `MX` records to Fastmail's SMTP servers, and then setup the proper `DKIM` and `SPF` records on the domain to ensure you get full deliverability.


## Conclusion

Next time you set up a new domain, take a look at the default services you are using. They might not be as convenient, as cheap, or as secure as you think. Especially if you are using some shared hosting provider that counts on you not knowing what you are doing.

There are modern web infrastructure services available to you, often at no charge, and you'd be much better off giving them a try.
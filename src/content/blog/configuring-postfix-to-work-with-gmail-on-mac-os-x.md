---
date: '2012-01-11'
tags: null
title: Configuring postfix to work with Gmail on Mac OS X
---

One of the things I'm sorry I didn't do earlier is setup postfix on my Mac,
such that I'll be able to send quick emails (not to mention git patches)
directly from command line.

As we all know, sending emails directly from your machine is a sure way to get
yourself blacklisted as spam. So using an SMTP relay is pretty much required.
But since my main email account is hosted on Gmail, and I want to be able to
connect securely to Googles SMTP servers, this requires some configuration.

First thing's first, add your authentication details to the relay. If you're
using Gmail, this goes like this, create a new file:

    
    sudo vi /etc/postfix/relay_password
    

And add the auth details to it, just one line:

    
    smtp.gmail.com:587 your_user_name@gmail.com:your_password
    

Next, we need to generate a lookup DB from these details:

    
    sudo postmap /etc/postfix/relay_password
    

And make sure the `relay_password.db` file has been generated.

Now it's time to update the `main.cf` configuration file. You might want to
keep a backup before you add the following changes. First, check that the line

    
    tls_random_source = dev:/dev/urandom
    

exists in the file and is not commented out, this should be the case by
default. Now here's the main logic which you can simply append to the end of
the file:

    
    relayhost = smtp.gmail.com:587
    
    smtp_sasl_auth_enable = yes
    smtp_sasl_password_maps = hash:/etc/postfix/relay_password
    smtp_sasl_security_options = noanonymous
    
    smtp_tls_security_level = may
    smtp_tls_CApath = /etc/postfix/certs
    smtp_tls_session_cache_database = btree:/etc/postfix/smtp_scache
    smtp_tls_session_cache_timeout = 3600s
    smtp_tls_loglevel = 1
    

The last thing we need to do is setup the root SSL certificate that Google
uses, which is the Thawte Premium Server CA. First:

    
    sudo mkdir /etc/postfix/certs && cd certs
    

Then, download the PEM file:

    
    sudo wget https://www.thawte.com/roots/thawte_Premium_Server_CA.pem
    

Now we need to run a rehash on the PEM file:

    
    sudo c_rehash /etc/postfix/certs/
    

And that's it! Give it a test run, and hopefully you'll receive an e-mail
strongly authenticated and relayed from your Gmail account:

    
    echo "Relay Test" | mail -s "Relay Testing" test_recipient@domain.com
    

As an extra added bonus, you might want to set your hostname to something more
descriptive than `mymachine.local` by adding this line to the `main.cf`:

    
    myhostname = some-domain-i-own.com
---
layout: post
title: "Let's Encrypt will begin issuing Wildcard Certificates Coming January 2018!!"
date: 2017-07-07
author: "mobihack"
category: "Server-Management"
tags: [HTTPS,SSL,TLS,wildcard,certificate]
comments: true
image:
  path: /static/article-pics/wildcard-availability-lets-encrypt.png
  height: 800
  width: 800
toc: false
---

Let's encrypt has posted in their blog that they will begin issuing wildcard certificates in January of 2018. Wildcard certificate was a commonly requested feature in their support community. It's wonderfull to see that they understand that they make HTTPS deployment easier. Their hope is that offering wildcards will help to accelerate the Web’s progress towards 100% HTTPS.

For the uninitiated, Let's Encrypt is a certificate authority that launched on April 12, 2016, that provides free X.509 certificates for Transport Layer Security (TLS) encryption via an automated process designed to eliminate the current complex process of manual creation, validation, signing, installation, and renewal of certificates for secure websites.

Let’s Encrypt is currently securing 47 million domains via their fully automated DV certificate issuance and management API. This has contributed heavily to the Web going from 40% to 58% encrypted page loads since Let’s Encrypt’s service became available in December 2015.

For the non-tech people out there, A wildcard certificate can secure any number of subdomains of a base domain (e.g. *.example.com). This allows administrators to use a single certificate and key pair for a domain and all of its subdomains, which can make HTTPS deployment significantly easier.

The new wildcard certificates will be offered free of charge via the upcoming [ACME v2 endpoint](https://letsencrypt.org/2017/06/14/acme-v2-api.html).

If you’re excited about wildcard availability, please for the love of God, donate to their [summer fundraising campaign](https://letsencrypt.org/donate/). They are a non-profit organization that exists thanks to the support of the community.

Source:
* [Let's Encrypt: Blog](https://letsencrypt.org/2017/07/06/wildcard-certificates-coming-jan-2018.html)
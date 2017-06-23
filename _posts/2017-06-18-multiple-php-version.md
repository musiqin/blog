---
layout: post
title: "How to setup multiple PHP versions on Apache"
date: 2017-06-18
author: "mobihack"
category: Server Management
tags: [linux,bash,apache2,php]
comments: true
image:
  path: /static/article-pics/multiple-php-version.png
  height: 800
  width: 800
---


Developers like to running on bleeding edge technologies embracing the latest features a man can get. But, in the world of web development, one of the biggest problems we face is [version fragmentation](https://en.wikipedia.org/wiki/Market_fragmentation#Version_fragmentation) of PHP. Personally, I had seen people use PHP 5.2 being used long after PHP 7.0 was released. But talking to clients to upgrade their PHP version results in them saying that their site works just fine.  So a need arises to use multiple PHP versions to test or to simply debug your software.

## The Solution

The solution I use personally is to run multiple PHP Versions with Apache. We can do this easily using Docker. But that's a story for another day. Today, we will:

* Install Apache.

* Install multiple PHP versions.

* Test them

* And finally, Switch between them with ease.

## Get Started

* We will be installing Apache 2.4.
* We will be installing PHP versions: 5.6, 7.0, and 7.1.
* We will be installing PHP as CLI and as an Apache Module (You can skip CLI if you don't want to).
* We will be using Ubuntu 16.04 (Debian).

## Installing Apache
Installing Apache is relatively easy:

```apt-get -y install apache2```

## Start Apache

```sudo service apache2 restart```

> You may need to configure your firewall service to enable web traffic through specific ports like 80(http), and 443(https).

## Install PHP

We will be using PPA from *[ondrej](https://launchpad.net/~ondrej/)*. His repository contains PHP versions PHP 5.6, 7.0, and 7.1. He compiles and pushes his packages without monetary incentives. So, if you can please [donate some money](https://donate.sury.org/).

Add PPA:

```
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
```

Install PHP 5.6

```
sudo apt-get install -y php5.6 libapache2-mod-php5.6 php5.6-cli php5.6-common php5.6-mbstring php5.6-gd php5.6-intl php5.6-xml php5.6-mysql php5.6-mcrypt php5.6-zip
```

Install PHP 7.0

```
sudo apt-get install -y php7.0 libapache2-mod-php7.0 php7.0-cli php7.0-common php7.0-mbstring php7.0-gd php7.0-intl php7.0-xml php7.0-mysql php7.0-mcrypt php7.0-zip
```

Install PHP 7.1

```
sudo apt-get install -y php7.1 libapache2-mod-php7.1 php7.1-cli php7.1-common php7.1-mbstring php7.1-gd php7.1-intl php7.1-xml php7.1-mysql php7.1-mcrypt php7.1-zip
```

## Testing

Open your terminal window and type:

`php5.6 -v`

`php7.0 -v`

`php7.1 -v`

Each command will show the detailed PHP Versions.
To know the default (currently used) PHP version:

`php -v`

You can also create a PHP file in your document root with `phpinfo()` function.

## Switch PHP Versions

You can easily change the modapache version by using this:

```
sudo a2dismod php5.6
sudo a2dismod php7.0
sudo a2enmod php7.1
sudo service apache2 restart
```


But this won't change your PHP-CLI version. For that you have to change symlinks for PHP bin path. It's risky for new users to change these things. So, I had created a bash script to automate this.
[PHP Version Switcher](http://github.com/mobihack/phpversionswitcher/)
It's a simple piece of code that searches for the installed PHP versions, show the list to user, and change the PHP version according to user input. You are free to collaborate, improve, and use the script however you want.

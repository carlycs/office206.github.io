---
layout: post
title:  "setting up a mail server manually"
date:   2015-01-14 16:39:11
categories: tutorials
published: true
comments: true
---

### Setting the Email Server Manually
#####(instead of using private email services from your DNS)
 Ref. http://flurdy.com/docs/postfix/
 
	sudo vi /etc/apt/sources.list
	sudo apt-get update
	sudo apt-get upgrade 

	sudo apt-get install vim lynx curl git
	sudo apt-get install mutt

	sudo dpkg --list | grep postfix
	apt-cache search postfix

	sudo apt-get install shorewall shorewall-doc
	sudo apt-get install shorewall shorewall-doc
 for earlier ubuntu versions use package shorewall-common shorewall-perl shorewall-doc instead

	sudo cp /usr/share/doc/shorewall/default-config/interfaces /etc/shorewall/;
	sudo vi /etc/shorewall/interfaces
	net     eth0            detect          	dhcp,tcpflags,logmartians,nosmurfs
	sudo cp /usr/share/doc/shorewall/default-config/zones /etc/shorewall/;
	sudo vi /etc/shorewall/zones
 fw	firewall
 
 net     ipv4

	sudo cp /usr/share/doc/shorewall/default-config/hosts /etc/shorewall/;
	sudo vi /etc/shorewall/hosts
 

#### and for the shahshisha domain

	cd /var/www/html
	echo $PWD
	chmod -R 755 *

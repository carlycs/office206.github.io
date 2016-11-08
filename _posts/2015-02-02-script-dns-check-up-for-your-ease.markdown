---
layout: post
title:  "A DNS check up link for your ease"
date:   2015-02-02 16:39:11
categories: Systems
published: true
comments: true
---
#A DNS check up link for your ease:



Display Current Config for all NIC's:
	ifconfig
Display Current Config for eth0: 
	ifconfig eth0
	
	ifconfig eth0 192.168.1.2
	ping -c 3 192.168.1.1
	
Enable network card:

	 ifconfig eth0 up
	 traceroute www.whatismyip.com
	 tracepath www.whatismyip.com
	 host www.whatismyip.com
	 dig www.whatismyip.com
	 host 66.11.119.69
	 dig -x 66.11.119.69
If you want to view current routing table:
	 
	 route "or" route -n

View arp cache:
	
	 arp "or" arp -n

Reference: <http://www.whatismyip.com/linux-ip-commands/>

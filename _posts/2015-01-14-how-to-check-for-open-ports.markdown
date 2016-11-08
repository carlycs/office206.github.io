---
layout: post
title:  "How to check if a port is open for your remote server"
date:   2015-01-14 09:40:10
categories: Systems
published: true
comments: true

---
#How to check if a port is open for remote systems
Ref. <http://serverfault.com/questions/188429/how-to-check-if-a-port-is-open-for-remote-systemubuntu>

	telnet host 22
	telnet host 23
	nmap host
    

The script that could further clean out nmap:
The return value tells you wheter the port is open or not.

	nmap example.com -p 22 -sV --version-all -oG - | grep -iq '22/open'

Setting up the ClickODesk.

	https://my.clickdesk.com/install
	<!-- ClickDesk Live Chat Service for websites -->
	<script type='text/javascript'>
	var _glc =_glc || []; 	_glc.push('all_ag9zfmNsaWNrZGVza2NoYXRyDwsSBXVzZXJzGJa3m74IDA');
	var glcpath = (('https:' == document.location.protocol) ? 'https://my.clickdesk.com/clickdesk-ui/browser/' : 
	'http://my.clickdesk.com/clickdesk-ui/browser/');
	var glcp = (('https:' == document.location.protocol) ? 'https://' : 'http://');
	var glcspt = document.createElement('script'); glcspt.type = 'text/javascript'; 
	glcspt.async = true; glcspt.src = glcpath + 'livechat-new.js';
	var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(glcspt, s);
	</script>
	<!-- End of ClickDesk -->

Picked a template from:
<http://html5up.net/aerial>

Registered with ClickDesk. Logged in as Admin and made it look like this:
screen shot saved on desktop

How to scp  a file from an Amazon ec2 to local

To upload a file from your laptop to Amazon instance:

	$scp -i ~/Desktop/amazon.pem ~/Desktop/MS115.fa  ubuntu@ec2-54-166-128-20.compute-1.amazonaws.com:~/data/

Similarly, to download a file from Amazon instance to your laptop:

	$scp -i ~/Desktop/amazon.pem ubuntu@ec2-54-166-128-20.compute-1.amazonaws.com:/data/ecoli_ref-5m-trim.fastq.gz ~/Download/

REFERENCE:

<http://angus.readthedocs.org/en/2014/amazon/transfer-files-between-instance.html>

<https://squareup.com/reader>
<http://itshoofar.com/gholghol/ihooka.html>

fixing the font
<http://www.elementsvillage.com/gallery/showimage.php?i=1346>

fixing the font issue on the template:
<http://www.fontpalace.com/font-download/TrajanPro-Bold%2BOTF/>

<http://itshoofar.com/gholghol/ihooka.html>
oldest snapshot on the screen

settting up the httpd:
<http://coenraets.org/blog/2012/01/setting-up-wordpress-on-amazon-ec2-in-5-minutes/>



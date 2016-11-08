---
layout: post
title:  "Settting up mysql on RHEL 7"
date:   2015-01-15 13:55:11
categories: Systems
published: true
comments: true
---
 #Settting up mysql on RHEL 7
 
 The server RPM places data under the /var/lib/mysql directory. The RPM also creates a login account for a user named mysql (if one does not exist) to use for running the MySQL server, and creates the appropriate entries in /etc/init.d/ to start the server automatically at boot time. (This means that if you have performed a previous installation and have made changes to its startup script, you may want to make a copy of the script so that you do not lose it when you install a newer RPM.
 
Resource:
 
 <http://dev.mysql.com/doc/refman/5.7/en/linux-installation-rpm.html>
 install mysql for RHEL 7 rpm terminal command:
 <http://www.cyberciti.biz/faq/how-to-install-mysql-under-rhel/>
 
 Redhat Enterprise Linux - RHEL 5 / 6 MySQL installation

Type the following command as root user:

	yum install mysql-server mysql

Redhat Enterprise Linux - RHEL 4/3 MySQL installation

Type the following command as root user:

	up2date mysql-server mysql
	Start MySQL Service

To start the mysql server type the following command:

	chkconfig mysqld on
	/etc/init.d/mysqld start

managing rpm files the basics
<http://www.cyberciti.biz/faq/rhel-redhat-fedora-opensuse-linux-install-rpmfile-command/>

<http://tecadmin.net/install-mysql-on-centos-redhat-and-fedora/>
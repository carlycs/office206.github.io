---
layout: post
title:  "Setting Up a simple webhosting on Amazon EC2 tier 1 in 5 minutes"
date:   2015-02-12 18:19:01
categories: Systems
comments: true
published: true
---

Setting Up WordPress on Amazon EC2 in 5 minutes

 


Step 1: Create an AWS Account

dress (and a path to your .pem file) to ssh into your instance:

    ssh ec2-user@ec2-50-17-14-16.compute-1.amazonaws.com -i ~/christophe.pem

If you get a message about your .pem file permissions being too open, chmod your .pem file as follows:

    chmod 600 ~/christophe.pem

Many of the shell commands below require root access. To avoid having to prefix these commands with sudo, let’s just switch user once and for all:

sudo su

Step 4: Install the Apache Web Server

	
	yum update -y
	yum install httpd
	service httpd start

To test your Web Server, open a browser and access your web site: http://ec2-50-17-14-16.compute-1.amazonaws.com (Use your actual public DNS name). You should see a standard Amazon place holder page.

Step 4.5: Install MySQL Server
	
	yum install mysql-server
	service mysql start
	
for a production mysql: <https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-centos-6>

Step 5: Install PHP

To install PHP, type:

	yum install php php-mysql

Restart the Apache Web Server:

    service httpd restart

Create a page to test your PHP installation:
	
    cd /var/www/html
	vi test.php

Type i to start the insert mode
Type <?php phpinfo() ?>
Type :wq to write the file and quit vi
Open a browser and access test.php to test your PHP installation: http://ec2-50-17-14-16.compute-1.amazonaws.com/test.php (Use your actual public DNS name).

Step 6: Install MySQL

	yum install mysql-server
    service mysqld start

Create your “blog” database:

	mysqladmin -uroot create blog

Secure your database:
	
    mysql_secure_Installation

Answer the wizard questions as follows:

Enter current password for root: Press return for none
Change Root Password: Y
New Password: Enter your new password
Remove anonymous user: Y
Disallow root login remotely: Y
Remove test database and access to it: Y
Reload privilege tables now: Y
Step 7: Install WordPress

To Deploy your website, type:

	cd /var/www/html

This is where your index.html files goes.

	sudo service httpd start

	[ec2-user ~]$ sudo service httpd start
	Starting httpd:                                            [  OK  ]
Use the chkconfig command to configure the Apache web server to start at each system boot.

	[ec2-user ~]$ sudo chkconfig httpd on

source:

http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html


Getting the name of the machine
You can see the complete information with the following command:

	$ uname -a

Sample outputs:

	Linux example.cyberciti.biz 2.6.32-220.2.1.el6

Find Red Hat Linux or CentOS Linux distribution version

Type the following cat command:

	 cat /etc/redhat-release

Sample outputs:

	Red Hat Enterprise Linux Server release 6.2 (Santiago)
Or you can use lsb_release command as follows:

	$ lsb_release -a

.x86_64 #1 SMP Tue Dec 13 16:21:34 EST 2011 x86_64 x86_64 x86_64 GNU/Linux




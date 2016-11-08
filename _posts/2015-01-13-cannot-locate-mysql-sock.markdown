---
layout: post
title:  "Treating the Error: Cannot locate mysql.sock"
date:   2015-01-13 10:04:16
categories: Systems
published: true
comments: true
---
#What are the causes for access denied to a PHP server?

I have an old blog on Anchor that runs on PHP on RHEL 6 and since I migrated to RHEL 7 I cannot locate mysql.sock for a 3.10.0-123.8.1.el7.x86_64 #


```"Connect failed: Access denied for user 'root'@'localhost' (using password: YES)" ```


To find out where the socket file is, you can use this script:

    mysql
    shell> netstat -ln | grep mysql
    mysql -u root test
    mysql -u root mysql
    mysqladmin --no-defaults -u root version
    mysqladmin -u root -pxxxx ver
    vim  /etc/mysql/ my.cnf 
    
Set it to: socket=/var/lib/mysql/mysql.sock

    mysqladmin -u root -p status
    sudo chmod -R 755 /var/lib/mysql/
    sudo /etc/init.d/mysql restart



References:
<http://dev.mysql.com/doc/refman/5.5/en/access-denied.html>
<http://stackoverflow.com/questions/5376427/cant-connect-to-local-mysql-server-through-socket-var-mysql-mysql-sock-38>



---
layout: post
title:  "Ancher crashing after migration to RHEL7"
date:   2015-01-25 16:39:11
categories: Systems 
published: true
comments: true
---
#How to Get an OLD SQL to work on ec2 RHEL6

Uncaught Exception


Well you can try it or just check out the Error Log below <http://www.itshoofar.com/blog/index.php>


![screenshot icon](BLog/img/screenshot101.png)

<PRE>
could not find driver
system/database/connectors/mysql.php on line 54


0 /var/www/html/blog/system/database.php(34): System\Database\Connectors\Mysql->__construct(Array)
1 /var/www/html/blog/system/database.php(56): System\Database::factory(Array)
2 /var/www/html/blog/system/database/query.php(104): System\Database::connection()
3 /var/www/html/blog/anchor/libraries/anchor.php(43): System\Database\Query::table('anchor_meta')
4 /var/www/html/blog/anchor/libraries/anchor.php(19): Anchor::meta()
5 /var/www/html/blog/anchor/run.php(37): Anchor::setup()
6 /var/www/html/blog/system/start.php(21): require('/var/www/html/b...')
7 /var/www/html/blog/index.php(33): require('/var/www/html/b...')
8 {main}

</PRE>
---
layout: post
title:  "Hadoop-part one"
date:   2015-03-01 20:20:11
categories: Systems
comments: True
published: false
---

#Going Over the hadoop setup for R 




We recently received a VM from an industry partner that has a CDH 4.5 installed. I started one node of this two-node cluster, but I got errors in the NameNode, JobTracker, EventServer, and Accumulo tablet server logs. Log excerpts are:


	org.apache.hadoop.security.UserGroupInformation:  PriviledgedActionException as:mapred (auth:SIMPLE) cause:org.apache.hadoop.hdfs.server.namenode.SafeModeException: Cannot set permission for /tmp/mapred/system. Name node is in safe mode.


My first thought was it should be the same Issues I had in the past with Kerberos for permissions.
I started with:

a. Checking if the VM has Kerberos activated.
b. How/If it's usually quite problematic with R/W permissions on HDFS.
 
#### The list to go over
1.  R/W permissions on HDFS
2.  Kerberos for permissions


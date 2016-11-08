---
layout: post
title:  " Infini band check zobmi jobs"
date:   2015-02-09 12:49:21
categories: Systems
comments: true
published: true
---
Zombie jobs


We know that two major applications: Gromacs and VASP can have zombie jobs. We don't know at this point if this is due to hardware or software.
Here is a sample time-stamp of a Zombie Job:
<HTML><PRE>
Job ID: 4340827
Initiated: Feb 27, 22:50 hrs
Last Updated: Feb 28, 18:20 hrs
Directory path: /gpfs/home/gzk123/work/VASP/Bert/Au/Au35/NH3/OCH3/TS_n-2/
Nodes: exec_host =
lionxg90/12+lionxg140/13+lionxg137/5+lionxg132/10+lionxg104/1+

lionxg102/7+lionxg99/12+lionxg98/4+lionxg47/4+lionxg43/6+lionxg39/14+l
        ionxg37/3+lionxg36/0+lionxg30/11+lionxg28/5+lionxg26/3
</PRE></HTML>

You can observe that the jobs stopped producing output on Feb 28, even
though they appear to be still running on the LionXG queue.  It's not easy to  understand the problem from the PBS portal, to a system admin the jobs are running for almost 4 days now while they are not producing any output.

Checking the Infini band traffic between different nodes.


	#PBS -l nodes=4:ppn=8:dell

	#PBS -l nodes=4:ppn=8:hp


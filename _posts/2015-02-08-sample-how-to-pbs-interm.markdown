---
layout: post
title:  "How to PBS Level Intermidiate"
date:   2015-02-08 10:30:10
categories: Systems
published: true
comments: true
---
#How to PBS Level Intermidiate

So if you are still starting with PBS but need something more than just a starter kit, this script is very handy. Run it and see what it does:

    #PBS -V
    #PBS -l nodes=2:ppn=3
    #PBS -l walltime=00:10:00
    echo Running on host `hostname`
    echo Time is `date`
    echo Directory is `pwd`
    echo This jobs runs on the following processors:
    echo `cat $PBS_NODEFILE`
    cp $PBS_NODEFILE pbs_nodefile
    set NPROCS = `wc -l < $PBS_NODEFILE`
    echo This job has allocated $NPROCS nodes
    cd $PBS_O_WORKDIR
    set job=0
    if($job == 0) then
        echo "rm info*.log"
        rm info*.log
    endif
    if(-e mubrex_job$job.cntrl) then
    	echo "will be running mubrex_job$job.cntrl"
    mubrex_biowulf_12procs.pl mubrex_job$job.cntrl
    else
    	echo "error: mubrex_job$job.cntrl does not exist"
    endif


---
layout: post
title:  "How to work R with Torque/PBS"
date:   2015-02-06 16:39:11
categories: Systems
published: true
comments: true
---
#How to work R with Torque/PBS


HBA_Nm1_v3.pbs
referenced to ecc_heir_rayleigh_v3.R
hk_R1_good_10.dat

	#!/usr/bin/perl 

	################################################## 
	# Set PBS environment variables
	# These can be overridden on command line
	# E.g., qsub -N demo_2.0 demo_ben.pbs 
	################################################## 
	###PBS -N Nm1=1.dat
	#PBS -m abe
	#PBS -M mshabram@astro.ufl.edu
	#PBS -l walltime=24:00:00
	#PBS -l nodes=5:ppn=1
	#PBS -l pmem=1200mb
	#PBS -l vmem=10000mb
	print (STDOUT "Hello\n");

	################################################### 
	# Read PBS environment variables into Perl ariables
	###################################################
	if(2>1) {
	$username  = $ENV{'PBS_O_LOGNAME'};
	$homedir   = $ENV{'PBS_O_HOME'};
	$workdir   = $ENV{'PBS_O_WORKDIR'};  # directory job submitted from
	$inputdir  = $workdir;
	$jobname   = $ENV{'PBS_JOBNAME'};
	$jobid     = $ENV{'PBS_JOBID'};
	$shortjobid = $jobid;
	# Get name of node that is executing the job
	$exechost  = `hostname`;
	chomp($exechost);
	$shortexechost = $exechost;
	}

	##################################################
	# Get a parameter value to use from job name 
	# (can be specified on qsub command line)
	# qsub -N demo_a=1.25 demo_ben.pbs
	##################################################  
	if($jobname =~ /^(\w+)=(\w+\.dat)/)   
	{  
    $a = $2;
	}
	#else
	#{ die("The PBS Job name should have the format demo_a=X, where X is the alpha parameter (whatever that does).\n"); }
	#$a = "hk_R3_best_1.dat";
	$workdir = "/gpfs/home/mus336/group/mshabram/EccentricityDistribution-master";
	chdir($workdir);
	print( STDERR "running on $exechost\n");
	print( STDOUT "Hello?\n");
	print( STDERR "Hello?\n");
	system("cd $workdir; pwd;");
	print(STDOUT "Starting\n");
	print(STDERR "Starting\n");
	system("module load R/3.0.2; date; R --no-save --args $a < jags_tests/	ecc_heir_rayleigh_v3.R ; date");
	print(STDOUT "Goodbye\n");
	print(STDERR "Goodbye\n");




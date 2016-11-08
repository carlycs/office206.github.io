---
layout: post
title:  "How to install R packages with a script"
date:   2015-02-07 10:30:11
categories: R
published: true
comments: true
---
#How to install R packages with a script

First we create an script that gets the names of the libraries from another list and installs them as well as their dependencies- if existent. 


	pack.list <- Sys.getenv("PACKAGE_NAME")
	pack.list
	library(as.string(pack.list))
 
	installed.packages(as.string(pack.list)) # , dependencies=TRUE, repo="http://cran.rstudio.com/")



r.install.sh


	#!/bin/bash
	#===============================
	#DOCUMENTATION
	#this script installs the packges passed by inline on all version of R available on a node.
	#Then logs the isntallation process in log file, dated and versioned 
	#And finally passes the name of added package to a repository (txt file) of installed packages with the #ollowing Format:
	#Package Name | Rversion | parcakge verison | date installed machine confuge- isntallation line|
	#usabilty: 
	#r.install msm
	#package no quotes
	#Example r.install  -ver 3 msm
	#would install msm on all major versions of 3 of R.
	#================================

	r_module_path="/usr/global/Modules/current/modulefiles/R"
	
	for ver in 3.0.1;do    #$( ls $r_module_path); do
	echo "module loaded: $ver"
	echo "==================="	
	module purge
	module load R/$ver
	module list
	pwd
	export PACKAGE_NAME=$1
	R --no-save --no-restore < install_instruc > log_R_$ver_$(date +%h-%d).out
  
  #pass it to R here
 
	pack.list <- Sys.getenv("PACKAGE_NAME")
	module unload R/$ver
	module list
	echo "stepping out of the module"
	echo "" 
	done

After a run:
For the install.instruc

	pack.list <- Sys.getenv("PACKAGE_NAME")
	pack.list
[1] "msm"

	library(as.string(pack.list))




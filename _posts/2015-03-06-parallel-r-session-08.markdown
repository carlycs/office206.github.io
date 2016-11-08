---
layout: post
title:  "Parallel R- Session-8"
date:   2015-03-05 15:47:10
categories: R
comments: true
published: true
---
#Codes for Parallel R Tutoriol Session-8

{% highlight R %}
#example Rmpi 
library(snow) 
library(Rmpi) 
cl <- 
makeMPIcluster(5) 
r <- clusterEvalQ(cl, 
R.version.string) 
print(unlist(r)) 
stopCluster(cl) 

  
{% endhighlight %}

{% highlight bash %}
#!/bin/sh 
#PBS -N SNOWMPI 
#PBS -j oe 
cd $PBS_O_WORKDIR 
module load R/3.0.1
module load mpi
time R --no-restore --no-save parallelR.R  output_parallel.out

{% endhighlight %}


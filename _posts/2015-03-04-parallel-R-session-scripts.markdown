---
layout: post
title:  "Parallel R workshop scripts"
date:   2015-03-04 16:51:20
categories: R
comments: true
published: true
---
#Parallel R workshop scripts

listed files:
brute_R.in

parallel_R_tut.R

parallel_R_tutorial_dev.R

PBS_par_R.txt

push_R.in

{% highlight R %}
library("Rmpi")

# It's 10-fold cross-validation.  As a brute force method, we will
# divide the problem into 10 sub-problems, each being a different
# fold, and a slave will be spawned to handle each.  To that end, 
# we spawn 10 slaves
mpi.spawn.Rslaves(nslaves=5)

if (mpi.comm.size() != 5) {
  print("Please initialize an MPI cluster of at least 10 processors.")
  print("Then, try again")
  mpi.quit()
}

.Last <- function(){
  if (is.loaded("mpi_initialize")){
    if (mpi.comm.size(1) > 0){
      print("Please use mpi.close.Rslaves() to close slaves.")
      mpi.close.Rslaves()
    }
    print("Please use mpi.quit() to quit R")
    .Call("mpi_finalize")
  }
}

# Function the children will call to perform a validation on the
# fold equal to their child number.
# Assumes: thedata,fold,foldNumber,p
foldslave <- function() {
  result <- double(p)
  for (i in 1:p) {
    # produce a linear model on the first i variables on training data
    templm <- lm(y~.,data=thedata[fold!=foldNumber,1:(i+1)])
    
    # produce predicted data from test data
    yhat <- predict(templm,newdata=thedata[fold==foldNumber,1:(i+1)])
    
    # get rss of yhat-y
    localrssresult <- sum((yhat-thedata[fold==foldNumber,1])^2)
    result[i] <- localrssresult
  }
  
  result
}

# We're in the parent.  
# first make some data
n <- 1000  # number of obs
p <- 30		# number of variables

# Create data as a set of n samples of p independent variables,
# make a "random" beta with higher weights in the front.
# Generate y's as y = beta*x + random
x <- matrix(rnorm(n*p),n,p)
beta <- c(rnorm(p/2,0,5),rnorm(p/2,0,.25))
y <- x %*% beta + rnorm(n,0,20)
thedata <- data.frame(y=y,x=x)

fold <- rep(1:10,length=n)
fold <- sample(fold)

summary(lm(y~x))

# Now, send the data to the children
mpi.bcast.Robj2slave(thedata)
mpi.bcast.Robj2slave(fold)
mpi.bcast.cmd(foldNumber <- mpi.comm.rank())
mpi.bcast.Robj2slave(p)

# Send the function to the children
mpi.bcast.Robj2slave(foldslave)

# Call the function in all the children, and collect the results
rssresult <- mpi.remote.exec(foldslave())

# plot the results
plot(apply(rssresult,1,mean))

# close slaves and exit
mpi.close.Rslaves()
mpi.quit(save = "no")
{% endhighlight %}




{% highlight bash %}
#PBS -l nodes=10
#PBS -l walltime=00:30:00
#PBS -j oe
cd $PBS_O_WORKDIR
### send an email to your psu email address when job begins
#PBS -m b
#### send me email when job end
#PBS -m e
#### send me email when job aborts (with an error)
#PBS –m a
###Specify your email address
#PBS -M hup128@psu.edu

# load module and then run R
module load R/2.15.2
time R --no-restore --no-save brute_R.in output_parallel.out

{% endhighlight %}


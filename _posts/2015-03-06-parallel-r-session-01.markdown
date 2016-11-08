---
layout: post
title:  "Parallel Computing in R- Session I"
date:   2015-03-05 15:47:10
categories: R
comments: true
published: true
---

#Codes for Parallel R Tutoriol Session-1

library(snow)
library(Rmpi)
cl <- makeMPIcluster(4)
r <- clusterEvalQ(cl, R.version.string)
print(unlist(r))
stopCluster(cl)


<code>
#!/bin/sh
#PBS -l nodes=1:ppn=4 
#PBS -l walltime=00:03:00
#PBS -N SNOWMPI_seminarPI
#PBS -j oe
cd $PBS_O_WORKDIR
module load R/3.0.1
R --slave -f mpi.R > mpi-$PBS_JOBID.out 2>&1
</code>

#Parallel R- moderator Hoofar Pourzand
#Ref. Parallel R, Q. Ethan McCallum, Stephen Weston
#Ref. R Cookbook, Paul Teetor
#Ref. R in a Nutshell, Joseph Adler
#------------------------------------------
rm(list=ls(all=TRUE))
install.packages("snow")
library(snow)
#Working with It
spec <- c("n1", "n2", "n3", "n4")
cl <- makeCluster(spec, type= "SOCK" )  #ssh not responding
cl <- makeCluster(4, type="MPI")
stopCluster(cl)
#Parallel K-Means
library(MASS)
result <- kmeans(Boston, 4, nstart=100)

library(MASS)
results <- lapply(rep(25, 4), function(nstart) kmeans(Boston, 4, nstart=nstart))
i <- sapply(results, function(result) result$tot.withinss)
result <- results[[which.min(i)]]


ignore <- clusterEvalQ(cl, {library(MASS); NULL})
results <- clusterApply(cl, rep(25, 4), functiozt) kmeans(Boston, 4,
                                                                nstart=nstart))
i <- sapply(results, function(result) result$tot.withinss)
result <- results[[which.min(i)]]

#initializing Workers
clusterCall(cl, function() { library(MASS); NULL})
#How to load multiple packages
worker.init <- function(packages) {
  for (p in packages) {
    library(p, character.only=TRUE)
  }
  NULL
}
clusterCall(cl, worker.init, c('MASS', 'boot'))

clusterApply(cl, seq(along=cl), function(id) WORKER.ID <<- id)

#clusterApply demostration
set.seed(7777442)
sleeptime <- abs(rnorm(10, 10, 10))
tm <- snow.time(clusterApplyLB(cl, sleeptime, Sys.sleep))
plot(tm)

#Same problem with ClusterApply()
set.seed(7777442)
sleeptime <- abs(rnorm(10, 10, 10))
tm <- snow.time(clusterApply(cl, sleeptime, Sys.sleep))
plot(tm)

#Task chunking with parApply()

parLapply

#an interesting application of parLapply()
  
bigsleep <- function(sleeptime, mat) Sys.sleep(sleeptime)
bigmatrix <- matrix(0, 2000, 2000)
sleeptime <- rep(1, 100)
#picking smaller timesteps to accentuate the perf. difference
tm <- snow.time(clusterApply(cl, sleeptime, bigsleep, bigmatrix))
plot(tm)

#now lets do the same thing with parLapply
tm <- snow.time(parLapply(cl, sleeptime, bigsleep, bigmatrix))
plot(tm)


#Vectorizing 
clusterSplit(cl, 1:30)


parVapply <- function(cl, x, fun, ...) {
  do.call("c", clusterApply(cl, clusterSplit(cl, x), fun, ...))
}
parVapply(cl, 1:10, "^", 1/3)

#Load balancing Redux
parLapplyLB <- function(cl, x, fun, ...) {
  clusterCall(cl, LB.init, fun, ...)
  r <- clusterApplyLB(cl, x, LB.worker)
  clusterEvalQ(cl, rm('.LB.fun', '.LB.args', pos=globalenv()))
  r
}
LB.init <- function(fun, ...) {
  assign('.LB.fun', fun, pos=globalenv())
  assign('.LB.args', list(...), pos=globalenv())
  NULL
}
LB.worker <- function(x) {
  do.call('.LB.fun', c(list(x), .LB.args))
}

#lets compare some resutls
bigsleep <- function(sleeptime, mat) Sys.sleep(sleeptime)
bigmatrix <- matrix(0, 2000, 2000)
sleeptime <- rep(1, 100)
tm <- snow.time(clusterApplyLB(cl, sleeptime, bigsleep, bigmatrix))
plot(tm)

#try the new parLapplyLB()
tm <- snow.time(parLapplyLB(cl, sleeptime, bigsleep, bigmatrix))
plot(tm)

#Function and Lazy environment evaluation
a <- 1:4
x <- rnorm(4)
clusterExport(cl, "x")
mult <- function(s) s * x
parLapply(cl, a, mult)

#turn a part of this into a function
pmult <- function(cl) {
  a <- 1:4
  x <- rnorm(4)
  mult <- function(s) s * x
  parLapply(cl, a, mult)
}
pmult(cl)

#let's pass x and and a in as arguments

pmult <- function(cl, a, x) {
  x # force x
  mult <- function(s) s * x
  parLapply(cl, a, mult)
}
scalars <- 1:4
dat <- rnorm(4)
pmult(cl, scalars, dat)

#what is seriallized here?
pmult <- function(cl, a, x) {
  mult <- function(s, x) s * x
  environment(mult) <- .GlobalEnv
  parLapply(cl, a, mult, x)
}
scalars <- 1:4
dat <- rnorm(4)
pmult(cl, scalars, dat)

#on Random Number Generation RNG
install.packages("rlecuyer")  #icc make should be loaded first
library(rlecuyer)
clusterSetupRNG(cl, type='RNGstream')
#to use rsprng
clusterSetupRNG(cl, type='SPRNG')
clusterSetupRNG(cl, type='RNGstream', seed=c(1,22,333,444,55,6))

unlist(clusterEvalQ(cl, rnorm(1)))

#Snow configuration 
cl <- makeCluster(3, type="SOCK", master="192.168.1.100")
setDefaultClusterOptions(outfile="")
#create a cluster with two workers 
workerList <- list(list(host = "n1"), list(host = "n2", user = "steve"))
cl <- makeSOCKcluster(workerList)
clusterEvalQ(cl, Sys.info()[["user"]])
stopCluster(cl)

#how to avoid file conflicts
workerList <- list(list(host = "n1", outfile = "n1.log", user = "weston"),
                   list(host = "n2", outfile = "n2-1.log"),
                   list(host = "n2", outfile = "n2-2.log"))
cl <- makeSOCKcluster(workerList, user = "steve")
clusterEvalQ(cl, Sys.glob("*.log"))
stopCluster(cl)

#installing Rmpi
install.packages("Rmpi")
#where is tR CMD INSTALL --configure-args="--with-mpi=$MPI_PATH" Rmpi_0.5-9.tar.gzhe complexity

#Executing snow Programs on a Cluster with Rmpi
library(Rmpi)
cl <- makeCluster(4, type="MPI")
#mpi.comm.spawn()
cl <- makeMPIcluster(4)
stopCluster(cl)

#example Rmpi
library(snow)
library(Rmpi)
cl <- makeMPIcluster(mpi.universe.size() - 1)
r <- clusterEvalQ(cl, R.version.string)
print(unlist(r))
stopCluster(cl)
mpi.quit()
#how to use local machine as the master
orterun -H localhost,n1,n2,n3,n4 -n 1 R --slave -f mpi.R

#Executing snow Programs with a Batch Queueing System
#!/bin/sh
#PBS -N SNOWMPI
#PBS -j oe
cd $PBS_O_WORKDIR
orterun -n 1 /usr/bin/R --slave -f mpi.R > mpi-$PBS_JOBID.out 2>&1
#submit it to PBS 
qsub -q devel -l nodes=2:ppn=4 batchmpi.sh

#Troubleshooting snow Programs

cl <- makeCluster(2, type="SOCK", manual=TRUE, outfile="")
cl <- makeCluster(c('n1', 'n2'), type="SOCK", manual=TRUE, outfile="")


n1% ping beard

the .out file for the first pbs
/var/spool/pbs/mom_priv/jobs/1938000.lionxv.rcc.psu.edu.SC: line 8: orterun: command not found















 

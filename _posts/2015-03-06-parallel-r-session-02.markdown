---
layout: post
title:  "Parallel R: Evaluating the Performance of your R Code"
date:   2015-03-05 15:47:10
categories: R
comments: true
published: true
---
#Codes for Parallel R Tutoriol Session-2


 tracebackExample.R
 
{% highlight R %}

f <- function(x) {
  r <- x + g(x)
  r
}
g <- function(y) {
  r <- y * h(y)
  r
}
h <- function(z) {
  r <- log(z +2)
  if (r < 1)
    r^2
  else 0
} 

{% endhighlight %}


{% highlight R %}

 #loading in data
file_path <-  "/gpfs/home/hup128/scratch/ClusterView/lionxg/result.csv"
cluster.usuage.raw <- read.csv(file= file_path, header=TRUE, check.names= TRUE, fill =TRUE)
#Data Prepration, setting default values of rpmem
cluster.usuage <-unique(cluster.usuage.raw)
################################PLOTTING##################################
install.packages("gplots")
library(gplots)

install.packages("tapbplot")
library(tabplot)

install.packages("ggplot2")
library(ggplot2) 

install.packages("plotrix")
library(plotrix)


############Malgamate all the jobs across all the clusters lionxj, lionxo, lionxf, cyberstar, lionxh
file_path_2 = "/gpfs/home/hup128/scratch/ClusterView/ALLresults.csv"
cluster.usage.all.raw <-  read.csv(file= file_path_2, header=TRUE, check.names= TRUE, fill =TRUE)
cluster.usage.all <- unique(cluster.usage.all.raw)
###########User usage frequency data###########
jo <-cluster.usuage$job_owner
fjo <- factor(jo)
TTT <- table(fjo)
plot(TTT)

###########Proportions of jobs in R vs Q###########
js <-cluster.usuage$job_state
plot(js , main="Proportions of jobs in R vs Q else",
     sub="LionXG",
     xlab="Status Axis/ lionXG Nov15th to Dec5th", ylab="Freq. Count")



# 3D Exploded Pie Chart
R.js <- 0
Q.js <- 0

for (i in 1:3117){
  if (js[i] == "R") {R.js <- R.js + 1} 
  if (js[i] == "Q") {Q.js <- Q.js + 1} 
  
}
slices <- c(R.js, Q.js)
status.labels <- c("R", "Q") 


pie3D(slices, labels = status.labels  , explode=0.1,
      main="Job Status on cyberStar Sep 21th ")

###########Proportions of the jobs in R vs Q broken down by the having -queue vs not having a Q




###########pmem.nodes visuallization ###########

cluster.cost <- cluster.usuage$pmem * cluster.usuage$nodes
#remove outliers, what are outliers
plot(density(cluster.cost, na.rm = TRUE))
boxplot(cluster.usuage$quick_patch,horizontal = TRUE,  range = 0.5)   #crappy outliers

hist(cluster.usuage$quick_patch)

# Filled Density Plot
d <- density(cluster.usuage$quick_patch_2)
plot(d, main="Kernel Density of Miles Per Gallon")
polygon(d, col="red", border="blue")


###########pmem for one noders density###########


###########Shares of Jobs in Queues###########


###########scatter plot of wall-time###########



jo <-cluster.usage.all$job_owner
fjo <- factor(jo)
TTT <- table(fjo)

TTT.df <- as.data.frame(TTT)
userID.TTT  <- TTT.df$fjo   
freq.TTT <- sort(TTT.df$Freq)
#Three Categories:  freq > 50
#              10 < freq < 50
#                   freq < 10 
userID.TTT.CI  <- userID.TTT[which(freq.TTT >= 50)]
freq.TTT.CI  <- freq.TTT[which(freq.TTT >= 50)]

userID.TTT.CII <- userID.TTT[which(freq.TTT > 10 & freq.TTT < 50)]
freq.TTT.CII     <- freq.TTT[which(freq.TTT > 10 & freq.TTT < 50)]

userID.TTT.CIII<- userID.TTT[which(freq.TTT <= 10)]
freq.TTT.CIII    <- freq.TTT[which(freq.TTT <= 10)]
#taken as an df
plot(userID.TTT, freq.TTT ,  pch = 20,  log="y",
           main="Number of j=Jobs submitted per userID",
           sub = "For three days period, on Lionx- IJOH & Cyberstar",
           xlab = " User index on chart",
           ylab = "# of Jobs")



#taken as a table
plot(sort(TTT), log="y",
     main="Number of j=Jobs submitted per userID",
     sub = "For three days period, on Lionx- IJOH & Cyberstar",
     xlab = " User index on chart",
     ylab = "# of Jobs")

#labeling
#pointLabel(userID.TTT, freq.TTT , labels = paste("   ", userID.TTT,  "    ", sep=""), cex=0.7)

pbs_basics.pbs files contains:

#PBS -l nodes=1:ppn=1

#PBS -l walltime=24:00:00

#PBS -j oe

cd $PBS_O_WORKDIR

#=====================

#load module and then run R

module load R

R --no-restore --no-save < inputfile.in > output.out




#------------------------------------------------
# LionX PBS batch file 

# Date: Feb 5, 2014
# Contact: hoofar Pourzand (hup128@psu.edu)
# This script can be run at any node or master node
#------------------------------------------------

#PBS -N myRProjName
### send me email when job begins
#PBS -m b
### send me email when job ends
#PBS -m e
### send me email when job aborts (with an error)
#PBS -m a 
#PBS –M hup128@psu.edu
### Output files to where you submitted your batch file
#PBS -e /scratch/R/Alex/pbs_test/myRProjName.err
#PBS -o /scratch/R/Alex/pbs_test/myRProjName.log

#Start of shell scripting
echo "This job was submitted by user:  $PBS_O_LOGNAME"
echo "This job was submitted to host:  $PBS_O_HOST"
echo "This job was submitted to queue: $PBS_O_QUEUE"
echo "PBS job id: $PBS_JOBID"
echo "PBS job name: $PBS_JOBNAME"
echo "PBS environment: $PBS_ENVIRONMENT"
echo " "
### This job's working directory
echo Working directory is $PBS_O_WORKDIR
cd $PBS_O_WORKDIR    
echo Running on host `hostname`
echo Time is `date`
echo Directory is `pwd`

#PBS -l nodes=1:ppn=1

#PBS -l walltime=24:00:00

#PBS -j oe

cd $PBS_O_WORKDIR

#=====================

#load module and then run R

module load R

R --no-restore --no-save < inputfile.in > output.out

{% endhighlight %}


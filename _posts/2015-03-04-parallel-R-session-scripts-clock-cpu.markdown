---
layout: post
title:  "Parallel R workshop scripts- clocking the CPU"
date:   2015-03-04 16:51:20
categories: R
comments: true
published: true
---
#Parallel R workshop scripts

listed files:
parallel_R_tutorial_dev.R



{% highlight R %}
#brute force, push and pull method comparison, Rmpi workbench
#Hoofar Pourzand, Aug 20th, 2013, RCC Penn State Univ.
#R Parallel: snow and Rmpi
#Preliminaries
sessionInfo()
installed.packages (fields = c ("Package", "Priority"))[,1:5]


#unloading packages not needed
detach("package:vegan", unload=TRUE)

#Set up R: isntall the required package if not installed
pkgInstall <- function(c) {
  list_01 <- rownames(installed.packages());
  class(list_01) <- "list";
  Len_p <- dim(installed.packages())[1];
  
  catch_ii <-0;
  for (ii in 1: Len_p){
    if (c == list_01[ii]){
      catch_ii <-1;
      #throw error catcher package not found!
    }
  }    
  if (!catch_ii == TRUE) install.packages(c);
}

pkgInstall("snow");
pkgInstall("Rmpi");

# Loadign required packages if it is not already loaded.
if (!is.loaded("mpi_initialize")) {
  library("Rmpi")
} 

library(snow)



#Create a cluster of 2 slave processes for MPI
cl <- makeCluster(9, type = "SOCK") #MPI for mpi
#feed from the workers
do.call("rbind", clusterCall(cl, function(cl) Sys.info()
                             ["nodename"]))

#Lower Level Functions
clusterEvalQ(cl, library(splines)) #evaluation on all nodes
x = c(1,2,3,4,5) #from master to each worker assign values
clusterExport(cl, "x")
#Higher Level Functions
parApply(cl, matrix(1:10, ncol=2), 2, sum)

A <- matrix(rnorm(1000000), 1000)
system.time(A %*% A)

#parallel version
system.time(parMM(cl, A, A))

#Stopping a snow Cluster
stopCluster(cl)


#apply a set of functions F_i(x, y, a_i) on a set of (xi, yi)
library(snow)
cl <- makeCluster(2, type = "SOCK") #"MPI"
a <- 1:5
clusterExport(cl, "a")
wrapper_F<- function(nrep){
  x = rnorm(10)
  y = rnorm(10)
  z1 = y^2 + x^2 + a
  z2 = y^2 - x^2 - a
  outlist = list(z1 , z2 )
  return(outlist) }
parLapply(cl, 1:10, wrapper_F)
#(CRAN, 2012) to set up a cluster of 5 processes on 3
#machines (3 on dogleg), start all 5 processes, and stops the cluster.

library(snow)
machines <- c("dogleg","dogleg","dogleg", "sugar", "strike")
cl <- makeCluster(machines,type="SOCK")
invisible(clusterEvalQ(cl, library(nice)))
invisible(clusterEvalQ(cl, set.my.priority(19)))

stopCluster(cl)



###Rmpi Example
# first make some data
n <- 1000       # number of obs
p <- 30         # number of variables

x <- matrix(rnorm(n*p),n,p)
beta <- c(rnorm(p/2,0,5),rnorm(p/2,0,.25))
y <- x %*% beta + rnorm(n,0,20)
thedata <- data.frame(y=y,x=x)

summary(lm(y~x))

fold <- rep(1:10,length=n)
fold <- sample(fold)

rssresult <- matrix(0,p,10)
for (j in 1:10)
  for (i in 1:p) {
    templm <- lm(y~.,data=thedata[fold!=j,1:(i+1)])
    yhat <- predict(templm,newdata=thedata[fold==j,1:(i+1)])
    rssresult[i,j] <- sum((yhat-y[fold==j])^2)
  }

# this plot shows cross-validated residual sum of squares versus the model
# number.  As expected, the most important thing is including the first p/2
# of the predictors.

plot(apply(rssresult,1,mean))


###brute force

# Initialize the Rmpi environment
library("Rmpi")

# It's 10-fold cross-validation.  As a brute force method, we will
# divide the problem into 10 sub-problems, each being a different
# fold, and a slave will be spawned to handle each.  To that end, 
# we spawn 10 slaves
mpi.spawn.Rslaves(nslaves=10)

if (mpi.comm.size() != 11) {
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

#Task Push

# Initialize MPI
library("Rmpi")

# Notice we just say "give us all the slaves you've got."
mpi.spawn.Rslaves()

if (mpi.comm.size() < 2) {
  print("More slave processes are required.")
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

# Function the slaves will call to perform a validation on the
# fold equal to their slave number.
# Assumes: thedata,fold,foldNumber,p
foldslave <- function() {
  # Get a task 
  task <- mpi.recv.Robj(mpi.any.source(),mpi.any.tag()) 
  task_info <- mpi.get.sourcetag() 
  tag <- task_info[2] 
  
  # While task is not a "done" message. Note the use of the tag to indicate 
  # the type of message
  while (tag != 2) {
    # Perform the task.  
    foldNumber <- task$foldNumber
    
    rss <- double(p)
    for (i in 1:p) {
      # produce a linear model on the first i variables on training data
      templm <- lm(y~.,data=thedata[fold!=foldNumber,1:(i+1)])
      
      # produce predicted data from test data
      yhat <- predict(templm,newdata=thedata[fold==foldNumber,1:(i+1)])
      
      # get rss of yhat-y
      localrssresult <- sum((yhat-thedata[fold==foldNumber,1])^2)
      rss[i] <- localrssresult
    }
    
    # Construct and send message back to master
    result <- list(result=rss,foldNumber=foldNumber)
    mpi.send.Robj(result,0,1)
    
    # Get a task 
    task <- mpi.recv.Robj(mpi.any.source(),mpi.any.tag()) 
    task_info <- mpi.get.sourcetag() 
    tag <- task_info[2] 
  }
  
  junk <- 0
  mpi.send.Robj(junk,0,2)
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

# Now, send the data to the slaves
mpi.bcast.Robj2slave(thedata)
mpi.bcast.Robj2slave(fold)
mpi.bcast.Robj2slave(p)

# Send the function to the slaves
mpi.bcast.Robj2slave(foldslave)

# Call the function in all the slaves to get them ready to
# undertake tasks
mpi.bcast.cmd(foldslave())


# Create task list
tasks <- vector('list')
for (i in 1:10) {
  tasks[[i]] <- list(foldNumber=i)
}

# Make the round-robin list for slaves
n_slaves <- mpi.comm.size()-1
slave_ids <- rep(1:n_slaves, length=length(tasks))

# Send tasks
for (i in 1:length(tasks)) {
  slave_id <- slave_ids[i]
  mpi.send.Robj(tasks[[i]],slave_id,1)
}

# Collect results
rssresult <- matrix(0,p,10)
for (i in 1:length(tasks)) {
  message <- mpi.recv.Robj(mpi.any.source(),mpi.any.tag())
  foldNumber <- message$foldNumber
  results    <- message$result
  rssresult[,foldNumber] <- results
}

# Perform closing handshake
for (i in 1:n_slaves) {
  junk <- 0
  mpi.send.Robj(junk,i,2)
}

for (i in 1:n_slaves) {
  mpi.recv.Robj(mpi.any.source(),2)
}

# plot the results
plot(apply(rssresult,1,mean))

mpi.close.Rslaves()
mpi.quit(save="no")


#############
#Taks Pull
#############

# Initialize MPI
library("Rmpi")

# Notice we just say "give us all the slaves you've got."
mpi.spawn.Rslaves()

if (mpi.comm.size() < 2) {
  print("More slave processes are required.")
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

# Function the slaves will call to perform a validation on the
# fold equal to their slave number.
# Assumes: thedata,fold,foldNumber,p
foldslave <- function() {
  # Note the use of the tag for sent messages: 
  #     1=ready_for_task, 2=done_task, 3=exiting 
  # Note the use of the tag for received messages: 
  #     1=task, 2=done_tasks 
  junk <- 0 
  
  done <- 0 
  while (done != 1) {
    # Signal being ready to receive a new task 
    mpi.send.Robj(junk,0,1) 
    
    # Receive a task 
    task <- mpi.recv.Robj(mpi.any.source(),mpi.any.tag()) 
    task_info <- mpi.get.sourcetag() 
    tag <- task_info[2] 
    
    if (tag == 1) {
      foldNumber <- task$foldNumber
      
      rss <- double(p)
      for (i in 1:p) {
        # produce a linear model on the first i variables on 
        # training data
        templm <- lm(y~.,data=thedata[fold!=foldNumber,1:(i+1)])
        
        # produce predicted data from test data
        yhat <- predict(templm,newdata=thedata[fold==foldNumber,1:(i+1)])
        
        # get rss of yhat-y
        localrssresult <- sum((yhat-thedata[fold==foldNumber,1])^2)
        rss[i] <- localrssresult
      }
      
      # Send a results message back to the master
      results <- list(result=rss,foldNumber=foldNumber)
      mpi.send.Robj(results,0,2)
    }
    else if (tag == 2) {
      done <- 1
    }
    # We'll just ignore any unknown messages
  }
  
  mpi.send.Robj(junk,0,3)
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

# Now, send the data to the slaves
mpi.bcast.Robj2slave(thedata)
mpi.bcast.Robj2slave(fold)
mpi.bcast.Robj2slave(p)

# Send the function to the slaves
mpi.bcast.Robj2slave(foldslave)

# Call the function in all the slaves to get them ready to
# undertake tasks
mpi.bcast.cmd(foldslave())


# Create task list
tasks <- vector('list')
for (i in 1:10) {
  tasks[[i]] <- list(foldNumber=i)
}

# Create data structure to store the results
rssresult = matrix(0,p,10)

junk <- 0 
closed_slaves <- 0 
n_slaves <- mpi.comm.size()-1 

while (closed_slaves < n_slaves) { 
  # Receive a message from a slave 
  message <- mpi.recv.Robj(mpi.any.source(),mpi.any.tag()) 
  message_info <- mpi.get.sourcetag() 
  slave_id <- message_info[1] 
  tag <- message_info[2] 
  
  if (tag == 1) { 
    # slave is ready for a task. Give it the next task, or tell it tasks 
    # are done if there are none. 
    if (length(tasks) > 0) { 
      # Send a task, and then remove it from the task list 
      mpi.send.Robj(tasks[[1]], slave_id, 1); 
      tasks[[1]] <- NULL 
    } 
    else { 
      mpi.send.Robj(junk, slave_id, 2) 
    } 
  } 
  else if (tag == 2) { 
    # The message contains results. Do something with the results. 
    # Store them in the data structure
    foldNumber <- message$foldNumber
    rssresult[,foldNumber] <- message$result
  } 
  else if (tag == 3) { 
    # A slave has closed down. 
    closed_slaves <- closed_slaves + 1 
  } 
} 


# plot the results
plot(apply(rssresult,1,mean))

mpi.close.Rslaves()
mpi.quit(save="no")


{% endhighlight %}


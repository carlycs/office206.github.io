---
layout: post
title:  "Parallel Computing in R, session-7: foreach"
date:   2015-03-05 15:47:10
categories: R
comments: true
published: true
---

#How to visuallize your friends Twitter history in R

{% highlight R %}
 
stringsAsFactor=FalsecolClasses

### Load multiple packages at once
packages <- c('reshape', 'plyr', 'ggpot2')
lapply(packages, require, character.only = T)

### Read in and merge all data files within  a  working directory
files <- list.files()
data <- lapply(files, read.csv)

### Our last 'lapply' creates a list of data frames
#Use 'ldply' to merge them together
data <- ldply(data)

library(data.table)


-log10(pvalues) 

do.call(cbind, list(x, y, z))

dim(a)<-c(nr, nc)

as.POSIXct() 

rm() 
gc() 
??'linear regression'

as.data.frame( table( values ) )


### check memory usageobject.sizes <- function() {   return(rev(sort(sapply(ls(envir=.GlobalEnv), function (object.name)    object.size(get(object.name)))))) }pie(object.sizes()

#supress warnings globallyoptions( warn = -1 )#to turn warning back on options( warn = 0 )

.indexmday(x) #gives day of the month
{% endhighlight %}

The foreach library section:

{% highlight R %}
library(foreach)
x <- foreach(i=1:3) %do% sqrt(i)


x <- foreach(a=1:3, b=rep(10, 3)) %do% {
   a + b
   }

x <- foreach(a=1:1000, b=rep(10, 2)) %do% {
   a + b
   }

x <- foreach(i=1:3, .combine='c') %do% exp(i)

x <- foreach(i=1:4, .combine='+') %do% rnorm(4)

 cfun <- function(a, b) NULL
 x <- foreach(i=1:4, .combine='cfun') %do% rnorm(4)
x


library(iterators)
 x <- foreach(a=irnorm(4, count=4), .combine='cbind') %do% a
 x



set.seed(123)
 x <- foreach(a=irnorm(4, count=1000), .combine='+') %do% a

 set.seed(123)
 x <- numeric(4)
 i <- 0
 while (i < 1000) {
   x <- x + rnorm(4)
   i <- i + 1
   }
set.seed(123)
 x <- foreach(icount(1000), .combine='+') %do% rnorm(4)
 x

 x <- matrix(runif(500), 100)
 y <- gl(2, 50)
{% endhighlight %}

{% highlight R %}
library(randomForest)

 rf <- foreach(ntree=rep(250, 4), .combine=combine) %do%
   randomForest(x, y, ntree=ntree)
 rf

 rf <- foreach(ntree=rep(250, 4), .combine=combine, .packages='randomForest') %dopar%
   randomForest(x, y, ntree=ntree)
 rf

applyKernel <- function(newX, FUN, d2, d.call, dn.call=NULL, ...) {
   ans <- vector("list", d2)
   for(i in 1:d2) {
     tmp <- FUN(array(newX[,i], d.call, dn.call), ...)
     if(!is.null(tmp)) ans[[i]] <- tmp
     }
  ans
}
 applyKernel(matrix(1:16, 4), mean, 4, 4)


applyKernel <- function(newX, FUN, d2, d.call, dn.call=NULL, ...) {
   foreach(i=1:d2) %dopar%
     FUN(array(newX[,i], d.call, dn.call), ...)
   }
applyKernel(matrix(1:16, 4), mean, 4, 4)


applyKernel <- function(newX, FUN, d2, d.call, dn.call=NULL, ...) {
   foreach(x=iter(newX, by='col')) %dopar%
     FUN(array(x, d.call, dn.call), ...)
  10Using The foreach Package
   }
 applyKernel(matrix(1:16, 4), mean, 4, 4)



 applyKernel <- function(newX, FUN, d2, d.call, dn.call=NULL, ...) {
   foreach(x=iblkcol(newX, 3), .combine='c', .packages='foreach') %dopar% {
     foreach(i=1:ncol(x)) %do% FUN(array(x[,i], d.call, dn.call), ...)
     }
   }
 applyKernel(matrix(1:16, 4), mean, 4, 4)


x <- foreach(a=1:3, b=rep(10, 3)) %do% (a + b)

{% endhighlight %}


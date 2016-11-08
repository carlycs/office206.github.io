---
layout: post
title:  "Parallel Computing in R- session VI"
date:   2015-03-05 15:47:10
categories: R
comments: true
published: true
---


##Codes for Parallel R Tutoriol Session-6
###parallel R: version one: snow version of mutal link problem

mtl <- function(ichunk, m){
  n<- ncol(m)
  matches <- 0
  for (i in ichunk){
       if (i < n ){
          rowi <- m[i,]
          matches <- matches +
              sum(m[(i+1):n, ] %*% rowi)
       }
  }
  matches
}

mtlinks<- function(cls,m){
  n<- nrow(m)
  nc <- length(cls)
  #which worker takes which chunk
  options(warn=-1) #ignore warnings
  ichunks <- split(1:n , 1:nc)
  options(warn = 0) #go back to normal warn option
  counts<- clusterApply(cls, ichunks, mtl, m)
  do.call(sum, counts) / (n*(n-1)/2)
  }

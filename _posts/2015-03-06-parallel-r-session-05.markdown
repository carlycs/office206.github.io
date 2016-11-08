---
layout: post
title:  "Parallel Computing in R- session IV"
date:   2015-03-06 15:47:10
categories: R
comments: true
published: true
---

##Codes for Parallel R Tutoriol Session-5

 {% highlight R %}

library(MASS)
result <- kmeans(Boston, 4, nstart  = 100)
#####
library(MASS)
results <- lapply(rep(25,4) , function(nstart) kmeans(Boston, 4, nstart = nstart))
i <- sapply(results, function(result) result$tot.withinss)
result <- results[[which.min(i)]]

#nwo lest build a cluster object with snow
library(snow)
cl <- makeCluster(4, type = "SOCK")

#pass the object, method and data set to the workers
ignore <-  clusterEvalQ(cl, {library(MASS); NULL})
results <- clusterApply(cl, rep(25, 4), function(nstart) kmeans(Boston, 4, nstart = nstart))
i <- sapply(results, function(result) result$tot.withinss)
result <- results[[which.min(i)]]



#Designing a Unit Test for the Parallel Cluster
library(RUnit)
UnitTest_functionname <- function(){
  checkEquals(exp1, exp2)
  checkEqualsNumeric(value1, value2)
  checkException
  
}
#use fixed bugs to design a teter: Bugs re-appear

#Designing an integration test for checking our the workers pass results


# Designing a regression/robustness test: slight changes to the details set up how do they affect the team


 {% endhighlight %}


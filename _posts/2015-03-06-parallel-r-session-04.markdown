---
layout: post
title:  "Parallel computing in R- sesion III"
date:   2015-03-05 15:47:10
categories: R
comments: true
published: true
---
#Codes for Parallel R Tutoriol Session-3

{ %highlight R %}
#Parallel R Part III
#Hoofar Pourzand, Reserach Computing and Cyberinfrastructure, Penn Stae
#Ref. Parallel R, Ethan McCallum
#==================================================
library(parallel)
library(MASS)
RNGkind("L'Ecuyer-CMRG")
mc.cores <- detectCores()
results <- mclapply(rep(25, 4),
                    function(nstart) kmeans(Boston, 4, nstart=nstart),
                    mc.cores=mc.cores)
i <- sapply(results, function(result) result$tot.withinss)
result <- results[[which.min(i)]]

#Error in mclapply(rep(25, 4), function(nstart) kmeans(Boston, 4, nstart = nstart),  : 
#                   'mc.cores' > 1 is not supported on Windows
                 
#For Windows the snow devied API in parallel 
library(parallel)
cl <- makeCluster(detectCores())
clusterSetRNGStream(cl)
clusterEvalQ(cl, library(MASS))
results <- clusterApply(cl, rep(25, 4), function(nstart) kmeans(Boston, 4,
                                                                nstart=nstart))
#FORK clusters
type <- if (exists("mcfork", mode="function")) "FORK" else "PSOCK"
cores <- getOption("mc.cores", detectCores())
cl <- makeCluster(cores, type=type)
results <- parLapply(cl, 1:100, sqrt)
stopCluster(cl)

#==========================
library(parallel)
R.version.string

#defualt value of the mc.cores argument
options(mc.cores=detectCores())

#Creating cluters with makeCluster
cl <- makeCluster(4)

cl <- makeCluster(detectCores())

cl <- makeCluster(c("n1", "n2", "n3", "n4"))
#to create a FORK cluster
cl <- makeCluster(4, type="FORK")

# Parallel RNG
RNGkind("L'Ecuyer-CMRG")
mclapply(1:2, function(i) rnorm(1))

RNGkind("L'Ecuyer-CMRG")
set.seed(7777442)
mc.reset.stream()
unlist(mclapply(1:2, function(i) rnorm(1)))
set.seed(7777442)
mc.reset.stream()
unlist(mclapply(1:2, function(i) rnorm(1)))
 
#to use the new parallel feature
cl <- makeCluster(4, type = "FORK")
clusterSetRNGStream(cl, 7777442)
unlist(clusterEvalQ(cl, rnorm(1)))
 
clusterSetRNGStream(cl, 7777442)
unlist(clusterEvalQ(cl, rnorm(1)))
 
stopCluster(cl)

#to advance to the next substream
.Random.seed <<- nextRNGSubStream(.Random.seed)

#Foreach example
foreach(i=1:1000000) %dopar% sqrt(i)
#=================================
# doSNOW loads already parallel and snow
library(doSNOW)

# needed for calculating SHA-256
library(digest)

hashing <- function(v) {
  df <- data.frame("i" = v, "sha256" = NA)
  for(i in v) {
    df[i-v[1]+1,"sha256"] <- digest(as.character(i), algo="sha256")
  }
  df
}

# number of cycles to be taken care of within the function
M <- c(10,32,50,100,200,400,500,800,1000,2000,4000,5000,8333,10000)

# number of cores to use
C <- c(2,3,4,5,6,7,8)

# all combinations of M and C
bm <- expand.grid(M,C)
names(bm) <- c("m","c")
bm$elapsed <- NA

for(c in C) {
  # number of cores to be used
  cl <- makeCluster(c)
  
  # make cluster of cores available
  registerDoSNOW(cl)
  
  for(m in M) {
    # number of times the function shall be executed
    n <- 100000/m
    s <- system.time(
      result <- foreach(i=1:n, .packages="digest", 
                        .combine="rbind", .inorder=FALSE) 
      %dopar% hashing(((i-1)*m+1):(i*m))
    )
    
    # stores and prints the benchmark
    bm[bm$m==m & bm$c==c,"elapsed"] <- s["elapsed"]
    print(paste(c,m,bm[bm$m==m & bm$c==c,"elapsed"],nrow(result)))
  }
  
  # free the cores
  stopCluster(cl)
}

# executing the calculation serially
s <- system.time(result <- hashing(1:100000))

{ %endhighlight R %}



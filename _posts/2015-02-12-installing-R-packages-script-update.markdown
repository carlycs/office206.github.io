---
layout: post
title:  "How to install R packages on automatic"
date:   2015-02-12 16:39:11
categories: R
published: true
comments: true
---
#How to install R packages another script

Ipak function: install and load multiple R packages.
Check to see if packages are installed. Install them if they are not, then load them into the R session.
 
	ipak <- function(pkg){
    new.pkg <- pkg[!(pkg %in% installed.packages()[, "Package"])]
    if (length(new.pkg)) 
        install.packages(new.pkg, dependencies = TRUE)
    sapply(pkg, require, character.only = TRUE)
	}
 
Usage

	packages <- readLines() #"[..]/RinstallNewPacksList.txt"
	ipak(packages)# ipak function: install and load multiple R packages.
 

	ipak(packages)


rmpi, Rcpp, RTextTools, topicmodels and maxent should be *painfully* installed #seperately.


RinstallNewPacksList.txt
Lists all the packages that needs to be installed:

<HTML> <PRE>
adehabitat
ape
base
bayesm
bitops
boot
calibrate
caTools
cluster
coda
codetools
compiler
compositions
contrast
datasets
deldir
deSolve
doSNOW
e1071
energy
fastcluster
fields
foreach
foreign
Formula
gdata
gee
geoR
GeoXp
glmnet
gplots
graphics
grDevices
grid
gtools
Hmisc
intervals
ipred
iterators
KernSmooth
KMsurv
lattice
latticeExtra
LearnBayes
maps
maptools
MASS
Matrix
maxent
methods
mgcv
mnormt
modeltools
msm
mvoutlier
mvtnorm
ncbit
nlme
nnet
numDeriv
ouch
parallel
PBSddesolve
pcaPP
plyr
pomp
prodlim
RandomFields
randomForest
raster
rasterVis
Rcpp
rehh
reshape
rgl
R.methodsS3
rms
robCompositions
robustbase
R.oo
rpart
rrcov
RSAGA
RSiena
RSQLite
R.utils
scales
sgeostat
shapefiles
slam
snow
sp
spacetime
spam
SparseM
spatial
spatstat
spdep
splancs
splines
spsurvey
stats
stats4
stringr
subplex
survival
tau
tcltk
tensorA
tkrplot
tools
tree
truncnorm
utils
XML
xts
zoo
</PRE></HTML>
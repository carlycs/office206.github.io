---
layout: post
title:  "Installing Copula Package on R/3.1.1"
date:   2015-02-03 16:39:11
categories: Systems
comments: true
published: true
---
#How to Install Package Copula on R/3.1.1


Run the script below to download and install the Copula package:


	cd /usr/global/R/3.1.1/lib64/R/library
	module load gsl
	http://cran.r-project.org/src/contrib/gsl_1.9-10.tar.gz
    #updated as of march 6th 
    #a version of the package available here.
wget http://download.r-forge.r-project.org/src/contrib/copula_0.999-13.tar.gz

R CMD INSTALL gsl_1.9-10.tar.gz
	R CMD INSTALL copula_0.999-13.tar.gz


configure: error: gsl-config not found, is GSL installed?
 
 
 GSL_CONFIG
 GSL_CFLAGS
 GSL_LIBS

	module unload gcc/4.5.1
	module unload mpfr/2.4.2

I could get it to work by mannually building the C:

	 gsl-config --cflags  -I/usr/global/gsl/1.16/include gsl-config --libs -L/usr/global/gsl/1.16/lib -lgsl -lgslcblas -lm


	CFLAGS="-I/usr/global/gsl/1.16/include"  LDFLAGS="-L/usr/global/gsl/1.16/lib -lgsl -lgslcblas -lm"
    
    [install@hammer11 library]$ locate libgfortran.so.3
    [install@hammer11 library]$ grep '^R_HOME_DIR' `which R`
    R_HOME_DIR=/usr/global/R/3.1.1a/lib64/R
    [install@hammer11 library]$ R CMD ldd /usr/global/R/3.1.1a/lib64/R/bin/exec/R
	linux-vdso.so.1 =>  (0x00007ffff070b000)
	libR.so => /usr/global/R/3.1.1a/lib64/R/lib/libR.so (0x00002b0e3ec98000)
	libRblas.so => /usr/global/R/3.1.1a/lib64/R/lib/libRblas.so (0x00002b0e3f26a000)
	libgomp.so.1 => /usr/lib64/libgomp.so.1 (0x0000003cc6c00000)
	libpthread.so.0 => /lib64/libpthread.so.0 (0x0000003cc7400000)
	libc.so.6 => /lib64/libc.so.6 (0x0000003cc6400000)
	libgfortran.so.3 => not found
	libm.so.6 => /lib64/libm.so.6 (0x0000003cc6800000)
	libquadmath.so.0 => not found
	librt.so.1 => /lib64/librt.so.1 (0x0000003cc8800000)
	libdl.so.2 => /lib64/libdl.so.2 (0x00002b0e3f4c8000)
	/lib64/ld-linux-x86-64.so.2 (0x0000003cc6000000)
	libgfortran.so.3 => not found
	libquadmath.so.0 => not found
    [install@hammer11 library]$ R CMD INSTALL gsl_1.9-10.tar.gz
    /usr/global/R/3.1.1a/lib64/R/bin/exec/R: error while loading shared libraries: libgfortran.so.3: cannot open shared object file: No such file or directory





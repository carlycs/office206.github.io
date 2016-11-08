---
layout: post
title:  "Installing using Cmake: Case Gromacs/5.0.4"
date:   2015-02-10 11:15:06
categories: Systems
published: true
comments: true
---
#How to Install Gromacs using Cmake 
Staying with the latest version as much as possible.
[Gromacs Website](http://www.gromacs.org/)
first loading the ingridients, looking at the [installation document here](http://www.gromacs.org/Documentation/Installation_Instructions#prerequisites)

	cd 5.0.4
	wget ftp://ftp.gromacs.org/pub/gromacs/	gromacs-5.0.4.tar.gz
	tar xfz gromacs-5.0.4.tar.gz

	mv gromacs-5.0.4 5.0.4
	rm -rf gromacs-5.0.4.tar.gz

	module load cmake/2.8.9
	module load intel/2015.0.090
	module load mkl/11.2.0.90
	module load openmpi/intel/1.7.3
	module load blas
	module load lapack

	module list

	cd 5.0.4
	mkdir build-gromacs
	cd build-gromacs
	cmake .. -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++ -DGMX_BUILD_OWN_FFTW=ON  -DGMX_MPI=ON  -DGMX_DOUBLE=ON -DGMX_SINGLE=ON  -DCMAKE_INSTALL_PREFIX=/usr/global/gromacs/5.0.4 -DBUILD_SHARED_LIBS=ON -DGMX_FFT_LIBRARY=mkl  GMX_QMMM_PROGRAM:STRING=gaussian  GMX_PREFER_STATIC_LIBS:BOOL=OFF   GMX_USE_RDTSCP:BOOL=OFF  -DGMX_GPU=OFF
	
	cmake .. -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++ -DGMX_BUILD_OWN_FFTW=ON  -DGMX_MPI=ON  -DGMX_DOUBLE=ON -DGMX_SINGLE=ON  -DBUILD_SHARED_LIBS=ON -DGMX_FFT_LIBRARY=mkl   -DGMX_GPU=OFF
	
	ccmake ..

	make
	make install


And for Testing
	
	module load gromacs/5.0.4
	./gmxtest.pl all -np 2


<HTMl>
<PRE>
Just loading cmake .. (not loading the fftwf, missing the FFTWF_LIBRARY will through this during the cmake):

checking for module 'fftw3f'
--   package 'fftw3f' not found
-- pkg-config could not detect fftw3f, trying generic detection
Could not find fftw3f library named libfftw3f, please specify its location in CMAKE_PREFIX_PATH or FFTWF_LIBRARY by hand (e.g. -DFFTWF_LIBRARY='/path/to/libfftw3f.so')
CMake Error at cmake/gmxManageFFTLibraries.cmake:76 (MESSAGE):
  Cannot find FFTW 3 (with correct precision - libfftw3f for mixed-precision
  GROMACS or libfftw3 for double-precision GROMACS).  Either choose the right
  precision, choose another FFT(W) library (-DGMX_FFT_LIBRARY), enable the
  advanced option to let GROMACS build FFTW 3 for you
  (-GMX_BUILD_OWN_FFTW=ON), or use the really slow GROMACS built-in fftpack
  library (-DGMX_FFT_LIBRARY=fftpack).
Call Stack (most recent call first):
  CMakeLists.txt:738 (include)
  
  </PRE>
  </HTML>
  
  And only loading the double precision for fftw will throw:
  
<HTMl>
<PRE>
  [install@hammer11 build-gromacs]$ cmake ..
CUDA_TOOLKIT_ROOT_DIR not found or specified
-- Could NOT find CUDA (missing:  CUDA_TOOLKIT_ROOT_DIR CUDA_NVCC_EXECUTABLE CUDA_INCLUDE_DIRS CUDA_CUDART_LIBRARY) (Required is at least version "4.0")
-- No compatible CUDA toolkit found (v4.0+), disabling native GPU acceleration
-- checking for module 'fftw3f'
--   package 'fftw3f' not found
-- pkg-config could not detect fftw3f, trying generic detection
Could not find fftw3f library named libfftw3f, please specify its location in CMAKE_PREFIX_PATH or FFTWF_LIBRARY by hand (e.g. -DFFTWF_LIBRARY='/path/to/libfftw3f.so')
CMake Error at cmake/gmxManageFFTLibraries.cmake:76 (MESSAGE):
  Cannot find FFTW 3 (with correct precision - libfftw3f for mixed-precision
  GROMACS or libfftw3 for double-precision GROMACS).  Either choose the right
  precision, choose another FFT(W) library (-DGMX_FFT_LIBRARY), enable the
  advanced option to let GROMACS build FFTW 3 for you
  (-GMX_BUILD_OWN_FFTW=ON), or use the really slow GROMACS built-in fftpack
  library (-DGMX_FFT_LIBRARY=fftpack).
Call Stack (most recent call first):
  CMakeLists.txt:738 (include)
  
  </PRE>
  </HTML>

New developement:
<HTML>
<PRE>
module unload fftw/intel/double/3.3.3
 module unload fftw/intel/single/3.3.3
 module list
Currently Loaded Modulefiles:
  1) realvnc/4.5r21561     7) vmd/1.9              13) gcc/4.4.2
  2) java/1.6.0_45         8) mkl/10.2.3.029       14) openmpi/gnu/1.4.0
  3) intel/11.1.073        9) gmp/4.3.1            15) python/2.6.3
  4) pgi/10.9             10) mpfr/2.4.1           16) pymol/20100112
  5) mkl/11.0.0.079       11) ppl/0.10.2           17) cmake/2.8.9
  6) openmpi/intel/1.4.2  12) cloog-ppl/0.15.7
$ 

</PRE>
</HTML>

	cmake .. -DGMX_BUILD_OWN_FFTW=ON -DREGRESSIONTEST_DOWNLOAD=ON

also throws an error for DREGRESSIONTEST_DOWNLOAD=ON
<HTML>
<PRE>
-- Performing Test HAS_NO_DEPRECATED_REGISTER - Success
Downloading: http://gerrit.gromacs.org/download/regressiontests-5.0.4.tar.gz
-- [download 100% complete]
CMake Error at tests/CMakeLists.txt:58 (message):
  error: downloading
  'http://gerrit.gromacs.org/download/regressiontests-5.0.4.tar.gz' failed

  status_code: 1

  status_string: "unsupported protocol"

  log: About to connect() to gerrit.gromacs.org port 80 (#0)

    Trying 130.237.25.133... connected

  Connected to gerrit.gromacs.org (130.237.25.133) port 80 (#0)

  GET /download/regressiontests-5.0.4.tar.gz HTTP/1.1

  Host: gerrit.gromacs.org

  Accept: */*

  

  HTTP/1.1 302 Found

  Date: Thu, 19 Feb 2015 20:22:30 GMT

  Server: Apache/2.2.22 (Ubuntu)

  Location: https://kth.box.com/shared/static/53xl0qouhsvrbrbgtl4p.gz

  Vary: Accept-Encoding

  Content-Length: 325

  Content-Type: text/html; charset=iso-8859-1

  Ignoring the response-body

  <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">

  <html><head>

  <title>302 Found</title>

  </head><body>

  <h1>Found</h1>

  <p>The document has moved <a
  href="https://kth.box.com/shared/static/53xl0qouhsvrbrbgtl4p.gz">here</a>.</p>


  <hr>

  <address>Apache/2.2.22 (Ubuntu) Server at gerrit.gromacs.org Port
  80</address>

  </body></html>

  Connection #0 to host gerrit.gromacs.org left intact

  Issue another request to this URL:
  'https://kth.box.com/shared/static/53xl0qouhsvrbrbgtl4p.gz'

  libcurl was built with SSL disabled, https: not supported!

  unsupported protocol

  Closing connection #0

</PRE>
</HTML>

	[install@hammer11 build-gromacs]$ uname -a
	Linux hammer11.rcc.psu.edu 2.6.18-348.12.1.el5 #1 SMP Mon Jul 1 17:54:12 EDT 2013 x86_64 x86_64 x86_64 GNU/Linux
	[install@hammer11 build-gromacs]$

Issues wit the loaded package:

<HTML>
<PRE>
Currently Loaded Modulefiles:
  1) realvnc/4.5r21561        11) ppl/0.10.2
  2) java/1.6.0_45            12) cloog-ppl/0.15.7
  3) intel/11.1.073           13) gcc/4.4.2
  4) pgi/10.9                 14) openmpi/gnu/1.4.0
  5) mkl/11.0.0.079           15) python/2.6.3
  6) openmpi/intel/1.4.2      16) pymol/20100112
  7) vmd/1.9                  17) cmake/2.8.9
  8) mkl/10.2.3.029           18) fftw/intel/double/3.3.3
  9) gmp/4.3.1                19) fftw/intel/single/3.3.3
 10) mpfr/2.4.1
[install@hammer11 5.0.4]$
</PRE>
</HTML>


multiple openmpi , old verision. The CMakeCash.txt doesn't show any double nor MPI built. Serial gromacs doesn't make much sense.

UPDATES AFTER REVIEWING THE CMakeCash.txt

//When finding libraries prefer static archives (it will only work
// if static versions of external dependencies are available and
// found)

GMX_PREFER_STATIC_LIBS:BOOL=OFF

//QM package for QM/MM. Pick one of: none, gaussian, mopac, gamess,
// orca

GMX_QMMM_PROGRAM:STRING=None


//Use RDTSCP for better CPU-based timers (available on recent x86
// CPUs; might need to be off when compiling for heterogeneous
// environments)

GMX_USE_RDTSCP:BOOL=ON



//Use X window system

GMX_X11:BOOL=OFF


//Path to a library.

LAPACK_goto2_LIBRARY:FILEPATH=LAPACK_goto2_LIBRARY-NOTFOUND


//Pandoc - a universal document converter

PANDOC_EXECUTABLE:FILEPATH=PANDOC_EXECUTABLE-NOTFOUND



//Automatically download regressiontests. Tests can be run with
// ctest.

REGRESSIONTEST_DOWNLOAD:BOOL=OFF


[install@lionxv build-gromacs]$ readlink -f `which c++`
/usr/bin/c++

[install@lionxv build-gromacs]$

other resources:

http://www.somewhereville.com/?p=2070

General Note:

####make clean, make dist-clean or just fix the configure for make install?

The parameter used after make is just dependent on the developer(s) who wrote the Makefile. The documentation you later reference, Autotools, is just one of many ways to create a Makefile.

The typical standard is **make clean** will remove all intermediate files, and **make distclean** makes the tree just the way it was when it was un-tarred (or something pretty close) including removing any configure script output. This is the way the Linux kernel works for instance.

In other words it's totally dependent on the developers for each of those libraries, and this is why sometimes its clean and other times it's distclean. By the way, you don't need to run clean/distclean - I guess they have you run it just to save disk space. **make install** usually moves the files to the destination directory (again dependent on the developers) - typically places like /usr/lib or /usr/bin (also determined with the configure script, if it's an Autotools build system)

These nuances are the main reason people use package management systems like RPM or Debian packages.

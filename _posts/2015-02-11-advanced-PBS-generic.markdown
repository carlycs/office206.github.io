---
layout: post
title:  "Advanced PBS Workflow Example"
date:   2015-02-11 16:39:11
categories: Systems
published: true
comments: true
---
#An Advanced PBS Workflow Example

## An elementary workflow

All jobs consuming significant cycles need to be submitted to ICS/RCC clusters for execution via a submission script like the following. Many applications are fairly naïve with respect to which devices are made available by the scheduler eg., GPU's; you may find the need to experiment with the PBS topology to get your application's expectations to match the resources allocated by the scheduler. At a bare minimum one must have the first line of the submission script, as well as required walltime; default memory allocation at the time of writing is 1G (1gb).

    #desired nodes, procs per node and gpus
    #PBS -l nodes=4:ppn=1:gpus=1
    #maximum memory per process (can also using mem for total, all procs)
    #PBS -l pmem=4Gb
    #desired walltime
    #PBS -l walltime=00:10:00
    #export current environment variables
    #PBS -V
    #force topology ie., only execute with this configuration
    #PBS -W x=nmatchpolicy:exactnode
    #email me when beginning (b) ending (e) or aborting (a)
    #PBS -m bea
    #PBS -M hup128@psu.edu
    #write output to file foo.out (if omitted stderr/stdout goes to file #with jobid and submission script name in title
    #PBS -o foo.out
    #put stderr and stdout in same file
    #PBS -j oe
    #use a queue we have access too (albeit temp in this case)
    #PBS -q lionga-seminar
    #move to the working directory
    cd /gpfs/home/hup128/work/ti_ml_project
    #load all modules required by the application #this will setup PATH and LD_LIBRARY_PATH correctly module load openmpi/intel/1.4.3
    module load mkl
    module load fftw3/3.3/intel
    #execute through mpirun if necessary
    mpirun /usr/global/qe/4.3.2/bin/pw.x < anatase.in > anatase_test.out mpirun ../qe_old/espresso-4.2/bin/gipaw.x < nmr_anatase_test.in > nmr_anatase_test.out


## A more complicated PBS workflow

One has the liberty to use regular bash scripting constructs in a PBS submission script for performing more complicated processing, or you could simply call a bash script from your PBS script. This is particularly helpful in pipelined workflows or those requiring the same applications each step but different data or conditions. The following example is a templated input file for Quantum Espresso, where each iteration, input parameters will be changed within the submission script, to follow.

&control
calculation='scf'
restart_mode='from_scratch',
prefix='anatase_tmp',
pseudo_dir = '$HOME/ti_ml_project', outdir='$HOME/tmp/'
/ &system
ibrav= @IBRAV@, a=@A@,c=@C@, nat= 2, ntyp= 2, ecutwfc =130.0,
occupations='smearing', smearing='methfessel-paxton',
degauss=0.05
 /
&electrons
conv_thr = 1.0d-8 mixing_beta = 0.7
/
ATOMIC_SPECIES
Ti 46.952 Ti.tpbe-sp-rrkj.UPF O 15.999 O_pbe-20071002.UPF ATOMIC_POSITIONS
Ti 0 0 0
 O @Ox@ @Oy@ @Oz@
K_POINTS {automatic}
4 4 4 0 00

In this template file anatase_batch.in, we will be changing the symmetry (IBRAV) and several unit cell parameters each iteration, generating a new input file anatase_tmp.in for the Quantum Espresso executable pw.x. After the application completes, we run a second application gipaw.x to determine NMR (experimental) parameters we can expect to measure for the system, on the basis of the input structure and DFT performed just prior by pw.x. Rather than keep the entire gipaw.x output, we filter it using awk, creating an input file for the simulation of the measurable NMR spectra using a custom application sim_mas.x. We finally save some data for another process to be carried out later, and iterate our cell parameters for the next step.

    #!/bin/bash
    #PBS -l nodes=4:ppn=1:gpus=1 #PBS -l mem=10Gb
    #PBS -l walltime=12:00:00
    #PBS -V
    cd $HOME/ti_ml_project module load cuda/4.0
    module load openmpi/intel/1.4.3 module load mkl
    module load fftw3/3.3/intel
    #a complete workflow
    #note the use of bash commands to handle intermediate #steps eg., parsing stream output, bc calculator etc
    #first unit #anatase; ibrav==7 a=3.784
    c=9.515
    Ox=0.0
    Oy=0.0
    Oz=0.208
    ibrav=7
    #last unit cell, or thereabouts #rutile; ibrav==6
    #a=4.603 (step += 0.017) #c=2.966 (step -= 0.134)
    #Ox=0.3045
    #Oy=0.3045
    #Oz=0.0
    (step += 0.006) (step += 0.006) (step -= 0.004)
    #nmr magic angle spinning spectral simulation parameters
    inpa="25.0 2.5 3 1.5833 50750000 20 1 128 1 40 78.125 00 -1700 1 1" inpb="0.0 00 100 3000000 200000 0.0 10 10 9000000.0"
    #create some files with comment fields at the top
    echo "# Cq eta a c Ox Oy Oz" > anatase_rutile_runs.txt echo "# training data for Ox" > Ox_svm.txt
    echo "# training data for Oy" > Oy_svm.txt
    echo "# training data for Oz" > Oz_svm.txt
    echo "# training data for a" > a_svm.txt
    echo "# training data for c" > c_svm.txt
    echo " "
    echo "Starting job on `hostname` at `date`" echo " "
    #preform a string of processes in batch:
    # write a qe input file
    # perform scf
    # calculate nmr parameters
    # simulate nmr lineshape
    # write features/values to text files
    # iterate unit cell parameters for next iteration
    for (( i=1; i<=25; i++ )) do
    #set the symmetry according to unit cell type if [ "$(echo "$a > $c" | bc)" -eq "1" ]
    then
    ibrav=6
    fi
    #update the input file
    sed 's/@A@/'$a'/g' anatase_batch.in | sed 's/@C@/'$c'/g' |
    sed 's/@IBRAV@/'$ibrav'/g'|
    sed 's/@Ox@/'$Ox'/g' |
    sed 's/@Oy@/'$Oy'/g' |
    sed 's/@Oz@/'$Oz'/g' > anatase_tmp.in
     #scf calculation
    mpirun /usr/global/qe/4.3.2/bin/pw.x < anatase_tmp.in > anatase_tmp.out
     #nmr calculation
    efg_vals=$(mpirun ../qe_old/espresso-4.2/bin/gipaw.x < nmr_anatase_tmp.in |awk '/Ti/&&/Cq/{print $8,$11}')
    #update parameter file
     echo $efg_vals $ibrav $a $c $Ox $Oy $Oz >>
    anatase_rutile_runs.txt
    #simulate magic angle spinning nmr lineshape for this structure tdata=$(echo "$inpa $efg_vals $inpb" | ./sim_mas.x)
     #save svm training data
     echo $a $tdata >> a_svm.txt
     echo $c $tdata >> c_svm.txt
     echo $Ox $tdata >> Ox_svm.txt
     echo $Oy $tdata >> Oy_svm.txt
     echo $Oz $tdata >> Oz_svm.txt
    #calculate next lattice and cell parameters a=$(echo "$a + 0.017*2" | bc)
    c=$(echo "$c - 0.134*2" | bc) Ox=$(echo "$Ox + 0.006*2" | bc) Oy=$(echo "$Oy + 0.006*2" | bc) Oz=$(echo "$Oz - 0.004*2" | bc)
    done
    echo " "
    echo "Completing job on `hostname` at `date`" echo " "
    
This post was originally developed by my colleague William Browuer, PhD. wjb19@psu.edu
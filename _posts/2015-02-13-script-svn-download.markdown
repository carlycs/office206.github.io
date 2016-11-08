---
layout: post
title:  "How to install a package residing on svn repo"
date:   2015-02-02 16:39:11
categories: Systems
comments: True
published: True
---
# How to install a package residing on svn repo

Few days ago a client was asking for installing a package that is residing on svn. I sent her this cript to install the package onto her account. You won't need any permission to have these packages loaded onto your account. 


    #!/bin/bash
    
    cd $HOME
    DOWNLOAD_FOLDER=toolbox/
    PSY_VERSION=3
    echo "====================="
    echo "LOADING ONLY MATLAB"
    echo "====================="
    module purge
    module load matlab
    module list
    sleep 2
    echo "====================="
    echo "CHECKING OUT THE REPO"
    echo "====================="
    sleep 2s
    
    #CHECK IF THE FOLDER DOESN'T EXIST
    DIRECTORY_TARGET=$HOME/$DOWNLOAD_FOLDER
    if [ ! -d "$DIRECTORY_TARGET" ]; then
        mkdir $DIRECTORY_TARGET 
            
    fi
    #IF IT EXISTS CLEAN IT AND BUILD IT AGAIN
    if [  -d "$DIRECTORY_TARGET" ]; then
            rm -rf  $DIRECTORY_TARGET
            mkdir $DIRECTORY_TARGET
    fi
    
    
    cd $HOME/$DOWNLOAD_FOLDER
    
    echo $PWD
    svn checkout https://github.com/Psychtoolbox-${PSY_VERSION}/Psychtoolbox-${PSY_VERSION}/branches/beta/Psychtoolbox/
    echo "LIST OF FILE DOWNLOADED at $DIRECTORY_TARGET "
    sleep 2s
    ls -lrh $DIRECTORY_TARGET 


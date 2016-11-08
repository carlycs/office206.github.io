---
layout: post
title:  "setting up an rvm for comlete isolation"
date:   2015-01-14 12:33:11
categories: Systems
comments: true
published: true
---

setting up an rvm for comlete isolation
  
what is the problem:<http://cheat.errtheblog.com/s/rvm>
  
  
  	<http://askubuntu.com/questions/132276/configure-gnome-terminal-to-start-bash-as-a-login-shell-doesnt-read-bashrc>

I had the same question, and found a solution: Simply use SSH for a real login shell!

As superuser, create a dedicated rvm system user for complete isolation, and assign a password:

	sudo su
	useradd -m rvmuser
	passwd rvmuser

Install dependencies so that rvm can build rubies without asking for the superuser password:

	apt-get install curl gawk libreadline6-dev libssl-dev libyaml-dev libsqlite3-dev sqlite3 autoconf libgdbm-dev libncurses5-dev automake bison libffi-dev

SSH into localhost for a real login shell (you may have to apt-get install ssh)

	ssh rvmuser@localhost

Install rvm

	\curl -sSL https://get.rvm.io | bash -s stable

Log out and back in again so that all rvm functions are loaded

	exit
	ssh rvmuser@localhost



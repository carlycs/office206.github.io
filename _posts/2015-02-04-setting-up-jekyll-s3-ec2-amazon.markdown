---
layout: post
title:  "ruby, rubygem, nodejs"
date:   2015-02-04 16:39:11
categories: Systems
comments: true
published: true

---
#Setting up Jekyll on Amazon EC2, Amazon S3 and locally a MAC


###checking for three requirements: ruby, rubygem, nodejs
sudo yum install ruby
 which ßruby; whcy gem; which pnm;


or you can install it via RVM

[Link to install RVM](https://rvm.io/rvm/install).
Probably the best way to install and manage Ruby is using RVM. Moreover, you can use more than one ruby versions using RVM. I can bet, it's really something like package managing for python.

The reason for that I cannot install ruby is that there is no availalbe repo list

check

	vim /etc/repo.list

you can copy the one from CentOS to Redhat.

Then your yum could search a available repo server and make your ruby downloadable.

	gem --version
	gem install jekyll

while installing the native extensions.
ERROR: Failed to build gem native extension.

    /usr/bin/ruby extconf.rb
mkmf.rb can't find header files for ruby at /usr/share/include/ruby.h

	gem --version
	2.0.14

	whereis ruby
	rm -rf <all directories>

I'm trying to install ruby on Red Hat, via an ssh-connection, but it won't work.

I can't use yum install ruby, because I don't have the needed repositories.


	yum groupinstall 'Development Tools'

And I'M stuck with the following error:

<PRE>
rvm 1.26.10 (latest) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
Searching for binary rubies, this might take some time.
No binary rubies available for: redhat/7/x86_64/ruby-2.2.0.
Continuing with compilation. Please read 'rvm help mount' to get more information on binary rubies.
Checking requirements for redhat.
An error has occurred:
ERROR: can not find RHNS CA file: /usr/share/rhn/RHN-ORG-TRUSTED-SSL-CERT
See /var/log/up2date for more information
An error has occurred:
ERROR: can not find RHNS CA file: /usr/share/rhn/RHN-ORG-TRUSTED-SSL-CERT
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable --ruby

  * WARNING: You have '~/.profile' file, you might want to load it,
    to do that add the following line to '/home/ec2-user/.bash_profile':
</PRE>
      
      source ~/.profile
	jekyll new myblog
	mkdir myblog; cd myblog;
	jekyll serve

[A sample to follow](http://rogchap.com/)


Enabling comments is one of the most important part of setting any blogging platform. [I followed the instructions here ](http://jekyllbootstrap.com/usage/blog-configuration.html)

Linking to a github repo, gives it a more reliable and updated look. I can see who is behind this repo, and when was the last time the code was maintained. 



Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

one main issue is the new RHEL 7 lack of support
can not find RHNS CA file: /usr/share/rhn/RHN-ORG-TRUSTED-SSL-CERT
With RHEL-7 (and beyond), you will not be able to register your system
to RHN Classic (as in it's not supported).

Yes, the path "/usr/share/rhn/RHN-ORG-TRUSTED-SSL-CERT" does not exist
by default, but will become valid once you copy over CA certificate from
your RHN Satellite -- which in fact is the only supported environment
for "classic" registration of a RHEL-7 system.
https://bugzilla.redhat.com/show_bug.cgi?id=906875

cleaning rvm
rvm implode 
cleaning all the bashrc bash_profile .profile and zshrc
[root@ip-172-30-0-209 ec2-user]# yum list ruby
Loaded plugins: amazon-id, rhui-lb
Installed Packages
ruby.x86_64                                                          2.0.0.353-22.el7_0                                                           @rhui-REGION-rhel-server-releases
[root@ip-172-30-0-209 ec2-user]# 
finally it worked:

[root@ip-172-30-0-209 ec2-user]# yum remove ruby-2.0.0.353-22.el7_0.x86_64

which ruby
ruby --version

gem --version throws
/usr/share/rubygems/rubygems.rb:8:in `require': cannot load such file -- rbconfig (LoadError)
	from /usr/share/rubygems/rubygems.rb:8:in `<top (required)>'
	from <internal:gem_prelude>:1:in `require'
	from <internal:gem_prelude>:1:in `<compiled>'

On my system:

$ dpkg-query -S /usr/lib/ruby/1.8/i486-linux/rbconfig.rb
libruby1.8: /usr/lib/ruby/1.8/i486-linux/rbconfig.rb

You probably also want packages "ruby1.8-examples", "irb1.8", "rdoc1.8"
and
"ri1.8"

manuial installation 
cd /root/
wget http://ftp.ruby-lang.org/pub/ruby/2.2/ruby-2.2.0.tar.gz

tar xvzf  ruby-2.2.0.tar.gz
cd  ruby-2.2.0
./configure
make
make install


cd /root/
wget http://production.cf.rubygems.org/rubygems/rubygems-1.8.24.tgz
tar xvzf rubygems-1.8.24.tgz
cd rubygems-1.8.24
ruby setup.rb


source:
https://www.rosehosting.com/blog/how-to-install-ruby-1-9-3-and-rubygems-1-8-24-on-centos-6-2/

how to manually pass the PATH
root@ip-172-30-0-209 bin]# export PATH=$PATH:/root/rubygems-1.8.24/bin
[root@ip-172-30-0-209 bin]# export PATH=$PATH:/root/ruby-2.2.0
ruby-2.2.0/        ruby-2.2.0.tar.gz  
[root@ip-172-30-0-209 bin]# export PATH=$PATH:/root/ruby-2.2.0/
Display all 281 possibilities? (y or n)
[root@ip-172-30-0-209 bin]# export PATH=$PATH:/root/ruby-2.2.0/
[root@ip-172-30-0-209 bin]# gem --version
1.8.24

ANd now after two hours, gem jekyll install installs the extenstions.
\
how about listing what you have on ruby and gem?
Ensure you have the latest gem versions:

	gem update --system
Install the Rake build language (Rake is a build tool written in Ruby, similar to make):

	gem install rake
Install all of Rails and its dependencies:

	gem install rails
List the installed gems:

	gem list
[And here is the Source for how to install ruby 1-9-3]( 
(https://www.rosehosting.com/blog/how-to-install-ruby-1-9-3-and-rubygems-1-8-24-on-centos-6-2/ß)

	cp /root/ruby-2.2.0/bin/gem /bin

taking another beat at this:

	yum update -y
	yum install ruby ruby-devel ruby-ri ruby-rdoc ruby-shadow gcc gcc-c++ automake autoconf make curl curl-devel openssl-devel zlib-devel httpd-devel apr-devel apr-util-devel sqlite-devel

[jekyll]:      http://jekyllrb.com

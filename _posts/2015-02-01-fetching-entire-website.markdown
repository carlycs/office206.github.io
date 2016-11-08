---
layout: post
title:  "Downloading an Entire Web Site"
date:   2015-02-01 13:14:11
categories: tutorials
published: true
comments: true
---



Downloading an Entire Web Site with wget cloning a good design:

	$ wget  
     --recursive 
     --no-clobber 
     --page-requisites 
     --html-extension 
     --convert-links 
     --restrict-file-names=windows 
     --domains website.org 
     --no-parent 
         www.website.org/tutorials/html/
 
 
         
--recursive: download the entire Web site.

--domains website.org: don't follow links outside website.org.

--no-parent: don't follow links outside the directory tutorials/html/.

--page-requisites: get all the elements that compose the page (images, CSS and so on).

--html-extension: save files with the .html extension.

--convert-links: convert links so that they work locally, off-line.

--restrict-file-names=windows: modify filenames so that they will work in Windows as well.

--no-clobber: don't overwrite any existing files (used in case the download is interrupted and
resumed).
SOURCE :  http://www.linuxjournal.com/content/downloading-entire-web-site-wget

What we really need:


Make Offline Mirror of a Site using `wget`

Sometimes you want to create an offline copy of a site that you can take and view even without internet access. Using wget you can make such copy easily:

wget --mirror --convert-links --adjust-extension --page-requisites 


--no-parent http://example.org

-mirror – Makes (among other things) the download recursive.


--convert-links – convert all the links (also to stuff like CSS stylesheets) to relative, so it will be suitable for offline viewing.


--adjust-extension – Adds suitable extensions to filenames (html or css) depending on their content-type.


--page-requisites – Download things like CSS style-sheets and images required to properly display the page offline.


--no-parent – When recursing do not ascend to the parent directory. It useful for restricting the download to only a portion of the site.


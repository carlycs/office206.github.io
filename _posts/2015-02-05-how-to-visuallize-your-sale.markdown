---
layout: post
title:  "How to Visuallize your Sale"
date:   2015-02-05 16:39:11
categories: R
published: true
comments: true
---
#How to Visuallize your Sale

The ability to draw geographical maps is an indispensable tool when analyzing or displaying geographically oriented data such as network data or census information.





<HTML>
<PRE>

map(database, regions) # simple form
map(database="state", regions=".", xlim=, ylim=, boundary=T, interior=T,
                fill=F, color=1, projection=, parameters=, orientation=,
                resolution=1, plot=T, add=F, namesonly=F)
 </PRE>
</HTML>               
                
                
Examples:
<HTML>
<PRE>

map() # state map of the USA
map(’usa’) # national boundaries
map(’county’, ’new jersey’) # county map of New Jersey map(region=c(’new york’,’new jersey’,’penn’)) # map of three states map(proj=’bonne’, param=45) # Bonne equal-area projection of states map(’county’, ’washington,san’, names=T, plot=F)

</PRE>
</HTML>
 Names of the San Juan islands in Washington state
 
 
 	map(xlim=range(ozone.xy$x), ylim=range(ozone.xy$y))
 	text(ozone.xy, ozone.median)
 
 
 Plot the ozone data on a base map
 	
	map(interior=F); map(boundary=F, lty=2, add=T)
 
 National boundaries in one color, state in another

Reference:

Maps in S,
Richard A. Becker Allan R. Wilks,
AT&T Bell Laboratories Murray Hill, New Jersey 07974
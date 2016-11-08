---
layout: post
title:  "How to create a scrollable page of Term and Agreement"
date:   2015-02-16 16:39:11
categories: Bored
published: true
comments: true
---
#How to Convert Name files in a Script

First, create a txt file that holds the name of the files each in one line, listpics.txt we call it:

touch listofpics.txt
ls >> listofpics.txt

now we have a list like the following, in a file called listofpics.txt:

mickey <br>
donald <br>
daffy <br>
bugs  <br>

We also have another folder containing many files: filename1, filename2, ... filenameN.

And we want to iterate through those files to achieve:

filename1 => mickey 
filename2 => donald ...

Basically we are renaming the new files to the old file names. Or we can say we want to update the files with a script.
	
	touch randomnames.txt
	ls >> randomnames.txt

	x=1;
	for y in $(cat randomnames.txt); do
	FILE_SIZE_KB=`du -k "$y" | cut -f1`
		if [ ${FILE_SIZE_KB#0}  -gt 10 ]; then
     		mv $y filename$x;
     		let x=$x+1;
     		echo "OK-$y"
        fi
    done
  
  
And the log:
  <HTML> 
  <PRE>
OK-DSC_0125.JPG
OK-DSC_0126.JPG
OK-DSC_0127.JPG
OK-DSC_0128.JPG
OK-DSC_0130.JPG
OK-DSC_0131.JPG
OK-DSC_0132.JPG
OK-DSC_0133.JPG
OK-DSC_0134.JPG
OK-DSC_0135.JPG
OK-DSC_0136.JPG
OK-DSC_0137.JPG
OK-DSC_0138.JPG
OK-DSC_0139.JPG
OK-DSC_0140.JPG
OK-DSC_0141.JPG
OK-DSC_0142.JPG
dot1x-cb-14:photo-shoot-modelling hoofar$ ls
filename1	filename13	filename17	filename5	filename9
filename10	filename14	filename2	filename6	randomnames.txt
filename11	filename15	filename3	filename7
filename12	filename16	filename4	filename8
dot1x-cb-14:photo-shoot-modelling hoofar$ 

</PRE>
</HTML>
 
TARGET_ADDRESS=
/Users/hoofar/Documents/IMG/img/gallery/collection/fragrances
/Users/hoofar/Documents/IMG/img/gallery/collection/menswear
/Users/hoofar/Documents/IMG/img/gallery/collection/jewlery
/Users/hoofar/Documents/IMG/img/gallery/collection/accessories


	x=1;
	for y in $(cat $TARGET_ADDRESS/listofpics.txt); do
        mv  filename$x  $y;
         let x=$x+1;
    done
  
 Here what comes out of it:
  <HTML> 
  <PRE>
  ...
01-s.jpg	05-s.jpg	09-s.jpg	14-s.jpg	listofpics.txt
02-s.jpg	06-s.jpg	10-s.jpg	15-s.jpg	randomnames.txt
03-s.jpg	07-s.jpg	11-s.jpg	filename16
04-s.jpg	08-s.jpg	12-s.jpg	filename17
dot1x-cb-14:photo-shoot-modelling hoofar$
 </PRE>
 </HTML>

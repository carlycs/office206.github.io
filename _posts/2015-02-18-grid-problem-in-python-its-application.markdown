---
layout: post
title:  "Sovling the grid problem and its applications"
date:   2015-02-18 17:30:01
categories: R
published: false
comments: true
---
#How to astrix.py


#!/bin/python
from numpy import matrix
n = input()

for i in range(n):
    board = []
    for j in range(9):
        board.append([int(k) for k in raw_input().split()])
    sudoku_solve(board)
    
# Head ends here


def sudoku_solve(grid):

   
print "the grid is taken as a 9 by 9 matrix. Then searching element by element- one is found s.t. grid(i,j) sees most number of numbers in his row and his column and in his own 'domain'. The possible solutions are picked from there- IF we didn't get a unique solution for that element we pick the first possible.  We continue until we fix a number. THEN update the grid and continue the filling." 

# Tail starts here

# grid is a matrix, lets read it into one...



# read all lines from the file into a list, where each list element is one line
lines = grid.readlines()

# iterate through the list one line at a time, until you run out of lines
line_number = 0

N = lines[0]   ###number of sample input 
while line_number < len(lines):
    
    from_line_1 = lines[line_number+1]
    from_line_2 = lines[line_number+2]
    from_line_3 = lines[line_number+3]
    from_line_4 = lines[line_number+4]
    from_line_5 = lines[line_number+5]
    from_line_6 = lines[line_number+6]
    from_line_7 = lines[line_number+7]
    from_line_8 = lines[line_number+8]
    from_line_9 = lines[line_number+9]
    
    line_number += 10

grid() = 
[[from_line_1] 
    [from_line_2] 
    [from_line_3] 
    [from_line_4]
    [from_line_5]
    [from_line_6]
    [from_line_7]
    [from_line_8]
    [from_line_9]]
# where should we begin filling...
 
scoreTable = [[0 for i in range(9)] for j in range(9)]         ### initialize score table with zeros scoreTable(9 by 9)  = 0


    
for m in xrange(0, 8):               ###for grid(ij)
    for n in xrange(0, 8):
    
    
        
        if grid(m,n) == 0:     ###if grid(ij)==0, 
            
        						###do 
        
           if lockUp(m,n)==8 ### what is lockUp(ij) and its value  'possables'!
            
            
            
            
            update the grid 
            
            end
        
        else:
            print 'this element is done now next one!'
            
           
            #------------ begining of function definition --------------------
            
        
        define lockUp(i, j):
            for i: 1 to 9 if grid(i,j) !=0 lockUp(i,j) = lockUp(i,j) +1 ###count elements in i'th row not zero  :count += 1
              for j: 1 to 9 if lockUp!=0 lockUp(i,j) = lockUp(i,j) +1              ###count elements in the j'th column not zero
                    
                    
                 
                    for l:0 to 2
                        for k:0 to 2 
                            for i:3*k+1 to 3*(k+1)
                                for j:3*l+1 to 3*(l+1)
                                        if (grid(i,j)!= 0 AND i!= m AND j!=n ):
                                            lockUp(i,j) = lockUp(i,j) +1 
                                            
                              
                        ###count elements in its square not seen yet.
                
                
        
        
        if lockUp(m,n) == 8:  ###you found one as 8, go YES!
           print 'Yes!'; return value.lockUp()  		###and update the grid.
        elif max(lockUp(m,n))==7:  ###you found one as 7, go OK!
        	print 'Ok...'; return value.lockUp() ###update the grid with the first pick.
                
        define update_mygrid():
                            get the most updated grid. get the element location      and 		the 	value for it from lockUp and update the grid and go grid UPDATE my son!
            
            
            #------------ end of function definition --------------------

---
layout: post
title:  "Session 1: Lecture Series-Introduction to Parallel Computing with R"
date:   2015-03-01 15:01:10
categories: R
comments: True
published: true
---

#Session 1: Lecture Series-Introduction to Parallel Computing with R




I started the first draft of the lectures on 11/15/14, 2:09 AM while I waiting for my flight to UTAH Salt lake city to visit my brother. While I have been teaching paralel computing in R at Penn State to graduate students and Postdocs for the past three years and I always considered I working out my tutorials and turn them into one comprehensible code it was a short conversation with my brother and made me resolute on actually start the draft and the recording. I installed Comtasia, stoped by the recording unit in our library, recorded few voice tests and found out every thing is "cleared" to startthis. Here I am going to publish these lectures as a beta tests and review for anyone who needs these, all materials are licencesed under MIT license and if used I would ask for mentioning my name for credit. That would be enough.

Motivation:
I am planning to publish and craft out these posts to raise money for two ongoing projects that I'm working on:
1- A mobile app, on android and iphone on Social dating 
2- A mobile app, mobile on iphone and android on image sharing that is heavily time based and locations based. 


Here is the first lecture:

Introduction:
What can you expect from this course?

What is Parallel Programming? How can you run your R script faster across more processing cores? How can you reach a higher speed-up? Does it depend on the problem you are solving (i.e. the serial R script)? Is R in-efficient in parallization originally? Can a slow script be improved? Can you develop a habit and style for writing easily parallizable codes? What techniques can improve the computing performance of your code? How can you set up and use your own cluster of computing nodes? Can these techniques help you to improve other existing legacy codes written in Python, C or Java? These are just a few of the questions that will be answered in this course.

Why did I produce this course?
My interest in the questions such as the ones above began when I first took a course on Parallel Computing as a student in college. The methods simply didn't work generically. It was more of a black art that seems a lot tuning and fixing. The overall overhead was simply too much, perhaps more than what the potential goal “speed-up” could save! I have been working at a High Performance Computing Center for over three years and over these years worked with clients that needed to improve their code and save months and get their results in a matter of weeks while they didn't have infinite time to re-do their code or learn a new framework from scratch. They needed a method to apply and way to test and measure the improvement in their computing performance, and they need some controls to measure their computing performance in R. Most of them were not professional developers, they were statisticians, bioengineers or simply students working on their thesis. My practice of popular methods on R computing improvements and my reading of popular new techniques supplemented my academic work and professional training as a statistical computing programmer., giving me a balanced perspective between the popularized techniques of R code enhancement and the classic research on parallel computing. That balance is reflected in this course. The course starts from running/executing some common R frameworks on different common problem sets and quickly builds up on your understanding on parallel computing through practice of actual existing R parallel libraries on CPUs. I'm a university graduate with serious technical interest in programming for large systems and intensive computing: I am not primarily a code developer or self proclaimed expert in parallel programming across multiple languages and frameworks and libraries. I've help many clients working with R with their code parallizaton and like to share those workflows that worked for many clients here in this course to hopefully a larger audience that could use them for going beyond with what they are doing at their computing work. 

My teaching as an instructor and research experiences have given me an idea on what people want to know and need to know about parallelization in R and performance enhancement for real-world work and more than few pages type of code development in R. 

In fact, the main reason I am writing down this context was my inability to find any one tetxtbook that overed all these areas in one concise course. The fact that parallel programming has multiple parts to it, the software, the hardware and the frameworks involved, had made it more of a hard topic rather than a practical approach, an art to learn and develop rather than a way of coding practice. More than few decades later, most books on Parallel computing still tend to fall into one of twoo categories: college textbooks on parallel computing and popular blogs and framework book on application of the concepts in one particular programming language. 
This course provides  reasonable balance between the textbooks and the popular books. I like to think of it as the thinkings person's parallel programming book. Methods, principles and techniques are references as to make this course accurate (and valid to a technical developer) but also understandable (so it would be practical to everyday user of R). How I'm successful with at combining the scholar accuracy with technical practicality and ease of follow-up would be a test of time and I look forward to having the feedbacks from the attendees for that matter.

Even though the original impetus for this course arose from my desire to provide one place that lists all that is needed to start parallel programming in R and server as a reference for students, technical developers and researchers and future R library developers, I have written the book so that it can be used by anyone who is interested in improving his understanding of computing, computer architecture (linux based systems) and R (as a stand alone open source statistical computing tool- perhaps my share to give back to this open source endeavor for the time being). This consideration has determined my choice of what subjects to include. The flow of the course is to get a novice R programmer to a level that he finds himeself improving his own code with the R parallel frameworks as soon as possible and as the course grows the provided examples and references only aim to further deepen that know-how.


Why should you take this course?
When you finish studying this book you, too, will have a better understanding of what parallel computing is, what R as an open source source language is and what it can do to implements them and you will be aware of basic principles of performance computing to guide you to  improve your R code performance, you will have an extensive repertoire of short lessons on systems, general hardware and Unix OS knowledge, you can make your R scripts run on multiple instances of CPUs- whether on your multi core local machine or on the computing cluster with hundreds of nodes and hundreds of maga bytes of RAM to indulge on- which ever case applies to you this course should be useful to you from the first hour. Specifically, this course has five characteristics that should help you achieve these results:
It is more practical than textbooks and online tutorials on Parallel Computing and specifically on Parallel Computing in R. 

Parallel computing textbooks are oriented generally towards an academic understanding on the topic. This course is tuned to get the user hands-on from zero as quickly as possible and later builds on the understanding of the methods, aiming to build a state of the art performance based on the technologies available, and open-source when ever possible.  I have discovered through my instructing and consulting experience that most people are interested in improving and applying a parallel framework to their existing code rather than understanding what are the different parallel computing paradigms are.

This course is intended to be a practical guide on where to take your code and do the transition it to a “performances” code; therefore, the emphasis is on more on how to do it than on academic and theoretical issues of parallel computing and issues with parallel frameworks in R.Thus, only few chapters are primarily devoted to understanding parallel computing concepts (the “how it works” part) and they cover only what is necessary to be able to use the other chapters (the “how to improve and paralyze your R script” part which is also listed first. 

It's less technical than textbooks on R on books on parallel computing. Most introduction to R books tend to be written in a style that is orthodox and follows an atomic slow build-up. Topics of primitive types, operators, for loops, if conditions and functions are introduced and then some topics on visualization, plotting, etc. is provided to tie the knot. Beside being academically oreinted in content, most intermidiate to advanced level R programming books and tutorial books tend to be written in a style that is too technical with one particular focus that is too hard to debug, in case needed, and sometimes too technical to people without a background in computer science. These readers almost need another engineer to explain the book chapter to them or list them the extra ropes they need to completely grasp the topic. This course is developed for the intelligent student and layman who does not have a background in computer science research on parallel computing  or system architecture. Thus, the professional jargons used in many textboos are avoided as much as possible and such terms are explained whenever possible. 

It's more technical than popular tutorial books and weblogs on parallel computing with R or R programming. This course is primarily intended to instruct, not to entertain (although I believe it would be compliment to be entertain and be able to explain in a fun way). This, all the text contents are intended to be studied, not to be read like a magazine after watching the particular video. It is intended more for people who are serious about wanting to improve the Programming technique in R than for people who want to do some light reading on R on the way. 

In addition, although the primary focus is put on improving the performance of your existing R script and  doing multiple completed R projects, parallel and serial, some attention is also give n to understanding the code development cycles, R programming standards and parallel computing concepts in general. The serious attendee not only learns how to use these techniques but gains an understanding of how and why they work; this approach is not found in most popular tutorial books, books and online contents. 

It's more objective than popular books on Parallel Computing with R. Many popular books on parallel computing with R tend to be unrealistic in their claims on how effective a particular frame work is in gaining the speed-up over a cluster. For example, they give the impression to the reader that a framework is “simple” to adopt for an existing code and “works”. And that if you use the right syntax you will always get the speed up on your code. In addition, they give the impressions that the frameworks are all-powerful and have no limitations.  This course presents a more realistic perspective since debugging and reviewing failed parallel R scripts on a computing cluster has been my in my day to day job.

It is tested on recent hardware technologies. Most popular books on Parallel Computing with R training do not present any sound evidence and detailed information on how these methods really work. As a result, many people get the impression that parallel programming and some other technique are just fancy optimization steps or that they are not practical or that they require a high development time investments. This course presents multiple workflows and completed examples that illustrates the strengths and weaknesses of the frameworks discussed. Thus, what has actually been found to work is discussed rather than what the framework manual says should work, or what seems as if it should work. This approach should help you realize that the parllization techniques are based on sound scientific principles: application of these methods can make a significant contribution to practical computing tasks in everyday work life of any one working with R and possibly in other programming languages. Cutting a gibs sampling computing time from a 36 hours to 12 hours often means months of earlier work and saves days and nights of unnecassyar deadline stress while it enables you to go beyond what was suggested by previous papers simply because you have a higher “efficient” computing power.  

The research and technical work in this course is recent., not what was known about memory usage or old frameworks in R a decade or more go. 

What Will You Find in This Course?
A lot has happened in the area of parallel computing in R frameworks. 









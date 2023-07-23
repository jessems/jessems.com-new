---
slug: 'retro-march-2020'
date: '2020-04-14'
title: 'Distracted by Corona [Retro Mar, 2020]'
description: 'this post has all of the right fields'
categories: ['test']
keywords: ['test']
published: true
author: 'author'
redirects:
  - '/invisible-post-423123'
---

### What is this and what am I trying to achieve here?

_My goal is to build and run 1+ successful online (software) businesses. Until one of my side-projects is able to support me financially, I have decided to do product design & development consulting as a boutique agency (Pocket Revolutions) in Basel, Switzerland. These monthly retros cover my journey to success for my agency/consulting as well as for my side-projects._

## High-level overview

### Goals and grades

(Did I achieve my goals? If not, why not?)

(I’m experimenting with a different way of grading my goals. See a short elaboration [here](https://jessems.com/grading-goals-with-vectors/).)

**Goal: Finish the Axova app**

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fjessems-second-brain%2FOpsiuydoL2?alt=media&token=ae61c490-3778-47fe-864a-799c5a26aa32)

I didn't finish the app, but it was the right goal to set and I am happy with the progress that I made. The reason it falls short of what I hoped to do has to do with the fact that the remaining tasks took much longer than expected.

While getting the codebase ready for launch, I was refactoring some methods, which broke other parts of the code that relied on these methods. This sort of cascaded through the entire app so I needed to refactor almost everything on the front-end.

This also took a long time because I didn't fully understand all the code on the front-end. Relying heavily on RxJS (as Angular does) if the code worked, I would leave it there, not always fully understanding _why_ it was working. This came to bite me in the ass this month.

But overall I'm happy that I did, because this month I levelled up my understanding of RxJS.

**Goal: Finish PR website case study section**

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fjessems-second-brain%2FxfUtQLFyZd?alt=media&token=d91d13c1-0f1a-4a4e-add5-343dd5a418b5)

I'm happy with the direction of this goal, but because I wasn't able to finish the first goal, I never got to this one. This will probably be carried over to next month.

**Goal: Include Axova as a PR case study**

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fjessems-second-brain%2FHp3px1ljvZ?alt=media&token=635df82b-2282-4bd6-a450-be9513115a44)

I wanted to include Axova as a case study on pocketrevolutions.com, but since I didn't finish the app yet, that hasn't been possible.

### Check in with yearly goals

**Yearly goal: 200k in revenue with Pocket Revolutions in 2020 (10/200)**

I've only been able to charge my one client so far and I'm still working on the app. To get more revenue I need new projects and for new projects I need to do some outreach and for that, I need to finish the Axova app first.

**Yearly goal: Get involved with 5 new apps (0/5)**

I'm not on track to get involved with 5 new apps this year but I'm taking a look at what's being done by different teams with regards to contact tracing apps for COVID-19.

**Yearly goal: 24 blog posts (4/24)**

Not on track. Including this retrospective I'll be at 4 posts, whereas I should probably be at 6 seeing as we've passed the 1 quarter mark for 2020.

### Time distribution

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fjessems-second-brain%2FViAmUdOb1d?alt=media&token=86fad0ed-8954-4ef0-906b-274d65b02ab3)

## My main gig (design & development agency Pocket Revolutions)

### In-depth update

This month was mostly about finishing the Axova app and implementing the needed tests in Angular/Ionic.

I also spent quite a bit of time cleaning up my SQL queries, which was more work than it sounds like. I ended up deciding to put quite a bit of logic into the SQL queries as opposed to doing this on the API server. As a result the data passes unchanged from the database, through the API server to the client.

Initially I thought the benefit of this would be that, seeing as my client is comfortable with SQL, he could view and edit queries himself. I did not expect the queries to get as complicated as they have, however. At this level of complexity I now believe it's a better choice to keep the query bare bones and to do most of the logic in the API server.

That said, there's always optimizations that can be made and one must draw a line somewhere. I felt tempted to work on implementing more logic in the API server this month, but decided not to.

## My side projects

### In-depth update: Pingcoin

I started taking 2 days off per week in March, mostly because I was working so hard during the week that 1 day a week wasn't enough to reset and connect with my girlfriend. Thankfully 2 days is.

My girlfriend and I had set out to do chores on one day and relax and do something creative on the second. We were thinking about playing with a macro lens my girlfriend borrowed from a friend and we needed a subject that would be fun to record up close. This is when we thought about doing a video for Pingcoin.

I've been wanting to do an introduction video for Pingcoin, but it didn't seem important enough to warrant taking the time. Now, it seemed like it would be fun to work on, especially with the constraint that we needed to finish and publish the video by the end of the day.

I'm actually really impressed and happy with the result. What about you?

[https://www.youtube.com/watch?v=b4LbRGKTNiE](https://www.youtube.com/watch?v=b4LbRGKTNiE)

### In-depth update: Rapid Breakup Recovery

I spent almost no time on RBR, which has not been easy. I run a facebook support community and it is only because of the amazing other moderators in there that I was able to be absent for a month. I don't know how (or if) I can combine a strong focus in another area without the community going to waste.

## Commentary

Overall I spent a lot of time on my research of the Corona virus. I'm trying to apply a new rule to myself whenever I get drawn into something. The rule is that if I spend time researching something, I have to synthesize that into something new. For every portion of time spent consuming information I need to spend some time synthesising that information into something new.

In the case of the Corona virus I decided to generate some custom made plots in a Python notebook and share those with friends and family. They're heavily inspired by the graphs done by the Financial Times. I made a slight innovation by taking a 10-day rolling derivative of the cumulative log death counts (which turns a line corresponding to a 33% daily increase in death into a straight line). This is perhaps a bit too abstract for FT readers, but I like it because it gives you a better impression of how countries are doing. And luckily they all seem to have really cut their exponential growth rates.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fjessems-second-brain%2FFUrc2Biz0X?alt=media&token=75ced4c3-1d71-4a45-ba07-69a4e293ddb9)

Next month is going to be about actually shipping the Axova app, showcasing it on pocketrevolutions.com and perhaps, if I have time, starting with outreach towards getting new clients.

## What did I learn?

The Pingcoin video is a great result. But I didn't reach it with my normal strategy of breaking things down, waking up early, working alone, grinding it out. Instead the idea came from my girlfriend, and although we had the constraint of needing to finish it the same day, it was mostly a relaxed and creative exercise. Maybe this is evidence that supports the case that a more playful approach to things can yield better and unexpected results.

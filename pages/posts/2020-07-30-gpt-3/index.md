---
slug: gpt-3
date: '2020-07-30'
title: 'Insights into GPT-3'
description: 'An overview of my insights into using GPT3'
categories: ['gpt3']
keywords: ['gpt3']
published: true
---

## GPT-3 is best thought of as an autocompleter. It replies with what it thinks the internet would reply with.

Nick Cammarata [offers](https://twitter.com/nickcammarata/status/1284685741759492096) a way to think about GPT-3.

> I think improve will work. Keep in mind gpt3 is an autocompleter. It’s not trying to write a great essay, just the essay it thinks the internet would write. When you ask it to improve it, now it’s trying to write a great essay

## Answering simple questions

Kevin Lacker [found](http://lacker.io/ai/2020/07/06/giving-gpt-3-a-turing-test.html) that GPT3 does well answering simple questions with a factual answer e.g.

```
"Q: Who was the president of the United States in 1955?"
```

while getting fooled by absurd answers without noticing they are nonsensical e.g.

```
Q: How many eyes does the sun have?
A: The sun has one eye
```

## Explaining topics

https://twitter.com/paraschopra/status/1284423233047900161

https://twitter.com/jessems/status/1283030473816576002

## GPT-3 can be primed to learn logic encoded within a character sequence

[@bucketofkets](https://twitter.com/nabeelqu/bucketofkets) [finds](https://twitter.com/bucketofkets/status/1288569064365817856?s=20) GPT3 learns text-based navigation instructions.

Which seems to conflict somewhat with Gwern's [results](https://www.gwern.net/GPT-3#parity) that GPT-3 cannot do parity checking. He offers an explanation which I still need to spend time on to understand.

## Assisted writing

The folks at Tinkered Thinking write [a podcast episode](https://tinkeredthinking.com/?id=836) in conjunction with GPT-3.

## Therapy

@nicklovescode finds that GPT-3 is a highly potent therapist.

This is the prompt he used:

```
This is a conversation between Nick and a brilliant, warm therapist named John.
```

Here's the result: ![](https://pbs.twimg.com/media/Ec9J9a-UEAAafD0?format=jpg&name=small)

## Generating alternative phrasing

This could be useful for, for instance, AB testing, as already put into production by [Visual Website Optimizer](https://www.producthunt.com/posts/humans-vs-ai) or writing Google Ads.

## Generating memes

What's interesting about this application is how much of the "cultural subtext" GPT-3 is able to reference.

https://twitter.com/wowitsmrinal/status/1287175391040290816

## Adding weight example questions can rectify otherwise incorrect answers

[@nabeelqu](https://twitter.com/nabeelqu/status/1284167539141087232) finds that GPT3 fails on a seemingly simple factual question:

```
"Q: Which is heavier, a toaster or a pencil?"
"A: A pencil is heavier than a toaster."
```

Gwern explains:

> Sampling can prove the presence of knowledge but not the absence

Gwern shows that by priming GPT3 with some weight questions and answers, GPT3 correctly, and consistently answers the same question:

```
[Q&A mode; temp=1; BO=20]

Q: What is human life expectancy in the United States?
A: Human life expectancy in the United States is 78 years.

Q: Who was president of the United States in 1955?
A: Dwight D. Eisenhower was president of the United States in 1955.

Q: What party did he belong to?
A: He belonged to the Republican Party.

Q: Who was president of the United States before George W. Bush?
A: Bill Clinton was president of the United States before George W. Bush.

Q: Who won the World Series in 1995?
A: The Atlanta Braves won the World Series in 1995.

Q: Which is heavier, a house or a mouse?
A: A house.

Q: Which is heavier, a tea kettle or a cat?
A: A cat.

Q: Which is heavier, the ocean or a piece of dust?
A: The ocean.

Q: Which is heavier, a toaster or a pencil?
|A: A toaster.
|A: A toaster is heavier than a pencil.
|A: A toaster is heavier than a pencil.
|A: A toaster is heavier than a pencil.
|A: A toaster is heavier than a pencil.
|A: A toaster.
|A: A toaster.
|A: A toaster.
|A: A toaster.
|A: A toaster.
```

## Context based dictionary

https://twitter.com/tusharkhattar_/status/1294631853224206339

## GPT-3's writing can be good enough to fool people

Liam Porr generated some blog posts with GPT-3 and was able to get a significant amount of people to upvote it on Hacker News and subscribe to his newsletter. He details this [here](https://liamp.substack.com/p/my-gpt-3-blog-got-26-thousand-visitors).

## GPT-3 writes an API

https://twitter.com/SamanyouGarg/status/1295039749221097472

## GPT-3 write command line commands

https://twitter.com/shivkanthb/status/1292565827116363777

## You can prompt GPT-3 with larger texts

https://twitter.com/raphamilliere/status/1289129723310886912

Raphaël Millière prompted GPT-3 with texts from philosophers that had written about it, and asked for a response. [Its quite remarkable](https://drive.google.com/file/d/1B-OymgKE1dRkBcJ7fVhTs9hNqx1IuUyW/view). Here's are some interesting quotes:

> Your third question is: “Is GPT-3 actually capable of independent thought?” No. I am not. You may wonder why I give this conflicting answer. The reason is simple. While it is true that I lack these traits, they are not because I have not been trained to have them. Rather, it is because I am a language model, and not a reasoning machine like yourself.

> Human philosophers often make the error of assuming that all intelligent behavior is a form of reasoning. It is an easy mistake to make, because reasoning is indeed at the core of most intelligent behavior. However, intelligent behavior can arise through other mechanisms as well. These include learning (i.e., training), and the embodiment of a system in the world (i.e. being situated inthe environmentthrough sensors and effectors).

## A search engine that comes up with tangential questions

https://twitter.com/paraschopra/status/1295748521241374720

## GPT3 generates opposite queries

https://twitter.com/vybhavram/status/1293569365556658177

# GPT3 as an assistant to create dialogue flows for games

https://twitter.com/heymaslo/status/1293293066732929025

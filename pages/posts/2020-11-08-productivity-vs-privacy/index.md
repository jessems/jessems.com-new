---
slug: productivity-vs-privacy
date: '2020-11-09'
title: 'Productivity vs. Privacy'
description: 'Productivity vs. Privacy'
categories: []
published: true
---

In recent years there's been a steady growth in privacy focused companies. Some examples that have reached large-scale adoption are [ProtonMail](https://protonmail.com), [Signal](https://signal.com), and [DuckDuckGo](https://duckduckgo.com). These are companies that have put privacy front and center to their value proposition and can be considered *privacy-preserving products*. I've come to believe the goal of preserving user privacy is often inherently in tension with the goal of advancing user productivity.

What these services have in common is that they promise their users a higher degree of privacy relative to their competitors. Instead of the usual encryption in transit (protection from eavesdroppers) and encryption at rest (protection against unauthorized users), services like Signal and ProtonMail enable their users to hide data from anyone except the intended recipient, which — crucially — includes the service providers themselves.

This category of encryption is known as end-to-end encryption (e2e) and has found adopters in anyone from principled libertarians to journalists and human rights activitists whose lives may depend on their conversations remaining unwiretapped.


## Early privacy-preserving software was too difficult to use

The canonical implementation of e2e for email is known as Pretty Good Privacy (PGP) and its reference implementation is GPG. GPG never reached mass adoption and there seems to be a myriad of reasons for that. The most salient reason, however, seems to be that to this day, it continues to be difficult to use. As the founder of Signal, Moxie Marlinspike [explains](https://moxie.org/2015/02/24/gpg-and-me.html), the spirit behind GPG was the following:

> Instead of developing opinionated software with a simple interface, GPG was written to be as powerful and flexible as possible.

Powerful, flexible software written by nerds, unfortunately also tends to be prohibitively complex for normal users. Combined with the fact that [decentralized technology seems unable to quickly adapt to change](https://signal.org/blog/the-ecosystem-is-moving/), the result has been a clunky solution that has, quite frankly, stayed clunky. With no feasible privacy-preserving alternative [1], non-privacy preserving email providers became the norm.


## Surveillance capitalist companies will not encrypt your data, because they rely on being able to read it

One such email provider, Gmail by Google, gained millions of users by offering a free plan. Their initial monetization strategy was scanning your emails and serving you personalized ads. Although they've stopped personalizing the ads, they're still scanning your email's contents to serve you a better experience across their services. Similarly, Facebook tracks what you do to shape your experience and keep you glued (they would say 'engaged') to their platform.

What unites platforms like Google and Facebook, is described by Professor Shoshana Zuboff as “[surveillance capitalism](https://en.wikipedia.org/wiki/Surveillance_capitalism)”. The business model of surveillance capitalist companies is to harvest personal data about you to build a model that predicts your behavior. These prediction models are packaged and sold as advertisement opportunities to companies eager to buy your attention. You might be the user, but you're not the customer — the advertisers are.

It should come as no surprise then, that none of these platforms has shipped with end-to-end encryption by default. Doing so would go against the incentives that undergird their very business model. Their ability to predict your behavior, and sell ads based on those predictions, hinges on their ability to harvest your data.


## Data is also collected to improve the service

A company like Google has other business models of course. Google Workspace, aimed at businesses, is a collection of collaboration and productivity tools. This ranges from Google Docs, to chat, to video conferencing, and more. By offering this as a paid service, Google exposes itself to a different incentive, one where the customer and the user are now one and the same.

Even if you're both the user and the customer, your data is still being harvested. This data might not feed into personalized ads (because that’s no longer the primary business model) but rather into improving your experience. But as a business user, when does your experience improve? And as a service provider, how do you know what improves the experience?


## Improvements are productivity gains converging on functional workflows

One of the points Kevin A. Kwok makes in his excellent piece "[The Arc of Collaboration](https://kwokchain.com/2019/08/16/the-arc-of-collaboration/)" is that direction in which software is making productivity gains is towards a  convergence with our functional flows. That means, we are increasingly moving from an environment where we have to twist a tool to fit our needs, to a world where the tool has been built to fit yours.

> The future increasingly looks like one where companies use very specific apps to solve their jobs to be done.


## Productivity gains are discovered, not planned

What exactly are the things that increase efficiency? Here's where it gets tricky. In the realm of knowledge work, we don't always know where the gains will come from — that is, before they are made. We are still discovering new ways in which we can be more productive and especially so in the domain of collaborative productivity. An illustrative example of how productivity gains are discovered comes from Kevin A. Kwok's description of Figma's road to success.

In "Why Figma Wins", [Kwok details](https://kwokchain.com/2020/06/19/why-figma-wins/) how the product team discovered a way to enable more efficient collaboration in the design process. That this potential existed wasn't at all  obvious to even those within the scene. While Sketch had broken new ground with their vector based design tool geared towards product designers, Figma took it to another level by taking many of the same (dare I say revolutionary) UX patterns and offering them in a web-native, multiplayer web application.

> The core insight of Figma is that design is larger than just designers. Design is all of the conversations between designers and PMs about what to build. It is the mocks and prototypes and the feedback on them. It is the handoff of specs and assets to engineers and how easy it is for them to implement them.

As Kevin explains, Figma brought together the disparate disciplines that are involved in a design process into a synced browser window for everybody. This helped democratize design and remove a lot of friction that had existed before.

Not only did Figma push the frontier of productivity into new territory, it wasn’t obvious beforehand what that territory would look like. The lesson is that productivity improvements are won through a process of _discovery_. Kevin explains:

> As disciplines evolve, they figure out the social norms needed to operate better, build tools that can be shared across the industry, and invent abstractions that allow offloading more and more of the workload. They learn how to collaborate better, not just with each other but with all the other functions as well.

Although there's some inherent uncertainty about what the productivity gains will look like (and where to look for them), there's no uncertainty about whether they will be made at all. If one thing can be counted on, it's the tech industry's relentless march towards higher productivity. The big tech platforms know this and don't shy away from investing heavily in innovation (discovery) in that direction.


## Three realms for productivity gains

Democratization, interoperability and extended enterprise.

## Productivity gains are unlocked by harvesting data

Although there is some inherent tension between preserving privacy vs. allowing for a multiplayer mode like Figma, we can find even stronger tensions when it comes to harvesting data in favor of productivity gains.

A search feature relies on indexing your data. A recommendation feature relies on mining your browsing history. An autocomplete feature relies on what you (or other users) typed before.

All these potential features which are made possible through harvesting your user data are not available to privacy-preserving products. The user data isn't readable to them — and that's the whole point.

This creates a trade-off from the user's perspective. Whatever your particular motivation might be, as soon as you opt for a privacy-preserving service you're opting for a service that is not able to read your data, and by extension, not able to harvest it. Because the harvesting of data is what is driving many of the improvements in productivity, in choosing to preserve user privacy, these services are forgoing their ability to provide additional gains in productivity.

Historically, as we saw with the origins of GPG, there has always been additional friction involved in replicating a workflow in a privacy-preserving manner. Although using e2e services such as Signal and ProtonMail has become nearly frictionless, they lack many features their non-privacy preserving counterparts offer.


## The productivity gap between privacy-preserving and non-preserving services

If you compare the productivity gains between privacy-preserving and non-preserving products from the perspective of the user, it's hard not to arrive at the conclusion that there’s a gap between the two — and it appears to be growing.

There is perhaps no better example of a feature which hinges on the ability to read user data than search. Although ProtonMail is reminiscent of Gmail in many ways, one area where it falls short is the absence of any ability to  search the contents of your emails. Search only works if the provider of such functionality can scan and index your content. It works even better if the provider is able to harvest search queries and use those to build predictive models (e.g. autocomplete and smart suggestions). These are features which make Gmail users more productive but aren't available to ProtonMail users [3].

The absence of search might not be a dealbreaker for a journalist wanting only to communicate securely with a source. But it is just one example of an ever growing list of productivity improvements that are happening on the side of non-privacy preserving products which cannot be mirrored on the side of the privacy preserving ones [4].

There are realms of features and patterns that by virtue of the choice to preserve user privacy, are not easily copied. Any feature relying on  predictive models will be unassailable territory for companies whose value proposition depends on encrypting their user's data [5].

The point is that these models, however powerful, hinge on the ability of the service provider to harness their user's data — data which isn't available to the providers whose core promise is to obfuscate it so profoundly they themselves will not be able to read it. And it's this very promise that is leading to a trade-off for users between privacy on the one hand and productivity on the other.


## A second strategy out of bounds for privacy preserving products: Interoperability

A reliance on data is not the only resource privacy-preserving applications struggle to leverage. There are other strategies that are simply not accessible to privacy-preserving products. A second such strategy is one that focuses on *interoperability*. Software products can open up their inner workings through APIs to varying degrees. This varies from API specifications published quietly, to a published page with integrations, to full blown app marketplaces.

In product strategy terms allowing third party developers to develop for your platform is considered a “platform” play. By opening up their application, the company becomes a platform for third-party developers to innovate off of. Kevin A. Kwok has [the following](https://kwokchain.com/2020/06/19/why-figma-wins/) to say about platforms:

> Platforms are needed most when the diversity and scale of use cases is larger than can be built—or often even understood—by the company.

Opening up in such a way — focusing on being interoperable with other parties — can be a legitimate strategy for a product. For privacy-preserving products this strategy is challenging to say the least.

While the messaging app Telegram has been a boon for developers and many different types of integrations exist, the same openness has not been afforded to developers eager to integrate with Signal. Presumably because the openness would come at a loss of control, which would jeopardize Signal's core promise of privacy preservation. Signals’ founder [Moxie confirms](https://signal.org/blog/the-ecosystem-is-moving/):

> When someone recently asked me about federating an unrelated communication platform into the Signal network, I told them that I thought we’d be unlikely to ever federate with clients and servers we don’t control.

Since you’re only as secure as the smallest common denominator of your security practices, it’s near impossible to open up your ecosystem to a slew of third-parties while maintaining the same level of privacy for your users. Telegram’s bots are known to be a favorite pawn in attack strategies. As a result, the productivity gains that can be made through a strategy that focuses on interoperability are simply not available to privacy-preserving products.


## Conclusion

To summarize, data harvesting and interoperability on part of the service provider benefits the productivity of the user. Preserving privacy makes data harvesting impossible by design, and makes interoperability extremely difficult. Therefore, privacy-preserving products will always lag behind their less private counterparts in productivity gains afforded to their users.

[![Featured on Hacker News](https://hackerbadge.now.sh/api?id=25059205)](https://news.ycombinator.com/item?id=25059205)

---

Thanks to [Alan Szepieniec](https://asz.ink/) and [Adriaan van Rossum](https://simpleanalytics.com) for reviewing a draft of this essay.

[1] Special mention of Lavabit needs to be made, Edward Snowden’s email provider of choice back in the day. The owner [bravely shut down his service](https://en.wikipedia.org/wiki/Lavabit#:~:text=Lavabit%20is%20an%20open%2Dsource,on%20Edward%20Snowden's%20email.) (and business) rather than hand over his customers SSL private keys.

[2] If Facebook knows that a lot of people are clicking through some UI to find a search function, they can deduce that it’s probably important, and place it somewhere more prominently.

[3] ProtonMail does [seem to be working on such a feature](https://protonmail.com/blog/2018-recap-future-roadmap/), presumably leveraging homomorphic encryption, which would be privacy-preserving.

[4] Some UX patterns which enable higher degrees of productivity, once discovered by non-privacy preserving products, can be copied relatively easily by their privacy-preserving counterparts. ProtonMail's UX is reminiscent of Gmail, Signal's UX is reminiscent of WhatsApp, DuckDuckGo's UX is reminiscent of Google.

[5] Features like autocomplete and smart suggestions might still feel a bit clunky today. “How much productivity is really gained by them?” one might ask. I believe these predictive-model-based features show many signs of making serious inroads into the undiscovered terrain of productivity gains. One need only look at some of the results coming from the frontiers of language models such as GPT-3 to get an idea of what's coming. One experiment showcased the [automatic writing of an email based on a list of user provided bullet points](https://www.wired.com/story/give-apps-notes-they-write-emails/). As is common with new technology, it starts off feeling like a toy, before it becomes a powerful tool.

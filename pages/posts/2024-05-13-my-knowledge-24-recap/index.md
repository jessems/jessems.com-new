---
slug: my-knowledge-24-recap
date: '2024-05-13'
title: My Knowledge 24 Recap
description: My Knowledge 24 Recap
published: true
category: ''
tag: 'servicenow, knowledge'
---

I just came back from ServiceNow's yearly "Knowledge" conference as a first-time participant. I came away moderately impressed and hopeful. Which one could chalk up as a win for ServiceNow, given that my starting point was: somewhat disillusioned about ServiceNow as a platform (the developer experience in particular) & bewildered by the unbridled enthusiasm seen among many of its staunchest acolytes.

In the end I was touched by the high spirits of many of the ServiceNow employees I got to meet, inspired by displays of their competence & future platform capabilities and, ultimately, allayed in my concerns about the near term future of the ServiceNow developer experience.

![](./images/20240513065050.png)

All that being said, certain aspects of the conference were still bewildering to me. Case in point, the opening keynote with the ServiceNow's CEO Bill McDermott. It felt like a scene from a Ben Stiller comedy featuring a successful, yet out-of-touch sexagenarian CEO who views himself as a rockstar.

Given that Knowledge is a conference on enterprise software — a concept with about as much overlap with rock stars as a chess club has with fight club — I didn't have "CEO dressed as a Bond villain, wooping and fist pumping on stage" on my bingo card. Then again, maybe enterprise software is orders of magnitudes cooler than I make it out to be.

![A wooping Bill McDermott](./images/2024-05-12_17.29.51_1715528251283_0_opt.gif)

To be fair to ServiceNow, there certainly were things they shared later on in the conference that were genuinely impressive, innovative and exciting (more on that later). Knowledge as a conference, though, (and I was warned about this) is heavy on marketing and light on the the rest. That is to say, the conventional wisdom shared with me is that one should look past the hyperbole and look instead at all the other stuff on offer. Which, by the way, is easier said than done, when walking around at the conference was made to feel like walking around a neon green AI-themed casino.

![](./images/20240513065234.png)

For anyone at Knowledge 24 it was made obvious that ServiceNow is betting big on AI. In fact, it was hard to find a session not explicitly linked to AI. So much so, that one could easily forget that, as of this writing, ServiceNow's AI features are still packaged behind one of its most premium subscription tiers. For all the spotlight given to the new AI capabilities, there was comparatively little attention for how these capabilities will be priced. What does a future look like where "AI reaches every corner of the business" if said business cannot afford said AI? This question went painfully unanswered.

ServiceNow was eager to communicate how they've realigned their architecture and product offering to make it easy to enhance existing workflows with AI, or to invent new ones. Most of those demos, though, I found underwhelming. Some seemed like something you could have done yourself with just the Open AI API (something they would still allow for, we were told). Other demos, like the ones in the Day 3 Creatorcon keynote, weren't live demos but slick animations. This left us wondering how good the capabilities will be when the rubber meets the road.

The AI announcements certainly overshadowed some of the other showcases. ServiceNow is upgrading its database technology, for instance, offering a 3x speed up for transactions.

The real golden nugget in my opinion, though, were the announcements around the developer experience. ServiceNow will integrate the web version of the industry standard VS Studio Code IDE into the platform, they will roll out support for programming in TypeScript (another industry standard) as well as support concurrent development on multiple branches via "sandboxes".

## Session Notes

### Day 1

#### Keynote: Put AI to work for people ⭐️

[Recording](https://www.servicenow.com/events/knowledge/2024/sessions/put-ai-to-work-for-people.html)

#### How SAP transformed customer support with GenAI (Accenture) ⭐️⭐️

My first session was with Accenture where they shared their insights from implementing Gen AI across 80 clients. One of the main points they made was that as an organization adopts Gen AI, it gets rid of certain tasks (like creating a knowledgebase article) but also creates others (like managing prompts). Their advice was that you need to be prescriptive about what people should do when Gen AI frees up some of their capacity.

#### Uncover the secrets of Text2Flow: Dive deep into GenAI innovation (Expo: CreatorCon Ask the Experts 3 — Prasanthi PVL, Rahul Kumar) ⭐️

A close-knit, informal conversation with two technical ServiceNow employees. They showed us how the text-to-flow and text-to-playbook features work.

Rahul also mentioned there would be a token-based model, where you can pay for the Now Assist features per API call.

#### Designing Apps: A practical guide to thinking like a developer (Lab (1h40m) — Andrew Barnes, Paige Duffey) ⭐️⭐️

I did a workshop on developing apps on the platform. It was good to to be able to question some experienced developers from Servicenow on best practices around update sets, repositories etc.

-   Use decision tables when you can, because it's a way of exposing the business logic to your stakeholders in a human-readable and editable way.
-   On instance cloning — Clone to your test instance every month and to your dev every quarter.
-   Update Sets are not going anywhere. When you use them, make sure you always batch.
-   Do not import applications from a PDI to an organization's instance, because it will inherit the PDI's application prefix.
-   On scopes — Use scopes as much as possible. If different groups interact with a piece of the system, consider giving it a different scope.

[Guidebook](https://servicenow-events-or-lab-guidebo.gitbook.io/ccl1187-k24)

#### ServiceNow Developer Meetup - AI roundtable discussion ⭐️

We were left to discuss AI on our own, which didn't generate such interesting conversations.

#### Building LLM-based topics in Virtual Agent (Talk (30m)— Paige Camerino, Sr Inbound Product Manager) ⭐️

A session on LLM based Virtual Agent topics. These new topic types do away with the NLU workbench, training, entities and more. They're auto-generated from catalog items, but can obviously also be custom created.

#### Generative AI on the Now Platform: You're closer than you think — Andy Krier, Director, Product Management, Paul van Nistelrooij, Director, Product Management ⭐️

Paul and Andy gave a high level overview of Generative AI capabilities. One of the benefits they highlighted was that you no longer need to collect data and train a model when you're working with, for instance, Virtual Agent. Another feature was the automatic generation of Knowledgebase articles based on an incident.

### Day 2

#### Keynote: Unleashing the power of generative AI with the ServiceNow platform (Keynote 1h — CJ Desai) ⭐️⭐️

An engaging keynote with CJ Desai, were we were told a bit more about the roadmap. The now assist chat was new to me. They're bringing in some performance improvements, like 3x quicker DB operations. They are also going to create their own, service-now specific models while also allowing you to interact with third party modules. They said their goal is that every single object in ServiceNow can be generated by text or an image. Lastly they showed MyAssist which is a chat bot for employees which has access to what they're calling the knowledge graph, which contains all relevant information pertaining to the employee. This allows them to, for instance, check and schedule vacation days via chat.

[Recording](https://www.servicenow.com/events/knowledge/2024/sessions/unleashing-the-power-of-generative-ai-with-the-servicenow-platform.html)

#### Dive into the future with Athena, TMLabs' innovative new AI utility (Talk 20 min — Tobias Schwartz, Solution Architect, TMLabs) ⭐️

Tobias showed us their third party app for ServiceNow, Athena, which offers some LLM functionalities such as the ability to chat with a document.

#### Git outta here! Loading instance tables with contributions directly from GitHub (Talk 30 min — Earl Duque, Developer Advocate) ⭐️⭐️⭐️

Earl showed us how he uses ServiceNow in conjunction with a GitHub repository and GitHub actions to sync database records to tracked files in the repository. This allows someone to edit database entries by committing to the repository, without needing access to the instance.

[Repo](https://github.com/earlduque/ServiceNow-Table-Loader)

#### Now now: Discover the future of coding developer potential with GenAI (Talk 20 min — Ashish Sethi, Renjith Ragil Ramachandran) ⭐️

Ashish and Renjith showcased some of the developer-specific features packaged in Now Assist such as autocomplete, an "explain script" feature, a "comment code" feature and a "refactor code" feature. I found these to be underwhelming and not obviously better (and possibly worse) than what is already available using sn-scriptsync in conjunction with GitHub co-pilot.

#### You sunk my mothership: Creating complex interactivity in the Next Experience (Workshop 1h40m, Travis Toulson, Sr. Architect, CodeCreative) ⭐️⭐️⭐️

Awesome masterclass on using UI builder with Travis Toulson. One note that I made was that GraphQL is the preferred approach for accessing and manipulating service side storage (for performance reasons).

[Guidebook](https://servicenow-events-or-lab-guidebo.gitbook.io/ccl1353-k24)

#### Sleeping even better — full pipeline automation for ServiceNow apps (Talk 30m — Markus Hammelmann, Architect, Deutsche Telekom, Sascha Wildgrube, Principal Technical Consultance, ServiceNow) ⭐️⭐️⭐️

Markus and Sascha gave an engaging and educational presentation on how they migrated the ServiceNow setup at Deutsche Telekom, with an overwhelming amount of instances, developers and update sets, to a manageable and testable workflow.

**Notes**

-   Everything needs to be a scoped app
-   What to do with existing changes?
    -   Refactor everything so it is all an app
    -   Use existing state as a baseline
-   Coding guidelines are critical

1. Create a scoped app
2. Connect source control
3. Install the deployer app
    - Dependency management
    - Installation scripts
4. Write the first automated test
5. Explore instance scan
6. Coding guidelines
    - You need to write these to do the instance scan
    - They generate a docusaurus document from the JSDOC
7. Define and maintain your app architecture
    - Slice capabilities into applications to allow independent deployments
    - Keep track of dependencies between applications
    - Assign teams to applications (new way of thinking)
    - Continuous improvement
8. Organize a CICD workshop
9. Setup the community of practice

### Day 3

#### Keynote: Accelerating Innovation with Creativity & Connection (Dan Levy, Jon Batiste, Nick Tzitzon, Chief Strategy and Corporate Affairs Officer, ServiceNow) ⭐️⭐️

I really enjoyed this session, although I don't think it had any relevance pertaining to the conference. Nick did a great job hosting the conversation, which was engaging and interesting.

#### SN Utils unveiled: 90 minutes to master the essentials and beyond (Workshop 1h40m, Arnoud Kooi, Solution Architect, Workflow Design Studio, ServiceNow) ⭐️⭐️⭐️

Great, knowledge-packed, workshop on the use of sn-utils by its creator Arnoud Kooi. Here are some of the commands that were new to me.

-   `/bgc` background script where you load the current record in a background script
-   `CMD + click` on a technical name: Takes you to the reference record
-   `/rnd -a` fill in random values in a catalog item
-   There's a setting to customize the website favicon
-   `/p` sys_properties shortcut
-   `/p valueLIKEwashi` Adding query variables
-   `/imp` Impersonate
-   `//si iamprofile` slash command for a slash command

[Guidebook](https://servicenow-events-or-lab-guidebo.gitbook.io/ccl1122-k24)

#### CreatorCon Keynote ⭐️

They Keynote where ServiceNow presented the unification of the different studios under one studio, a VS Code based web IDE and developer sandboxes (allowing for concurrent development on different branches). The demos were so slick they were no longer realistic, which left me with more questions than answers.

[Recording (not live yet)](https://www.servicenow.com/events/knowledge/2024/sessions/creatorcon-keynote.html)

#### Distributed source-driven development and deployment across your team (Ask the experts 30m — Patrick Wilson, Engineering Director, ServiceNow) ⭐️⭐️⭐️

Honestly, the last session should probably have been named "The future of software development on ServiceNow" and featured more prominently. It was the single most impressive and relevant display of what is to come for the ServiceNow developer experience.

Most serious ServiceNow developers I know don't use ServiceNow's built-in development feature set (think browser based editor). Instead, they use a hacky (but wonderful) workaround, provided by a browser extension called sn-utils combined with a VS Code extension called sn-script-sync. This allows them to write code inside a fully featured, industry leading and open source IDE, VS Code by Microsoft.

In the end the scripting experience on the platform is just a html field equipped as a script editor. It's not a full fledged IDE and that's what many developers have been seeking out as evidenced by the full room at Arnoud Kooi's talk on sn-utils.

**VS Code powered IDE**

Patrick showed us that ServiceNow, starting in Xanadu if I'm not mistaken, have integrated the web version of VS Code into the ServiceNow platform.

**Metadata as code**

Distributed digital work is best solved by developers and git source control. It's obvious that ServiceNow developers would benefit from this as well, but there are certain aspects of the old update set & XML paradigm that make it difficult to migrate fully.

One area where this shows up in an obvious way is when you connect an app to a git repository. The files that are committed to the update set are not very human readable. They're basically a collection of cryptically named, property-stuffed raw data files. This fact renders many of the features of git source control moot.

However, if you can abstract away most of the XML file and expose only the fields you're used to dealing with (in the form view), you can create sometimes that's recognizable, human-readable and amenable to git source control.

This is, apparently, what the SN team have done. They use TypeScript to create a domain specific language to describe the high level metadata of the XML records. This is conjoined with an SDK which compiles that TypeScript to instance-compatible XML code.

(I suspect there's another added benefit, namely that the terser, cleaner TypeScript is more easily ingested by and generated from an LLM.)

This allows the developer experience (and source control) to occur at the human-readable TypeScript layer, while pushing the clunky-but-essential XML layer to the background.

**Sandboxes**

Developers will be able to develop on different branches, concurrently, on the platform. This will be made possible through a feature called "sandboxes", which virtualizes the entire instance on a sub-sub-domain e.g. branch.instance.service-now.com.

### Lessons learnt about the conference

-   Session registration fills up almost instantly and opens in the US timezone
-   You can typically join a session even if you're not registered
-   Not all sessions are equal. Some are very short and very basic. Others, for instance, are 1.5 hour long workshops. The best session ended up being an informal "ask the experts" session at the end of day 3.

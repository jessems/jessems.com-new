---
slug: how-to-exit-a-topic-and-return-to-topic-discovery-in-virtual-agent
date: '2024-05-21'
title: 'How to exit a topic and return to topic discovery in Virtual Agent'
description: 'How to exit a topic and return to topic discovery in Virtual Agent'
tags: 'ServiceNow, Virtual Agent'
published: true
category: 'technical'
---

Sometimes the user might find themselves 1 or 2 steps into a topic and realize it's not the correct topic for their intent. In those cases we want to allow them to exit the topic and do something else, rather than ending the conversation entirely

You can achieve this by using a **Script Action** and using the `switchTopic` method to switch to the default `Greetings.` topic or to a fallback topic.

```js
(function execute() {
	vaSystem.switchTopic('Custom Fallback Topic');
})();
```

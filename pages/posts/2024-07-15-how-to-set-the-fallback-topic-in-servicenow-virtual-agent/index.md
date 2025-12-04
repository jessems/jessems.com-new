---
slug: how-to-set-the-fallback-topic-in-servicenow-virtual-agent
date: '2024-07-15'
title: How to set the fallback topic in ServiceNow Virtual Agent
description: How to set the fallback topic in ServiceNow Virtual Agent
published: true
category: technical
tag: 'servicenow, virtual agent, chatbot, fallback topic'
---

Virtual Agent has a default Topic which is routes the user to if Topic Discovery doesn't yield a different Topic.

There's a default `Fallback Topic` that is used for this purpose. Sometimes you may want to replace it with an altered clone, or something else entirely.

Once you've created your alternative Fallback Topic, you can go to **Conversational Interfaces > Settings**.

Once on the Settings page, navigate to the `Virtual Agent` tab in the vertical menu bar. Then click on `View all` for the `Custom greetings and setup` card.

On the `Custom greetings and setup` page you can select the chat experience you want to modify, typically there's just one: `Default chat experience`. Click it.

On the `Default chat experience` page, select the `Setup Topics` tab. In the displayed list you will see an entry for `Fallback Topic`. This is where you can change its value.

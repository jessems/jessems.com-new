---
slug: filter-by-the-current-users-language
date: '2025-01-15'
title: Filter by the current user's language
description: Filter by the current user's language
published: true
category: technical
tag: servicenow
---

## Problem

You want to create a filter in the ServiceNow UI that filters by the current user's language.

## Solution

You can use scripted filters in combination with `gs.getUser()` API as follows:

```javascript
javascript: gs.getUser().getLanguage();
```

![](./images/20250115102703.png)

It's interesting to note that `gs.getSession().getLanguage()` doesn't work as a scripted filter. Even though it does work in, say, a background script.

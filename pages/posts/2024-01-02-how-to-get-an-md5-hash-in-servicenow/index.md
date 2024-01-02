---
slug: how-to-get-an-md5-hash-in-servicenow
date: '2024-01-02'
title: 'How to get an MD5 hash in ServiceNow'
description: 'How to get an MD5 hash in ServiceNow'
tags: 'ServiceNow'
published: true
category: 'technical'
---

You can hash any string in ServiceNow using the following:

```js
var digest = new GlideDigest();
gs.info(digest.getMD5Hex('hash this').toLowerCase()); // e80c715e5d4e885f68d7a3853b5fca73
```

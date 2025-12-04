---
slug: how-to-find-out-if-a-sysid-has-valid-formatting
date: '2023-11-15'
title: How to find out if a sysId has valid formatting
description: ''
published: true
category: technical
tag: servicenow
---

Sometimes you want to check whether a field contains a valid sysId without doing a lookup with `GlideRecord`. In those cases you can use the following method:

```js
sysID = '62826bf03710200044e0bfc8bcbe5df1';
gs.info(GlideStringUtil.isEligibleSysID(sysID)); // true
```

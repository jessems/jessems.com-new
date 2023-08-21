---
slug: get-date-in-ddmmyyyy-format-in-servicenow
date: '2023-08-18'
title: 'Get date in DD.MM.YYYY format in ServiceNow'
description: 'et date in DD.MM.YYYY format in ServiceNow'
tags: 'servicenow, date'
published: true
category: 'technical'
---

This code gets the current date in a desired format e.g. dd.MM.YYYY or dd/MM/YYYY

```js
var gd = new GlideDate(); // Create a GlideDate object

gs.info(gd.getByFormat('dd.MM.yyyy')); // Get a formatted string e.g. 18.08.2023
gs.info(gd.getByFormat('dd/MM/yyyy')); // Get a formatted string e.g. 18/08/2023
```

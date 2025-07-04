---
slug: converting-xml-to-json
date: '2025-07-04'
title: 'Converting XML to JSON'
description: 'Converting XML to JSON'
tags: 'servicenow'
published: true
category: 'technical'
---

I used to use `XMLDocument` to convert XML to JSON, as it has a handy pretty print functionality for XML. However, you cannot call it from scoped apps. So this is the current best way to do it:

```javascript
var xmlDoc = new XMLDocument2();
xmlDoc.parseXML(responseBody);
var xmlString = xmlDoc.toString();

var jsonObject = gs.xmlToJSON(xmlString);

gs.info(JSON.stringify(jsonObject)); // Output: { "root": { "element": { "subelement": "value" } } }
```

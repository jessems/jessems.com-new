---
slug: how-to-delete-a-record-in-servicenow-via-script
date: '2024-07-15'
title: How to delete a record in ServiceNow via script
description: ''
published: true
category: ''
tag: ''
---

## Deleting a single record

```js
var grInc = new GlideRecord('incident');
grInc.get('02d253db87178a10e30563540cbb35dc');

if (grInc.next()) {
	grInc.deleteRecord();
}
```

## Deleting multiple records

```js
var grInc = new GlideRecord('incident');
grInc.addQuery('active', false);

grInc.query();

while (grInc.next()) {
	grInc.deleteRecord();
}
```

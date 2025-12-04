---
slug: how-to-prevent-a-record-insert-in-servicenow
date: '2024-04-30'
title: How to prevent a record insert in ServiceNow
description: How to prevent a record insert in ServiceNow
published: true
category: technical
tag: servicenow
---

You can make a field mandatory via its dictionary definition, but this still allows for scripted / server-side inserts.

To prevent even those programmatic record inserts, you can use the [`setAbortAction()`](https://developer.servicenow.com/dev.do#!/reference/api/latest/server_legacy/c_GlideRecordAPI#r_GlideRecord-setAbortAction_Boolean) method on the GlideRecord object in a `before` business rule.

```javascript
// Inside a before business rule

(function executeRule(current, previous /*null when async*/) {
	current.setAbortAction(true);
})(current, previous);
```

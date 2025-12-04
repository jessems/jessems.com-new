---
slug: how-to-delete-multiple-records
date: '2024-01-08'
title: How to delete multiple records
description: How to delete multiple records
published: true
category: technical
tag: servicenow
---

Below is the best way I know to delete multiple records using scripting. No need to put deleteMultiple() in a while loop, it will iterate over the records by itself.

```js
var grCSS = new GlideRecord('incident');
grCSS.addQuery('sys_updated_by', 'adm-jesse.szepieniec'); // optional
grCSS.query();
grCSS.deleteMultiple();
```

## References

-   [deleteMultiple() (ServiceNow API Reference)](https://developer.servicenow.com/dev.do#!/reference/api/utah/server_legacy/c_GlideRecordAPI#r_GlideRecord-deleteMultiple)

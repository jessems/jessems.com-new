---
slug: how-to-create-a-new-table-in-servicenow-without-the-u_-prefix
date: '2024-07-10'
title: How to create a new table in ServiceNow without the u_ prefix
description: How to create a new table in ServiceNow without the u_ prefix
published: true
category: technical
tag: 'servicenow, scripting'
---

When you create a new table in ServiceNow, the system will default to prefixing the table name with `u_`. This is a common practice to avoid conflicts with system tables. However, there are cases where you might want to create a new table without the `u_` prefix. Here's how you can do it:

In a background script execute the following:

```js
var table_name = 'awesome_logging', // The technical tale name
	table_label = 'Awesome Logging', // The label of the table
	extends_table = 'syslog';

var attrsList = new Packages.java.util.HashMap();

var fieldName1 = 'Value';
var ca1 = new GlideColumnAttributes(fieldName1);
ca1.setType('string');

var fieldName2 = 'Project Id';
var ca2 = new GlideColumnAttributes(fieldName3);
ca2.setType('string');
ca2.setUsePrefix(false);

attrsList.put(fieldName1, ca1);
attrsList.put(fieldName2, ca2);

var tc = new GlideTableCreator(table_name, table_label);

tc.setColumnAttributes(attrsList);

if (typeof extends_table != 'undefined') tc.setExtends(extends_table);

tc.update();
```

## References

https://www.servicenow.com/community/developer-forum/how-to-delete-the-quot-u-quot-on-creating-a-custom-table/m-p/2108446/highlight/true#M765372

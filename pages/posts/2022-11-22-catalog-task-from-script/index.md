---
slug: catalog-task-from-script
date: "2022-11-22"
title: "Creating a Catalog Task from a script in Service Now"
description: ""
tags: "servicenow, technical"
published: true
category: "technical"
---

Although the Flow Designer has a built-in Action for creating a new Task, sometimes you may want to create one programmatically. Here is how you can do that. The required fields on the `sc_task` table are `short_description` and `assignment_group`.

```js
var grTask = new GlideRecord("sc_task")

// Initialize the record
grTask.initialize()

// Set required fields
grTask.setValue("short_description", "Short description")
grTask.setValue("assignment_group", "e1376d164febc7808c73f5601310c743") // a sys_id

// Set optional fields
grTask.setValue("description", "Description of Task")

// Insert the record
var taskSysId = grTask.insert()
```

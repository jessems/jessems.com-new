---
slug: running-a-scheduled-job-from-a-script
date: '2024-03-07'
title: 'Running a scheduled job from a script'
description: 'Running a scheduled job from a script'
tags: 'ServiceNow'
published: true
category: 'technical'
---

To execute a Scheduled Script from a script, you can use `SncTriggerSynchronizer.executeNow()`. Just pass the GlideRecord of the Scheduled Script (`sysauto_script`) as the only argument. It looks like this:

```js
var grScheduledJob = new GlideRecord('sysauto_script');
grScheduledJob.get('name', 'YOUR_JOB_NAME_HERE');
SncTriggerSynchronizer.executeNow(grScheduledJob);
```

This also works for the following tables: `scheduled_import_set` (Scheduled Import Sets), `sysauto_template` (Scheduled Template Generation)
`sysauto_report` (Scheduled Report).

---
slug: >-
  how-to-solve-error-there-was-an-error-running-the-batch-test-when-trying-to-test-a-model-in-nlu-workbench
date: '2024-07-15'
title: >-
  How to solve Error: 'There was an error running the batch test.' when trying
  to test a model in NLU Workbench
description: >-
  How to solve Error: 'There was an error running the batch test.' when trying
  to test a model in NLU Workbench
published: true
category: technical
tag: 'servicenow, virtual agent, chatbot, fallback topic'
---

When you try to run a test on your model using test utterances in NLU Workench you might run into the following error message:

```text
There was an error running the batch test.
```

It may be due to the `sys_properties` record `glide.shared_service_scheduler.url` not being set. Setting it to `https://sncmlscheduler.service-now.com/` might resolve it.

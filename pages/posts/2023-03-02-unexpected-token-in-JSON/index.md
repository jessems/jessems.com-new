---
slug: unexpected-token-in-json-at-position-0
date: "2023-03-02"
title: "Resolving: Unexpected token < in JSON at position 0"
description: "How to resolve: Unexpected token < in JSON at position 0 in 'https://<instance-name>.service-now.com/api/now/table/sys_properties':"
tags: "servicenow"
published: true
category: "technical"
---

If you've tried to start the local development server with the ServiceNow CLI like so:

```bash
snc ui-component develop
```

You may have run into the following error:

```shell
Unexpected token < in JSON at position 0 in "https://<instance-name>.service-now.com/api/now/table/sys_properties":
<html>
    <head>
        <meta HTTP-EQUIV="refresh" content="5;https://devel...
```

This occurs when your instance is hibernating. If you visit your instance and wake it back up, things should be working again.

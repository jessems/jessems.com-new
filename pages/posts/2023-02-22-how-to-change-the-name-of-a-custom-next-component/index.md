---
slug: how-to-change-name-of-custom-next-component
date: "2023-02-22"
title: "How to change the name of a custom next component."
description: "A brief quick guide on how to change the name of a custom next component."
tags: "servicenow"
published: true
category: "technical"
---

## Problem

When you deploy a custom next component to your instance it may show up with the name "My Component", but you'd like to give it a custom name.

Where do you set the name?

## Solution

You can set the name of the component by setting the `label` field in the `now-ui.json` file in the root of the component directory.

```json
// now-ui.js
{
  "components": {
    "x-733577-movie-quotes": {
      "innerComponents": [],
      "uiBuilder": {
        "associatedTypes": ["global.core", "global.landing-page"],
        "label": "My Component", // << Change this
        "icon": "document-outline",
        "description": "A description of my component",
        "category": "primitives"
      }
    }
  },
  "scopeName": "x_733577_myorg_m_0"
}
```

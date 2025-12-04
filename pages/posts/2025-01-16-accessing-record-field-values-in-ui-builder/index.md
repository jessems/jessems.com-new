---
slug: accessing-record-field-values-in-ui-builder
date: '2025-01-16'
title: Accessing record field values in UI Builder
description: Accessing record field values in UI Builder
published: true
category: technical
tag: ui builder
---

## Problem

You're building something on top of a record page in UI builder and you want to access one of the fields of the active record.

## Solution

You can use this poorly documented API to access form field values. Note this only works for fields that are visible on the form.

```javascript
api.data.record.form.fields.<field_name>.value
```

For example, to get the value of the `short_description` field of the active record, you can use:

```javascript
api.data.record.form.fields.short_description.value;
```

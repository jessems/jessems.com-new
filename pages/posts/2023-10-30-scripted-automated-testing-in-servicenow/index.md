---
slug: scripted-automated-testing-in-servicenow
date: '2023-10-30'
title: 'Scripted Automated Testing in ServiceNow'
description: 'Scripted Automated Testing in ServiceNow'
tags: 'servicenow, automated testing'
published: true
category: 'technical'
---

## Using fit to focus on certain test cases

## Define a variable outside of the describe block, so that you can set it in a beforeAll or beforeEach block and access it in an it block

## Make sure you use getValue

```js
var grSysUser = new GlideRecord('sys_user');

expect(grSysUser.first_name).toEqual('Jesse');
// Expected Jesse to equal 'Jesse'.

expect(grSysUser.getValue('first_name')).toEqual('Jesse');
// passes
```

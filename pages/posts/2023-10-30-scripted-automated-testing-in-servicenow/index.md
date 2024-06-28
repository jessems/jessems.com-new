---
slug: scripted-automated-testing-in-servicenow
date: '2023-10-30'
title: 'Scripted Automated Testing in ServiceNow'
description: 'Scripted Automated Testing in ServiceNow'
tags: 'servicenow, automated testing'
published: true
category: 'technical'
---

This is a collection of tips for automated programmatic testing in ServiceNow.

## Add a comment which includes the name of the file to make your tests searchable

Server Side ATF Scripts don't have descriptive names in the platform. When they sync to your local machine through sn-script-sync, they show up as `sys_atf_step` records with names like `RunServerSideScript-1771.variable-script`. To make them easier to find, I add a comment on the first line with the name of the file. Then at least I can find them using CMD/CTRL + SHIFT + F in VS Code.

```js filename="RunServerSideScript-1771.variable-script"
// ScriptIncludeName

describe('ScriptIncludeName tests', function () {
	it('should do something', function () {
		// test code
	});
});
```

## Using fit to focus on certain test cases

## Define a variable outside of the describe block, so that you can set it in a `beforeAll` or `beforeEach` block and access it in an `it` block

## Make sure you use getValue

## Use toBe() so you can add the second argument

```js
var grSysUser = new GlideRecord('sys_user');

expect(grSysUser.first_name).toEqual('Jesse');
// Expected Jesse to equal 'Jesse'.

expect(grSysUser.getValue('first_name')).toEqual('Jesse');
// passes
```

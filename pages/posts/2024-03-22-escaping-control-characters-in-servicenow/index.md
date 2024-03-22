---
slug: escaping-control-characters-in-servicenow
date: '2024-03-22'
title: 'Escaping control characters in ServiceNow'
description: "How to escape control characters such as \n in ServiceNow"
tags: 'ServiceNow'
published: true
category: 'technical'
---

Sometimes when you want to make an API request and you want to send a long string which contains newlines (`\n`), you might run into issues. Recently I got this error for instance:

```
Your request contained invalid JSON: Invalid control character at: line 5 column 76 (char 119)
```

This error is due to the REST endpoint not correctly parsing the newline character. To fix this we can escape the newline character before sending it.

ServiceNow has a built in method for this in the `GlideStringUtil` class called `escapeNonPrintable()`. Here is an example of how you can use it:

```js
var longString = 'This is a long string\nwith a newline character';
var escapedString = GlideStringUtil.escapeNonPrintable(longString);

gs.info(longString);
// Output: This is a long string
// with a newline character

gs.info(escapedString);
// Output: This is a long string\nwith a newline character
```

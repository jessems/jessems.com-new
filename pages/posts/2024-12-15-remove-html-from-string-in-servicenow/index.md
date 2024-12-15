---
slug: remove-html-from-string-in-servicenow
date: '2024-12-15'
title: 'Remove HTML from string in ServiceNow'
description: 'Remove HTML from string in ServiceNow'
tags: 'servicenow, javascript, html, string'
published: true
category: 'technical'
---

## Problem

You've got a string field that contains HTML and you want to remove it.

## Solution

Use the native [GlideSPScriptable](https://developer.servicenow.com/dev.do#!/reference/api/xanadu/server/no-namespace/c_GlideSPScriptableScopedAPI) API by instantiating it and calling the stripHTML() method:

```javascript
var testHtml =
	'<div class="user-content"><h1>Welcome to my page</h1><p>This is a <strong>test</strong> paragraph with <em>various</em> formatting.</p><a href="javascript:alert(\'xss\')" onclick="alert(\'click\')">Malicious Link</a><img src="x" onerror="alert(\'image error\')" alt="Test image"><script>alert(\'inline script\')</script><div onmouseover="alert(\'hover\')" style="color: red;">Hover me</div><style>body { background: url(\'javascript:alert(1)\') }</style><div style="background-image: url(\'javascript:alert(1)\')">Style attack</div><a href="data:text/html,<script>alert(1)</script>">Data URL</a><iframe src="javascript:alert(\'iframe\')"></iframe><img src="x" on&#x65;rror="alert(\'encoded\')" alt="Encoded attribute"><div><svg><script>alert(\'svg script\')</script></svg><math><script>alert(\'math script\')</script></math></div><custom-element data-custom="test" onclick="alert(\'custom\')">Custom content</custom-element></div>';

gs.info(GlideSPScriptable().stripHTML(testHtml));

// Result:
// *** Script: Welcome to my page This is a test paragraph with various formatting.Malicious Link Hover me Style attackData URL Custom content
```

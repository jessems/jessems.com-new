---
slug: how-to-run-a-script-in-a-field-from-another-script
date: '2024-02-07'
title: How to run a script in a field from another script
description: How to run a script in a field from another script
published: true
category: technical
tag: servicenow
---

You may want to run a piece of JavaScript which is defined on a field on a particular record. This may or may not be a `script` field.

You can use the [GlideScopedEvaluator](https://developer.servicenow.com/dev.do#!/reference/api/latest/server_legacy/GlideEvaluatorAPI) to do that:

```js
var grTable = new GlideRecord('target_table');
grTable.query();

if (grTable.next()) {
	var evaluator = new GlideScopedEvaluator();
	gs.info(evaluator.evaluateScript(gl, 'u_script', ''));
}
```

## Loading functions into scope

This method also works if you are not returning a specific value in the script field, but rather defining a function that you want to call from another script. For instance, if you have a `u_custom_script` field that looks like this:

```js
function helloWorld() {
	gs.info('Hello, world!');
}
```

Running the following:

```js
var grTable = new GlideRecord('target_table');
grTable.query();

if (grTable.next()) {
	var evaluator = new GlideScopedEvaluator();
	gs.info(evaluator.evaluateScript(gl, 'u_custom_script', ''));
}
```

Will yield: `Hello, world!` in the logs.

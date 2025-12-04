---
slug: using-gslog-from-scoped-apps
date: '2024-07-08'
title: Using gs.log from scoped apps
description: ''
published: true
category: ''
tag: ''
---

There are different ways of logging in ServiceNow, but one cool thing about using `gs.log()` is that you can specify a second argument, `source` which shows up as a separate column in the syslog table. This makes it easy to filter for your logs.

But ServiceNow seems to want to discourage you from using `gs.log`, because you're not allowed to use it from a scoped app. If you try, you'll get this warning:

```text
Evaluator.evaluateString() problem: com.glide.script.fencing.MethodNotAllowedException: Function log is not allowed in scope x_bits2_az_openai. Use gs.debug() or gs.info() instead:
```

So ServiceNow wants us to use `gs.info` and `gs.debug` here, but those methods don't let you specify the source property. So once again it is tricky to filter for your logs.

I found a workaround for this. It's not the most beautiful workaround, but in some cases it might be useful enough.

Basically you can leverage the fact that you can invoke `gs.log` via a globally scoped script include. And you can use the `GSLog` script include, because it comes pre-installed on all instances. So you can still ship your app as a stand alone scoped app.

This is what it looks like:

```js
var gl = new global.GSLog(
	'x_company_app_name.logging.verbosity', // sys_properties key set to 'debug'
	'Specify Source Here' // Source
);
gl.log('debug', 'Your message');
```

This is what it looks like in the logs (note the source column)

![](./images/20240708173326.png)

The unfortunate thing is that you cannot get rid of the "[DEBUG]" prefix in the message and you cannot get rid of the "\*\*\* Script " prefix in the source. But other than that it works as it does in global scope and might be useful in some cases.

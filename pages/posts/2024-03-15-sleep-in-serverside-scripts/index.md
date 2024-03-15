---
slug: sleep-in-serverside-scripts
date: '2024-03-15'
title: 'Sleep in server-side scripts'
description: 'Sleep in server-side scripts'
tags: 'ServiceNow'
published: true
category: 'technical'
---

Sometimes you want to delay the execution of a server-side script. For example, you might want to wait until a record is updated before continuing. You can use the `gs.sleep` function to delay the execution of a script.

```js
// scope: global
gs.sleep(1000); // sleep for 1 second
```

However, this only works in `global` scope. If you want to use this in a scoped application, you need to create class for that.

```js
// scope: global
var SleepForScopedApp = Class.create();
SleepForScopedApp.prototype = {
	initialize: function () {},
	sleep: function (time) {
		gs.sleep(time);
	},
	type: 'SleepForScopedApp'
};
```

Then you can use this class in your scoped application.

```js
// scope: x_1234_my_app
var sleep = new SleepForScopedApp();
sleep.sleep(1000); // sleep for 1 second
```

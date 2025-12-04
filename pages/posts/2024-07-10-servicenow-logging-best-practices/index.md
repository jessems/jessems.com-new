---
slug: servicenow-logging-best-practices
date: '2024-07-10'
title: ServiceNow logging best practices
description: ''
published: true
category: ''
tag: ''
---

Note on where I've left things. There's a closed source function called `GlideLogger` which seems to be used quite a lot by ServiceNow themselves. It takes 3 parameters, the first is the logger name, the second is a context object which gets set as the context map in the log record. The third I'm not sure. It seems it might be a subset of the context map, perhaps what is allowed to print. But nothing gets printed and it doesn't seem to impact the context map.

`GlideLog` seems to have a way to include the stack trace. But there might be issues with scoping.

I want to find out the third parameter of `GlideLogger`.

## Some cool things to use

-   Template strings like GlideLogger
-   Different levels governed by a sys_property
-   Specifying the source so you can easily filter

```js filename="VaCustomAdapterPropertyUtil"
this.logger.error(
	'Exception while getting : CustomAdapterProperty {0} for providerAppId {1} \n {2}',
	name,
	providerAppId,
	message
);
```

## GlideLog

There is also a mention of GlideLog

```js
var StackTrace = Class.create();
StackTrace.get = function () {
	return GlideLog.getStackTrace(new Packages.java.lang.Throwable());
};
```

https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0683765

## Getting the stack trace

```js filename="SOAPRequest"
var sb = new Packages.java.lang.StringBuffer();
var st = e.getStackTrace();
for (var i = 0; i < st.length; i++) {
	sb.append(st[i].toString() + '\n');
}
```

Alternative:

```js filename="IdleChatHandler"
// log the exception with the conversation Id
this.logger.error(
	'IdleChatHandler exception getting interaction type for conversation ' +
		convId +
		': ' +
		GlideLog.getStackTrace(err)
);
//continue processing with next conversation
```

## GlideLogger

### sn_log

```js
gs.info(Object.getOwnPropertyNames(sn_log));
// GlideLogConfigurator,GlideLogger,GlideLogContext
```

###

```js
gs.info(sn_log.GlideLogger.toString());

// function GlideLogger() {
//     [native code, arity=1]
// }
```

```js
gs.info(Object.getOwnPropertyNames(sn_log.GlideLogger));

// debug,atDebug,atTrace,fatal,error,warn,info,trace,atFatal,atError,atWarn,atInfo,arguments,prototype,name,arity,length
```

```js
var properties = Object.getOwnPropertyNames(sn_log.GlideLogger);

properties.forEach(function (property) {
	gs.info(property + ': ' + sn_log.GlideLogger[property]);
});

// *** Script: debug: function debug() {
// 	[native code, arity=6]
// }

// *** Script: atDebug: function atDebug() {
// 	[native code, arity=0]
// }

// *** Script: atTrace: function atTrace() {
// 	[native code, arity=0]
// }

// *** Script: fatal: function fatal() {
// 	[native code, arity=6]
// }

// *** Script: error: function error() {
// 	[native code, arity=6]
// }

// *** Script: warn: function warn() {
// 	[native code, arity=6]
// }

// *** Script: info: function info() {
// 	[native code, arity=6]
// }

// *** Script: trace: function trace() {
// 	[native code, arity=6]
// }

// *** Script: atFatal: function atFatal() {
// 	[native code, arity=0]
// }

// *** Script: atError: function atError() {
// 	[native code, arity=0]
// }

// *** Script: atWarn: function atWarn() {
// 	[native code, arity=0]
// }

// *** Script: atInfo: function atInfo() {
// 	[native code, arity=0]
// }

// *** Script: arguments: null
// *** Script: prototype: [object GlideLogger]
// *** Script: name: GlideLogger
// *** Script: arity: 1
// *** Script: length: 1
```

### sn_log.GlideLogger.atInfo

```js filename="AWALoggingUtils"
	atDebug: function(workItemGR) {
		return this._getLogger(sn_log.GlideLogger.atDebug, workItemGR);
	},

	atInfo: function(workItemGR) {
		return this._getLogger(sn_log.GlideLogger.atInfo, workItemGR);
	},

	atWarn: function(workItemGR) {
		return this._getLogger(sn_log.GlideLogger.atWarn, workItemGR);
	},

	atError: function(workItemGR) {
		return this._getLogger(sn_log.GlideLogger.atError, workItemGR);
	},

    _getLogger: function(loggerType, url, conversationId) {
    var logger = loggerType()
        .withLoggerName('com.glide.cs.link_unfurling')
        .withContext('app', 'CI')
        .withContext('track', 'Link Unfurling')
        .withPrintableContext(['app', 'track', 'url', 'conversation']);

    if (!gs.nil(url))
        logger = logger.withContext('url', url);

    if (!gs.nil(conversationId))
        logger = logger.withContext('conversation', conversationId)

    return logger;
},
```

## Notes

Interesting example from servicenow with chained commands:
https://bithawkagdemo17.service-now.com/now/nav/ui/classic/params/target/sys_script_include.do%3Fsys_id%3Daafd808f53223010af71ddeeff7b1210

The above script references `sn_log.GlideLogger`.

If you type the following in a BG Script you get the methods:

```js
var properties = Object.getOwnPropertyNames(sn_log.GlideLogger.prototype);
gs.info(properties);

// constructor,error,warn,info,debug,fatal,trace,isScopedObject
```

Here is an implementation from `VaCustomAdapterPropertyUtil`:

```js
var source = 'VaCustomAdapterPropertyUtil';
var logContext = {
	app: 'CI',
	track: 'CCCIF',
	source: source
};
this.logger = new sn_log.GlideLogger(source, logContext, [
	'app',
	'track',
	'source'
]);

this.logger.error(
	'Exception while getting : CustomAdapterProperty {0} for providerAppId {1} \n {2}',
	name,
	providerAppId,
	message
);
```

It seems that the function signature is something like this:

```js
/**
 * @param {string} source
 * @param {object} context
 * @param {string[]} contextAttributes
 * @returns {sn_log.GlideLogger}
 */
new sn_log.GlideLogger(source, context, contextAttributes);

/**
 * @param {string} message
 * @param {any[]} args
 * @returns {void}
 */
sn_log.GlideLogger.prototype.error(message, args);
```

## Template string in gs.info

Apparently template strings work in gs.info

```js
gs.info('{0}\n\n{1}', prefix, message);
```

## Resources

https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0714743
[Maik Skaddow blog post on logging on the community](https://www.servicenow.com/community/developer-articles/just-another-log-helper/ta-p/2315453)

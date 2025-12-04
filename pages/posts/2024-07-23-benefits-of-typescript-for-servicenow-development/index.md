---
slug: benefits-of-typescript-for-servicenow-development
date: '2024-07-23'
title: Benefits of TypeScript for ServiceNow development
description: ''
published: true
category: ''
tag: ''
---

# you don't need to guess the type

```js
	begin: function () {
		gs.info('Begin()');
		gs.info('this.transaction ' + JSON.stringify(this.transaction));
		for (var prop in this.transaction) {
			if (this.transaction.hasOwnProperty(prop)) {
				gs.info(prop + ': ' + this.transaction[prop]);
			}
		}
		for (var subProp in this.transaction['transactionRecord']) {
			if (this.transaction['transactionRecord'].hasOwnProperty(subProp)) {
				gs.info(subProp + ': ' + this.transaction['transactionRecord'][subProp]);
			}
		}

		gs.info('sys_id: ' + this.transaction.transactionRecord.getUniqueValue());
```

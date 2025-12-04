---
slug: a-guide-for-using-the-servicenow-sdk
date: '2024-07-17'
title: A guide for using the ServiceNow SDK
description: A guide for using the ServiceNow SDK
published: true
category: technical
tag: 'servicenow, sdk'
---

## How it works

Note: It may tell you that that there were no updates.
Note: The `sys_module` table will not have a corresponding update.

If you fetch, it will pull the files on the instance as metadata files.

Meta Data as code.

## Collaborating with others

Looks like it needs to happen over git.

## What is convert?

## Using TypeScript

## What is the intended use?

## Pulling in external modules

If you want the benefits of intellisense, you can best keep your logic inside the module. However, this makes it less visible to others.

## Creating your own modules

When would you want to create your own module?

I guess when you want to share logic between different scripts and you want to use modern JavaScript / TypeScript.

## Usage

```js
const {
	validatePatient
} = require('x_bits2_data_val/data_validation/0.0.1/src/myfunction.js');

var patient = {
	first_name: 'jesse',
	last_name: 'szepieniec',
	u_birth_date: '1987-01-04',
	u_social_insurance_number: '756.12342.3333'
	// gender: 'male'
};

gs.info(JSON.stringify(validatePatient(patient), null, 2));
```

## Drawbacks

-   You cannot really navigate your codebase. This would have to happen locally.

## References

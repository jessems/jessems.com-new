---
slug: deleting-records-after-a-transform-map
date: '2024-01-10'
title: 'Deleting records after a transform map'
description: 'Deleting records after a transform map'
tags: 'ServiceNow'
published: true
category: 'technical'
---

There are two ways to delete records after a transform map:

## Method 1: Using global variables in Transform Event Scripts

1. Create an onStart Transform Event Script that sets a global variable by declaring it outside of the out-of-the-box function template definition.

    ```js
    (function runTransformScript(source, map, log, target /_undefined onStart_/ ) {
    })(source, map, log, target);

    var updatedRecordIds = []; //Array will be populated on onAfter Transform Scripts
    ```

2. Create an onAfter Transform Event Script that updates the global variable with the sys_id of successfully updated records. Note that this needs to happen outside of any function template (you might not even need a function definition).

    ```js
    if (source.sys_import_state.match(/inserted|updated/i)) {
    	updatedRecordIds.push(target.getUniqueValue());
    }
    ```

3. Create an onComplete Transform Event Script that deletes all records that were not updated during the transform. Log it to the import log if you want.

    ```js
    (function runTransformScript(
    	source,
    	map,
    	log,
    	target,
    	updatedRecordIds /*undefined onStart*/
    ) {
    	var deleteCmnScheduleSpan = new GlideRecord('cmn_schedule_span');
    	deleteCmnScheduleSpan.addEncodedQuery(
    		'sys_idNOT IN' + updatedRecordIds.join(',')
    	);
    	deleteCmnScheduleSpan.query();

    	while (deleteCmnScheduleSpan.next()) {
    		log.info(
    			'Deleting cmn_schedule_span record ' +
    				deleteCmnScheduleSpan.getValue('sys_id') +
    				' because it was not found in the API response.'
    		);
    		deleteCmnScheduleSpan.deleteRecord();
    	}
    })(source, map, log, target, updatedRecordIds);
    ```

## Method 2: Using a custom field on the target table

1. Create an `active` field on the target table

2. Create an `onBefore` transform script to set the `active` field to `false` on all records

3. During transformation, when the record is successfully inserted/updated, set the `active` field to `true`

4. Create an `onComplete` transform event script that deletes all records where `active` is `false`.

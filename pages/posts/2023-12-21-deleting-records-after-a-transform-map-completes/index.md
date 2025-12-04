---
slug: deleting-records-after-a-transoform-map-completes
date: '2023-12-21'
title: Deleting records after a transform map completes
description: Deleting records after a transform map completes
published: true
category: technical
tag: servicenow
---

After a transform script completes, you may want to delete certain records depending on some condition. For instance, if you're periodically importing a list of job openings from an external API, you may want to delete the job opening records as soon as they're no longer included in the API response.

There's two ways to accomplish this.

## Without a adding any fields

1. Create an onStart Transform Event Script that sets a global variable by declaring it outside of the out-of-the-box function template definition.

    ```js
    (function runTransformScript(source, map, log, target /_undefined onStart_/ ) {
    })(source, map, log, target);

    var updatedRecordIds = []; //Array will be populated on onAfter Transform Scripts
    ```

2. Create an onAfter Transform Event Script that updates the global variable with the sys_id of successfully updated records. Note that this needs to happen outside of any function template (you might not even need a function definition). Not also that I'm using the global variable `action` here instead of `source.sys_import_state`. I tried using the latter in the past, and it resulted in timing issues.

    ```js
    if (action.match(/inserted|updated/i)) {
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

## Using a field

1. Create an active field on the target table

2. Create a onBefore transform script to set the active attribute to false on all records

3. During transformation,when record is being updated, set the active attribute to true

4. After completing the transform, you can either write an onComplete transform script or a scheduled job to delete the inactive records that have not been touched during the transform.

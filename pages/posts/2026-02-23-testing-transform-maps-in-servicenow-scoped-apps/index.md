---
slug: testing-transform-maps-in-servicenow-scoped-apps
date: '2026-02-23'
title: 'Programmatic Jasmine Testing of Transform Maps in ServiceNow Scoped Apps'
description: 'How to write Jasmine tests inside ATF that programmatically create import sets, run transforms, and assert on the target records — plus all the pitfalls when doing this from a scoped app.'
tags: 'servicenow, atf, testing, jasmine, transform-map'
published: true
category: 'servicenow'
---

ServiceNow's Automated Test Framework (ATF) gives you a "Run Server Side Script" step type that lets you write Jasmine specs. This is powerful: instead of clicking through the ATF UI to set up import set transforms step by step, you can write a single script that creates a staging row, runs the transform, and asserts every field on the target record. The whole thing rolls back automatically when the test finishes.

The catch? If your app lives in a scoped application, half the APIs you'd expect to use either don't exist or throw security exceptions. This post walks through the working pattern and every pitfall I hit along the way.

---

## Why test transform maps programmatically?

ATF has built-in step types for transform maps, but they're limited. You can't easily parameterize the staging data, you can't run multiple transforms in sequence within one test, and you can't do fine-grained assertions on every mapped field.

With a Jasmine script inside a "Run Server Side Script" step, you get full control:

- Insert arbitrary data into the staging table
- Run the transform synchronously
- Assert on every field of the resulting target record
- Test coalescing behavior (update vs. insert)
- Test edge cases like missing fields or unexpected values
- All within a single ATF test step

---

## The pattern

Here's the complete working pattern. I'll use a generic example — an import set that transforms staging data into a custom target table.

```javascript
(function (outputs, steps, params, stepResult, assertEqual) {
    var STAGING_TABLE = 'x_myapp_import_staging';
    var TARGET_TABLE = 'u_target';
    var TRANSFORM_MAP_SYS_ID = 'abc123...'; // your transform map's sys_id

    describe('My Transform Map', function () {

        /**
         * Helper: insert a staging row and run the transform.
         */
        function insertAndTransform(fields) {
            // 1. Create an import set
            var importSetGr = new GlideRecord('sys_import_set');
            importSetGr.initialize();
            importSetGr.setValue('table_name', STAGING_TABLE);
            importSetGr.setValue('state', 'loaded');
            var importSetSysId = '' + importSetGr.insert();

            // 2. Insert a staging row linked to that import set
            var staging = new GlideRecord(STAGING_TABLE);
            staging.initialize();
            staging.setValue('sys_import_set', importSetSysId);
            var keys = Object.keys(fields);
            for (var i = 0; i < keys.length; i++) {
                staging.setValue(keys[i], fields[keys[i]]);
            }
            staging.insert();

            // 3. Look up the transform map
            var mapGr = new GlideRecord('sys_transform_map');
            mapGr.get(TRANSFORM_MAP_SYS_ID);
            expect(!!mapGr.isValidRecord()).toBe(true);

            // 4. Run the transform synchronously
            importSetGr.get(importSetSysId);
            var transformer = new GlideImportSetTransformer();
            transformer.setImportSetID(importSetSysId);
            transformer.setSyncImport(true);
            transformer.transformAllMaps(importSetGr);
        }

        /**
         * Helper: find a target record by a unique field.
         */
        function findTargetRecord(uniqueValue) {
            var gr = new GlideRecord(TARGET_TABLE);
            gr.addQuery('u_unique_field', uniqueValue);
            gr.setLimit(1);
            gr.query();
            if (gr.next()) {
                return gr;
            }
            return null;
        }

        it('should map all fields correctly', function () {
            var testId = '0000099901';

            insertAndTransform({
                unique_field: testId,
                name: 'ATF Test Record',
                category: 'A1',
                is_active: 'true'
            });

            var target = findTargetRecord(testId);
            expect(target).not.toBeNull();

            if (!target) {
                return;
            }

            expect(target.getValue('u_unique_field')).toBe(testId);
            expect(target.getValue('u_name')).toBe('ATF Test Record');
            expect(target.getValue('u_category')).toBe('A1');

            // Boolean fields: getValue() returns '1'/'0', not 'true'/'false'
            expect(target.getValue('u_is_active')).toBe('1');
        });
    });
})(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();
```

Let's break down the key parts.

---

## Step 1: Create an import set record

```javascript
var importSetGr = new GlideRecord('sys_import_set');
importSetGr.initialize();
importSetGr.setValue('table_name', STAGING_TABLE);
importSetGr.setValue('state', 'loaded');
var importSetSysId = '' + importSetGr.insert();
```

The `sys_import_set` record is the parent container. You need to set its `table_name` to your staging table and its `state` to `'loaded'`.

Note the `'' +` before `importSetGr.insert()`. This coerces the return value to a plain JavaScript string. Without it, you get a GlideElement object, and Rhino's type coercion can cause the cryptic error `Cannot find default value for object` later when you try to use it as a string.

## Step 2: Insert a staging row

```javascript
var staging = new GlideRecord(STAGING_TABLE);
staging.initialize();
staging.setValue('sys_import_set', importSetSysId);
// set your staging fields...
staging.insert();
```

The staging row must reference the import set via `sys_import_set`. The field names here are the column names on your staging table (the import set table), not the target table.

## Step 3: Run the transform

```javascript
var transformer = new GlideImportSetTransformer();
transformer.setImportSetID(importSetSysId);
transformer.setSyncImport(true);
transformer.transformAllMaps(importSetGr);
```

Three things matter here:

1. **`setSyncImport(true)`** — Without this, the transform runs asynchronously. Your assertions would execute before the transform finishes, and everything would fail.

2. **`transformAllMaps(importSetGr)`** — This method takes the import set GlideRecord as an argument. Not just the sys_id. You need to re-fetch it if you only have the sys_id: `importSetGr.get(importSetSysId)`.

3. **`GlideImportSetTransformer`** — This is the class that works. More on this in the pitfalls section below.

## Step 4: Assert on the target record

```javascript
var target = findTargetRecord(testId);
expect(target).not.toBeNull();
expect(target.getValue('u_name')).toBe('ATF Test Record');
```

Query the target table by whatever coalesce field your transform map uses. Then assert on the mapped fields using `getValue()`.

---

## The pitfalls

This pattern looks straightforward, but getting here from a scoped app involved hitting several walls.

### Pitfall 1: `GlideImportSetRun` doesn't exist in scoped apps

Your first instinct might be to use `GlideImportSetRun`, which is documented in various community posts. In a scoped app, this class simply doesn't exist — it returns `undefined`.

```javascript
// BROKEN in scoped apps
var runner = new GlideImportSetRun();
// TypeError: GlideImportSetRun is not a constructor
```

This class is only available in the global scope.

### Pitfall 2: `global.GlideImportSetTransformer` throws a SecurityException

Your next attempt might be to reach into the global scope explicitly:

```javascript
// BROKEN - throws SecurityException
var transformer = new global.GlideImportSetTransformer();
```

This throws a security exception because scoped apps can't arbitrarily access global-scope classes with the `global.` prefix.

### Pitfall 3: `GlideImportSetTransformer` (without prefix) just works

The solution is to use `GlideImportSetTransformer` without any scope prefix:

```javascript
// WORKS in scoped apps
var transformer = new GlideImportSetTransformer();
```

Why does this work when the `global.` prefix doesn't? ServiceNow automatically grants cross-scope access to certain platform APIs. `GlideImportSetTransformer` is one of them. The platform resolves it correctly without you having to specify the scope — and in fact, specifying the scope explicitly _breaks_ it.

### Pitfall 4: `transformAllMaps()` needs the GlideRecord, not just the ID

```javascript
// BROKEN — transform runs but processes zero rows
transformer.setImportSetID(importSetSysId);
transformer.transformAllMaps(); // no argument!

// WORKS
importSetGr.get(importSetSysId);
transformer.transformAllMaps(importSetGr); // pass the GlideRecord
```

The `setImportSetID()` call alone isn't enough. You also need to pass the GlideRecord to `transformAllMaps()`. If you omit it, the transform "runs" without errors but processes zero rows, and your target table stays empty. This is a particularly frustrating bug to diagnose because there are no error messages.

### Pitfall 5: Boolean fields return `'1'` / `'0'`, not `'true'` / `'false'`

If your staging table has a field with the value `'true'` that maps to a boolean field on the target, `getValue()` on the target returns `'1'`, not `'true'`:

```javascript
// FAILS
expect(target.getValue('u_is_active')).toBe('true');

// PASSES
expect(target.getValue('u_is_active')).toBe('1');
```

ServiceNow stores booleans internally as `1` and `0`. The transform map handles the conversion from `'true'`/`'false'` strings to boolean values, but `getValue()` always returns the internal representation.

### Pitfall 6: Coerce `insert()` return values with `'' +`

The Rhino JavaScript engine that ServiceNow uses for server-side scripts doesn't handle GlideElement-to-primitive coercion well. If you use the return value of `insert()` directly (which is a GlideElement, not a string), you can get `Cannot find default value for object` errors downstream:

```javascript
// RISKY — importSetSysId is a GlideElement
var importSetSysId = importSetGr.insert();

// SAFE — importSetSysId is a plain string
var importSetSysId = '' + importSetGr.insert();
```

### Pitfall 7: Forgetting `setSyncImport(true)`

Without `setSyncImport(true)`, the transform runs asynchronously. Your Jasmine `expect()` calls execute immediately after `transformAllMaps()` returns — before the transform has actually finished. Every assertion fails because the target record doesn't exist yet.

```javascript
// BROKEN — assertions run before transform completes
transformer.transformAllMaps(importSetGr);
// target record doesn't exist yet!

// WORKS
transformer.setSyncImport(true);
transformer.transformAllMaps(importSetGr);
// target record exists now
```

---

## ATF auto-rollback: no cleanup needed

One of the best features of ATF is that all database changes made during a test are rolled back automatically. The import set records, staging rows, and target records you create during the test all disappear when the test finishes.

This means you don't need `afterEach` cleanup logic. You can use known test IDs without worrying about collisions with real data or previous test runs.

---

## Testing coalescing behavior

Transform maps often coalesce on a unique field — meaning they update an existing record instead of creating a new one if a matching record already exists. You can test this by running `insertAndTransform` twice with the same coalesce value:

```javascript
it('should update existing records on coalesce field', function () {
    var testId = '0000099902';

    // First transform — creates the record
    insertAndTransform({
        unique_field: testId,
        name: 'Original Name',
        category: 'A1'
    });

    var first = findTargetRecord(testId);
    expect(first).not.toBeNull();
    if (!first) return;
    var firstSysId = first.getUniqueValue();

    // Second transform — should update, not insert
    insertAndTransform({
        unique_field: testId,
        name: 'Updated Name',
        category: 'B2'
    });

    var second = findTargetRecord(testId);
    expect(second).not.toBeNull();
    if (!second) return;

    // Same sys_id — record was updated, not duplicated
    expect(second.getUniqueValue()).toBe(firstSysId);
    expect(second.getValue('u_name')).toBe('Updated Name');
    expect(second.getValue('u_category')).toBe('B2');
});
```

---

## The full wrapper

Every "Run Server Side Script" step in ATF wraps your code in a function that receives `outputs`, `steps`, `params`, `stepResult`, and `assertEqual`. Your Jasmine specs go inside this wrapper, and you must call `jasmine.getEnv().execute()` at the end:

```javascript
(function (outputs, steps, params, stepResult, assertEqual) {

    describe('...', function () {
        it('...', function () {
            // your test
        });
    });

})(outputs, steps, params, stepResult, assertEqual);

jasmine.getEnv().execute();
```

The `jasmine.getEnv().execute()` call at the bottom is what actually triggers the Jasmine runner. Without it, your specs are defined but never executed.

---

## Summary

| What | How |
| --- | --- |
| Create import set | `new GlideRecord('sys_import_set')` with `table_name` and `state: 'loaded'` |
| Insert staging row | `new GlideRecord(STAGING_TABLE)` with `sys_import_set` reference |
| Run transform | `GlideImportSetTransformer` (no scope prefix) with `setSyncImport(true)` |
| Assert results | Query target table, use `getValue()` |
| Cleanup | Automatic — ATF rolls back all DB changes |

The biggest lesson: when working in a scoped app, use `GlideImportSetTransformer` without any scope prefix. Don't use `GlideImportSetRun` (doesn't exist in scope) and don't use `global.GlideImportSetTransformer` (throws SecurityException). The unqualified class name resolves correctly through ServiceNow's cross-scope access mechanism.

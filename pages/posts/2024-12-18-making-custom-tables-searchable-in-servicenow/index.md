---
slug: making-custom-tables-searchable-in-servicenow
date: '2024-12-18'
title: Making custom tables searchable in ServiceNow
description: ''
published: true
category: ''
tag: ''
---

## Problem

You've created a custom table but when you use global search or search in configurable workspaces, the table's records are never returned.

## The name of the search on the top

The search on the top is called the Next Experience Unified Navigation search field.

## Using AI Search in Next Experience

[Using AI Search in Next Experience](https://www.servicenow.com/docs/bundle/vancouver-platform-administration/page/administer/ai-search/concept/using-ais-next-experience-app.html)

## Setting `Show global search` on the experience settings

If you open UIB and navigate to an experience overview, there will be a button in top right to access the **Experience Settings**.

Click this button to open the settings and scroll down to the bottom to find the **Show global search** setting.

If you check this box, there will be an option in the global search box to saerch within that experience. If you uncheck it, this options will not be available (but typically `Global` will still be available).

## Setting text_index

You need to tell ServiceNow you want it to create a search index for the table. You can do this by setting the `text_index` field on the table's `sys_dictionary` record to `true`.

1. Navigate to the `sys_dictionary` table
2. Search for your target table with the column `type` set to `Collection`
3. Click on the record for your target table
4. Set the `text_index` field to `true`
   Note: The `text_index` field wasn't visible by default for me, and I couldn't immediately figure out which UI Policy was hiding it. So I ended up updating the value by script like so:

    ```javascript
    var table = new GlideRecord('sys_dictionary');
    table.addQuery('name', 'my_table');
    table.addQuery('type', 'Collection');
    table.query();
    table.next();
    table.text_index = true;
    table.update();
    ```

## Resources

-   [Configuring search in Next Experience](https://www.servicenow.com/docs/bundle/xanadu-platform-user-interface/page/administer/navigation-and-ui/concept/configuring-search-next-experience.html)
    [Add a workspace application to the Unified Navigation search context menu](https://www.servicenow.com/docs/bundle/xanadu-platform-administration/page/administer/search-administration/task/add-app-search-context-polaris-ui.html)
-   [Global and Workspace Search in Next Experience UI](https://www.servicenow.com/docs/bundle/xanadu-platform-administration/page/administer/search-administration/concept/search-settings-filter-group-table.html#title_search-sources-polaris-ui)

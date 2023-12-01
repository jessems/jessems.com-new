---
slug: how-to-pass-variables-into-a-modal
date: '2023-10-31'
title: 'How to Pass Variables into a Modal'
description: 'How to pass variables into a modal in ServiceNow Configurable Workspaces'
tags: 'ServiceNow, Configurable Workspaces'
published: true
category: 'technical'
---

This article can be see as a follow up to my previous two tutorials.

I wrote one tutorial on [how to add a button to the UI Bar](adding-an-action-bar-button-to-a-configurable-workspace) of a configurable workspace.

I wrote a second tutorial on [how to make that button open a modal](/opening-modal-from-a-record-in-configurable-workspaces/).

This tutorial is about passing variables into that modal. It assumes you've already completed the first two steps and you've got a button that opens a modal.

## What we're going to create

Here's an animated gif of what we're going to create. We're simply going to pass two values from the opened Incident record into the modal. The modal will then render those values in two Styled Text components.

![](./images/20231101122131.gif)

## Prerequisites

-   A Configurable Workspace which you've customized with a declarative action (e.g. a button in the UI Bar) which opens a modal. (See [this tutorial](adding-an-action-bar-button-to-a-configurable-workspace) on how to accomplish that)
-   A modal which you've hooked up to your declarative action so that when it is clicked/triggered the modal opens (See [this tutorial](/opening-modal-from-a-record-in-configurable-workspaces/) on how to accomplish that)

## Step 1: Adding the parameters to your UIB Page

The modal will render a UIB Page. If you've followed the prerequisites you should already have a UIB Page which renders inside of your modal.

This UIB Page will have a `sys_ux_app_route` record associated with it. It's on this record that we need to make some changes, but it be tricky to find the right record. Why? Because once we set the field `parent_macroponent_composition_element_id` to `modalContainerViewport` (which we do to make sure the modal appears in our parent macroponent) the variant may no longer show up in your list of UIB Pages/Variants.

1.  **Locating the UIB Page** — Try to locate the UIB Page that renders inside the modal in UI Builder. If you're able to find it, open it and navigate to **Settings > Open Records > Variant Collection**. This should open the `sys_ux_screen_type` record. This record has a related list called "UX App Routes". There should be a UX App Route record that corresponds to your UIB Page. Open that `sys_ux_app_route` and proceed to step 3.

2.  **Navigating to `sys_ux_app_route`** — If you cannot locate the UIB Page simply navigate to the `sys_ux_app_route` table and search for the `sys_ux_app_route` record that corresponds to your UIB Page. Once you've found it, open it.

3.  **Adding parameters** — There used to be a way to add parameters through the UI Builder UI but with Vancouver that seems to have been removed. Instead we can define these in the `sys_ux_app_route` record. Here the `fields` field takes a comma separated list of field names and corresponds to the required parameters. The `optional_parameters` also takes a comma separated list of field names and corresponds to the optional parameters. For the sake of this tutorial let's define one required parameter `requiredParameter` and one optional parameter, you guessed it, `optionalParameter`. Finally, save the record.

    ![](./images/20231031192137.png)

4.  **Locating the UIB Page** — If you found your UIB Page in Step 1, navigate back to it. If you didn't find (like me) it might be because of the following bug. When you set the `parent_macroponent_composition_element_id` field on the `sys_ux_app_route` record, your UIB Page will disappear from the overview of Pages/Variants in your Experience overview. Temporarily clear this field, so you can continue with the steps. Once you're on the UIB Page, you should now see the parameters in the top left corner of the UIB Page.

    ![](./images/20231101103049.png)

5.  **Using the parameters** — Create two Stylized Text components and choose the option "Configure the component manually".

6.  **Bind the parameters to the components** — In the config for each of the Styled Text components set the Text field to "Bind data" and set one to `@context.props.requiredParameter` and the other to `@context.props.optionalParameter`. If you've configured test values for the parameters, they should now be rendered in the Styled Text components. Finally save your changes.

    ![](./images/20231101103815.png)

7.  **Re-enter the `parent_macroponent_composition_element_id`** — If you needed to clear the `parent_macroponent_composition_element_id` field on the `sys_ux_app_route` record, in Step 4, in order to find your UIB Page, you can re-enter the value of `modalContainerViewport` now (otherwise our modal won't show up).

## Step 2: Mapping the parameters to the payload

1.  **Navigate back to the Declarative Action** — Navigate back to the `sys_declarative_action_assignment` record for your button. You can find this under **Now Experience Framework > Actions and Events > UX Declarative Actions** or **Now Experience Framework > Actions and Events > Action Bar Declarative Actions** if your button is an Action Bar button.

2.  **Open the advanced view** — Click on the related link "Advanced View" to open the advanced view of the record.

3.  **Open the Payload Definition record** — There should be a Section Tab called "Action Attributes" with one field called Payload Map. Through this field we want to tell the system what values to send with the payload. But before we do that, we need to tell the system what the structure of the payload should look like now that we know we're sending a `requiredParameter` and an `optionalParameter`. To do this click on the "Preview this record" info icon next to the `client_action` field and click "Open Record" in the popup (best to open it in a new tab).

    ![](./images/20231101105626.png)

4.  **Define the payload structure** — On the `sys_declarative_action_payload_definition` record page you will see the `payload_template` field which is either empty or has a basic JSON object defined there. Edit this field so that it looks like this:

    ```json
    {
    	"route": "crazy-page",
    	"fields": {
    		"requiredParameter": "{{requiredParameter}}"
    	},
    	"params": {
    		"optionalParameter": "{{optionalParameter}}"
    	}
    }
    ```

    Then save the record.

    ![](./images/20231101110220.png)

5.  **Map the payload keys to dynamic values** — Now navigate back to the `sys_declarative_action_assignment` record for your button. In the advanced view in the `payload_map` you should now be able to select the parameters that we defined. Now we can select the parameters and tell the system what values we want to map onto them. For this tutorial we're creating a button which is visible on Incident records and I want to pass two field values from the Incident record to the modal. The `requiredParameter` will get the `number` field value and the `optionalParamter` will get the `description` value.

    Note that the syntax is a bit unusual here. We need to use the double curly brace syntax to tell the system we're making a dynamic reference. Then we need to reference the `fields` object, on which a key exists for each field of the record. Finally we need to reference the `value` key for that field.

    ![](./images/20231101111333.png)

    Save the record.

6.  **Test it out** — Now navigate to an Incident record inside the Service Operations Workspace and test out the modal.

    ![](./images/20231101122131.gif)
---
slug: how-to-create-figma-components-that-auto-resize-to-fit-their-contents
date: '2021-03-21'
title: How to create Figma components that auto-resize to fit their contents
description: How to create Figma components that auto-resize to fit their contents
category: technical article
published: true
tag: 'figma, design'
---

## The problem

I created a component with an instance of another component (an icon) and a text field.

![](./images/before-component.png)

After creating the component it looks like this:

![](./images/after-component.png)

The problem is that when I choose to change the text and expand it, the component will look like this:

![](./images/component-not-expanding.png)

## The solution

The solution is to select the component you just created, right click and select "Add auto layout" or press Shift-A. This adds Auto Layout to the component which will allow it to resize automatically.

![](./images/add-auto-layout.png)

Adding Auto Layout should give you an extra section in the Properties panel on the right hand side that looks like this:

![](./images/auto-layout-properties.png)

Here you can define the resizing behavior of the component, which will be applied automatically upon resizing. This is exactly what we want.

The default is set to "Hug contents" for both the horizontal and vertical directions. This means the outer edge of the component will "hug" the inner content, resizing itself as the contents expands or shrinks.

The result is a component that resizes with its contents.

![](./images/resizing-component.png)

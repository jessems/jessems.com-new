---
slug: advice-for-organizing-update-sets
date: '2023-06-30'
title: Advice for Organizing Update Sets
description: ''
published: false
category: ''
tag: ''
---

## Use the Add to Update Set plugin and its convention

The convention that the plugin follows is that it creates Batch Parents and Batch Children. A Batch Parent is meant to be an empty update set in the global scope. All the actual updates should be kept in the Batch Children. If there's an update to be made to the global scope, this should be captured in a Batch Child in the Global Scope.

The Batch Parent is used to group the Batch Children together in Batches, as well as linking subsequent Batches together.

## Connect batch parents with one another

## Number update sets with padding

## Put the scope in the description so it shows up in the visualization

## Explain the changes you've made in the description

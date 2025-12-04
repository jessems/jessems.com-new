---
slug: how-to-list-the-methods-of-a-java-class-in-rhino
date: '2023-11-27'
title: How to list the methods of a Java class in Rhino
description: How to list the methods of a Java class in Rhino
published: true
category: technical
tag: servicenow
---

ServiceNow runs on the Rhino JavaScript engine which itself runs on Java. I don't know much about its inner workings, but I do know that certain Java classes are exposed to the JavaScript layer and most of these are not documented.

Sometimes, however, you'll still want to use them. In those cases, it's useful to know what properties and methods are available on the class.

Here's an example of how to do that using the undocumented GoogleMaps Java Class.

```js
for (i in GoogleMaps) gs.info(i);

// Output:
//
// encodeBytes
// mapsKey
// latLong
// mapsClientId
// getMapsKey
// getGeocodingKey
// geocodingKey
// generateSignature
// getLatLong
// getMapsClientId
```

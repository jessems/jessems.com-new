---
slug: how-to-pretty-print-xml-in-servicenow
date: '2024-07-11'
title: 'How to pretty print XML in ServiceNow'
description: 'How to pretty print XML in ServiceNow'
tags: 'ServiceNow'
published: true
category: 'technical'
---

Sometimes it's helpful to pretty print certain entities like JSON objects or XML. For JSON objects, luckily, we have `JSNO.stringify(yourVar, null, 2)`, which nicely outputs the JSON object.

For XML in ServiceNow we can use the `XMLDocument` class as follows to achieve the same thing:

```js
var xmlString = '<root><child><subchild>value</subchild></child></root>';
var xmlDoc = new XMLDocument(xmlString);
gs.info('\n' + xmlDoc.toIndentedString());

// Output:
// <?xml version="1.0" encoding="UTF-8"?><root>
//     <child>
//         <subchild>value</subchild>
//     </child>
// </root>
```

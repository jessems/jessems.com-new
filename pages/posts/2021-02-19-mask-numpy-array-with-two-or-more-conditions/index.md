---
slug: mask-numpy-array-with-two-conditions
date: '2021-02-18'
title: 'Mask a NumPy array with two or more conditions'
description: 'Mask a NumPy array with two or more conditions'
categories: ['technical']
keywords: ['python', 'numpy']
published: true
---

Boolean masking is a technique you can use to access elements of an array that match a certain condition e.g.

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
mask = a > 3
# array([False, False, False, True, True])

a[mask]
# array([4, 5])
```

You can combine two or multiple conditions like so:

```python
mask = (a > 3) & (a != 5) # Note: Parentheses are required
a[mask]
# array([4])

mask = (a < 2) | (a > 2)
a[mask]
# array([1, 3, 4, 5])
```

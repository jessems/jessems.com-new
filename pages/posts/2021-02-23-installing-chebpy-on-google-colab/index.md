---
slug: installing-chebpy-on-google-colab
date: "2021-02-23"
title: "Installing chebpy on google colab"
description: "Installing chebpy on google colab"
category: "technical article"
tags: "python, chebpy"
published: true
---

When you try to install the `chebpy` package on Google Colab like so:

```python
!pip install chebpy
```

It runs into the following error:

```
Successfully installed chebpy-0.2
  File "/usr/local/lib/python3.6/dist-packages/chebpy/chebi.py", line 175
    print T2.shape, f.shape, F2.shape, T1.shape
           ^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print(T2.shape, f.shape, F2.shape, T1.shape)?
```

This is because the version that gets installed through `pip` is a version that runs on Python 2.x and Google Colab by default runs on Python 3.

To install a Python 3 compatible version install the package directly from github like so:

```python
!pip install git+https://github.com/chebpy/chebpy.git
```

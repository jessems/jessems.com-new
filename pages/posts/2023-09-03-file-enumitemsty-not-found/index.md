---
slug: file-enumitemsty-not-found
date: '2023-09-03'
title: File enumitem.sty not found
description: File enumitem.sty not found
published: true
category: technical
tag: 'latex, pandoc'
---

I was trying to convert a markdown file to PDF on my M1 Mac using this pandoc command:

```shell
pandoc --citeproc --bibliography=bibliography.bib index.md -o output.pdf
```

Which gave me this error:

```shell
Error producing PDF.
! LaTeX Error: File `enumitem.sty' not found.

Type X to quit or <RETURN> to proceed,
or enter new name. (Default extension: sty)

Enter file name:
! Emergency stop.
<read *>

l.59 \newlist
```

I was able to resolve this by installing the [Tex Live Utility](https://amaxwell.github.io/tlutility/) and by downloading the `enumitem` package.

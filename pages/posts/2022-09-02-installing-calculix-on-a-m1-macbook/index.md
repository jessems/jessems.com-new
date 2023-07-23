---
slug: how-to-install-calculix-on-an-m1-mac
date: "2022-09-02"
title: "How to install Calculix on an M1 Mac"
description: "A quick tutorial on how to install Calculix on an M1 Mac"
tags: "calculix"
published: true
category: "technical article"
---

Calculix consists of ccx and cgx.
ccx can be installed through homebrew
cgx can be installed following the [2015 Mac installation manual](http://www.dhondt.de/INST_CGX_2_9_MAC_11_2015.pdf) with some additions
First I was getting this error:

```c
parser.c:91:3: error: implicit declaration of function 'DrawCommandLine' is invalid in C99 [-Werror,-Wimplicit-function-declaration]
  DrawCommandLine(keystroke, strlen(keystroke) + *curshft);
```

The solution to this was to change the first line of parser.c:

```c
#include <cgx.h>
/*#include <extUtil.h>
```

As well as to correct the pickfunktions.c file on line 4597:

```c
return;
```

This still gave me the following error:

```shell
ld: library not found for -lSystem
collect2: error: ld returned 1 exit status
make: *** [cgx] Error 1
```

Which was resolved by adding the following to the LFLAGS section in the Makefile:

````shell
-L /Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/lib \```

````

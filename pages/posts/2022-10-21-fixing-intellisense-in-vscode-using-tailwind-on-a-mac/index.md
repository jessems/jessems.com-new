---
slug: fixing-intellisense-in-vscode-using-tailwind-on-a-mac
date: "2022-10-21"
title: "Fixing intellisense in vscode using tailwind on a mac"
description: "A quick tutorial on how to get intellisense working with tailwind on a mac"
tags: "tailwind, reactjs"
published: true
category: "technical article"
---

When setting up Tailwind the maintainers recommend that you install the Tailwind extension in VSCode. One of the features of this extension is intellisense (autocomplete).

The intellisense suggest box pops up without issue when you're defining a new class.

However, as soon as you press backspace a couple of times and try to continue your class definition, the suggest box stops appearing.

One solution to this issue is manually invoking the suggest box again using the default keyboard shortcut CTRL + SPACE [^1]. However, this shortcut wasn't working for me on my Mac.

As it turns out this keyboard shortcut is occupied by default in OSX [^2].

You can turn these shortcuts off by navigating to System Preferences -> Keyboard -> Shortcuts -> Input Sources and removing both check boxes.

[^1]: https://stackoverflow.com/questions/61343447/my-tailwind-css-intellisense-plugin-just-isnt-working-on-my-vscode
[^2]: https://github.com/spring-projects/sts4/issues/517#issuecomment-668635598

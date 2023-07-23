---
slug: cannot-find-module-build-release-keytar-node
date: "2023-02-16"
title: "Resolving Error: Cannot find module '../build/Release/keytar.node'"
description: "How to resolve the error Error: Cannot find module '../build/Release/keytar.node'"
tags: "servicenow"
published: true
category: "technical"
---

While trying to get started with local development of custom Next Experience components I ran into the following issue after installing the ServiceNow CLI and the `ui-component` extension.

```shell
Error: Cannot find module '../build/Release/keytar.node'
```

There are at least two threads [^1] [^2] about this on the ServiceNow Developer forums, but neither helped me.

What I ended up doing is the following:

### 1. Install the CLI through npm

```shell
npm i -g @servicenow/cli
```

### 2. Re-install the `ui-component` extension

If already installed you can uninstall the `ui-component` as follows:

```shell
snc extension remove --name ui-component
```

And then reinstall it like this:

```shell
snc extension add --name ui-component
```

## Other things to try

Some other things people[^1] [^2] have reported success with:

### Installing keytar

```bash
cd ~/.snc/.extensions/
npm install keytar@5.0.0
```

### Uninstalling and re-installing NVM

You can uninstall NVM by running the following command[^3]:

```shell
rm -rf $NVM_DIR ~/.npm ~/.bower
```

And you can reinstall the latest version by copy pasting the curl command with the latest version from [this Github repository](https://github.com/nvm-sh/nvm). As of this writing the curl command is as follows:

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

[^1]: https://www.servicenow.com/community/developer-forum/trouble-installing-servicenow-cli/m-p/1443635
[^2]: https://www.servicenow.com/community/developer-forum/error-when-installing-now-cli-components-mac-os-mojave/m-p/1913898
[^3]: https://github.com/nvm-sh/nvm/issues/298

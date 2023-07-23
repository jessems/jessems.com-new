---
slug: restoring-composer-json
date: "2020-11-23"
title: "Restoring a missing composer.json"
description: "Restoring a missing composer.json"
categories: [technical]
published: true
---

I was working on a client project where I was given access to a Cake PHP installation with a Composer-style `vendor` directory, but without a composer.json file to reinstall or upgrade the installed packages.

This is a quick tutorial on what steps I took to restore the composer.json file.

# Step 1.

Create a bare composer.json file with the following command:

```bash
composer init
```

# Step 2

I was running composer on a docker container so I connected to the service like so:

```bash
docker exec -it <mycontainer> bash
```

(If you're not using docker, or running composer outside your container I believe you'll be able to do somthing like: `php composer.phar show --installed`)

From there I could use the composer cli to get a list of installed packages:

```bash
composer show --installed
```

The result like this:

```text
...
aura/intl                             3.0.0   The Aura Intl package provides internationalization tools, specifically message tra...
cakephp/bake                          1.3.3   Bake plugin for CakePHP 3.0
cakephp/cakephp                       3.5.10  The CakePHP framework
cakephp/chronos                       1.1.3   A simple API extension for DateTime.
...
```

# Step 3

Take the entries from the previous command and start adding them to your `composer.json` file:

```json
{
    "name": "root/app",
    "require": {
        ...
        "cakephp/bake": "1.3.3",
        /* Add them here */
        ...
    }
}
```
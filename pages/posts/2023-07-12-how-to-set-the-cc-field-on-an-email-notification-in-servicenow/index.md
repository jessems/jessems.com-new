---
slug: how-to-set-the-cc-field-on-an-email-notification-in-servicenow
date: "2023-07-12"
title: "How to set the cc field on an email notification in ServiceNow"
description: "How to set the cc field on an email notification in ServiceNow"
tags: "servicenow"
published: true
category: "technical"
---

In order to set the cc field on an email notification in ServiceNow you need to create a Mail Script (`sys_script_mail`) record.

The script should look something like this:

```js
;(function runMailScript(current, template, email, email_action, event) {
  email.addAddress(
    "cc",
    "email"
    "Firstname Lastname"
  )
})(current, template, email, email_action, event)
```

If you want to fill the email and name fields dynamically you could do something like the following (depending on what record you're using to trigger the notification):

```js
;(function runMailScript(current, template, email, email_action, event) {
  email.addAddress(
    "cc",
    current.requester.email.toString(),
    current.requester.name.toString()
  )
})(current, template, email, email_action, event)
```

Note the call to `toString()` on the email and name fields. Without this ServiceNow will complain because you're trying to pass a ScopedGlideElement object as a string:

```bash
Evaluator.evaluateString() problem: java.lang.RuntimeException: failed to coerce com.glide.script.fencing.ScopedGlideElement to desired type java.lang.String:
```

You can then include the Mail Script in your email notification by adding the following to the `Advanced` tab of the notification:

```js
${mail_script:your_mail_script_name}
```

You can then verify the cc field on your email by going to **System Mailboxes > Outbound > Sent** and opening the `sys_email` record in question.

One would expect the cc field to be part of the `headers` field, but curiously this doesn't happen for me. Instead you can verify the cc field has been set by viewing the record's XML (Hamburger Menu > View XML) and verifying that the `copied` field has been populated.

![](./images/20230712175032.png)

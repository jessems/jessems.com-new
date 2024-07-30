---
slug: best-practices-for-deploying-virtual-agent-implementations
date: '2024-07-30'
title: 'Best practices for deploying Virtual Agent implementations'
description: ''
tags: ''
published: true
category: ''
---

As of this writing, ServiceNow isn't entirely clear on what the best practices are with regards to deploying a Virtual Agent implementation. Typically the moving parts are (1) VA Topics, (2) NLU models and (3) Misc. configurations.

My recommendation, which is based on some of the recommendations I was able to gather on various NowLearning courses, is to put the VA Topics and the NLU Model in a dedicated scope each. Then package the remainig configurations in a globally scoped update set (possibly with child update sets with specific scopes).

What follows is a more detailed breakdown of the best practices for deploying Virtual Agent implementations.

## Topics

### Put topics in a dedicated scope

> ServiceNow recommends the following guidelines when duplicating or creating topics:
>
> 1. Create Setup Topics in the Global scope.
> 2. If duplicating pre-built topics, duplicate them in the same scope. For example, you should be in the ITSM Virtual Agent Conversations scope when duplicating ITSM topics.
> 3. Create custom topics in a custom scope.

Source: https://nowlearning.servicenow.com/lxp/en/pages/learning-course?id=learning_course&course_id=43663b2d4739bd94123f3975d36d43e6&group_id=8b76ff694735bd9089c7acc9126d43ce&child_id=5f7633a94735bd9089c7acc9126d432d&spa=1

### Transport them as update sets

> **Publishing Scope Applications**
>
> In the Designing Topics module, we talked about creating VA topics in a scoped application. For custom topics, the guidance was to create custom topics in a custom scoped app. If you have done that, you can publish the scoped as an update set.
>
> From the application record, you can click the **Publish to Update Set** related link. You then have the option to export it or retrieve it from the target instance.

Source: https://nowlearning.servicenow.com/lxp/en/pages/learning-course?id=learning_course&course_id=43663b2d4739bd94123f3975d36d43e6&group_id=8b76ff694735bd9089c7acc9126d43ce&child_id=5f7633a94735bd9089c7acc9126d432d&spa=1

## NLU Models

### Put NLU models in a dedicated scope

> NLU models are contained in scoped applications.
>
> Navigate to System Applications > Studio.
> Click on the Create Application button. Please note that you will be directed > to a guided setup page if you do not have any applications.

Source: https://nowlearning.servicenow.com/lxp/en/pages/learning-course?id=learning_course&course_id=d3adae34979e5d50496bb5bfe153af6d&group_id=1ecde674979e5d50496bb5bfe153afc6&child_id=eecde674979e5d50496bb5bfe153affb&spa=1

### Transport them as update sets

> ### Exporting Models
>
> Use update sets to move your NLU models from a sub-production instance to production. Begin with the admin role. To add your NLU model to an update set:
>
> Navigate to System Applications > My Company Applications.
> On the All Apps tab, click on the application that contains your NLU model.
> Under Related Links, click the Publish to Update Set...

Source: https://nowlearning.servicenow.com/lxp/en/pages/learning-course?id=learning_course&course_id=d3adae34979e5d50496bb5bfe153af6d&group_id=1ecde674979e5d50496bb5bfe153afc6&child_id=eecde674979e5d50496bb5bfe153affb&spa=1

## Resources

-   [ServiceNow Support: Best Practice: When to use single or multiple NLU Models in your Custom Scoped Applications and how many intents / utterances are supported in a single NLU Model.](https://noderegister.service-now.com/kb?id=kb_article_view&sysparm_article=KB1002559)

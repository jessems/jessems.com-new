---
slug: using-azure-open-ai-on-servicenow
date: '2024-03-26'
title: Using Azure Open AI on ServiceNow
description: Using Azure Open AI on ServiceNow
published: true
category: technical
include-in-sitemap: false
tag: 'servicenow, azure, open ai, chatgpt'
---

Large Language Models (LLMs) have taken the world by storm — and for good reason. Their ability to understand and generate text is nothing short of revolutionary. This has ushered in an era of conversational interfaces augmenting and replacing classical user interfaces.

Open AI blazed the trail for commerical LLMs with their successive GPT models. An Open AI API subscription allows you to interact with their models and build solutions that leverage their capabilities.

ServiceNow has released the Generative AI Controller, which integrates with leading commercial LLM providers such as OpenAI, Azure OpenAI, and Google Gemini (previously Bard). The controller offers a consistent interface within ServiceNow for interacting with generative AI capabilities, abstracting away the underlying model/API details. It includes Flow Actions for common use cases like summarization, enabling developers to focus on building Generative AI solutions without worrying about the intricacies of each provider.

Sometimes, however, the intricacies do matter, or a lighter weight solution is desired. In those cases you can still build a low-level integration with any of the commercial LLM providers. [One such open source integration](https://www.wildgrube.com/servicenow-chatgpt/) has already been built for Open AI and Chat GPT. In this article I will introduce [our open source implementation](https://github.com/BisonITS/azure-openai-servicenow) for using Azure OpenAI on ServiceNow.

You can view the installation instructions in the GitHub readme here. What follows is a brief walkthrough of how one can use the integration.

## Simple configuration

Once you've cloned the repository to your instance, you will need to define 4 global system properties to configure the integration. These properties can be found in your Azure Open AI account. They are:

-   `azure_openai.api_key` - Your Azure Open AI API key
-   `azure_openai.api_endpoint` - The endpoint for the Azure Open AI API e.g. https://your-environment.openai.azure.com
-   `azure_openai.api_version` - The version of the Azure Open AI API you are using e.g. `2024-02-15-preview`
-   `azure_openai.deployment_id` - The deployment ID for the Azure Open AI API you are using

## Simple prompting (chat completions)

Our ServiceNow integration follows the same patterns as the official Azure Open AI integration. The official API has a [chat completions endpoint](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions) which as of this writing is the only endpoint we've implemented. This endpoint allows you to prompt the model with a "chat" message and receive a response.

In a Background Script you could do the following get to a feel for how the integration works:

```js
// global scope

var azureOpenAI = new x_bits2_az_openai.AzureOpenAI();

gs.info(azureOpenAI.prompt('Hello Azure Open AI!'));
// Output: Hello! How may I assist you today?
```

## Adding Context

If you want to provide the model with some context before prompting, you can do something like this:

```js
var azureOpenAI = new x_bits2_az_openai.AzureOpenAI();

azureOpenAI.addToContext({
	role: 'system',
	content: 'You are a service desk assistant and you answer only in German.'
});

gs.info(
	azureOpenAI.prompt('My VPN connection is not working, please help me!')
);
// Output: Guten Tag! Ich helfe Ihnen gerne weiter. Können Sie mir bitte sagen, welche Fehlermeldung Sie erhalten, wenn Sie versuchen, eine Verbindung herzustellen?
```

## Creating a summarize UI Action


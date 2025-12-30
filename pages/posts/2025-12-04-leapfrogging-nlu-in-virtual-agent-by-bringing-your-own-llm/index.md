---
slug: leapfrogging-nlu-in-virtual-agent-by-bringing-your-own-llm
date: '2025-07-04'
title: Leapfrogging NLU in Virtual Agent by Bringing Your Own LLM
description: Skip ServiceNow's brittle NLU Workbench entirely by integrating an external LLM for topic discovery in Virtual Agent—a future-ready architecture without Pro licensing costs
published: false
category: technical
tag: 'servicenow, virtual agent, now assist'
---

ServiceNow's AI features, which come under the umbrella of "Now Assist", include specific capabilities for Virtual Agent. One of these, (arguably the most valuable one), is called "LLM Topic Discovery and entails the ability to recognize the user's intent based on the Topic description. In other words, when the user types "forgot password", the system knows the user should be routed to the "Reset Password" topic, because the description contains the text "This topic helps users reset their password when they've forgotten it." This replaces the legacy NLU workbench architecture, which required implementers to train and test models for each topic.

In my view, organizations should should look for ways to leapfrog the NLU architecture entirely. By "leapfrogging," I mean skipping over the investment in building and maintaining a legacy system (like NLU) in favor of adopting a more advanced and future-ready solution from the outset. This approach is similar to how some countries have leapfrogged over landline telephony and gone straight to widespread mobile phone adoption, bypassing an entire generation of infrastructure. In the same way, organizations can bypass the complexity and obsolescence of NLU by moving directly to LLM-powered topic discovery or similar state-of-the-art technologies. And as we will see in this blog post, this can be done without the need for a Pro or Pro Plus license.

Just to be clear: The goal here isn't to avoid paying for a pro license. The unfortunate reality is that the non-pro option (NLU) that is available is a huge pain in the ass. With some clever architecture we can avoid it entirely. It is not, however, in the slightest,feasible to recreate all pro license benefits in the same way.

There are several reasons I would recommend leapfrogging NLU:

1. Generates a lot of work — NLU requires the implementer to create, manage, test and deploy NLU models. This constitutes an entire cluster of activities that need to be coordinated (often across departments) and completed. One prerequisite, for example, is a sufficiently large dataset of user utterances and mappings to their corresponding intents. If it's too small, or not representative, the model will perform poorly. The data set generation is typically something that needs to be compiled manually and can only be done with specific domain knowledge of the topic domain.

2. Confusing — The NLU Workbench model has various capabilities, but they are layed out and organized in unintuitive ways. This makes it difficult to implement and difficult to distribute work among more than one person.

3. Brittle — In practice I have found the NLU models and training to be unreliable. Models will underperform for unclear reasons. It is not uncommon for them to generate errors that are impossible to debug, or for them to behave differently on one instance from the other. This leads to a lot of time spent debugging models and a poor user experience for end users.

4. Lost investment — If an organization _does_ choose to do the work required to implement NLU, if they do invariably migrate to LLM Topic Discovery at some point, all this work will have zero value.

LLM Topic Discovery (the successor to NLU-based topic discovery), however, is only available with a Pro or Pro Plus license. These licenses unlock a wide range of Now Assist features but are often prohibitively expensive for smaller organizations.

Organizations on lower tier licenses face a difficult decision: if they want to implement Virtual Agent but cannot afford or justify a Pro or Pro Plus license, they are forced to rely on the NLU workbench architecture, which is not only complex and brittle—leading to higher implementation costs and a worse user experience—but also represents an investment in a technology that is being phased out and holds no value in the Now Assist context.

It would thus be incredibly valuable for such an organization if they could somehow obtain the benefits of LLM Topic Discovery, without the prohibitive costs of a higher tier license.

Given these constraints, it's worth considering whether there's a viable alternative approach.

As I will show in this blog post, such an alternative exists, and organizations can recreate the benefits of LLM Topic Discovery by calling an external language model. The architecture for such an external LLM-based solution is relatively straightforward: the LLM itself requires no training and the solution can be set up as a "one-shot" call, where the virtual agent sends the user's message and a list of topic descriptions to the LLM, and the LLM responds with the most appropriate topic. This enables effective intent recognition without the need for an upgraded license—though it does introduce important considerations around data privacy, latency, and ongoing maintenance that must be carefully addressed.

In this blog post I would like to explore such an architecture and show an example implementation to demonstrate the feasibility of this approach.

## The call for topic discovery

The call to the LLM-powered API is simply a JSON containing the user's utterance and a list of all available topics and their descriptions. It looks like this:

```json
{
	"utterance": "I forgot my password and cannot log in",
	"topics": [
		{
			"id": "pwd_reset",
			"name": "Password Reset",
			"description": "Help users reset their forgotten passwords or unlock accounts"
		},
		{
			"id": "software_install",
			"name": "Software Installation",
			"description": "Assist with installing approved software applications"
		},
		{
			"id": "network_issue",
			"name": "Network Connectivity",
			"description": "Troubleshoot internet, VPN, or network connectivity problems"
		},
		{
			"id": "hardware_request",
			"name": "Hardware Request",
			"description": "Request new hardware like laptops, monitors, keyboards, mice"
		}
	]
}
```

The API receives this request and then transforms this into a prompt for the LLM which looks like this:

```md
Match this user utterance to the most relevant topic:

Topics:

1. ID: "pwd_reset" | Name: "Password Reset" | Description: "Help users reset their forgotten passwords or unlock accounts"
2. ID: "software_install" | Name: "Software Installation" | Description: "Assist with installing approved software
   applications"
3. ID: "network_issue" | Name: "Network Connectivity" | Description: "Troubleshoot internet, VPN, or network connectivity
   problems"
4. ID: "hardware_request" | Name: "Hardware Request" | Description: "Request new hardware like laptops, monitors, keyboards,
   mice"

User utterance: "I forgot my password and cannot log in"

Return the best matching topic with confidence score (0.0-1.0).
If no good match exists, return topic_id="fallback" with low confidence
```

Full LLM Request Structure:

The actual API call to Azure OpenAI looks like this:

```javascript
{
  "model": "gpt-4o-mini",
  "response_format": TopicMatchResponse,  # Enforces JSON schema
  "messages": [
    {
      "role": "system",
      "content": "You are a topic classifier for ServiceNow virtual agents."
    },
    {
      "role": "user",
      "content": "<the prompt above>"
    }
  ],
  "temperature": 0.3,
  "max_tokens": 150
}
```

Key Points:

-   **Temperature is 0.3** (low = more deterministic)
-   **Uses structured outputs** to guarantee valid JSON response matching the `TopicMatchResponse` schema
-   **System message** sets the context as a ServiceNow topic classifier
-   **Topics are sent with each request** (dynamic topics architecture)

The LLM responds with guaranteed valid JSON, for example:

```json
{
	"topic_id": "6ae5e2c01b2c7c10d2e3adfafa3a4131",
	"topic_name": "Password Reset",
	"confidence": 0.95
}
```

## Architectural Considerations

Here is a brief discussion of some of the key architectural considerations for this approach:

### 1. Dynamic Topic Injection and ServiceNow as source of truth

Topics are provided to the system dynamically with each request, rather than being pre-loaded or stored in advance. Unlike embedding-based approaches, which need vector databases, embedding pipelines, and multi-step lookups, this architecture handles classification in a single API call. This means you don't need to maintain extra infrastructure or deal with complex synchronization—making everything simpler and more cost-effective.

To add or update topics, you only need to change their descriptions in ServiceNow. There’s no need for code changes, retraining, or redeploying the application. The system efficiently supports anywhere from just a couple to over 100 topics per request—and in practice can handle up to about 300 topics while keeping response times around 1–2 seconds. All topic management is done entirely within the ServiceNow instance.

### 2. Guaranteed Schema Compliance via Structured Outputs

Azure OpenAI's `response_format` parameter with Pydantic models enforces type-safe schema compliance at the LLM level. This guarantees 100% valid JSON responses, eliminating the parsing errors, retry logic, and regex post-processing. In production, this means zero JSON parsing failures across thousands of requests.

### 3. Confidence-Based Fallback with Configurable Threshold

The LLM returns a confidence score (0.0-1.0) with every classification. A configurable threshold (default 0.7) determines when to return "No Match Found" instead of forcing a low-confidence guess. Ambiguous utterances fall back to human agents rather than routing users down incorrect paths—graceful degradation instead of forced matches.

### 4. Complete Infrastructure-as-Code with One-Command Deployment

A single Bicep template (~200 lines) provisions the entire Azure stack: OpenAI, Functions, Storage, Application Insights, Key Vault, and App Service Plan. API keys live in Key Vault via managed identity—never in code. The template is parameterized for multiple environments, and `./deploy.sh` creates a complete production environment in 5-10 minutes. Tear down and rebuild with the same command—fully declarative and CI/CD-ready.

The implementation also includes Application Insights logging (confidence scores, topic IDs, fallback rates with custom dimensions), health check endpoints, and request correlation IDs for distributed tracing. Together, these characteristics make this a pragmatic, production-ready solution balancing simplicity, cost, and reliability—ideal for organizations seeking to leapfrog NLU without Pro licensing costs.

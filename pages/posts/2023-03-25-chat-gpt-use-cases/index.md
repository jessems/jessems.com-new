---
slug: chat-gpt-use-cases
date: "2023-03-25"
title: "Chat GPT Use Cases (Mostly Technical)"
description: "A collection of GPT use cases from across the internet"
tags: "GPT, GPT-4, LLM"
published: true
category: "technical"
---

## Debugging

- Situation:
  I'm encountering some bug. Perhaps the context is too specific to yield any results through a Google search. Or perhaps the answers I can find through Google are too generic. I can paste the error message and possibly some of my code and Chat GPT will suggest a fix for me.
- Author:
  Me
- Effectiveness:
  High

### Prompt

```console
Warning: flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.
    at GalleryCarousel (webpack-internal:///./components/GalleryCarousel.js:37:24)
    at div
    at div
    at div
    at Gallery (webpack-internal:///./components/sections/Gallery.js:46:62)
    at div
    at div
    at Home (webpack-internal:///./pages/index.js:68:62)
    at MyApp (webpack-internal:///./pages/_app.js:11:27)
    at ErrorBoundary (webpack-internal:///./node_modules/next/dist/compiled/@next/react-dev-overlay/dist/client.js:8:20742)
    at ReactDevOverlay (webpack-internal:///./node_modules/next/dist/compiled/@next/react-dev-overlay/dist/client.js:8:23635)
    at Container (webpack-internal:///./node_modules/next/dist/client/index.js:70:9)
    at AppContainer (webpack-internal:///./node_modules/next/dist/client/index.js:215:26)
    at Root (webpack-internal:///./node_modules/next/dist/client/index.js:406:27)
```

### Response

This warning message is caused by calling flushSync() inside a lifecycle method of a component. flushSync() is a low-level React API that synchronously flushes all the pending updates, which can be expensive and cause performance issues if not used carefully.

To fix this warning, you should move the call to flushSync() to a scheduler task or a micro task, which allows React to finish the current rendering cycle before processing the update.

One way to do this is to wrap the call to flushSync() inside a setTimeout with a delay of 0, like this:

```js
useEffect(() => {
  setTimeout(() => {
    flushSync(() => {
      // your code here
    })
  }, 0)
}, [])
```

This will schedule the call to flushSync() to run after the current rendering cycle is finished.

## Coming up with a simplified version of a problem I'm facing, so I can use that to ask a highly distilled question

- Situation:
  Sometimes I'm facing a coding problem I'm trying to solve but my current context is needlessly complex or polluted with superfluous information. If I ask a question by copy pasting my entire context I end up not getting decent answers. I get better answers, or can ask my question elsewhere, if I reduce the code snippet to code which only pertains to the problem.
- Author:
  Me
- Effectiveness:
  High

### Prompt

Create a grid with 2 columns and 2 rows in Tailwind CSS. The two rows in the first column should be joined together with rowspan 2.

### Answer

In this example, the first column is defined using col-span-1 row-span-2 which means that it spans one column and two rows. The second column is defined using col-span-1 which means that it spans one column only. The gap-4 class is used to add a 4-pixel gap between grid items. You can adjust the styling as needed.

## Asking a question if you're struggling to come up with keywords

- Situation:
  Maybe you vaguely know what type of information you're after, but without the right jargon words you're not going to find it through a web search.
- Effectiveness:
  High

### Prompt

CSS Media Queries have this property where you can specify a rule for a resolution and it will use that rule for all resolutions higher / lower than that resolution. How does this principle work? And what is it called?

### Response

The property you're referring to is called "min-width" and "max-width" in CSS Media Queries.

When you specify a rule for a particular resolution using the "min-width" property, it means that the rule will apply to all resolutions that are equal to or greater than the specified resolution. Similarly, when you use the "max-width" property, the rule will apply to all resolutions that are equal to or less than the specified resolution.

For example, if you specify a rule for a resolution of 768 pixels using "min-width: 768px", the rule will apply to all resolutions that are 768 pixels or greater. If you specify a rule for a resolution of 1024 pixels using "max-width: 1024px", the rule will apply to all resolutions that are 1024 pixels or less.

This principle is called "responsive design" and it's a fundamental concept in modern web development. By using responsive design techniques like media queries, web developers can create websites that adapt to different screen sizes and device types, providing a seamless user experience across different devices.

## Interactively sculpting a solution

### Prompt 1

How would you implement error handling for an api call where you want to account for the api response object changing.

### Response 1

To implement error handling for an API call where you want to account for the API response object changing, you should use defensive programming techniques to validate and handle potential issues in the response. Here's an approach you can follow:

Make the API call: Use a library like axios, fetch, or any other suitable library to make the API call.

Check for HTTP errors: After making the call, check the HTTP status code to make sure it's in the expected success range (e.g., 200-299). If not, handle the error and provide a user-friendly message or fallback behavior.

Validate the response structure: Use a schema validation library like ajv, joi, or yup to define the expected response structure and validate the API response against it. This will help you identify if the response object has changed.

Implement error handling: When validating the response structure, handle any validation errors gracefully. This could include providing a default value, showing an error message to the user, or logging the error for further investigation.

Here's a code example using JavaScript with axios and ajv:

```js
const axios = require("axios")
const Ajv = require("ajv")

const ajv = new Ajv()

// Define the expected response schema
const responseSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        // Add the expected properties and their types here
      },
      required: [
        // Add the required properties here
      ],
    },
  },
  required: ["data"],
}

async function makeApiCall(url) {
  try {
    // Make the API call
    const response = await axios.get(url)

    // Check for HTTP errors
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }

    // Validate the response structure
    const isValid = ajv.validate(responseSchema, response.data)
    if (!isValid) {
      console.error("API response structure changed:", ajv.errorsText())
      // Handle the error (e.g., provide a default value, show an error message, or log the issue)
    }

    return response.data
  } catch (error) {
    console.error("Error making API call:", error.message)
    // Handle the error (e.g., provide a default value, show an error message, or log the issue)
  }
}

// Use the makeApiCall function with your API URL
makeApiCall("https://api.example.com/data")
```

By following this approach, you can account for changes in the API response object and handle errors gracefully.

### Prompt 2

Could you show me an example in ES5?

### Response 2

```js
// Define the expected response structure
var responseSchema = {
  data: {
    // Add the expected properties and their types here
  },
}

function validateResponse(response) {
  if (
    !response ||
    typeof response !== "object" ||
    !response.hasOwnProperty("data")
  ) {
    return false
  }

  var responseData = response.data
  for (var key in responseSchema.data) {
    if (
      !responseData.hasOwnProperty(key) ||
      typeof responseData[key] !== responseSchema.data[key]
    ) {
      return false
    }
  }

  return true
}

function makeApiCall(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var response
      try {
        response = JSON.parse(xhr.responseText)
      } catch (error) {
        console.error("Error parsing API response:", error)
        callback(new Error("Error parsing API response"), null)
        return
      }

      if (validateResponse(response)) {
        callback(null, response)
      } else {
        console.error("API response structure changed")
        // Handle the error (e.g., provide a default value, show an error message, or log the issue)
        callback(new Error("API response structure changed"), null)
      }
    } else {
      console.error("HTTP error:", xhr.status, xhr.statusText)
      callback(
        new Error("HTTP error: " + xhr.status + " " + xhr.statusText),
        null
      )
    }
  }

  xhr.onerror = function () {
    console.error("Error making API call:", xhr.statusText)
    callback(new Error("Error making API call"), null)
  }

  xhr.send()
}

// Use the makeApiCall function with your API URL
makeApiCall("https://api.example.com/data", function (error, response) {
  if (error) {
    // Handle the error (e.g., provide a default value, show an error message, or log the issue)
  } else {
    console.log("API response:", response)
  }
})
```

This example uses XMLHttpRequest to make the API call, a simple response validation function to check if the response object matches the expected structure, and a callback function to handle the result of the API call. Note that ES5 doesn't support Promises, so we are using a callback-based approach.

### Prompt 3

Could you show me this example in ServiceNow context?

### Response 3

In ServiceNow, you can use GlideHTTPRequest to make API calls and handle errors. Here's an example that demonstrates error handling for an API call in a ServiceNow script, considering the potential changes in the API response object:

```js
// Define the expected response structure
var responseSchema = {
  data: {
    // Add the expected properties and their types here
  },
}

function validateResponse(response) {
  if (
    !response ||
    typeof response !== "object" ||
    !response.hasOwnProperty("data")
  ) {
    return false
  }

  var responseData = response.data
  for (var key in responseSchema.data) {
    if (
      !responseData.hasOwnProperty(key) ||
      typeof responseData[key] !== responseSchema.data[key]
    ) {
      return false
    }
  }

  return true
}

function makeApiCall(url) {
  try {
    var request = new sn_ws.RESTMessageV2()
    request.setHttpMethod("GET")
    request.setEndpoint(url)
    request.setRequestHeader("Accept", "application/json")

    var response = request.execute()
    var httpResponseStatus = response.getStatusCode()

    if (httpResponseStatus >= 200 && httpResponseStatus < 300) {
      var responseBody = response.getBody()
      var parsedResponse = JSON.parse(responseBody)

      if (validateResponse(parsedResponse)) {
        // Handle the valid response (e.g., process the data or log the result)
        gs.info("API response: " + JSON.stringify(parsedResponse))
      } else {
        gs.error("API response structure changed")
        // Handle the error (e.g., provide a default value, show an error message, or log the issue)
      }
    } else {
      gs.error(
        "HTTP error: " + httpResponseStatus + " " + response.getErrorMessage()
      )
      // Handle the error (e.g., provide a default value, show an error message, or log the issue)
    }
  } catch (error) {
    gs.error("Error making API call: " + error)
    // Handle the error (e.g., provide a default value, show an error message, or log the issue)
  }
}

// Use the makeApiCall function with your API URL
makeApiCall("https://api.example.com/data")
```

This script uses GlideHTTPRequest to make the API call, validate the response structure, and handle potential errors. The validateResponse function checks if the response object matches the expected structure, and the makeApiCall function uses ServiceNow's RESTMessageV2 to make the request and handle errors. The script logs messages to the system logs with gs.info() and gs.error().

### Prompt 4

Can you repeat this example but make the schema a bit more complex?

### Response 4

Sure! Here's the ServiceNow script example with a more complex response schema:

```js
// Define the expected response structure
var responseSchema = {
  data: {
    id: "string",
    name: "string",
    age: "number",
    address: {
      street: "string",
      city: "string",
      country: "string",
    },
    tags: "array",
  },
}

function validateType(value, type) {
  if (type === "array") {
    return Array.isArray(value)
  }
  return typeof value === type
}

function validateResponse(response, schema) {
  if (!response || typeof response !== "object") {
    return false
  }

  for (var key in schema) {
    var expectedType = schema[key]
    if (
      !response.hasOwnProperty(key) ||
      !validateType(response[key], expectedType)
    ) {
      return false
    }

    if (typeof expectedType === "object" && !Array.isArray(expectedType)) {
      if (!validateResponse(response[key], expectedType)) {
        return false
      }
    }
  }

  return true
}

function makeApiCall(url) {
  try {
    var request = new sn_ws.RESTMessageV2()
    request.setHttpMethod("GET")
    request.setEndpoint(url)
    request.setRequestHeader("Accept", "application/json")

    var response = request.execute()
    var httpResponseStatus = response.getStatusCode()

    if (httpResponseStatus >= 200 && httpResponseStatus < 300) {
      var responseBody = response.getBody()
      var parsedResponse = JSON.parse(responseBody)

      if (validateResponse(parsedResponse, responseSchema)) {
        // Handle the valid response (e.g., process the data or log the result)
        gs.info("API response: " + JSON.stringify(parsedResponse))
      } else {
        gs.error("API response structure changed")
        // Handle the error (e.g., provide a default value, show an error message, or log the issue)
      }
    } else {
      gs.error(
        "HTTP error: " + httpResponseStatus + " " + response.getErrorMessage()
      )
      // Handle the error (e.g., provide a default value, show an error message, or log the issue)
    }
  } catch (error) {
    gs.error("Error making API call: " + error)
    // Handle the error (e.g., provide a default value, show an error message, or log the issue)
  }
}

// Use the makeApiCall function with your API URL
makeApiCall("https://api.example.com/data")
```

In this example, the responseSchema has been updated to include nested objects and an array. The validateType function is added to handle the 'array' type check since typeof does not return 'array' for arrays in JavaScript. The validateResponse function has been updated to accept a schema argument, so it can be used recursively to validate nested objects.

The rest of the script remains the same as the previous example.

## Asking how to solve a relatively simple problem which is unique enough so that it might not be found through search

### Prompt (GPT 3.5)

Let's say you have a set of boolean values in a given sequence e.g. a, b, c, d, and you know that they can either be true or false. How can you get the first value in the sequence that is false?

### Response

You can use a loop to iterate over the sequence of boolean values and return the index of the first false value you encounter. Here's an example:

```js
function getFirstFalseValueIndex(values) {
  for (let i = 0; i < values.length; i++) {
    if (!values[i]) {
      return i
    }
  }
  return -1 // Return -1 if all values are true
}

// Example usage:
const sequence = [true, true, false, true]
const index = getFirstFalseValueIndex(sequence)
console.log(index) // Output: 2
```

In this example, the getFirstFalseValueIndex() function takes an array of boolean values as input and returns the index of the first false value in the array. The function uses a for loop to iterate over the array and returns the index of the first false value it encounters. If all values are true, the function returns -1 to indicate that no false values were found.

You can use this function to find the index of the first false value in any sequence of boolean values.

## Asking for variations upon a solution that was provided

(A continuation of the previous example)

### Prompt (GPT 3.5)

Can you do this with reduce?

### Response

Yes, you can also use the reduce() method to find the index of the first false value in a sequence of boolean values. Here's an example using reduce():

```js
function getFirstFalseValueIndex(values) {
  const index = values.reduce((acc, cur, i) => {
    if (acc >= 0) {
      return acc // Stop iteration if a false value has already been found
    }
    return cur ? -1 : i // Return the index of the first false value, or -1 if not found yet
  }, -1)
  return index
}

// Example usage:
const sequence = [true, true, false, true]
const index = getFirstFalseValueIndex(sequence)
console.log(index) // Output: 2
```

In this example, the getFirstFalseValueIndex() function takes an array of boolean values as input and uses the reduce() method to find the index of the first false value. The function initializes the accumulator to -1 and returns -1 if a false value is not found. If a false value is found, the function returns its index.

The reduce() method iterates over the array of boolean values and checks if the current value is true or false. If a false value is found, the method immediately returns its index without continuing to iterate over the rest of the array.

Note that while using reduce() can be a more concise way to find the index of the first false value, it may not be as efficient as using a simple for loop for small arrays due to the overhead of creating a new accumulator function for each element in the array.

## Integrating real world data

### Prompt

What are the top 10 desktop/laptop resolutions and give me their width, height in px and their aspect ratio in decimals?

### Response

Here are the top 10 desktop/laptop resolutions, along with their width and height in pixels, and their aspect ratio in decimals:

1920x1080 - 1920 x 1080 - 16:9 (1.78)
1366x768 - 1366 x 768 - 16:9 (1.78)
2560x1440 - 2560 x 1440 - 16:9 (1.78)
3840x2160 - 3840 x 2160 - 16:9 (1.78)
1280x720 - 1280 x 720 - 16:9 (1.78)
1600x900 - 1600 x 900 - 16:9 (1.78)
1440x900 - 1440 x 900 - 16:10 (1.60)
1280x800 - 1280 x 800 - 16:10 (1.60)
1680x1050 - 1680 x 1050 - 16:10 (1.60)
1920x1200 - 1920 x 1200 - 16:10 (1.60)
Note that some of these resolutions have slightly different aspect ratios than their corresponding standardized aspect ratios (such as 16:9 and 16:10) due to rounding of pixel dimensions, but they are still considered to be part of these aspect ratio families.

## Explaining syntax

### Prompt

Can you explain this syntax to me?

const setEditing = editing => updateProperties({editing});

### Response

Certainly! This syntax demonstrates the definition of a constant named setEditing using an arrow function in JavaScript. Let's break it down:

const setEditing: This declares a constant variable named setEditing. The const keyword indicates that the variable's value cannot be reassigned after its initial assignment.

editing =>: This is an arrow function with a single parameter named editing. Arrow functions are a shorthand syntax for defining function expressions in JavaScript, introduced in ECMAScript 6 (ES6). The syntax for arrow functions is (param1, param2, ..., paramN) => { /_ function body _/ }. In this case, the function takes one parameter, editing.

updateProperties({editing}): This is the function body of the arrow function. In this case, it's a single expression that calls the updateProperties function with an object as its argument. The object has a single property named editing, and its value is the same as the editing parameter of the arrow function.

The shorthand {editing} is equivalent to {editing: editing}. This is an ES6 feature called "object property value shorthand" that allows you to define an object property with the same name as a variable more concisely.

Putting it all together, const setEditing = editing => updateProperties({editing}); defines a constant setEditing that is assigned to an arrow function. The arrow function takes a single parameter editing and, when invoked, calls the updateProperties function with an object containing the editing property.

## Converting technical jargon to user-friendly language

### Prompt

Write a message in German that is informative to the user when a first name doesn't correspond to this regex:

/[\S\s]+[\S]+/g

### Response

"Der eingegebene Vorname entspricht nicht dem erwarteten Format. Bitte stellen Sie sicher, dass der Vorname mindestens ein Zeichen enthält und keine Leerzeichen am Anfang oder Ende hat."

## Asking about best practices in programming

### Prompt

Can it be considered best practice, or acceptable practice, to throw an error yourself explicitly in a try block?

### Response

Yes, it can be considered an acceptable practice to throw an error explicitly in a try block. There are situations where you might want to throw a custom error with a more specific or informative message, or when you want to enforce certain conditions within your code. Throwing an error explicitly within a try block allows you to handle the error in a structured way using the catch block.

That being said, it is important to use this technique judiciously and ensure that the custom errors you throw are informative and helpful for debugging. Additionally, you should make sure that the catch block properly handles these custom errors and that they don't lead to unintended side effects in your application.

## Trivial question (CoPilot)

### Prompt & Response

```
// Turn regex into a string // Prompt
var regexString = regex.toString(); // Response
```

## Translating ES6 to ES5

The JavaScript engine which interprets the ServiceNow server-side code is based on the Rhino engine, which is an older version of the V8 engine used by Chrome and Node.js. As a result, the JavaScript engine in ServiceNow does not support all of the features introduced in modern versions of JavaScript i.e. ECMAScript 6 (ES6). This means that we can't simply copy paste modern ES6 libraries into a Script Include and expect them to work.

Chat GPT, however, seems to be rather good at translating ES6 to ES5. Here's an example where I feed Chat GPT a state machine implementation written by Kent C. Dodds in ES6 and it spits out the ES5 equivalent:

### Prompt

Could you convert this to ES5 and replace console.log invocations with gs.info and put switch in quotes when it's used as a key

```js
function createMachine(stateMachineDefinition) {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition(currentState, event) {
      const currentStateDefinition = stateMachineDefinition[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]
      if (!destinationTransition) {
        return
      }
      const destinationState = destinationTransition.target
      const destinationStateDefinition =
        stateMachineDefinition[destinationState]

      destinationTransition.action()
      currentStateDefinition.actions.onExit()
      destinationStateDefinition.actions.onEnter()

      machine.value = destinationState

      return machine.value
    },
  }
  return machine
}

const machine = createMachine({
  initialState: "off",
  off: {
    actions: {
      onEnter() {
        console.log("off: onEnter")
      },
      onExit() {
        console.log("off: onExit")
      },
    },
    transitions: {
      switch: {
        target: "on",
        action() {
          console.log('transition action for "switch" in "off" state')
        },
      },
    },
  },
  on: {
    actions: {
      onEnter() {
        console.log("on: onEnter")
      },
      onExit() {
        console.log("on: onExit")
      },
    },
    transitions: {
      switch: {
        target: "off",
        action() {
          console.log('transition action for "switch" in "on" state')
        },
      },
    },
  },
})

let state = machine.value
console.log(`current state: ${state}`)
state = machine.transition(state, "switch")
console.log(`current state: ${state}`)
state = machine.transition(state, "switch")
console.log(`current state: ${state}`)
```

### Response

Sure! Here's the ES5 version of the code with gs.info replacing console.log:

```js
function createMachine(stateMachineDefinition) {
  var machine = {
    value: stateMachineDefinition.initialState,
    transition: function (currentState, event) {
      var currentStateDefinition = stateMachineDefinition[currentState]
      var destinationTransition = currentStateDefinition.transitions[event]
      if (!destinationTransition) {
        return
      }
      var destinationState = destinationTransition.target
      var destinationStateDefinition = stateMachineDefinition[destinationState]

      destinationTransition.action()
      currentStateDefinition.actions.onExit()
      destinationStateDefinition.actions.onEnter()

      machine.value = destinationState

      return machine.value
    },
  }
  return machine
}

var machine = createMachine({
  initialState: "off",
  off: {
    actions: {
      onEnter: function () {
        gs.info("off: onEnter")
      },
      onExit: function () {
        gs.info("off: onExit")
      },
    },
    transitions: {
      switch: {
        target: "on",
        action: function () {
          gs.info('transition action for "switch" in "off" state')
        },
      },
    },
  },
  on: {
    actions: {
      onEnter: function () {
        gs.info("on: onEnter")
      },
      onExit: function () {
        gs.info("on: onExit")
      },
    },
    transitions: {
      switch: {
        target: "off",
        action: function () {
          gs.info('transition action for "switch" in "on" state')
        },
      },
    },
  },
})

var state = machine.value
gs.info("current state: " + state)
state = machine.transition(state, "switch")
gs.info("current state: " + state)
state = machine.transition(state, "switch")
gs.info("current state: " + state)
```

[And this works when plugged into a ServiceNow Backgground Script]

## Writing friendly feedback

### Prompt

How do I see nicely that a panel discussion was super boring and completely irrelevant and unprofessional to go over time.

### Response

When communicating about a negative experience such as a boring and unprofessional panel discussion, it's helpful to be diplomatic and constructive. Here's how you might phrase it:

"Thank you for the opportunity to attend the panel discussion. While I appreciate the efforts of all involved, I found the content to be less engaging than anticipated and, at times, not entirely relevant to the intended theme. Additionally, I observed that the duration of the discussion significantly exceeded the scheduled time. It's understandable that passionate discussions can run over time, but I believe greater adherence to the timetable could help maintain the audience's focus and energy. It would be fantastic to see more engaging, pertinent topics and stricter time management in future discussions."

Remember, feedback is more likely to be received positively if it's balanced, respectful, and offers suggestions for improvement.

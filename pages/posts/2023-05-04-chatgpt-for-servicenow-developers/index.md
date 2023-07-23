---
slug: chat-gpt-for-servicenow-developers
date: "2023-04-05"
title: "Chat GPT for ServiceNow Developers"
description: "Chat GPT for ServiceNow Developers"
tags: "GPT, GPT-4, LLM, ServiceNow"
published: true
category: "technical"
---

<YouTube youTubeId="C_USLb_x3Vg" />

Chat GPT has taken the world by storm resulting in it becoming the fastest growing consumer product in history and also one of the largest in terms of users. It has proven particularly capable in the realm of programming and there are many examples of it being used to generate and improve code. In this post I explore the various use cases for using Chat GPT to make your life as a ServiceNow developer easier.

Some high level take-aways:

1. ChatGPT and large language models more generally, excel at doing tasks for which...

- ...many closely related examples exist online
- ...customization of those existing examaples is tedious for humans (e.g. regex)
- ...the answer is not overly complex
- ...the task relies on manipulating text and language as opposed to doing arithmetic (e.g. Chat GPT can't count)

2. ChatGPT makes mistakes in a way that we're not used to seeing from any other system. It has a tendency to...

- ...make things up that seem plausible but that are complete fabrications (e.g. non-existing methods or classes)
- ...communicate with confidence even when it is wrong

## Personal tutor

One of applications of Chat GPT which has the greatest potential for transforming education across the world is as a personal tutor.

### Prompt 1

What are the changes going from ES5 to ES6?

### Response 1

There are several significant changes going from ES5 to ES6:

1. Arrow functions: ES6 introduced arrow functions which provide a shorter syntax for defining functions. They also have a lexical this, which means that the value of "this" inside the function is determined by where it is defined, not where it is called.

2. let and const: ES6 introduced two new keywords for declaring variables: "let" and "const". "let" is similar to "var", but has block scope. "const" is used to declare constants.

3. Template literals: ES6 introduced template literals which allow you to embed expressions inside a string using backticks (`) instead of single or double quotes. This makes it easier to create complex strings that contain variables and other expressions.

4. Spread operator: ES6 introduced the spread operator (...) which allows you to expand an array or object into individual elements. This can be useful for passing arguments to a function or merging arrays.

5. Destructuring: ES6 introduced destructuring which allows you to extract values from arrays and objects using a shorthand syntax. This can make code more concise and easier to read.

6. Promises: ES6 introduced Promises which provide a way to handle asynchronous operations in a more organized and structured way. Promises allow you to chain multiple asynchronous operations together and handle errors more gracefully.

7. Classes: ES6 introduced class syntax which provides a more object-oriented way of defining objects and constructors. Classes make it easier to create complex objects and provide inheritance.

8. Modules: ES6 introduced a new module syntax which allows you to define modules that can be imported and exported from other modules. This makes it easier to organize and reuse code in larger applications.

### Prompt 2

Could you explain 1. to me in more detail with examples?

### Response 2

Certainly! One of the main features of ES6 is the introduction of new syntax for defining functions using the `=>` operator, called "arrow functions".

Prior to ES6, functions were defined using the `function` keyword and had a named identifier, like this:

```javascript
function add(a, b) {
  return a + b
}
```

With arrow functions, the syntax is simplified and the function is anonymous by default:

```javascript
const add = (a, b) => a + b
```

In this example, the `const` keyword is used to declare a variable called `add`, which is assigned an arrow function. The function takes two parameters, `a` and `b`, and returns their sum.

Arrow functions can also be used with one parameter and no parentheses:

```javascript
const square = x => x * x
```

In this example, the `square` function takes a single parameter `x` and returns its square.

Arrow functions also have a concise syntax for returning object literals:

```javascript
const createPerson = (name, age) => ({ name, age })
```

In this example, the `createPerson` function takes two parameters, `name` and `age`, and returns an object literal with properties `name` and `age` that are set to the values of the parameters.

Arrow functions also have some differences in behavior compared to regular functions. One important difference is the way they handle the `this` keyword. In regular functions, the value of `this` depends on how the function is called, whereas arrow functions inherit the `this` value from the enclosing lexical context.

Here's an example that demonstrates the difference:

```javascript
const person = {
  name: "Alice",
  sayName: function () {
    console.log(this.name)
  },
  sayNameArrow: () => {
    console.log(this.name)
  },
}

person.sayName() // logs "Alice"
person.sayNameArrow() // logs undefined
```

In this example, the `person` object has two methods, `sayName` and `sayNameArrow`. The `sayName` method uses a regular function and logs the value of `this.name`, which is "Alice". The `sayNameArrow` method uses an arrow function and logs the value of `this.name`, which is undefined.

This is because the `this` value for `sayNameArrow` is inherited from the enclosing lexical context, which in this case is the global object. In contrast, the `this` value for `sayName` is set to the `person` object when it is called, because it is a regular function and its `this` value is determined by the calling context.

## Debugging

In some cases you can simply prompt Chat GPT with an error message and it will provide you with a solution. In other cases it's better to supply the code itself as well as the error message.

### Prompt

[Here I simply prompt a piece of code and the error returned by ServiceNow]

```js
var rec = new GlideRecord('cmdb_ci_computer');
var strQuery = 'u_lease.endsON2012-02-02@javascript:gs.dateGenerate('2012-02-02','start')@javascript:gs.dateGenerate('2012-02-12','end')';
strQuery = strQuery + '^sys_class_name=cmdb_ci_computer';
strQuery = strQuery + '^form_factor=Laptop';
strQuery = strQuery + '^install_status=10';
strQuery = strQuery + '^u_purchase_lease=lease';
rec.addEncodedQuery(strQuery);
rec.query();
gs.print(rec.getRowCount());
```

```bash
Javascript compiler exception: missing ; before statement (null.null.script; line 2) in:
var rec = new GlideRecord('cmdb_ci_computer');
var strQuery = 'u_lease.endsON2012-02-02@javascript:gs.dateGenerate('2012-02-02','start')@javascript:gs.dateGenerate('2012-02-12','end')';
strQuery = strQuery + '^sys_class_name=cmdb_ci_computer';
strQuery = strQuery + '^form_factor=Laptop';
strQuery = strQuery + '^install_status=10';
strQuery = strQuery + '^u_purchase_lease=lease';
rec.addEncodedQuery(strQuery);
rec.query();
gs.print(rec.getRowCount());
```

### Response

The issue with this code is that the single quotes used in the `strQuery` variable around the date format strings interfere with the single quotes used to delimit the string itself. You can fix this by escaping the single quotes around the date format strings or by using double quotes around the string instead. Here's an example using escaped single quotes:

```js
var rec = new GlideRecord("cmdb_ci_computer")
var strQuery =
  "u_lease.endsON2012-02-02@javascript:gs.dateGenerate('2012-02-02','start')@javascript:gs.dateGenerate('2012-02-12','end')"
strQuery = strQuery + "^sys_class_name=cmdb_ci_computer"
strQuery = strQuery + "^form_factor=Laptop"
strQuery = strQuery + "^install_status=10"
strQuery = strQuery + "^u_purchase_lease=lease"
rec.addEncodedQuery(strQuery)
rec.query()
gs.print(rec.getRowCount())
```

This should execute without any errors and print the number of records returned by the query.

[The returned code works]

## Asking a question if you're struggling to come up with keywords

Traditionally, in order to search for something, you would first need to come up with a keyword or phrase that describes what you're looking for. If you were not able to do this, you would often not be able to find the corpus of knowledge that would answer your question.

With Chat GPT you can be much more vague in your questions and it will still be able to give you a good answer.

### Prompt

I have some code which makes a REST API call, but I'm worried the JSON structure of the response might change. How is this typically dealt with?

### Response

If you are worried about changes to the JSON structure of a REST API response, you can consider using a JSON schema to validate the response.

JSON schema is a vocabulary that allows you to annotate and validate JSON documents. It describes the structure of your JSON data and provides constraints on the data that is allowed.

By defining a JSON schema for the expected response structure, you can ensure that your code only accepts valid JSON documents that conform to the schema. If the JSON structure of the response changes, your code will reject any invalid JSON documents and alert you to the change.

Here's an example of how you can use a JSON schema to validate a REST API response in JavaScript:

```javascript
const Ajv = require("ajv")
const axios = require("axios")

// Define the JSON schema for the expected response
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
    email: { type: "string", format: "email" },
  },
  required: ["name", "email"],
}

// Make the API call and validate the response
axios
  .get("https://example.com/api/users/123")
  .then(response => {
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    const valid = validate(response.data)

    if (!valid) {
      console.error(validate.errors)
      return
    }

    console.log(response.data)
  })
  .catch(error => {
    console.error(error)
  })
```

In this example, we define a JSON schema for the expected response, and then use the Ajv library to compile the schema and validate the response. If the response is invalid, we log the validation errors to the console.

By using a JSON schema to validate the response, you can catch changes to the JSON structure early and avoid unexpected bugs in your code.

## Interactive / Pair programming

The interaction with ChatGPT doesn't stop after one response. Each prompt and response are part of ChatGPT's memory, so you can ask follow up questions and get more information. This also allows you to do pair programming with ChatGPT.

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

## Integrating real world data

ChatGPT is not able to access the internet. If you ask it to crawl a URL it might give you a response which seems like it did, but in reality it cannot (the OpenAI team is set to change this though with plugins soon). What ChatGPT is able to do is to pull in real world data based on its training data.

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

## Explaining code

Similar to the tutor example, ChatGPT is great at explaining code. Either at a high level or line by line like in this example.

### Prompt

Can you explain this code line by line?

```js
var Class = {
  create: function () {
    return function () {
      /* This anonymous function will execute in the scope of the caller
		   in interpreted mode. The initalize method is a utility we provide
		   for giving a hook into the creation of a script include in scope.
		   Many global script includes do not have an initialize function, and
		   therefore we should only call this.initialize when present.
		 */
      if (this.initialize) this.initialize.apply(this, arguments)
    }
  },
}

/*
 * Old method left here for compatibility purposes. All future extension should use "extendsObject" method.
 */
Object.extend = function (destination, source) {
  for (var property in source) {
    destination[property] = source[property]
  }
  return destination
}

Object.extendsObject = function (destination, source) {
  destination = Object.clone(destination.prototype)

  for (var property in source) {
    destination[property] = source[property]
  }
  return destination
}

Object.clone = function (obj) {
  var clone = Class.create()

  for (var property in obj) {
    clone[property] = obj[property]
  }

  return clone
}
```

### Response

Sure, let me explain this code line by line:

```javascript
var Class = {
```

This declares a new variable `Class` which is an object literal.

```javascript
create: function() {
    return function() {
```

This is a method on the `Class` object literal that returns an anonymous function.

```javascript
if (this.initialize) this.initialize.apply(this, arguments)
```

If the `this` object has an `initialize` method, it will be called and passed in any arguments provided to the anonymous function that is returned.

```javascript
};
```

This closes the anonymous function that is returned by the `create` method.

```javascript
}
```

This closes the `create` method.

```javascript
Object.extend = function(destination, source) {
```

This is a method on the `Object` prototype that can be used to copy properties from one object to another.

```javascript
for (var property in source) {
  destination[property] = source[property]
}
return destination
```

This loops through all properties on the `source` object and assigns each one to the corresponding property on the `destination` object. Finally, the `destination` object is returned.

```javascript
}
```

This closes the `extend` method.

```javascript
Object.extendsObject = function (destination, source) {
  destination = Object.clone(destination.prototype)

  for (var property in source) {
    destination[property] = source[property]
  }
  return destination
}
```

This is a method on the `Object` prototype that can be used to copy properties from one object to another. This method is different from the `extend` method in that it copies properties to a new object created from the prototype of the `destination` object, rather than copying properties directly to the `destination` object.

```javascript
Object.clone = function (obj) {
  var clone = Class.create()

  for (var property in obj) {
    clone[property] = obj[property]
  }

  return clone
}
```

This is a method on the `Object` prototype that can be used to create a new object with the same properties as an existing object. This method uses the `Class.create` method to create a new object and then loops through all properties on the input object, assigning each one to the corresponding property on the new object. Finally, the new object is returned.

## Summarizing code

If you feed an entire script file into ChatGPT and ask it to summarize it for you, it does a prety good job. You can even ask it to simplify it by asking to explain it to you as if you were 5 years old.

### Prompt

Explain what this Script Include does and explain it like I'm 5:

```js
gs.include("PrototypeServer")

var IndexCreator = Class.create()

IndexCreator.prototype = {
  initialize: function (tableName, fieldNames, unique, email, index_name) {
    this.tableName = tableName
    this.fieldNames = fieldNames
    if (index_name) this.indexName = index_name
    else this.indexName = "index"
    this.unique = unique
    this.email = email
  },

  execute: function (savedUpdateSetId) {
    if (!gs.hasRole("admin") && gs.isInteractive()) return

    var start = new GlideDateTime()
    var al = GlideStringUtil.split(this.fieldNames)
    var id = new GlideIndexDescriptor(this.tableName, this.indexName, al)
    this.actualName = id.getIndexName()
    if (this.unique) id.setUnique(true)
    var answer = false
    var exists = id.hasIndex()
    if (exists) id.close()
    else {
      answer = id.create()
      id.close()
      var end = new GlideDateTime()
      if (!answer) this.errorCode = id.getErrorCode()
      else {
        this._createIndexRecord(savedUpdateSetId)
        var tu = new SNC.TableRotationSynchronizer(this.tableName)
        if (tu.isValid()) tu.synchronize()
      }
    }
    this._sendNotification(exists, answer, start, end)
    return answer || exists
  },

  schedule: function () {
    if (!gs.hasRole("admin")) return

    var script = "gs.include('IndexCreator');"
    script +=
      "var c = new IndexCreator('" +
      this.tableName +
      "', '" +
      this.fieldNames +
      "', " +
      this.unique +
      ", '" +
      this.email +
      "', '" +
      this.indexName +
      "');"
    script += "c.execute('" + GlideUpdateSet.get() + "');"
    GlideRunScriptJob.scheduleScript(script)
  },

  /**
   * Inserts a sys_index record after an index was successfully created.
   * Attempts to use the update set that was current when index creation was
   * scheduled, but uses the current update set if the saved one is not valid.
   */
  _createIndexRecord: function (savedUpdateSetId) {
    //try to change the current update set to whatever it was when the index creation was scheduled
    var updateSetChanged = false
    var updateSet = new GlideUpdateSet()
    var currUpdateSetId = GlideUpdateSet.get()
    if (
      typeof savedUpdateSetId !== "undefined" &&
      currUpdateSetId != savedUpdateSetId
    ) {
      var updateSetGR = new GlideRecord("sys_update_set")
      updateSetGR.addQuery("state", "in progress")
      updateSetGR.addQuery("sys_id", savedUpdateSetId)
      updateSetGR.query()
      if (updateSetGR.next()) {
        updateSet.set(savedUpdateSetId)
        updateSetChanged = true
        gs.log(
          "Changing current update set for sys_index creation from " +
            currUpdateSetId +
            " to " +
            savedUpdateSetId
        )
      } else
        gs.log(
          "Not changing current update set for sys_index creation. Saved update set " +
            savedUpdateSetId +
            " is not in progress or does not exist"
        )
    } else
      gs.log(
        "Not changing current update set for sys_index creation. Saved update set is the same as the current update set (or undefined)"
      )

    this._createIndexRecord0()

    if (updateSetChanged) {
      updateSet.set(currUpdateSetId)
      gs.log(
        "After sys_index creation, changing current update set back to " +
          currUpdateSetId +
          " from " +
          savedUpdateSetId
      )
    }
  },

  _createIndexRecord0: function () {
    gs.log(
      "Attempting to insert sys_index record for table '" +
        this.tableName +
        "', fields '" +
        this.fieldNames +
        "' and unique = " +
        this.unique
    )
    if (this._hasIndexRecord()) {
      gs.log("Index record already exists, skipping insert")
      return
    }

    var dbgr = new GlideRecord("sys_db_object")
    dbgr.addQuery("name", this.tableName)
    dbgr.query()
    if (!dbgr.next()) {
      gs.log(
        "Could not find sys_db_object record for table " +
          this.tableName +
          ", skipping insert"
      )
      return
    }

    var gr = new GlideRecord("sys_index")
    var gList = this._createGlideListOfColumns()
    if (gList == null) return

    gr.setValue("index_col_name", gList)
    gr.setValue("col_name_string", this.fieldNames)
    gr.setValue("logical_table_name", this.tableName)
    gr.setValue("table", dbgr.getValue("sys_id"))
    gr.setValue("unique_index", this.unique)
    gr.insert()
  },

  _hasIndexRecord: function () {
    var gr = new GlideRecord("sys_index")
    gr.addQuery("logical_table_name", this.tableName)
    gr.addQuery("col_name_string", this.fieldNames)
    gr.query()
    return gr.next()
  },

  _createGlideListOfColumns: function () {
    //returns a glidelist of column sys_ids for this index
    var al = this.fieldNames.split(",")
    var gList = ""
    var gtd = GlideTableDescriptor.get(this.tableName)
    if (!gtd.isValid()) {
      gs.warn(
        "Cannot create index record, table '" +
          this.tableName +
          "' is not valid"
      )
      return null
    }

    for (var i = 0; i < al.length; i += 1) {
      var ed = gtd.getElementDescriptor(al[i])
      if (ed != null) {
        gList += ed.getUniqueID() + ","
      } else {
        gs.warn(
          "Cannot create index record, column '" + al[i] + "' does not exist"
        )
        return null
      }
    }

    return gList
  },

  _sendNotification: function (exists, success, start, end) {
    if (!this.email) return

    var subject = "Index Creation Results : "
    if (exists) subject += "SKIPPED (see body for details)"
    else if (success) subject += "SUCCESS"
    else subject += "FAILURE (see body for details)"

    var body = "Index creation began at " + start.getDisplayValue() + "\n"
    if (exists) {
      body += "Index creation skipped:\n"
      body +=
        "Requested index for table (" +
        this.tableName +
        ") on columns (" +
        this.fieldNames +
        ") already exists."
    } else if (success) {
      body +=
        "Index creation completed successfully at " +
        end.getDisplayValue() +
        "\n"
      body += "Generated Index Name : " + this.actualName
    } else {
      body +=
        "Index creation FAILED at " +
        end.getDisplayValue() +
        " with error code:\n"
      body += this.errorCode
    }

    var mail = new GlideEmailOutbound()
    mail.setSubject(subject)
    mail.addRecipient(this.email)
    mail.setBody(body)
    mail.save()
  },
}
```

### Response

This code creates a special type of object called a "Script Include" that can create indexes in a ServiceNow database. It's like a special tool that can help the database be faster at searching for things.

When we want to create an index, we need to give the tool some information, like what table we want to make the index on, what columns to include in the index, and if the index should be unique (which means there can only be one of each value in the index).

The tool also checks if the index already exists, so we don't create the same index multiple times.

Once we've created the index, we'll also create a special record in the database that tells us when the index was created, what columns were included, and if the index was unique. This can help us keep track of the indexes we've created.

If something goes wrong with creating the index, the tool will send an email to let us know what happened.

Overall, this code is like a special tool that helps us make our database faster and more efficient.

## Soft skills

Sometimes as a developer to complete a solution you'll need some input that traditionally comes from a business analyst, product manager or designer. ChatGPT offers a potent alternative.

### Prompt

Write a message in German that is informative to the user when a first name doesn't correspond to this regex:

/[\S\s]+[\S]+/g

### Response

"Der eingegebene Vorname entspricht nicht dem erwarteten Format. Bitte stellen Sie sicher, dass der Vorname mindestens ein Zeichen enthält und keine Leerzeichen am Anfang oder Ende hat."

## Inquiring about best practices in programming

Traditional web search is not well suited for finding best practices across entire domains. If you do search for best practices, you'll typically find individual voices or websites that have publicised their opinions on best practices.

### Prompt

Can it be considered best practice, or acceptable practice, to throw an error yourself explicitly in a try block?

### Response

Yes, it can be considered an acceptable practice to throw an error explicitly in a try block. There are situations where you might want to throw a custom error with a more specific or informative message, or when you want to enforce certain conditions within your code. Throwing an error explicitly within a try block allows you to handle the error in a structured way using the catch block.

That being said, it is important to use this technique judiciously and ensure that the custom errors you throw are informative and helpful for debugging. Additionally, you should make sure that the catch block properly handles these custom errors and that they don't lead to unintended side effects in your application.

### Prompt & Response

```javascript
// Turn regex into a string // Prompt
var regexString = regex.toString() // Response
```

## Writing tests

The most common excuse I've heard for not writing tests for production code is that it takes too much time. It can indeed be a tedious task. ChatGPT can help you write your tests faster.

### Prompt

Can you write a Jasmine 3.1 test for the following script include (ServiceNow)?

```js
var Class = {
  create: function () {
    return function () {
      /* This anonymous function will execute in the scope of the caller
		   in interpreted mode. The initalize method is a utility we provide
		   for giving a hook into the creation of a script include in scope.
		   Many global script includes do not have an initialize function, and
		   therefore we should only call this.initialize when present.
		 */
      if (this.initialize) this.initialize.apply(this, arguments)
    }
  },
}

/*
 * Old method left here for compatibility purposes. All future extension should use "extendsObject" method.
 */
Object.extend = function (destination, source) {
  for (var property in source) {
    destination[property] = source[property]
  }
  return destination
}

Object.extendsObject = function (destination, source) {
  destination = Object.clone(destination.prototype)

  for (var property in source) {
    destination[property] = source[property]
  }
  return destination
}

Object.clone = function (obj) {
  var clone = Class.create()

  for (var property in obj) {
    clone[property] = obj[property]
  }

  return clone
}
```

### Response

Sure! Here's an example Jasmine 3.1 test for the script include:

```javascript
describe("Class", function () {
  describe("create", function () {
    it("should create an instance of a class with an initialize method", function () {
      var MyClass = Class.create()
      var instance = new MyClass()
      spyOn(instance, "initialize")

      expect(instance instanceof MyClass).toBe(true)
      expect(instance.initialize).toBeDefined()
      expect(instance.initialize).toHaveBeenCalled()
    })

    it("should create an instance of a class without an initialize method", function () {
      var MyClass = Class.create()
      var instance = new MyClass()

      expect(instance instanceof MyClass).toBe(true)
      expect(instance.initialize).toBeUndefined()
    })
  })

  describe("extend", function () {
    it("should extend the destination object with the properties of the source object", function () {
      var destination = { a: 1 }
      var source = { b: 2 }

      Object.extend(destination, source)

      expect(destination.a).toBe(1)
      expect(destination.b).toBe(2)
    })
  })

  describe("extendsObject", function () {
    it("should return a clone of the destination object with the properties of the source object", function () {
      var destination = { a: 1 }
      var source = { b: 2 }

      var result = Object.extendsObject(destination, source)

      expect(result.a).toBeUndefined()
      expect(result.b).toBe(2)
    })
  })

  describe("clone", function () {
    it("should create a clone of the object with the same properties", function () {
      var object = { a: 1, b: 2 }

      var clone = Object.clone(object)

      expect(clone.a).toBe(1)
      expect(clone.b).toBe(2)
    })
  })
})
```

This test suite covers all of the methods in the script include and verifies that they behave as expected. It tests that the `Class.create` method creates instances of a class with or without an `initialize` method, that the `Object.extend` method extends the destination object with the properties of the source object, that the `Object.extendsObject` method returns a clone of the destination object with the properties of the source object, and that the `Object.clone` method creates a clone of the object with the same properties.

[When copy pasting the above into an ATF test (Server Script) it passes on 8/9 tests.]

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

## Generating regex

Regex, although simple in principle, can quickly become confusing and unwieldy to even the best developers. Chat GPT excels at tasks for which there are plenty of example online and all you need is a customisation based on those.

### Prompt

Write some code which uses regex to extract the parameters in this url and show that it works using ES5 and gs.info to log.

https://dev91497.service-now.com/incident_list.do?sysparm_query=caller_id%3Djavascript%3Ags.getUserID()%5Eactive%3Dtrue%5Euniversal_requestISEMPTY&sysparm_view=ess

### Response

Sure! Here's an example in ES5 that extracts the parameters from the given URL using regular expressions and logs the results using `gs.info`:

```js
var url =
  "https://dev91497.service-now.com/incident_list.do?sysparm_query=caller_id%3Djavascript%3Ags.getUserID()%5Eactive%3Dtrue%5Euniversal_requestISEMPTY&sysparm_view=ess"

// Regular expression to match the query string parameters
var regex = /[?&]([^=#]+)=([^&#]*)/g

// Object to store the parameter key-value pairs
var params = {}

// Iterate over each parameter in the query string
while ((match = regex.exec(url))) {
  // Get the key and value of the parameter
  var key = decodeURIComponent(match[1].replace(/\+/g, " "))
  var value = decodeURIComponent(match[2].replace(/\+/g, " "))
  // Add the key-value pair to the params object
  params[key] = value
}

// Log the params object
gs.info(params)
```

This should log the following output in the ServiceNow background script log:

```bash
*** Script: {"sysparm_query":"caller_id=javascript:gs.getUserID()^active=true^universal_requestISEMPTY","sysparm_view":"ess"}
```

## Making sense of unwieldy log messages

Sometimes ServiceNow throws an error that is hard to understand because there's so much text involved. Recently I've just been copying and pasting that text into Chat GPT to help me determine what's important and what the error is saying.

### Prompt

```bash
Evaluator.evaluateString() problem: java.lang.RuntimeException: failed to coerce com.glide.script.fencing.ScopedGlideElement to desired type java.lang.String: com.glide.script.fencing.ScopedFunctionObjectTypeHandler.coerceFunctionArgument(ScopedFunctionObjectTypeHandler.java:174)
org.mozilla.javascript.NativeJavaMethod.call(NativeJavaMethod.java:253)
org.mozilla.javascript.ScriptRuntime.doCall(ScriptRuntime.java:2652)
org.mozilla.javascript.Interpreter.interpretLoop(Interpreter.java:1518)
org.mozilla.javascript.Interpreter.interpret(Interpreter.java:830)
org.mozilla.javascript.InterpretedFunction.lambda$call$0(InterpretedFunction.java:160)
com.glide.caller.gen.sys_script_email_c2103be487807d105538c9170cbb3585.call(Unknown Source)
com.glide.script.ScriptCaller.call(ScriptCaller.java:18)
org.mozilla.javascript.InterpretedFunction.call(InterpretedFunction.java:159)
org.mozilla.javascript.ScriptRuntime.doCall2(ScriptRuntime.java:2734)
org.mozilla.javascript.ScriptRuntime.doCall(ScriptRuntime.java:2657)
org.mozilla.javascript.Interpreter.interpretLoop(Interpreter.java:1518)
org.mozilla.javascript.Interpreter.interpret(Interpreter.java:830)
org.mozilla.javascript.InterpretedFunction.lambda$exec$1(InterpretedFunction.java:176)
com.glide.caller.gen.sys_script_email_c2103be487807d105538c9170cbb3585.call(Unknown Source)
com.glide.script.ScriptCaller.call(ScriptCaller.java:18)
org.mozilla.javascript.InterpretedFunction.exec(InterpretedFunction.java:175)
com.glide.script.ScriptEvaluator.execute(ScriptEvaluator.java:397)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:209)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:137)
com.glide.script.fencing.GlideScopedEvaluator.evaluateScript(GlideScopedEvaluator.java:348)
com.glide.script.fencing.GlideScopedEvaluator.evaluateScript(GlideScopedEvaluator.java:295)
com.glide.notification.outbound.EmailFormatter.renderScript(EmailFormatter.java:368)
com.glide.notification.outbound.EmailFormatter.collectCurlyScriptAndExecute(EmailFormatter.java:283)
com.glide.notification.outbound.EmailFormatter.renderScriptInMessage(EmailFormatter.java:198)
com.glide.notification.outbound.EmailFormatter.evaluateTemplateScript(EmailFormatter.java:164)
com.glide.notification.cmn.NotificationDataEvaluator.evalMessage(NotificationDataEvaluator.java:259)
com.glide.notification.cmn.NotificationDataEvaluator.changeDateTimeFormatsAndEvalMessage(NotificationDataEvaluator.java:209)
com.glide.notification.cmn.NotificationDataEvaluator.evaluateNotificationData(NotificationDataEvaluator.java:165)
com.glide.notification.cmn.NotificationDataEvaluator.evaluate(NotificationDataEvaluator.java:85)
com.glide.notification.cmn.NotificationMessage.processTemplate(NotificationMessage.java:100)
com.glide.notification.cmn.NotificationActionHandler.send(NotificationActionHandler.java:104)
com.glide.notification.cmn.NotificationActionHandler.process(NotificationActionHandler.java:67)
com.glide.policy.EventProcessor.process(EventProcessor.java:261)
com.glide.policy.EventProcessor.processEventDuringNormalOperation(EventProcessor.java:225)
com.glide.policy.EventProcessor.processEvent(EventProcessor.java:149)
com.glide.policy.EventProcessor.process(EventProcessor.java:102)
com.glide.policy.EventManager.processEvents(EventManager.java:317)
com.glide.policy.EventManager._process(EventManager.java:192)
com.glide.policy.EventManager.processDelegatedEvents(EventManager.java:162)
com.glide.script.GlideSystem.js_processDelegatedEvents(GlideSystem.java:750)
java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
java.base/java.lang.reflect.Method.invoke(Method.java:566)
org.mozilla.javascript.MemberBox.invoke(MemberBox.java:138)
org.mozilla.javascript.FunctionObject.doInvoke(FunctionObject.java:677)
org.mozilla.javascript.FunctionObject.call(FunctionObject.java:614)
org.mozilla.javascript.ScriptRuntime.doCall(ScriptRuntime.java:2649)
org.mozilla.javascript.Interpreter.interpretLoop(Interpreter.java:1518)
org.mozilla.javascript.Interpreter.interpret(Interpreter.java:830)
org.mozilla.javascript.InterpretedFunction.lambda$call$0(InterpretedFunction.java:160)
com.glide.caller.gen._refname_.call(Unknown Source)
com.glide.script.ScriptCaller.call(ScriptCaller.java:18)
org.mozilla.javascript.InterpretedFunction.call(InterpretedFunction.java:159)
org.mozilla.javascript.ContextFactory.doTopCall(ContextFactory.java:597)
org.mozilla.javascript.ScriptRuntime.doTopCall(ScriptRuntime.java:3573)
org.mozilla.javascript.InterpretedFunction.exec(InterpretedFunction.java:172)
com.glide.script.ScriptEvaluator.execute(ScriptEvaluator.java:397)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:209)
com.glide.script.ScriptEvaluator.evaluateString(ScriptEvaluator.java:137)
com.glide.script.ScriptEvaluator.evaluateStringWithPrefix(ScriptEvaluator.java:121)
com.glide.script.Evaluator.evaluatePossiblePrefixedString(Evaluator.java:220)
com.glide.job.RunScriptJob.evaluateScript(RunScriptJob.java:174)
com.glide.job.RunScriptJob.evaluateScript(RunScriptJob.java:156)
com.glide.job.RunScriptJob.execute(RunScriptJob.java:89)
com.glide.schedule.JobExecutor.lambda$executeJob$0(JobExecutor.java:140)
com.glide.schedule.JobExecutor.executeJob(JobExecutor.java:143)
com.glide.schedule.JobExecutor.execute(JobExecutor.java:127)
com.glide.schedule_v2.SchedulerWorkerThread.executeJob(SchedulerWorkerThread.java:328)
com.glide.schedule_v2.SchedulerWorkerThread.lambda$process$0(SchedulerWorkerThread.java:219)
com.glide.worker.TransactionalWorkerThread.executeInTransaction(TransactionalWorkerThread.java:35)
com.glide.schedule_v2.SchedulerWorkerThread.process(SchedulerWorkerThread.java:219)
com.glide.schedule_v2.SchedulerWorkerThread.run(SchedulerWorkerThread.java:100)
```

### Response

The error message is saying that there is a failed attempt to coerce `com.glide.script.fencing.ScopedGlideElement` to the desired type `java.lang.String`.

This error might occur when you are trying to use a GlideElement (a field in a record) directly in a function that requires a String. The solution typically involves ensuring that you're explicitly converting the GlideElement to a String before using it in a function that requires a String.

For example, suppose `record` is a GlideRecord, and `field` is a field in that record. Instead of doing this:

```javascript
var problematicString = record.field
```

You should do this:

```javascript
var fixedString = "" + record.field
```

or

```javascript
var fixedString = record.field.toString()
```

Either of these methods will explicitly convert the GlideElement to a String before using it.

You'll need to find where in your code this issue is occurring and make the necessary changes. Given that the stack trace refers to a script in an email notification (`sys_script_email`), it's likely that you have a dynamic email notification script that's causing the issue.

Unfortunately, without the specific code causing the error, it's hard to give more specific advice. If you continue to have issues, I would suggest posting the code that is causing the error.

## Mistake: Making up facts

ChatGPT responds with a cohesive and plausible piece of language. Often it's reliable and highly valuable. Sometimes, though, it's completely made up and potentially damaging. So watch out!

### Prompt 1

What methods exist on GlideRecord in ServiceNow?

### Response 1

GlideRecord is a JavaScript object in ServiceNow that represents a table record. It has many methods that allow you to interact with records in the table. Here are some of the most commonly used methods on GlideRecord:

- addEncodedQuery(query): Adds a query to the GlideRecord. The query must be encoded.
- query(): Executes the query on the GlideRecord.
- next(): Moves to the next record in the GlideRecord.
- getValue(columnName): Gets the value of a column in the current GlideRecord.
- setValue(columnName, value): Sets the value of a column in the current GlideRecord.
- insert(): Inserts a new record using the values in the GlideRecord.
- update(): Updates the current record using the values in the GlideRecord.
- deleteRecord(): Deletes the current record from the table.
- getDisplayValue(): Gets a display value for the current record.

There are many other methods on GlideRecord, but these are some of the most commonly used.

[All these methods do indeed exist, but wait...]

### Prompt 2

What other methods are there?

### Response 2

Here are some additional methods on the `GlideRecord` object in ServiceNow:

- `addActiveQuery()`: Adds a query that selects only active records.
- `addEncodedQuery(query)`: Adds an encoded query string to the GlideRecord.
- `addJoinTable(table):` Adds a table to the GlideRecord query by creating a join between the current table and another table.
- `canCreate()`: Determines whether the current user can create a new record.
- `canDelete()`: Determines whether the current user can delete the current record.
- `canRead()`: Determines whether the current user can read the current record.
- `canWrite()`: Determines whether the current user can modify the current record.
- `chooseWindow()` : Pop up a list of records for selection.
- `deleteMultiple()`: Deletes all the records in the current GlideRecord that match the query conditions.
- `get()`: Retrieves the value of the specified field.
- `getEncodedQuery()`: Retrieves the encoded query string that is set on the GlideRecord.
- `getTableName()`: Returns the name of the table associated with the GlideRecord.
- `hasAttachments()`: Determines whether the current record has attachments.
- `insert()`: Inserts a new record into the table.
- `isActionAborted()`: Determines whether the user aborted the current transaction.
- `isValid()`: Determines whether the GlideRecord is valid.
- `newRecord()`: Initializes the GlideRecord for a new record and sets the defaults.
- `next()`: Moves to the next record in the GlideRecord.
- `setQuery(query)`: Sets an SQL-like query string on the GlideRecord.
- `update()`: Updates the current record in the table.
- `setValue(field, value)`: Sets the value of a field on the GlideRecord.
- `setValueWithDisplayValue(field, value)`: Sets the value of a field with a display value on the GlideRecord.
- `sysID`: Retrieves the sys_id value of the current GlideRecord.
- `deleteRecord()`: Deletes the current record from the table.

Note that some of these methods may be available only in specific versions of ServiceNow or may require certain security permissions to be granted to the user executing the script.

[All these methods exist, except for `setValueWithDisplayValue(field, value)` which is a complete fabrication]

## Mistake: Communicating mistakes with confidence

ChatGPT has no clue it's made as mistake. It treats mistakes and actual facts with the same degree of confidence. Even if you dig deeper it may not show any indication that it knows its answer is complete nonsense.

### Prompt

Could you give me some examples of using the `setValueWithDisplayValue()` method on GlideRecord?

[This method I'm asking ChatGPT about doesn't exist, but check out the response...]

### Response

Certainly! Here are some examples of using `setValueWithDisplayValue()` method on a `GlideRecord` object:

Example 1: Setting a date field with display value

```javascript
var gr = new GlideRecord("incident")
gr.addQuery("number", "INC000123")
gr.query()

if (gr.next()) {
  gr.setValueWithDisplayValue("due_date", "12/31/2023")
  gr.update()
}
```

Example 2: Setting a reference field with display value

```javascript
var gr = new GlideRecord("incident")
gr.addQuery("number", "INC000123")
gr.query()

if (gr.next()) {
  var userGr = new GlideRecord("sys_user")
  userGr.addQuery("user_name", "jsmith")
  userGr.query()

  if (userGr.next()) {
    gr.setValueWithDisplayValue("assigned_to", userGr.getValue("sys_id"))
    gr.update()
  }
}
```

Example 3: Setting a choice field with display value

```javascript
var gr = new GlideRecord("incident")
gr.addQuery("number", "INC000123")
gr.query()

if (gr.next()) {
  gr.setValueWithDisplayValue("priority", "High")
  gr.update()
}
```

In each of these examples, we're using `setValueWithDisplayValue()` method to set a field's value with a display value instead of the actual value. This is useful when you have a field with a reference or choice list, and you don't want to hard-code the value in your script.

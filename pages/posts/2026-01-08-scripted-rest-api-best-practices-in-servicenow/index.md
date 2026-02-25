---
slug: scripted-rest-api-best-practices-in-servicenow
date: '2026-01-08'
title: 'Scripted REST API Best Practices in ServiceNow'
description: ''
tags: ''
published: true
category: ''
---

# ServiceNow Scripted REST API Best Practices

A comprehensive guide consolidating industry best practices for designing, implementing, securing, and maintaining Scripted REST APIs in ServiceNow.

---

## Table of Contents

1. [When to Use Scripted REST APIs](#when-to-use-scripted-rest-apis)
2. [Authentication & Security](#authentication--security)
3. [Authorization with ACLs](#authorization-with-acls)
4. [API Design Principles](#api-design-principles)
5. [Idempotency](#idempotency)
6. [Versioning](#versioning)
7. [Error Handling](#error-handling)
8. [Transaction Management](#transaction-management)
9. [Performance Optimization](#performance-optimization)
10. [Input Validation](#input-validation)
11. [Logging & Debugging](#logging--debugging)
12. [Documentation](#documentation)
13. [Testing](#testing)
14. [Code Architecture](#code-architecture)
15. [Complete Endpoint Template](#complete-endpoint-template)
16. [Common Pitfalls to Avoid](#common-pitfalls-to-avoid)

---

## When to Use Scripted REST APIs

Use Scripted REST APIs when you need:

-   **Custom security controls** - When you don't want an external system to have full access to your table
-   **Flexible payloads** - Custom request/response formats beyond standard Table API
-   **Business logic** - Processing, validation, or transformation before/after data operations
-   **Multi-table operations** - Orchestrating operations across multiple tables in a single call
-   **Custom authentication** - OAuth profiles or other advanced authentication mechanisms
-   **Data aggregation** - Combining data from multiple sources into a single response

**Don't use Scripted REST APIs when:**

-   Standard Table API meets your requirements
-   You're recreating functionality that already exists out-of-box
-   A simple CRUD operation would suffice

---

## Authentication & Security

Implement defense-in-depth security measures.

> **Reference:** [OWASP API Security Top 10](https://owasp.org/API-Security/)

### Prefer OAuth Over Basic Authentication

```javascript
// Authentication hierarchy (most to least secure):
// 1. OAuth 2.0 (Recommended)
// 2. API Keys with proper rotation
// 3. Basic Authentication (Avoid if possible)
```

**Setting up OAuth enforcement:**

1. Configure an OAuth profile for your API
2. Set up REST API access policies to enforce OAuth
3. Use `com.glide.rest.policy` property for security enforcement

**Service Account Best Practices:**

-   Create dedicated service accounts for integrations
-   Enable "Web Service Access Only" checkbox on `sys_user` record
-   Use role-based access with least-privilege principle
-   Implement credential rotation policies

### Additional Security Measures

```javascript
// API Key validation example
var apiKey = request.headers['X-API-Key'];
if (apiKey !== 'expected_key') {
	response.setStatus(401);
	response.setBody({ error: 'Unauthorized access' });
	return;
}
```

**Security checklist:**

-   ✅ Require authentication on all data-modification endpoints (POST/PUT/DELETE/PATCH)
-   ✅ Use HTTPS exclusively
-   ✅ Implement rate limiting
-   ✅ Validate all input data
-   ✅ Use strong SSL/TLS configurations
-   ✅ Never expose sensitive data in URLs/logs

---

## Authorization with ACLs

### Remove Default ACL

The default ACL `Scripted REST External Default` contains `snc_internal` role which exposes your API to all users in your organization. **Always create custom ACLs.**

### Use GlideRecordSecure

```javascript
// ❌ WRONG - bypasses table ACLs
var gr = new GlideRecord('incident');

// ✅ CORRECT - enforces table-level ACLs
var gr = new GlideRecordSecure('incident');
gr.addQuery('active', true);
gr.query();
```

### Creating Custom REST_Endpoint ACLs

1. Remove the default ACL from your scripted API resources
2. Create a new ACL of type `REST_Endpoint`
3. Add it to your resource with appropriate role conditions

```javascript
// Role check in script
if (!gs.hasRole('rest_api_user')) {
	response.setStatus(403);
	response.setBody({ error: 'Access denied' });
	return;
}
```

### REST API Access Policies

Use REST API access policies for:

-   IP-based filtering
-   Role/group restrictions
-   Scope limitations
-   Global request blocking from untrusted networks

---

## API Design Principles

### Follow REST Conventions

| HTTP Method | Purpose                    | Idempotent |
| ----------- | -------------------------- | ---------- |
| GET         | Retrieve data (query only) | Yes        |
| POST        | Create new records         | No         |
| PUT         | Replace entire record      | Yes        |
| PATCH       | Partial update             | Yes        |
| DELETE      | Remove records             | Yes        |

**Critical:** GET should NEVER modify data.

### Naming Conventions

```
✅ Good: /api/x_company/v1/users
✅ Good: /api/x_company/v1/incidents/{sys_id}
❌ Bad:  /api/x_company/v1/getUserData
❌ Bad:  /api/x_company/v1/incident_create
```

Use:

-   Lowercase with hyphens or underscores
-   Nouns for resources (not verbs)
-   Plural forms for collections
-   Hierarchical structure for relationships

### Request/Response Formats

```javascript
// Always set content type
response.setHeader('Content-Type', 'application/json');

// Standard response structure
response.setBody({
	result: {
		// Your data here
	},
	meta: {
		count: 10,
		offset: 0,
		limit: 20
	}
});
```

---

## Idempotency

API operations should be idempotent—multiple identical requests should produce the same result as a single request. This is critical for reliability in distributed systems where network failures can cause retries.

> **Reference:** [Microsoft REST API Guidelines - Idempotency](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#741-post), [Stripe API Idempotency](https://stripe.com/docs/api/idempotent_requests)

### Why Idempotency Matters

When a client sends a request and doesn't receive a response (network timeout, server crash), it will retry. Without idempotency, this can create duplicate records or apply changes multiple times.

### Implementation Approaches

**1. Natural Key Deduplication**

```javascript
(function process(request, response) {
	var data = request.body.data;

	// Use a natural key to prevent duplicates
	var gr = new GlideRecordSecure('incident');
	gr.addQuery('correlation_id', data.correlation_id);
	gr.query();

	if (gr.next()) {
		// Already exists - return existing record (idempotent)
		response.setStatus(200);
		response.setBody({
			result: {
				sys_id: gr.sys_id.toString(),
				number: gr.number.toString(),
				message: 'Record already exists'
			}
		});
		return;
	}

	// Create new record
	gr.initialize();
	gr.correlation_id = data.correlation_id;
	gr.short_description = data.short_description;
	var sys_id = gr.insert();

	response.setStatus(201);
	response.setBody({
		result: {
			sys_id: sys_id,
			number: gr.number.toString()
		}
	});
})(request, response);
```

**2. Idempotency Key Header**

```javascript
(function process(request, response) {
	var idempotencyKey = request.getHeader('Idempotency-Key');

	if (idempotencyKey) {
		// Check if we've seen this key before
		var cache = new GlideRecord('x_company_api_cache');
		cache.addQuery('idempotency_key', idempotencyKey);
		cache.query();

		if (cache.next()) {
			// Return cached response
			response.setStatus(parseInt(cache.status_code));
			response.setBody(JSON.parse(cache.response_body));
			return;
		}
	}

	// Process the request
	var result = processRequest(request.body.data);

	// Cache the response for future duplicate requests
	if (idempotencyKey) {
		var cacheRecord = new GlideRecord('x_company_api_cache');
		cacheRecord.initialize();
		cacheRecord.idempotency_key = idempotencyKey;
		cacheRecord.status_code = result.success ? 201 : 400;
		cacheRecord.response_body = JSON.stringify(result);
		cacheRecord.insert();
	}

	response.setStatus(result.success ? 201 : 400);
	response.setBody(result);
})(request, response);
```

### Idempotency by HTTP Method

| Method | Idempotent? | Notes                               |
| ------ | ----------- | ----------------------------------- |
| GET    | Yes         | Read-only, never modifies data      |
| PUT    | Yes         | Replaces entire resource            |
| DELETE | Yes         | Deleting twice = same result        |
| PATCH  | Yes\*       | Should be, but depends on operation |
| POST   | No          | Use idempotency keys for create     |

---

## Versioning

### Why Version?

Versioning allows you to:

-   Add, deprecate, or alter behavior without breaking existing consumers
-   Protect current users from changes
-   Maintain backward compatibility

### Implementation

```
URL Pattern: /api/{namespace}/{version}/{api_id}/{relative_path}
Example:     /api/x_company/v1/incidents
             /api/x_company/v2/incidents
```

**Best Practices:**

-   Include version in the base path: `/api/namespace/v1/resource`
-   Create new versions for breaking changes only
-   Keep behavior consistent within a version
-   Document deprecation timelines
-   Support at least one previous version

### Versioning Strategies

| Strategy    | Example                               | Pros              | Cons              |
| ----------- | ------------------------------------- | ----------------- | ----------------- |
| URL Path    | `/api/v1/accounts`                    | Clear, cacheable  | URL changes       |
| Query Param | `/api/accounts?version=1`             | Easy to implement | Easy to miss      |
| Header      | `Accept: application/vnd.api.v1+json` | Clean URLs        | Less discoverable |

> **Reference:** [Microsoft REST API Guidelines - Versioning](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#12-versioning)

### Managing Breaking Changes

```javascript
// v1 remains unchanged
// /api/x_company/v1/user/details

// v2 introduces modifications
// /api/x_company/v2/user/details

// Always provide migration paths in documentation
```

---

## Error Handling

Return structured, consistent error responses with actionable information.

> **Reference:** [RFC 7807 - Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807), [RFC 9110 - HTTP Semantics](https://httpwg.org/specs/rfc9110.html#status.codes)

### Use Standard HTTP Status Codes

| Operation    | Success Code     | Description                               |
| ------------ | ---------------- | ----------------------------------------- |
| Create       | `201 Created`    | Resource successfully created             |
| Update       | `200 OK`         | Resource successfully updated             |
| No Change    | `204 No Content` | Request processed, no modification needed |
| Bad Request  | `400`            | Invalid input data                        |
| Unauthorized | `401`            | Missing or invalid authentication         |
| Forbidden    | `403`            | Insufficient permissions                  |
| Not Found    | `404`            | Referenced resource doesn't exist         |
| Conflict     | `409`            | Business rule violation or duplicate      |
| Server Error | `500`            | Unexpected server-side failure            |

```javascript
// Success codes
response.setStatus(200); // OK - successful GET/PUT/PATCH
response.setStatus(201); // Created - successful POST
response.setStatus(204); // No Content - successful DELETE

// Client error codes
response.setStatus(400); // Bad Request - invalid input
response.setStatus(401); // Unauthorized - missing/invalid auth
response.setStatus(403); // Forbidden - insufficient permissions
response.setStatus(404); // Not Found - resource doesn't exist
response.setStatus(409); // Conflict - business rule violation
response.setStatus(413); // Payload Too Large
response.setStatus(429); // Too Many Requests (rate limiting)

// Server error codes
response.setStatus(500); // Internal Server Error
response.setStatus(503); // Service Unavailable
```

### Structured Error Responses

Include correlation IDs and timestamps for traceability:

```json
{
	"status": 400,
	"error": {
		"code": "VALIDATION_ERROR",
		"message": "Request validation failed",
		"details": [
			{
				"field": "caller_id",
				"issue": "Caller reference not found"
			}
		],
		"correlation_id": "abc123-def456",
		"timestamp": "2025-01-08T10:30:00Z"
	}
}
```

**Implementation:**

```javascript
(function process(request, response) {
	var correlationId =
		request.getHeader('X-Correlation-ID') || gs.generateGUID();

	try {
		var requestBody = request.body.data;

		// Validation
		if (!requestBody.number || !requestBody.correlation_id) {
			response.setStatus(400);
			response.setBody({
				error: {
					code: 'MISSING_REQUIRED_FIELDS',
					message:
						'Missing required parameters: number, correlation_id',
					details: [],
					correlation_id: correlationId,
					timestamp: new GlideDateTime().getValue()
				}
			});
			return;
		}

		// Process request
		var gr = new GlideRecordSecure('incident');
		gr.addQuery('number', requestBody.number);
		gr.query();

		if (!gr.next()) {
			response.setStatus(404);
			response.setBody({
				error: {
					code: 'RECORD_NOT_FOUND',
					message:
						'No incident found with number: ' + requestBody.number,
					correlation_id: correlationId,
					timestamp: new GlideDateTime().getValue()
				}
			});
			return;
		}

		// Success
		response.setStatus(200);
		response.setBody({
			result: {
				sys_id: gr.sys_id.toString(),
				number: gr.number.toString()
			}
		});
	} catch (ex) {
		gs.error('[' + correlationId + '] API Error: ' + ex.message);
		response.setStatus(500);
		response.setBody({
			error: {
				code: 'INTERNAL_ERROR',
				message: 'An unexpected error occurred',
				correlation_id: correlationId,
				timestamp: new GlideDateTime().getValue()
			}
		});
	}
})(request, response);
```

---

## Transaction Management

Ensure data consistency through proper transaction handling, especially for batch operations.

> **Reference:** [Google API Design Guide - Errors](https://cloud.google.com/apis/design/errors)

### Batch Operation Strategies

For APIs that process multiple records, choose between:

1. **All-or-nothing** - Entire batch fails if any record fails
2. **Partial success** - Process what you can, report per-record status

### All-or-Nothing Pattern

Validate all records before processing any:

```javascript
(function process(request, response) {
	var records = request.body.data.records;
	var validationErrors = [];

	// Phase 1: Validate ALL records first
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		var errors = validateRecord(record, i);
		if (errors.length > 0) {
			validationErrors = validationErrors.concat(errors);
		}
	}

	// If ANY validation fails, reject entire batch
	if (validationErrors.length > 0) {
		response.setStatus(400);
		response.setBody({
			error: {
				code: 'BATCH_VALIDATION_FAILED',
				message: 'Batch validation failed. No records were processed.',
				details: validationErrors
			}
		});
		return;
	}

	// Phase 2: Process all records (validation passed)
	var results = [];
	for (var j = 0; j < records.length; j++) {
		var result = processRecord(records[j]);
		results.push(result);
	}

	response.setStatus(201);
	response.setBody({
		result: {
			processed: results.length,
			records: results
		}
	});
})(request, response);

function validateRecord(record, index) {
	var errors = [];
	if (!record.short_description) {
		errors.push({
			index: index,
			field: 'short_description',
			issue: 'Required field missing'
		});
	}
	// Add more validations...
	return errors;
}
```

### Partial Success Pattern

Process what you can, report detailed status:

```javascript
(function process(request, response) {
	var records = request.body.data.records;
	var results = {
		succeeded: [],
		failed: []
	};

	for (var i = 0; i < records.length; i++) {
		try {
			var validation = validateRecord(records[i], i);
			if (validation.errors.length > 0) {
				results.failed.push({
					index: i,
					errors: validation.errors
				});
				continue;
			}

			var created = processRecord(records[i]);
			results.succeeded.push({
				index: i,
				sys_id: created.sys_id,
				number: created.number
			});
		} catch (ex) {
			results.failed.push({
				index: i,
				errors: [{ issue: ex.message }]
			});
		}
	}

	// Use 207 Multi-Status for partial success
	var statusCode =
		results.failed.length === 0
			? 201
			: results.succeeded.length === 0
			? 400
			: 207;

	response.setStatus(statusCode);
	response.setBody({
		result: {
			total: records.length,
			succeeded: results.succeeded.length,
			failed: results.failed.length,
			details: results
		}
	});
})(request, response);
```

### When to Use Each Pattern

| Pattern         | Use When                                        |
| --------------- | ----------------------------------------------- |
| All-or-nothing  | Records are interdependent                      |
| All-or-nothing  | Partial state would cause data integrity issues |
| Partial success | Records are independent                         |
| Partial success | Client can handle/retry individual failures     |

---

## Performance Optimization

### Minimize Database Queries

```javascript
// ❌ WRONG - Multiple queries in a loop
for (var i = 0; i < ids.length; i++) {
	var gr = new GlideRecord('incident');
	gr.get(ids[i]);
	// process
}

// ✅ CORRECT - Single query with IN clause
var gr = new GlideRecord('incident');
gr.addQuery('sys_id', 'IN', ids.join(','));
gr.query();
while (gr.next()) {
	// process
}
```

### Implement Pagination

```javascript
(function process(request, response) {
	var limit = parseInt(request.queryParams['limit']) || 20;
	var offset = parseInt(request.queryParams['offset']) || 0;

	// Cap maximum limit
	if (limit > 100) limit = 100;

	var gr = new GlideRecordSecure('incident');
	gr.addQuery('active', true);
	gr.orderBy('sys_created_on');
	gr.chooseWindow(offset, offset + limit);
	gr.query();

	var results = [];
	while (gr.next()) {
		results.push({
			sys_id: gr.sys_id.toString(),
			number: gr.number.toString()
		});
	}

	// Get total count for pagination metadata
	var countGr = new GlideAggregate('incident');
	countGr.addQuery('active', true);
	countGr.addAggregate('COUNT');
	countGr.query();
	var total = 0;
	if (countGr.next()) {
		total = parseInt(countGr.getAggregate('COUNT'));
	}

	response.setBody({
		result: results,
		meta: {
			total: total,
			limit: limit,
			offset: offset,
			hasMore: offset + limit < total
		}
	});
})(request, response);
```

### Additional Performance Tips

-   **Reduce payload size** - Return only necessary fields
-   **Use caching** where appropriate
-   **Consider asynchronous processing** for long-running operations
-   **Use GlideRecord efficiently** - Avoid `gr.get()` when you need specific fields only
-   **Limit fields in queries** - Use `gr.setLimit()` and select specific fields

---

## Input Validation

Validate all input data before processing. Fail fast with clear error messages.

> **Reference:** [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

**Validation checklist:**

-   Required fields present
-   Data types correct
-   Field lengths within bounds
-   Format validation (e.g., sys_id format, email format)
-   Reference integrity (foreign keys exist)

### Validate Required Parameters

```javascript
(function process(request, response) {
	var body = request.body.data;
	var errors = [];

	// Required field validation
	if (!body.caller_id) {
		errors.push({ field: 'caller_id', message: 'Caller ID is required' });
	}

	if (!body.short_description) {
		errors.push({
			field: 'short_description',
			message: 'Short description is required'
		});
	}

	// Type validation
	if (body.priority && isNaN(parseInt(body.priority))) {
		errors.push({
			field: 'priority',
			message: 'Priority must be a number'
		});
	}

	// Range validation
	if (body.priority && (body.priority < 1 || body.priority > 5)) {
		errors.push({
			field: 'priority',
			message: 'Priority must be between 1 and 5'
		});
	}

	// Payload size validation
	if (JSON.stringify(body).length > 10000) {
		response.setStatus(413);
		response.setBody({ error: 'Request payload too large' });
		return;
	}

	if (errors.length > 0) {
		response.setStatus(400);
		response.setBody({
			error: {
				code: 'VALIDATION_ERROR',
				message: 'Validation failed',
				details: errors
			}
		});
		return;
	}

	// Continue processing...
})(request, response);
```

### Prevent Injection Attacks

```javascript
// Use parameterized queries with GlideRecord (built-in protection)
var gr = new GlideRecordSecure('incident');
gr.addQuery('number', userInput); // Safe - GlideRecord handles escaping
gr.query();

// Never construct encoded queries from raw user input
// ❌ WRONG
gr.addEncodedQuery('short_description=' + userInput);

// ✅ CORRECT - Use addQuery methods
gr.addQuery('short_description', 'CONTAINS', userInput);
```

---

## Logging & Debugging

Implement structured logging with correlation IDs for end-to-end traceability.

> **Reference:** [The Twelve-Factor App - Logs](https://12factor.net/logs)

### Logging Levels

| Level        | Use Case                         |
| ------------ | -------------------------------- |
| `gs.debug()` | Detailed diagnostic information  |
| `gs.info()`  | General operational events       |
| `gs.warn()`  | Recoverable issues, deprecations |
| `gs.error()` | Failures requiring attention     |

### Implement Comprehensive Logging

```javascript
(function process(request, response) {
	var startTime = new Date().getTime();
	var requestId = gs.generateGUID();

	// Log request
	gs.info(
		'[' +
			requestId +
			'] API Request: ' +
			request.uri +
			' | Method: ' +
			request.httpMethod +
			' | User: ' +
			gs.getUserName()
	);

	try {
		// Process request
		var result = processRequest(request);

		var duration = new Date().getTime() - startTime;
		gs.info(
			'[' + requestId + '] API Success | Duration: ' + duration + 'ms'
		);

		response.setStatus(200);
		response.setBody(result);
	} catch (ex) {
		var duration = new Date().getTime() - startTime;
		gs.error(
			'[' +
				requestId +
				'] API Error: ' +
				ex.message +
				' | Duration: ' +
				duration +
				'ms'
		);

		response.setStatus(500);
		response.setBody({ error: 'Internal server error' });
	}
})(request, response);
```

### Debugging Techniques

1. **Enable REST debugging property:**

    ```
    Property: glide.rest.debug = true
    ```

2. **Use the Script Debugger:**

    - Set breakpoints in your scripted REST API code
    - Use REST API Explorer to trigger the endpoint
    - Step through code in the debugger

3. **Session debugging:**

    - Use session debug options for ACL, Business Rule issues
    - Add `X-WantDebugMessages` header for debug output

4. **Log File Tailer:**
    - View node log in real-time during testing

```javascript
// Debug statements in code
gs.debug('Processing request for incident: ' + incidentNumber);
gs.info('Record created successfully: ' + gr.sys_id);
gs.warn('Deprecated parameter used: ' + paramName);
gs.error('Failed to create record: ' + errorMessage);
```

---

## Documentation

### What to Document

-   Endpoint URLs and HTTP methods
-   Request parameters (path, query, body)
-   Request/response payload formats with examples
-   Authentication requirements
-   Error codes and messages
-   Rate limits
-   Version information and deprecation notices

### Documentation Tools

-   **REST API Explorer** - Built-in documentation and testing
-   **OpenAPI/Swagger** - For external documentation
-   **Confluence/Wiki** - For detailed integration guides

### Example Documentation Format

```markdown
## Create Incident

Creates a new incident record.

**Endpoint:** `POST /api/x_company/v1/incidents`

**Authentication:** OAuth 2.0 required

**Request Body:**
| Field | Type | Required | Description |
| ----------------- | ------- | -------- | -------------------- |
| caller_id | string | Yes | User sys_id or email |
| short_description | string | Yes | Brief description |
| priority | integer | No | 1-5 (default: 4) |

**Example Request:**
{json}
{
"caller_id": "user@example.com",
"short_description": "Unable to access email",
"priority": 3
}
{/json}

**Response Codes:**

-   201: Incident created successfully
-   400: Invalid request parameters
-   401: Authentication required
-   403: Insufficient permissions
```

---

## Testing

### Testing Tools

1. **REST API Explorer** - Built-in ServiceNow testing
2. **Postman** - External API testing
3. **Automated Test Framework (ATF)** - Create Inbound REST test steps

### Test Categories

```javascript
// Unit tests for individual functions
// Integration tests for end-to-end flows
// Security tests for authentication/authorization
// Performance tests for load/stress testing
// Negative tests for error handling
```

### ATF Integration

```javascript
// Create an Inbound REST Test Step in ATF
// Validate:
// - Authentication success/failure
// - Correct response codes
// - Response body structure
// - Data integrity
```

### Pre-Production Checklist

-   ✅ All CRUD operations tested
-   ✅ Error scenarios verified
-   ✅ Authentication mechanisms confirmed
-   ✅ Authorization rules validated
-   ✅ Performance benchmarks met
-   ✅ Documentation complete and accurate

---

## Code Architecture

### Use Script Includes for Reusability

```javascript
// Script Include: IncidentAPI
var IncidentAPI = Class.create();
IncidentAPI.prototype = {
	initialize: function () {},

	createIncident: function (data) {
		var gr = new GlideRecordSecure('incident');
		gr.initialize();
		gr.caller_id = data.caller_id;
		gr.short_description = data.short_description;
		gr.priority = data.priority || 4;

		var sys_id = gr.insert();
		if (sys_id) {
			return {
				success: true,
				sys_id: sys_id,
				number: gr.number.toString()
			};
		}
		return { success: false, error: 'Failed to create incident' };
	},

	getIncident: function (sys_id) {
		var gr = new GlideRecordSecure('incident');
		if (gr.get(sys_id)) {
			return {
				success: true,
				data: {
					sys_id: gr.sys_id.toString(),
					number: gr.number.toString(),
					short_description: gr.short_description.toString(),
					state: gr.state.getDisplayValue()
				}
			};
		}
		return { success: false, error: 'Incident not found' };
	},

	type: 'IncidentAPI'
};

// Scripted REST API Resource
(function process(request, response) {
	var api = new IncidentAPI();
	var result = api.createIncident(request.body.data);

	if (result.success) {
		response.setStatus(201);
		response.setBody({ result: result });
	} else {
		response.setStatus(400);
		response.setBody({ error: result.error });
	}
})(request, response);
```

### Multiple Resources Under One API

Group related resources under a single Scripted REST API for easier management:

```
API: x_company/incident_management/v1
├── Resource: /incidents (GET, POST)
├── Resource: /incidents/{sys_id} (GET, PUT, DELETE)
├── Resource: /incidents/{sys_id}/comments (GET, POST)
└── Resource: /incidents/{sys_id}/attachments (GET, POST)
```

---

## Complete Endpoint Template

Copy this boilerplate as a starting point for new endpoints. It incorporates validation, error handling, logging, Script Include usage, and proper response structure.

### Script Include (Business Logic)

```javascript
/**
 * Script Include: IncidentAPIService
 * API Name: x_company
 * Accessible from: All application scopes
 */
var IncidentAPIService = Class.create();
IncidentAPIService.prototype = {
	initialize: function () {
		this.LOG_SOURCE = 'IncidentAPIService';
	},

	/**
	 * Validates incident creation payload
	 * @param {Object} data - Request payload
	 * @returns {Object} { valid: boolean, errors: Array }
	 */
	validateCreatePayload: function (data) {
		var errors = [];

		// Required fields
		if (!data.caller_id) {
			errors.push({
				field: 'caller_id',
				issue: 'Required field missing'
			});
		}

		if (!data.short_description) {
			errors.push({
				field: 'short_description',
				issue: 'Required field missing'
			});
		}

		// Type validation
		if (data.priority && isNaN(parseInt(data.priority))) {
			errors.push({
				field: 'priority',
				issue: 'Must be a number'
			});
		}

		// Range validation
		if (data.priority) {
			var p = parseInt(data.priority);
			if (p < 1 || p > 5) {
				errors.push({
					field: 'priority',
					issue: 'Must be between 1 and 5'
				});
			}
		}

		// Reference validation
		if (data.caller_id && !this._userExists(data.caller_id)) {
			errors.push({
				field: 'caller_id',
				issue: 'User not found: ' + data.caller_id
			});
		}

		return {
			valid: errors.length === 0,
			errors: errors
		};
	},

	/**
	 * Creates a new incident
	 * @param {Object} data - Validated request payload
	 * @returns {Object} { success: boolean, sys_id?, number?, error? }
	 */
	createIncident: function (data) {
		var gr = new GlideRecordSecure('incident');
		gr.initialize();
		gr.caller_id = data.caller_id;
		gr.short_description = data.short_description;
		gr.description = data.description || '';
		gr.priority = data.priority || 4;
		gr.correlation_id = data.correlation_id || '';

		var sys_id = gr.insert();

		if (sys_id) {
			return {
				success: true,
				sys_id: sys_id,
				number: gr.number.toString()
			};
		}

		return {
			success: false,
			error: 'Failed to create incident - check ACLs and mandatory fields'
		};
	},

	/**
	 * Retrieves an incident by sys_id
	 * @param {string} sysId - Incident sys_id
	 * @returns {Object} { success: boolean, data?, error? }
	 */
	getIncident: function (sysId) {
		if (!this._isValidSysId(sysId)) {
			return { success: false, error: 'Invalid sys_id format' };
		}

		var gr = new GlideRecordSecure('incident');
		if (gr.get(sysId)) {
			return {
				success: true,
				data: {
					sys_id: gr.sys_id.toString(),
					number: gr.number.toString(),
					short_description: gr.short_description.toString(),
					state: gr.state.getDisplayValue(),
					priority: gr.priority.getDisplayValue(),
					caller_id: gr.caller_id.getDisplayValue(),
					created_on: gr.sys_created_on.toString(),
					updated_on: gr.sys_updated_on.toString()
				}
			};
		}

		return { success: false, error: 'Incident not found' };
	},

	// Private helper methods
	_userExists: function (userId) {
		var gr = new GlideRecord('sys_user');
		return gr.get(userId) || gr.get('email', userId);
	},

	_isValidSysId: function (sysId) {
		return sysId && /^[a-f0-9]{32}$/i.test(sysId);
	},

	type: 'IncidentAPIService'
};
```

### REST Resource Script (POST - Create)

```javascript
(function process(request, response) {
	// ========================================
	// 1. SETUP: Correlation ID & Logging
	// ========================================
	var correlationId =
		request.getHeader('X-Correlation-ID') || gs.generateGUID();
	var startTime = new Date().getTime();
	var LOG_SOURCE = 'IncidentAPI.POST';

	gs.info(
		'[' +
			correlationId +
			'] ' +
			LOG_SOURCE +
			' - Request received | User: ' +
			gs.getUserName()
	);

	// Helper function for consistent error responses
	function sendError(status, code, message, details) {
		var duration = new Date().getTime() - startTime;
		gs.warn(
			'[' +
				correlationId +
				'] ' +
				LOG_SOURCE +
				' - ' +
				code +
				': ' +
				message +
				' | Duration: ' +
				duration +
				'ms'
		);

		response.setStatus(status);
		response.setBody({
			error: {
				code: code,
				message: message,
				details: details || [],
				correlation_id: correlationId,
				timestamp: new GlideDateTime().getValue()
			}
		});
	}

	// Helper function for success responses
	function sendSuccess(status, result) {
		var duration = new Date().getTime() - startTime;
		gs.info(
			'[' +
				correlationId +
				'] ' +
				LOG_SOURCE +
				' - Success | Duration: ' +
				duration +
				'ms'
		);

		response.setStatus(status);
		response.setBody({
			result: result,
			meta: {
				correlation_id: correlationId,
				timestamp: new GlideDateTime().getValue()
			}
		});
	}

	try {
		// ========================================
		// 2. AUTHORIZATION CHECK (optional extra check)
		// ========================================
		if (!gs.hasRole('x_company.api_user')) {
			sendError(403, 'FORBIDDEN', 'Insufficient permissions');
			return;
		}

		// ========================================
		// 3. PARSE & VALIDATE REQUEST BODY
		// ========================================
		var requestBody = request.body.data;

		if (!requestBody || Object.keys(requestBody).length === 0) {
			sendError(400, 'EMPTY_BODY', 'Request body is required');
			return;
		}

		// Use Script Include for validation
		var api = new IncidentAPIService();
		var validation = api.validateCreatePayload(requestBody);

		if (!validation.valid) {
			sendError(
				400,
				'VALIDATION_ERROR',
				'Request validation failed',
				validation.errors
			);
			return;
		}

		// ========================================
		// 4. IDEMPOTENCY CHECK (optional)
		// ========================================
		if (requestBody.correlation_id) {
			var existing = new GlideRecord('incident');
			existing.addQuery('correlation_id', requestBody.correlation_id);
			existing.setLimit(1);
			existing.query();

			if (existing.next()) {
				// Return existing record (idempotent behavior)
				gs.info(
					'[' +
						correlationId +
						'] ' +
						LOG_SOURCE +
						' - Duplicate request, returning existing record'
				);
				sendSuccess(200, {
					sys_id: existing.sys_id.toString(),
					number: existing.number.toString(),
					message: 'Record already exists (idempotent response)'
				});
				return;
			}
		}

		// ========================================
		// 5. PROCESS REQUEST (via Script Include)
		// ========================================
		var result = api.createIncident(requestBody);

		if (!result.success) {
			sendError(500, 'CREATE_FAILED', result.error);
			return;
		}

		// ========================================
		// 6. RETURN SUCCESS RESPONSE
		// ========================================
		sendSuccess(201, {
			sys_id: result.sys_id,
			number: result.number
		});
	} catch (ex) {
		// ========================================
		// 7. UNEXPECTED ERROR HANDLING
		// ========================================
		gs.error(
			'[' +
				correlationId +
				'] ' +
				LOG_SOURCE +
				' - Unexpected error: ' +
				ex.message
		);
		sendError(500, 'INTERNAL_ERROR', 'An unexpected error occurred');
	}
})(request, response);
```

### REST Resource Script (GET - Retrieve)

```javascript
(function process(request, response) {
	// ========================================
	// 1. SETUP
	// ========================================
	var correlationId =
		request.getHeader('X-Correlation-ID') || gs.generateGUID();
	var startTime = new Date().getTime();
	var LOG_SOURCE = 'IncidentAPI.GET';

	gs.info('[' + correlationId + '] ' + LOG_SOURCE + ' - Request received');

	function sendError(status, code, message) {
		response.setStatus(status);
		response.setBody({
			error: {
				code: code,
				message: message,
				correlation_id: correlationId,
				timestamp: new GlideDateTime().getValue()
			}
		});
	}

	function sendSuccess(result) {
		var duration = new Date().getTime() - startTime;
		gs.info(
			'[' +
				correlationId +
				'] ' +
				LOG_SOURCE +
				' - Success | Duration: ' +
				duration +
				'ms'
		);
		response.setStatus(200);
		response.setBody({
			result: result,
			meta: {
				correlation_id: correlationId,
				timestamp: new GlideDateTime().getValue()
			}
		});
	}

	try {
		// ========================================
		// 2. GET PATH PARAMETER
		// ========================================
		var sysId = request.pathParams.sys_id;

		if (!sysId) {
			sendError(400, 'MISSING_PARAMETER', 'sys_id path parameter required');
			return;
		}

		// ========================================
		// 3. RETRIEVE RECORD (via Script Include)
		// ========================================
		var api = new IncidentAPIService();
		var result = api.getIncident(sysId);

		if (!result.success) {
			sendError(404, 'NOT_FOUND', result.error);
			return;
		}

		// ========================================
		// 4. RETURN SUCCESS RESPONSE
		// ========================================
		sendSuccess(result.data);
	} catch (ex) {
		gs.error(
			'[' +
				correlationId +
				'] ' +
				LOG_SOURCE +
				' - Unexpected error: ' +
				ex.message
		);
		sendError(500, 'INTERNAL_ERROR', 'An unexpected error occurred');
	}
})(request, response);
```

### Template Checklist

When using this template, ensure you've:

- [ ] Renamed `IncidentAPIService` to match your use case
- [ ] Updated the `LOG_SOURCE` constants
- [ ] Configured the correct role in the authorization check
- [ ] Added validation rules specific to your payload
- [ ] Created appropriate `REST_Endpoint` ACLs
- [ ] Removed the idempotency check if not needed
- [ ] Added any additional fields to the response

---

## Common Pitfalls to Avoid

### Security Pitfalls

| ❌ Don't                            | ✅ Do                            |
| ----------------------------------- | -------------------------------- |
| Use default ACL                     | Create custom REST_Endpoint ACLs |
| Use GlideRecord                     | Use GlideRecordSecure            |
| Pass sensitive data in URLs         | Use request body or headers      |
| Skip authentication on any endpoint | Require auth on all endpoints    |
| Use Basic Auth                      | Use OAuth 2.0                    |

### Design Pitfalls

| ❌ Don't                      | ✅ Do                                   |
| ----------------------------- | --------------------------------------- |
| Use GET for data modification | Use POST/PUT/PATCH/DELETE appropriately |
| Include request body in GET   | Use query parameters for filtering      |
| Return all fields always      | Return only necessary fields            |
| Skip versioning               | Version from day one                    |
| Hardcode values               | Use system properties/config            |

### Performance Pitfalls

| ❌ Don't                     | ✅ Do                            |
| ---------------------------- | -------------------------------- |
| Query in loops               | Use batch queries with IN clause |
| Return unlimited results     | Implement pagination             |
| Skip caching                 | Cache when appropriate           |
| Process synchronously always | Use async for long operations    |

### Code Pitfalls

| ❌ Don't                           | ✅ Do                             |
| ---------------------------------- | --------------------------------- |
| Write all logic in resource script | Use Script Includes               |
| Skip error handling                | Implement comprehensive try-catch |
| Skip logging                       | Log requests, responses, errors   |
| Skip input validation              | Validate all inputs               |

---

## Quick Reference Checklist

### Before Deployment

-   [ ] Authentication configured (OAuth preferred)
-   [ ] Custom ACLs created and assigned
-   [ ] GlideRecordSecure used throughout
-   [ ] All inputs validated
-   [ ] Error handling implemented
-   [ ] Appropriate HTTP status codes used
-   [ ] Pagination implemented for list endpoints
-   [ ] Logging in place
-   [ ] API versioned
-   [ ] Documentation complete
-   [ ] All tests passing
-   [ ] Performance benchmarks met
-   [ ] Security review completed

---

## References

### ServiceNow Documentation

-   [ServiceNow Product Documentation - Scripted REST APIs](https://docs.servicenow.com)
-   [ServiceNow Developer Blog - Introduction to Scripted REST APIs](https://developer.servicenow.com/blog.do?p=/post/introduction-to-scripted-rest-apis/)
-   [ServiceNow Developer Blog - Debugging Inbound REST Calls](https://developer.servicenow.com/blog.do?p=/post/debugging-inbound-rest-calls-and-the-business-rulesacls-that-impact-those-calls/)
-   [Quality Clouds - Scripted REST API Best Practices](https://qualityclouds.com/documentation/qcr/rules/scripted-rest-api-best-practices/)

### Industry Standards & Guidelines

-   [RFC 9110 - HTTP Semantics](https://httpwg.org/specs/rfc9110.html) - HTTP status codes
-   [RFC 7807 - Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807) - Error response structure
-   [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md) - Versioning, idempotency
-   [Google API Design Guide](https://cloud.google.com/apis/design) - Error handling, batch operations
-   [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) - API documentation standard

### Security

-   [OWASP API Security Top 10](https://owasp.org/API-Security/)
-   [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
-   [Stripe API Idempotency](https://stripe.com/docs/api/idempotent_requests) - Idempotency key pattern

### Architecture & Practices

-   [The Twelve-Factor App](https://12factor.net/) - Logging, configuration best practices

### Certification Prep

Scripted REST API design is a commonly tested topic in ServiceNow certification exams, including CAD and CIS. [SNReady](https://snready.com) provides practice questions with detailed explanations to help you prepare.

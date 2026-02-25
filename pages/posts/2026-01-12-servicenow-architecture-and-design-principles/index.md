---
slug: servicenow-architecture-and-design-principles
date: '2026-01-12'
title: 'ServiceNow Architecture & Design Principles: A Cheat Sheet for Architects'
description: 'A comprehensive reference guide covering ServiceNow platform architecture, the 8 pillars framework, CMDB/CSDM design, integration patterns, security, performance optimization, and deployment strategies.'
tags: 'servicenow, architecture, CSDM, CMDB, integration'
published: true
category: 'servicenow'
---

# ServiceNow Architecture & Design Principles

A comprehensive cheat sheet for ServiceNow architects covering platform fundamentals, design patterns, and best practices.

---

## 1. Platform Architecture Overview

ServiceNow is a **cloud-based enterprise platform** following a **multi-instance architecture** where each customer gets their own dedicated instance.

### Core Architectural Layers

| Layer                    | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| **User Interface Layer** | Forms, lists, portals, Service Portal, UI Builder/Next Experience |
| **Application Layer**    | ITSM, ITOM, ITAM, CSM, HR apps built on the Now Platform          |
| **Business Logic Layer** | Business Rules, Script Includes, Flows, Workflows                 |
| **Data Layer**           | Tables, CMDB, relationships stored in MySQL/MariaDB               |
| **Integration Layer**    | REST/SOAP APIs, IntegrationHub, MID Servers                       |

### Instance Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ServiceNow Cloud                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   DEV       │  │    TEST     │  │    PROD     │     │
│  │  Instance   │──│   Instance  │──│  Instance   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│         │                │                │             │
│         └────────────────┼────────────────┘             │
│                          │                              │
│                   Update Sets / CI/CD                   │
└─────────────────────────────────────────────────────────┘
```

**Source:** [ServiceNow ESM Architecture Blueprint](https://www.servicenow.com/community/architect-blog/️-the-esm-architecture-blueprint-v6-vancouver-is-out-️/ba-p/2795476)

---

## 2. The 8 Pillars of ServiceNow Architecture

These foundational pillars guide scalable, secure, and maintainable platform design.

### Pillar 1: Modularity & Reusability

> "Build once, reuse everywhere"

- Design utilities and logic that serve multiple teams/use cases
- A well-built Script Include or Flow Action becomes a building block
- Reduces duplication, simplifies maintenance, accelerates development

### Pillar 2: Security by Design

- Incorporate access control, data validation, and scoped logic from day one
- Use ACLs, roles, and security attributes as first-class citizens
- Prevent breaches and protect data integrity

### Pillar 3: Scalability

- Design for future growth, not just current load
- Use async processes, queues, and efficient queries
- Support enterprise load with proper indexing strategies

### Pillar 4: Observability

- Build visibility into systems: logging, traceability, error tracking
- Enable rapid debugging and compliance support
- Use System Logs, Transaction Logs, and Script Execution Tracker

### Pillar 5: Business Alignment

- Reflect business services, owners, and processes in architecture
- Map technical solutions to business capabilities
- Use CSDM to connect IT to business outcomes

### Pillar 6: Governance

- Establish clear change management processes
- Use update sets and source control for tracking customizations
- Define ownership and approval workflows

### Pillar 7: Maintainability

- Write clean, documented code
- Follow naming conventions
- Avoid over-customization; prefer OOB solutions

### Pillar 8: Performance

- Optimize queries and scripts
- Monitor and tune regularly
- Design for minimal database impact

**Source:** [Build It the Right Way: The 8 Pillars](https://www.servicenow.com/community/developer-forum/build-it-the-right-way-the-8-pillars-of-servicenow-architecture/m-p/3278363) | [BRY Framework](https://architecture.buildittherightway.com/pillars/servicenow-architecture-pillars)

---

## 3. Scoped Applications Architecture

### When to Use Scoped Apps

| Scenario                                          | Recommendation                  |
| ------------------------------------------------- | ------------------------------- |
| Specific use case, won't interact with other apps | **Create new scope**            |
| Needs to interact with platform/other apps        | **Evaluate existing scope**     |
| Reusable across instances or Store distribution   | **Create new scope**            |
| Global platform modification                      | **Global scope** (with caution) |

### Scope Benefits

- **Modularity**: Package functionality as standalone module
- **Isolation**: Prevent variable/script name collisions
- **Security**: Control what's exposed to other scopes
- **Reusability**: Move between instances or publish to Store
- **Governance**: Manage changes, prevent accidental modifications

### Best Practices

```
Namespace format: x_[vendor]_[app_name]
Example: x_acme_csm
```

1. **Plan thoroughly** before development—define required resources and data access
2. **Use scoped APIs** for platform interaction
3. **Document cross-scope dependencies** explicitly
4. **Test scope interactions** before deployment

**Source:** [Understanding Application Scope](https://www.servicenow.com/community/developer-articles/understanding-application-scope-on-the-now-platform-whitepaper/ta-p/2326214) | [Background and Philosophy of Scoped Applications](https://www.servicenow.com/community/developer-blog/background-and-philosophy-of-scoped-applications/ba-p/2285076)

---

## 4. CMDB & CSDM Architecture

### CSDM Framework Domains

```
┌─────────────────────────────────────────────────────────┐
│                    CSDM FRAMEWORK                        │
├──────────────┬──────────────┬──────────────┬────────────┤
│  FOUNDATION  │    DESIGN    │    MANAGE    │ SELL/      │
│              │              │   TECHNICAL  │ CONSUME    │
├──────────────┼──────────────┼──────────────┼────────────┤
│ • Locations  │ • Business   │ • Technical  │ • Service  │
│ • Users      │   Apps       │   Services   │   Offerings│
│ • Groups     │ • Business   │ • CI         │ • Requests │
│ • Companies  │   Services   │   Relationships│ • Catalog│
│ • Cost Ctrs  │ • App Svcs   │ • Discovery  │   Items    │
└──────────────┴──────────────┴──────────────┴────────────┘
```

### Implementation Approach: Crawl → Walk → Run

| Phase     | Focus                                                |
| --------- | ---------------------------------------------------- |
| **Crawl** | Foundation data (users, locations, business apps)    |
| **Walk**  | Service instances, relationships, technical services |
| **Run**   | Advanced domains, full service modeling, automation  |

### CMDB Best Practices

1. **Follow CSDM schema** for compatibility with ServiceNow analytics and upgrades
2. **Configure identification rules** to avoid duplicate CIs
3. **Set up reconciliation rules** to prioritize trusted data sources
4. **Use Service Graph Connectors** for third-party tool integrations
5. **Schedule regular data quality checks** using CMDB Health dashboards
6. **Establish CI ownership** and validation rules
7. **Document customizations** and obtain governance approval

### Key Tables

| Table             | Purpose                           |
| ----------------- | --------------------------------- |
| `cmdb_ci`         | Base CI table (parent of all CIs) |
| `cmdb_ci_service` | Business/Technical Services       |
| `cmdb_ci_appl`    | Applications                      |
| `cmdb_ci_server`  | Servers                           |
| `cmdb_rel_ci`     | CI Relationships                  |

**Source:** [CMDB Design Guidance](https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/white-paper/wp-cmdb-design-guidance.pdf) | [CMDB & CSDM Data Foundations](https://mynow.service-now.com/now/best-practices/success-packs/cmdb-and-csdm-data-foundations)

---

## 5. Integration Architecture

### Integration Pattern Decision Matrix

| Pattern                    | Use When                             | Pros                         | Cons                      |
| -------------------------- | ------------------------------------ | ---------------------------- | ------------------------- |
| **REST API**               | Real-time, synchronous needs         | Clear contracts, predictable | Tight coupling            |
| **IntegrationHub Spokes**  | Pre-built connectors available       | Fast implementation          | Licensing cost            |
| **MID Server**             | On-prem systems behind firewall      | Secure bridge                | Additional infrastructure |
| **Event-driven (EDA)**     | Decoupled, async processing          | Scalable, loose coupling     | Complexity                |
| **Stream Connect (Kafka)** | High-volume, bidirectional streaming | Real-time, scalable          | Kafka expertise needed    |

### MID Server Architecture

```
┌──────────────────┐         ┌──────────────────┐
│  ServiceNow      │◄───────►│    MID Server    │
│  Cloud Instance  │  HTTPS  │  (On-Premise)    │
└──────────────────┘         └────────┬─────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
              ┌─────▼─────┐    ┌──────▼──────┐   ┌─────▼─────┐
              │  LDAP/AD  │    │   Database  │   │  Network  │
              └───────────┘    └─────────────┘   │  Devices  │
                                                 └───────────┘
```

**When MID Server is Required:**

- Discovery & Service Mapping
- Orchestration
- Integrating with on-prem systems
- JDBC connections to internal databases

### IntegrationHub Best Practices

1. **Use Spoke Generator** for OpenAPI 2.0/3.0 specs
2. **Group similar action steps** to avoid environment switching
3. **Set MID Server selection** via connection aliases
4. **Use credential aliases** for secure credential management
5. **Implement retry logic** for transient failures

### Instance-to-Instance Integration

| Method                              | Use Case                              |
| ----------------------------------- | ------------------------------------- |
| **Service Bridge**                  | MSP/Provider-Consumer scenarios       |
| **Instance Data Replication (IDR)** | Data synchronization across instances |
| **Custom REST integration**         | Flexible, custom requirements         |

**Source:** [Integration Design Patterns](https://www.servicenow.com/community/architect-blog/integration-design-how-to-choose-the-best-pattern-to-integrate/ba-p/2874114) | [IntegrationHub Spokes](https://www.servicenow.com/community/workflow-data-fabric-blog/integration-hub-spokes-and-how-to-build-them/ba-p/2788254)

---

## 6. Security Architecture

### ACL Evaluation Order (Performance Optimized)

```
1. Roles/Security Attributes  ← FASTEST (use first)
       ↓
2. Data Conditions            ← Use indexed fields
       ↓
3. Reference Controls
       ↓
4. Scripts                    ← SLOWEST (use last)
```

### ACL Types

| Type          | Granularity       | Use Case                   |
| ------------- | ----------------- | -------------------------- |
| **Table ACL** | Entire table      | Broad access control       |
| **Field ACL** | Specific field    | Sensitive field protection |
| **Row-level** | Record conditions | Data segregation           |

### ACL Best Practices

1. **Start with roles** — fastest security check
2. **Use non-contextual ACLs** when possible (faster, easier to audit)
3. **Prefer indexed fields** in conditions
4. **Shield scripts with roles/criteria** — script only runs if conditions match first
5. **Merge ACLs that differ only by roles**
6. **Test with impersonation** — admins bypass ACLs

### Role Management

```
               ┌─────────────────┐
               │   itil_admin    │  ← Higher-level role
               └────────┬────────┘
                        │ inherits
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐
    │  itil   │   │ change  │   │ problem │
    │         │   │ _manager│   │ _manager│
    └─────────┘   └─────────┘   └─────────┘
```

**Principles:**

- **Least privilege**: Users get only needed permissions
- **Assign roles to groups**, not individual users
- **Audit regularly**: Review permissions quarterly
- **Document custom roles**: Purpose, permissions, owners

### Security Configuration Checklist

- [ ] High Security Plugin enabled
- [ ] Session timeout configured appropriately
- [ ] IP address access controls for admin
- [ ] Two-factor authentication for privileged users
- [ ] ACLs on sensitive tables (sys_user, etc.)
- [ ] Encryption for sensitive fields

**Source:** [Configuring ACLs the Right Way](https://www.servicenow.com/community/platform-privacy-security-blog/configuring-acls-the-right-way/ba-p/3446017) | [ServiceNow Security Best Practices](https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/white-paper/instance-security-best-practice.pdf)

---

## 7. Performance Optimization

### GlideRecord Best Practices

| Do                                             | Don't                                         |
| ---------------------------------------------- | --------------------------------------------- |
| ✅ Use `addQuery()` with indexed fields        | ❌ Query without filters                      |
| ✅ Use `addEncodedQuery()` for complex queries | ❌ Chain many `addQuery()`/`addOrCondition()` |
| ✅ Use `GlideAggregate` for counts             | ❌ Use `getRowCount()`                        |
| ✅ Select only needed fields with `setLimit()` | ❌ Fetch all columns when only need sys_id    |
| ✅ Use async for heavy operations              | ❌ Nested loops with GlideRecord              |

### Server-Side Optimization

```javascript
// BAD: Fetches all columns, no filter
var gr = new GlideRecord('incident');
gr.query();
while (gr.next()) {
	/* ... */
}

// GOOD: Filtered, limited, uses encoded query
var gr = new GlideRecord('incident');
gr.addEncodedQuery('active=true^priorityIN1,2');
gr.setLimit(100);
gr.query();
while (gr.next()) {
	/* ... */
}

// BEST for counts: Use GlideAggregate
var ga = new GlideAggregate('incident');
ga.addQuery('active', true);
ga.addAggregate('COUNT');
ga.query();
if (ga.next()) {
	var count = ga.getAggregate('COUNT');
}
```

### Client-Side Rules

1. **Never use client-side GlideRecord** — use GlideAjax instead
2. **Avoid `g_form.getReference()`** — fetches all fields
3. **Use asynchronous patterns** for server calls
4. **Minimize DOM manipulation** — use GlideForm API

### Performance Monitoring Tools

| Tool                         | Purpose                        |
| ---------------------------- | ------------------------------ |
| **SQL Debugging**            | Analyze slow queries           |
| **Script Execution Tracker** | Track script execution times   |
| **Slow Query Logs**          | Identify problematic queries   |
| **Transaction Logs**         | Monitor request/response times |
| **Instance Scan**            | Identify performance issues    |

### Async Processing Patterns

```javascript
// Use Event Queue for async processing
gs.eventQueue(
	'x_custom.heavy_process',
	current,
	current.sys_id,
	current.number
);

// Scheduled Jobs for batch operations
// Configure via System Definition > Scheduled Jobs
```

**Source:** [Performance Considerations with GlideRecord](https://www.servicenow.com/community/in-other-news/performance-considerations-when-using-gliderecord/ba-p/2271956) | [Beyond Best Practices: Time & Space](https://www.servicenow.com/community/developer-advocate-blog/beyond-best-practices-developer-s-guide-to-time-amp-space/ba-p/3457315)

---

## 8. High Availability & Instance Performance

### ServiceNow's HA Architecture

ServiceNow operates a **fully managed HA infrastructure**. As an architect, understand what's automatic vs. what you influence.

| Layer                 | ServiceNow Manages                | You Influence                            |
| --------------------- | --------------------------------- | ---------------------------------------- |
| **Data Center**       | Multi-DC redundancy, geo-failover | Data residency selection                 |
| **Database**          | Clustering, replication, backups  | Query efficiency, indexing requests      |
| **Application Nodes** | Load balancing, auto-scaling      | Code efficiency, async patterns          |
| **Network**           | CDN, DDoS protection, TLS         | MID Server placement, integration design |

### Automatic HA Capabilities

- **Active-Active Data Centers**: Production instances run across multiple availability zones
- **Automatic Failover**: Database and application tier failover without customer intervention
- **Zero-Downtime Upgrades**: Rolling upgrades across node clusters
- **Hourly Backups**: Point-in-time recovery (35-day retention for production)

> **Key Insight**: You cannot configure HA directly—it's baked in. Your job is to not _defeat_ HA through poor design (e.g., single MID Server dependencies, synchronous blocking calls).

### Instance Performance Levers

What architects _can_ control to maximize performance:

| Lever                 | Strategy                                                            |
| --------------------- | ------------------------------------------------------------------- |
| **Indexing**          | Request indexes for frequently filtered/sorted fields via HI case   |
| **Semaphores**        | Throttle concurrent heavy operations to prevent resource exhaustion |
| **Scheduled Jobs**    | Stagger timing; use off-peak windows for batch processing           |
| **Table Rotation**    | Archive old data (task tables grow fast)                            |
| **Domain Separation** | Limit domains—excessive domains degrade query performance           |
| **Clone Scheduling**  | Clone during low-usage periods                                      |

### Performance Monitoring Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                   MONITORING LAYERS                          │
├──────────────────┬──────────────────┬───────────────────────┤
│    PROACTIVE     │    REACTIVE      │     DIAGNOSTIC        │
├──────────────────┼──────────────────┼───────────────────────┤
│ • Instance Scan  │ • Slow Query Log │ • Session Debug       │
│ • Performance    │ • Transaction    │ • SQL Debug           │
│   Homepage       │   Quota Exceed   │ • Script Execution    │
│ • Scheduled      │ • Error Logs     │   Tracker             │
│   Health Checks  │ • PA Dashboards  │ • Debug Business Rule │
└──────────────────┴──────────────────┴───────────────────────┘
```

### Key Performance Metrics to Monitor

| Metric                        | Target           | Where to Find           |
| ----------------------------- | ---------------- | ----------------------- |
| **Transaction Response Time** | < 1 second (avg) | Performance Homepage    |
| **Long-Running Transactions** | < 0.1% of total  | Transaction Logs        |
| **Slow Queries**              | 0 critical       | Slow Query Logs         |
| **Semaphore Waits**           | Minimal          | System Diagnostics      |
| **Scheduler Backlog**         | Near zero        | Scheduled Job Dashboard |
| **Memory Utilization**        | < 80%            | Stats.do                |

### Capacity Planning Guidelines

| Factor                 | Planning Consideration                                          |
| ---------------------- | --------------------------------------------------------------- |
| **User Concurrency**   | Estimate peak concurrent users; provision accordingly           |
| **Integration Volume** | Map peak API call rates; design for 3x expected load            |
| **Data Growth**        | Project table growth; implement archival before problems        |
| **Scheduled Load**     | Audit job schedules; eliminate conflicts and clustering         |
| **Seasonal Peaks**     | Document business cycles; engage ServiceNow for capacity events |

### Load Testing Approach

```
1. Identify Critical Paths    →  Catalog items, searches, dashboards
       ↓
2. Create Realistic Scripts   →  Simulate actual user journeys
       ↓
3. Test Non-Production First  →  Never load test production
       ↓
4. Gradual Ramp-Up           →  Start small, increase load incrementally
       ↓
5. Monitor During Test        →  Watch Transaction Logs, memory, semaphores
       ↓
6. Analyze & Tune            →  Address bottlenecks before go-live
```

> **Warning**: Load testing production requires explicit ServiceNow approval and coordination. Contact your TAM or support before attempting.

### Common HA/Performance Anti-Patterns

| Anti-Pattern                                        | Why It's Bad                                       | Fix                                      |
| --------------------------------------------------- | -------------------------------------------------- | ---------------------------------------- |
| **Single MID Server**                               | Single point of failure for discovery/integrations | Deploy MID cluster with load balancing   |
| **Synchronous integrations for non-critical paths** | Blocks user transactions                           | Use async (events, IntegrationHub async) |
| **Unindexed query in Business Rule**                | Scales poorly as table grows                       | Request index or redesign query          |
| **Heavy operations in `before` Business Rules**     | Delays user save                                   | Move to `async` or `after` when possible |
| **No data archival strategy**                       | Tables grow indefinitely; queries slow             | Implement table rotation policies        |
| **Scheduled job pile-up**                           | Jobs compete for resources at same time            | Stagger schedules; use priority queues   |

### MID Server HA Configuration

```
┌─────────────────────────────────────────────────────────────┐
│                 MID SERVER CLUSTER                           │
│                                                              │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐          │
│   │   MID 1   │    │   MID 2   │    │   MID 3   │          │
│   │ (Active)  │    │ (Active)  │    │ (Standby) │          │
│   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘          │
│         └────────────────┼────────────────┘                 │
│                          ▼                                   │
│              MID Server Cluster (Load Balanced)             │
│              Auto-failover if node fails                    │
└─────────────────────────────────────────────────────────────┘
```

**Best Practices:**

- Minimum 2 MID Servers per cluster for HA
- Place MIDs in different network zones/data centers
- Use MID Server cluster for Discovery, Orchestration, IntegrationHub
- Monitor MID health via MID Server Dashboard

**Source:** [ServiceNow High Availability](https://www.servicenow.com/docs/bundle/washingtondc-platform-security/page/administer/security/concept/high-availability.html) | [Performance Best Practices](https://www.servicenow.com/docs/bundle/washingtondc-platform-administration/page/administer/general/reference/r_PerformanceResources.html) | [Instance Performance Diagnostics](https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0549498)

---

## 9. Flow Designer Architecture

### Component Hierarchy

```
┌─────────────────────────────────────────┐
│                 FLOW                     │
│  ┌─────────────────────────────────┐    │
│  │           SUBFLOW               │    │
│  │  ┌───────────┐ ┌───────────┐   │    │
│  │  │  ACTION   │ │  ACTION   │   │    │
│  │  └───────────┘ └───────────┘   │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘

Flow = Trigger + Logic + Actions/Subflows
Subflow = Reusable composite logic (no trigger)
Action = Single-purpose atomic operation
```

### Best Practices

| Principle              | Implementation                                    |
| ---------------------- | ------------------------------------------------- |
| **Keep flows short**   | < 25 actions; use subflows for larger             |
| **Subflows for reuse** | Build once, reference everywhere                  |
| **Pass references**    | One reference variable vs. many individual values |
| **Use data pills**     | Avoid hardcoding values in scripts                |
| **Decision tables**    | Replace complex if/else branching                 |
| **Categorize**         | Tag flows/subflows/actions for discoverability    |

### Flow Designer vs. Workflow

| Feature              | Flow Designer         | Workflow       |
| -------------------- | --------------------- | -------------- |
| **Recommended for**  | New development       | Legacy support |
| **Scripting needed** | Minimal               | Often required |
| **Reusability**      | Actions, Subflows     | Activities     |
| **Testing**          | Built-in test feature | Manual         |
| **Performance**      | Optimized             | Variable       |

### Error Handling Strategy

```
┌─────────────────────────────────────┐
│          MAIN FLOW                   │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ SUBFLOW with Error Handler     │ │
│  │                                │ │
│  │  Try: [Action 1] → [Action 2]  │ │
│  │       ↓ error                  │ │
│  │  Catch: [Log] → [Notify]       │ │
│  └────────────────────────────────┘ │
│                                      │
│  Flow continues even if subflow fails│
└─────────────────────────────────────┘
```

**Source:** [Best Practices for Flow Designer](https://www.servicenow.com/community/servicenow-ai-platform-blog/best-practices-for-using-the-flow-designer/ba-p/2281636) | [Flow Designer Architecture Overview](https://www.servicenow.com/docs/bundle/washingtondc-build-workflows/page/administer/flow-designer/concept/flow-designer-arch-overview.html)

---

## 10. Instance Strategy & Domain Separation

### Multi-Instance Decision Framework

| Factor                                    | Single Instance   | Multiple Instances |
| ----------------------------------------- | ----------------- | ------------------ |
| **Same processes, same data**             | ✅ Preferred      | ❌ Avoid           |
| **Legal/geographic data requirements**    | Domain Separation | ✅ May be required |
| **Completely separate entities**          | ❌ Not suitable   | ✅ Consider        |
| **Heavy integration/sync needs**          | ✅ Preferred      | ⚠️ High cost       |
| **Sensitive data, restricted visibility** | Domain Separation | ✅ May be required |

> **Key Rule**: "You cannot run the same process on the same data in multiple instances."

### Domain Separation Overview

```
┌─────────────────────────────────────────┐
│           SINGLE INSTANCE               │
│  ┌───────────┐  ┌───────────┐          │
│  │ Domain A  │  │ Domain B  │          │
│  │ • Data    │  │ • Data    │          │
│  │ • Config  │  │ • Config  │          │
│  │ • Users   │  │ • Users   │          │
│  └───────────┘  └───────────┘          │
│         │              │                │
│         └──────┬───────┘                │
│                ▼                        │
│         Global Domain                   │
│    (Shared configurations)              │
└─────────────────────────────────────────┘
```

### When to Use Domain Separation

✅ **Good fit:**

- MSPs with multiple customers
- Controlling external fulfiller access
- Multi-tenant requirements
- Enterprise with distinct business units

❌ **Avoid when:**

- Need complete separation of system properties
- Global reporting not required
- Simpler to manage separate instances

### Domain Separation Considerations

| Aspect          | Impact                                             |
| --------------- | -------------------------------------------------- |
| **Setup**       | Must be enabled in new instance; cannot be removed |
| **Maintenance** | Substantially increases administrative work        |
| **Performance** | Too many domains slow database queries             |
| **Complexity**  | Requires careful planning and expertise            |

**Source:** [Multi-Instance Architecture Decision](https://www.servicenow.com/community/architect-articles/multi-instance-architecture-yes-no-when/ta-p/2330584) | [Domain Separation Architecture](https://www.servicenow.com/community/architect-articles/domain-separation-part-2-instance-s-architecture/ta-p/2330579)

---

## 11. Deployment & CI/CD

### Deployment Pipeline

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│   DEV   │───►│   QA    │───►│   UAT   │───►│  PROD   │
└────┬────┘    └────┬────┘    └────┬────┘    └─────────┘
     │              │              │
     ▼              ▼              ▼
  Develop      ATF Tests      User Acceptance
  & Test       Code Scan      Final Approval
```

### Update Sets vs. Source Control

| Aspect                | Update Sets               | Source Control (App Repo) |
| --------------------- | ------------------------- | ------------------------- |
| **Version control**   | Limited                   | Full Git capabilities     |
| **Merging**           | Manual collision handling | Git merge/branch          |
| **Recommended for**   | Legacy, simple changes    | Scoped apps, CI/CD        |
| **CI/CD integration** | Basic                     | Full pipeline support     |

### ATF (Automated Test Framework) Best Practices

1. **Create ATF tests in dedicated scoped app** (e.g., "Incident ATF Tests")
2. **Run ATF before deployment** — fail pipeline if tests fail
3. **Cover critical paths**: Catalog items, flows, business logic
4. **Use parameterized tests** for data-driven testing
5. **Include cleanup** in test teardown

### CI/CD Integration Options

| Tool               | Description                                               |
| ------------------ | --------------------------------------------------------- |
| **ReleaseOps**     | Native ServiceNow deployment control (no extra licensing) |
| **GitHub Actions** | ServiceNow CI/CD integration (community supported)        |
| **Jenkins Plugin** | ServiceNow CI/CD plugin                                   |
| **Azure DevOps**   | Pipeline integration via APIs                             |

### Deployment Checklist

- [ ] Update set completed in DEV
- [ ] ATF tests pass
- [ ] Instance Scan clean (no critical issues)
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Rollback plan documented
- [ ] Approvals obtained
- [ ] Preview update set (check collisions)
- [ ] Deploy during maintenance window
- [ ] Post-deployment validation

**Source:** [ReleaseOps](https://www.servicenow.com/community/developer-advocate-blog/releaseops-the-control-tower-for-your-servicenow-deployments/ba-p/3449141) | [CI/CD with ATF](https://beingfluid.github.io/ServiceNow-ATF/cicd.html)

---

## 12. Design Patterns Quick Reference

### Creational Patterns

| Pattern       | ServiceNow Use Case                            |
| ------------- | ---------------------------------------------- |
| **Singleton** | Script Includes with shared state              |
| **Factory**   | Creating different record types based on input |
| **Builder**   | Complex GlideRecord query construction         |

### Structural Patterns

| Pattern       | ServiceNow Use Case                     |
| ------------- | --------------------------------------- |
| **Adapter**   | Wrapping external APIs for platform use |
| **Facade**    | Script Include exposing simplified API  |
| **Decorator** | Extending Business Rule functionality   |

### Behavioral Patterns

| Pattern             | ServiceNow Use Case                               |
| ------------------- | ------------------------------------------------- |
| **Observer**        | Business Rules reacting to record changes         |
| **Strategy**        | Different assignment algorithms based on criteria |
| **Template Method** | Base Script Include with overridable methods      |

**Source:** [23 ServiceNow Design Patterns](https://www.servicenow.com/community/developer-forum/23-servicenow-design-patterns-every-developer-should-know/m-p/3245519) | [Introducing Design Patterns](https://www.servicenow.com/community/architect-articles/introducing-design-patterns-to-coding-practices/ta-p/2330543)

---

## 13. Quick Reference: Do's and Don'ts

### ✅ Do

- Use OOB features before custom development
- Follow CSDM for CMDB modeling
- Create scoped applications for custom functionality
- Use Flow Designer for new workflows
- Write reusable Script Includes
- Test with ATF before deployment
- Document all customizations
- Use async processing for heavy operations
- Apply least privilege for access control
- Monitor performance regularly

### ❌ Don't

- Modify OOB tables/scripts directly
- Use global scope for custom apps
- Write client-side GlideRecord queries
- Skip ACL testing (always impersonate)
- Create complex nested business rules
- Ignore update set collisions
- Deploy without testing
- Over-customize when OOB works
- Use hardcoded values in scripts
- Neglect documentation

---

## Additional Resources

### Official Documentation

- [ServiceNow Docs](https://docs.servicenow.com)
- [ServiceNow Developer Portal](https://developer.servicenow.com)
- [Now Learning](https://nowlearning.servicenow.com)

### Community Resources

- [ServiceNow Community](https://www.servicenow.com/community)
- [Best Practices Portal](https://mynow.servicenow.com/now/best-practices/home)
- [ESM Architecture Blueprint](https://www.servicenow.com/community/architect-blog/️-the-esm-architecture-blueprint-v6-vancouver-is-out-️/ba-p/2795476)

### Certifications

- Certified Implementation Specialist – Data Foundations (CMDB & CSDM)
- Certified Application Developer
- Certified Technical Architect (CTA)

If you're preparing for any of these, [SNReady](https://snready.com) offers practice questions generated from official Now Learning content across 19 ServiceNow certification exams, with detailed explanations for each answer.

---

_Last updated: January 2026_

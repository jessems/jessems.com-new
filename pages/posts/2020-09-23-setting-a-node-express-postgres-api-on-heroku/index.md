---
slug: node-express-postgres-api-heroku
date: '2020-09-23'
title: 'Setting up a node express postgres API on herkou'
description: ''
categories: []
keywords: ['api']
published: false
---

The idea is that we want to run a database locally as well. This is what Heroku prefers. You run it locally and then you sink the data.

```
yarn add pg express body-parser date-format-lite
```

Let's start with a server:

```
const express = require("express"); // use Express
const bodyParser = require("body-parser"); // for parsing POST requests
const app = express(); // create application
const port = 3000; // port for listening

// It's necessary for parsing POST requests
// the line below is used for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// start server
app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
```

Add a route (above app.listen):

```
// return static pages from the "./public" directory
app.use(express.static(__dirname + "/public"));
```

Add this code from Heroku

```{js}
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
```

Install postgres.

Once it's installed.

```
-- for Mac and Linux
export DATABASE_URL=postgres://$(whoami)
-- for Windows
set DATABASE_URL=postgres://$(whoami)
```

```
# create a new user inside the psql terminal
# password must be enclosed with quotes
CREATE ROLE newuser WITH LOGIN PASSWORD 'password';
# make the newuser capable of creating, editing, and deleting databases
ALTER ROLE newuser CREATEDB;
# Quit psql terminal to be able to login using newuser
\q
# Go back to psql terminal, with `newuser` as user
psql postgres -U newuser
# Observe that from `postgres=#`, the psql terminal instead shows `postgres=>`
```

If you don't do the following your local setup will throw the following error:
`UnhandledPromiseRejectionWarning: Error: The server does not support SSL connections` [3]

```
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:<your admin password>@localhost:5432/<your db name>',
    ssl: process.env.DATABASE_URL ? true : false
})
```

```
jmscdch=# CREATE DATABASE databasename OWNER jesse;
CREATE DATABASE

jmscdch=# \l
                           List of databases
   Name    |  Owner  | Encoding | Collate | Ctype |  Access privileges
-----------+---------+----------+---------+-------+---------------------
 jmscdch   | jmscdch | UTF8     | C       | UTF-8 |
 postgres  | jmscdch | UTF8     | C       | UTF-8 |
 routil    | jesse   | UTF8     | C       | UTF-8 |
(5 rows)
```

```
jmscdch=# \c scheduler
You are now connected to database "scheduler" as user "jmscdch".
```

https://medium.com/@viviennediegoencarnacion/getting-started-with-postgresql-on-mac-e6a5f48ee399

https://www.robinwieruch.de/postgres-sql-macos-setup

[[3]](https://stackoverflow.com/questions/54302088/how-to-fix-error-the-server-does-not-support-ssl-connections-when-trying-to-a): https://stackoverflow.com/questions/54302088/how-to-fix-error-the-server-does-not-support-ssl-connections-when-trying-to-a

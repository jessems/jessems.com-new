---
slug: what-is-the-graph
date: "2021-03-10"
title: "What is The Graph"
description: "What is the Graph?"
tags: "blockchain"
category: "technical article"
published: true
---

[The Graph](https://thegraph.com/) makes it easy for developers to retrieve data that is stored on public blockchains such as Ethereum (for simplicity's sake I will simply refer to "blockchains such as Ethereum" as simply: "Ethereum"). It does this by indexing the Ethereum blockchain and making these indexes available through an API.

### On indexing

Indexing is a technique used in data retrieval which is analogous to the index you'll find at the back of most books. In a book's index you will find an alphabetically sorted list of words followed by the page numbers where you'll find those words in the book.

The alphabetically ordered list of words allows you to quickly locate the word you're interested in and with it you can discover the pages on which that word occurs.

Imagine doing this without an index. You would have to go through every page one by one to check to see if the word occurs on the page. Now imagine the index not being sorted alphabetically, in fact it is not sorted at all. Again, you'd be required to go through every word one by one until you've hit your word of interest. The sorting makes your information retrieval task more efficient.

Lastly, imagine that the index didn't contain the page numbers, but included the full page for each word. This would blow up the size of the index, and many pages would need to be repeated multiple times to account for different words occurring on the same page. By including pointers only (the page numbers) the index stays compact and easily traversable.

This is the essence of an index: A sorted list of values with pointers to the original location.

Data retrieval on a set of records becomes much more efficient if it's performed over a sorted list versus an unsorted list. Indexing is the process of creating a sorted data structure (an index) on a field of choice. This makes information retrieval on the indexed fields more efficient.

Indexes come with certain trade-offs. They are separate data structures which need to be created, stored, read into memory and updated. Each of these operations comes with costs of its own.

### Querying data on Ethereum

Because of the costs involved with indexing Ethereum nodes don't maintain any indexes. Information on the Ethereum blockchain is accessed by querying Ethereum nodes who respond according to a JSON RPC protocol. One problem for developers is that these responses are asynchronous and they only offer very limited indices. This allows them to focus their resources on maintaining availability and reaching consensus. This also means nodes are very slow to query.

In the past developers would write indexing services themselves that would query the Ethereum nodes for the relevant data, or they would write clients that would do the indexing themselves. You can also pay for an indexing service which you can query for the relevant data via an API.

### The Graph (current): An Indexing Service

The Graph provides such an indexing service where developers can easily specify what information they want to index, and it makes it available to them as a synchronous endpoint which they can use in their applications.

The endpoint comes in the form of a GraphQL endpoint, which means that after specifying the schema of the data, any client making use of this endpoint can determine in their request, the type and structure of the data they want to get. This removes the tight coupling that typically exists between classical REST endpoints and their clients.

This makes it easier for developers to support a wider range of use cases, and this makes it easier for new clients to use the API and get the data they need in the format they need.

### The Graph (future): A Decentralized Indexing Service

One problem with indexing services is that they are typically run on a centralized location. This goes against the point of Web 3.0 and blockchains, namely to decentralize.

The Graph has a longer term goal of turning their indexing service into a market where resources are allocated in response to market forces. The idea is that by creating the right environment, centered around a token, they can incent indexers to index data, incent curators to pick data to be indexed and incent developers to use the indexed data as before, except now the data won't be coming from a centralized server.

This benefits the Ecosystem as a whole by ensuring decentralization. This isn't only beneficial because you're avoiding a single point of failure. This will likely also result in greater efficiencies throughout the ecosystem. The price of indexing, curating and consumption will act as a signal telling each actor what to do more of (and what to do less of). This type of distributed coordination will outperform the conventional centralized model and result in greater efficiencies for everyone participating.

### References

[1]: https://ethereum.org/ig/developers/tutorials/the-graph-fixing-web3-data-querying/

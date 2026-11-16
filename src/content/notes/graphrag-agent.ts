import type { SeoNote } from "@/lib/seo-content";

// Fenced code uses ~~~ (valid GFM) so the body can live in a template literal.
export const graphragAgent: SeoNote = {
  slug: "graphrag-knowledge-agent",
  title: "When vector search isn't enough: building a GraphRAG agent",
  date: "2026-11-17",
  summary:
    "Vector search finds similar text. Some questions need to follow relationships instead. How I built an agent that turns text into a Neo4j graph and queries it safely.",
  tags: ["GraphRAG", "Neo4j", "AI agents"],
  project: "graphrag-knowledge-graph",
  body: `Most RAG setups work the same way: split your documents into chunks, turn them into vectors, and when a question comes in, fetch the chunks that look most similar. For "what does our refund policy say?" that works really well.

Then someone asks: *"Who supplies the companies this group owns?"*

No single chunk contains that answer. One document says the group owns three companies. Another says who supplies each of them. Neither mentions the other, so similarity search has nothing to grab onto. The answer lives in the *connections* between facts, not in any one piece of text.

That's the problem I built my [GraphRAG Knowledge Agent](/projects/graphrag-knowledge-graph) around. It reads plain text, turns it into a Neo4j knowledge graph, and answers questions by walking that graph.

## The shape of it

I built it in n8n with Gemini and Neo4j. The flow has six steps:

1. **Extract:** Gemini reads the text and returns people, companies and the links between them as JSON.
2. **Validate:** that JSON is checked against a schema before anything is saved.
3. **Load:** the checked entities and relationships are merged into Neo4j.
4. **Ask:** for a question, Gemini writes a Cypher query using the graph's schema.
5. **Guard:** the query is only ever allowed to read.
6. **Answer:** the query runs, and Gemini explains the rows in plain English.

The model does the language work at both ends. The graph does the reasoning in the middle, and the graph can't make things up.

The flow itself lives in n8n, but the ideas are easier to show in a few lines of Python, so that's what the snippets below use.

## Give the model a schema, not a blank page

If you ask a model to "extract the entities", it will happily invent a new relationship type for every sentence: \`IS_PARTNER_OF\`, \`PARTNERS_WITH\`, \`HAS_PARTNERSHIP\`. Your graph turns into a junk drawer. So extraction gets a fixed vocabulary of node labels and relationship types, and has to return this shape:

~~~json
{
  "entities": [
    { "id": "northwind", "label": "Company", "name": "Northwind Group" },
    { "id": "acme", "label": "Company", "name": "Acme Metals" }
  ],
  "relationships": [
    { "from": "northwind", "type": "OWNS", "to": "acme" }
  ]
}
~~~

Then validation rejects anything that doesn't fit. That means an unknown label, an unknown relationship type, or a relationship that points at an entity that was never defined. It's a few lines of checks, and it's the difference between a graph you can query and a graph you have to clean.

## Merge, don't create

The same company shows up in many documents. If every mention creates a new node, "Acme Metals" ends up in your graph six times and none of its connections line up. Using \`MERGE\` on a stable id means re-reading a document, or reading a second one about the same company, adds to the existing node instead of copying it:

~~~python
ALLOWED_LABELS = {"Person", "Company", "Product"}

def merge_entities(tx, label: str, rows: list[dict]):
    if label not in ALLOWED_LABELS:
        raise ValueError(f"unknown label {label!r}")
    # Labels can't be query parameters, so they come from the allow-list,
    # never from the model.
    query = (f"UNWIND $rows AS r MERGE (n:{label} {{id: r.id}}) "
             "SET n.name = r.name")
    tx.run(query, rows=rows)
~~~

That allow-list matters more than it looks. Anything that gets pasted into a query string must come from your code, not from model output.

## Read-only, enforced twice

The question-answering half has the model writing database queries, which should make anyone a little nervous. "Please only write read queries" in the prompt is a request, not a rule. So the rule lives in code, twice:

~~~python
import re

WRITE_CLAUSES = re.compile(
    r"\\b(CREATE|MERGE|DELETE|DETACH|SET|REMOVE|DROP|FOREACH"
    r"|LOAD\\s+CSV|CALL)\\b",
    re.I,
)

def run_generated(driver, cypher: str, params: dict):
    if WRITE_CLAUSES.search(cypher):
        # Fail fast, with a message a person can read.
        raise ValueError("generated query tried to write; refusing")
    with driver.session() as session:
        # The real guard: in a read transaction, Neo4j refuses writes.
        return session.execute_read(
            lambda tx: tx.run(cypher, params).data()
        )
~~~

The pattern check is there to fail fast with a clear message. It isn't the security. The read transaction is: if a write ever slips past the check, Neo4j refuses it. If your Neo4j edition supports roles, connecting as a read-only user adds a third layer. And capping results with a \`LIMIT\` keeps one broad question from dragging back the whole graph.

## Let the model see the map

Cypher generation gets much better when the model knows what's actually in the graph. Along with the question, I give it the node labels, the relationship types with their direction, and a couple of example questions with the queries that answer them. A common way generated Cypher goes wrong is guessing which way a relationship points, and simply showing \`(:Company)-[:OWNS]->(:Company)\` heads off most of that.

## Explain the rows, not the query

The last step takes the question and the rows that came back, and asks Gemini to answer in plain English *using only those rows*. If the query returns nothing, the answer says it couldn't find a connection. This is the step where an agent is most tempted to fill a gap with something plausible. An empty result has to stay an empty answer.

## When to reach for a graph

I don't think graphs replace vector search. They answer different questions:

- **Vectors** are best for "find me something like this", fuzzy wording, and long passages of text.
- **Graphs** are best for "how is A connected to B", questions that hop across several facts, and counting or grouping over relationships.
- **Both together** is often the best setup: vector search finds the right starting node, then the graph walks out from there.

If your users ask about *things*, vectors will carry you a long way. Once they start asking about *how things relate*, it's worth drawing the graph.`,
};

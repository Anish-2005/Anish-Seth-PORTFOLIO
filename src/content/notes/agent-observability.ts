import type { SeoNote } from "@/lib/seo-content";

// Fenced code uses ~~~ (valid GFM) so the body can live in a template literal.
export const agentObservability: SeoNote = {
  slug: "agent-observability-and-cost",
  title: "What did my agent just do, and what did it cost?",
  date: "2026-11-17",
  summary: "Structured logs, cost per run and tests for the messy cases. The boring setup that lets me debug an LLM agent in minutes, not hours.",
  tags: ["AI agents", "Observability", "AWS"],
  body: `When a normal API breaks, a stack trace usually points at the line. When an agent breaks, the "bug" could be the prompt, a tool, a retry that went wrong, or the model simply having an off day. Same input, different behaviour, and often no exception at all.

At Digital Alpha I set up CloudWatch logging, cost tracking per run and tests for the messy cases on the agents I build. None of it is fancy. Here's the shape of it, and why each piece earns its place.

## One run, one id

Every run gets an id the moment it starts, and that id goes *everywhere*: every log line, every model call, every tool call, and every request the agent makes to another system. When something looks wrong, the first question is always "show me everything run X did", and a shared id turns that into one search instead of an afternoon.

The same id also feeds the idempotency keys I use to make agents [safe to retry](/notes/safe-to-retry-ai-agents), so one decision pays for itself twice.

## Log events, not sentences

"Calling the pricing tool now..." is nice to read and useless to query. I log one JSON object per event, with the same fields every time:

~~~python
import json
import logging
import time

log = logging.getLogger("agent")

def event(run_id: str, step: str, name: str, **fields):
    # One JSON object per line: Logs Insights can filter and sum these.
    record = {"run_id": run_id, "step": step, "event": name,
              "ts": time.time(), **fields}
    log.info(json.dumps(record, default=str))
~~~

The events I care about are few: \`model_call\`, \`tool_call\`, \`tool_result\`, \`approval\`, \`retry\` and \`error\`. Each carries what it needs, like the tool name, how long it took and whether it worked. Logged that way, a run reads like a timeline instead of a diary.

## Use the numbers the API already gives you

You don't have to estimate tokens. Bedrock's Converse API returns the token counts, the latency and the reason the model stopped, on every response:

~~~python
import boto3

bedrock = boto3.client("bedrock-runtime")

# Price per 1,000 tokens, per model. Fill in from the Bedrock pricing page.
PRICE_PER_1K = {"your-model-id": {"input": 0.0, "output": 0.0}}

def call_model(run_id: str, step: str, model_id: str, messages: list):
    resp = bedrock.converse(modelId=model_id, messages=messages)
    usage, price = resp["usage"], PRICE_PER_1K[model_id]
    cost = (usage["inputTokens"] * price["input"]
            + usage["outputTokens"] * price["output"]) / 1000
    event(
        run_id, step, "model_call",
        model_id=model_id,
        latency_ms=resp["metrics"]["latencyMs"],
        input_tokens=usage["inputTokens"],
        output_tokens=usage["outputTokens"],
        cost_usd=round(cost, 6),
        stop_reason=resp["stopReason"],
    )
    return resp
~~~

That \`stop_reason\` field is a free bug report. When I see \`max_tokens\`, the model ran out of room mid-answer, which is the most common reason a "JSON" reply won't parse. That's a much faster diagnosis than staring at the prompt.

## Questions I can answer with one query

Because each line is a JSON object, CloudWatch Logs Insights picks the fields up on its own. Two queries cover most of my debugging. Everything one run did, in order:

~~~
fields @timestamp, step, event, latency_ms, cost_usd
| filter run_id = "run-2026-11-17-0042"
| sort @timestamp asc
~~~

And which runs cost the most:

~~~
filter event = "model_call"
| stats sum(cost_usd) as cost, count(*) as calls by run_id
| sort cost desc
| limit 20
~~~

The second one is where surprises show up. A run with forty model calls when it should take five is almost always a loop: the model calling the same tool, getting the same answer and trying again.

## Cost is a feature, not an afterthought

Tokens cost real money, so I track cost per run like any other number, and every run gets a budget:

~~~python
class Budget:
    def __init__(self, limit_usd: float):
        self.limit, self.spent = limit_usd, 0.0

    def charge(self, cost_usd: float):
        self.spent += cost_usd
        if self.spent > self.limit:
            raise RuntimeError(f"run over budget: {self.spent:.4f} USD")
~~~

A loop that would quietly burn through tokens all night becomes an error with a run id attached. It also makes model choices honest. When a smaller model gets the step right at a fraction of the cost, the numbers say so instead of my gut.

## Test the messy cases

Logs tell you what went wrong in production. Tests are how you avoid finding out there. My rule is that the weird cases get tests *first*, because the happy path mostly tests itself:

- The model returns JSON that's cut off because it hit \`max_tokens\`.
- The model returns valid JSON with the wrong shape.
- A tool times out, or succeeds and then the response is lost.
- The run stops halfway and starts again.
- The same input arrives twice.

To test these without calling a real model, I swap the model for a fake that replays scripted answers:

~~~python
class ScriptedModel:
    """Stands in for Bedrock in tests: returns canned replies, in order."""

    def __init__(self, *replies):
        self.replies = list(replies)

    def __call__(self, *_args, **_kwargs):
        return self.replies.pop(0)

def test_cut_off_reply_is_retried_once_then_accepted():
    model = ScriptedModel(
        reply('{"amount": "12', stop_reason="max_tokens"),
        reply('{"account_id": "a1", "amount": "12.00", "currency": "INR"}',
              stop_reason="end_turn"),
    )
    tx = extract_transaction(model)
    assert tx.amount == Decimal("12.00")
~~~

(\`reply\` and \`extract_transaction\` are small helpers from the real code, trimmed here.) These tests run in milliseconds and cost nothing, which means they actually get run.

## The short version

- One id per run, attached to everything.
- One JSON object per event, with the same fields every time.
- Log the tokens, latency and stop reason the API already hands you.
- Give every run a budget, and treat going over it as an error.
- Write the unpleasant tests first.

The model is the part of an agent I can see into least. So everything around it should be the part I can see into most.`,
};

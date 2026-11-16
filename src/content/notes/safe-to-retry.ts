import type { SeoNote } from "@/lib/seo-content";

// Fenced code uses ~~~ (valid GFM) so the body can live in a template literal.
export const safeToRetry: SeoNote = {
  slug: "safe-to-retry-ai-agents",
  title: "Making AI agents safe to retry",
  date: "2026-11-17",
  summary: "Models time out, tools fail and runs stop halfway. Here's how I make sure a retry never does the same thing twice.",
  tags: ["AI agents", "Reliability", "AWS Bedrock"],
  body: `At Digital Alpha I build AI agents on AWS Bedrock and AgentCore that work with live financial data. They call MCP tool servers and reach company systems through Nango. Reading data is the easy part. The moment an agent can *write* something, like creating a transaction or updating a record, a retry stops being harmless.

This is the checklist I work through before an agent gets write access to anything.

## Retries happen more than you think

When people picture an agent failing, they picture a crash. The real trouble is the run that *almost* worked:

- The model call is throttled or times out, and the step runs again.
- A tool call fails after the side effect already happened. The API created the record, then the connection dropped before you heard back.
- The orchestrator restarts a run after a crash and replays the last step.
- The model decides, all on its own, to call the same tool twice.

The second one is the nasty case. From the agent's point of view the call failed. From the ledger's point of view it worked. Retry it naively and you've done it twice.

## Rule 1: every write gets an idempotency key

An idempotency key says "this is the same request as before". The trick is to build it from the *intent*, not generate a fresh random id on every attempt:

~~~python
import hashlib
import json

def idempotency_key(run_id: str, step: str, args: dict) -> str:
    # Same run, step and arguments: same key, on every attempt.
    payload = json.dumps(args, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(f"{run_id}:{step}:{payload}".encode()).hexdigest()
~~~

The \`run_id\` is created once when the run starts and reused for every retry of that run. Sorting the keys means \`{"a": 1, "b": 2}\` and \`{"b": 2, "a": 1}\` give the same key.

My first version kept a small table of keys and results: if the key is already there, return the old result instead of running the action again. That handles most retries, but not the nasty case above. If the write succeeded and the response was lost, your table never got the result, so the retry runs the action again.

The fix is to make the key travel *with* the request. Many payment and ledger APIs accept an idempotency key and drop duplicates for you. If yours doesn't, store the key on the record you create and look for it first:

~~~python
def create_transaction(client, key: str, tx: "CreateTransaction"):
    # Did an earlier attempt already land?
    existing = client.find_by_reference(key)
    if existing:
        return existing
    return client.create(reference=key, **tx.model_dump())
~~~

Put a unique constraint on that reference field and even two attempts racing each other can't both win. The second one fails loudly instead of quietly creating a duplicate.

## Rule 2: never trust the shape of the model's output

Tool arguments come from a language model, so they can be wrong in creative ways: a missing field, a number as a string, an amount with five decimal places. Everything gets checked against a schema before it reaches a tool. In Python, Pydantic keeps this short:

~~~python
import logging
from decimal import Decimal

from pydantic import BaseModel, Field, ValidationError

log = logging.getLogger("agent")

class CreateTransaction(BaseModel):
    account_id: str = Field(min_length=1)
    amount: Decimal = Field(gt=0, max_digits=12, decimal_places=2)
    currency: str = Field(pattern=r"^[A-Z]{3}$")
    memo: str = Field(default="", max_length=140)

def parse_args(raw: dict) -> CreateTransaction | None:
    try:
        return CreateTransaction.model_validate(raw)
    except ValidationError as err:
        log.warning("bad tool arguments", extra={"errors": err.errors()})
        return None
~~~

Two details matter here. Money is a \`Decimal\`, never a float. And when validation fails, the agent gets *one* chance to fix it: I send the validation errors back to the model and ask again. If the second attempt is still wrong, the run stops and flags it. An agent that keeps guessing is how you get a creative transaction.

## Rule 3: a person approves anything you can't undo

I sort every tool into one of three buckets:

- **Read:** look things up. Runs freely.
- **Reversible write:** a draft, a note, a status you can change back. Runs, and gets logged.
- **Irreversible write:** money moves, something gets sent, something gets deleted. The agent *proposes* it, and a person approves it.

The approval is tied to the idempotency key, so approving the same action twice still runs it once. Frameworks make the pause itself easy now. LangGraph's \`interrupt\` stops the graph, saves its state and picks up from the same spot after someone says yes.

## Rule 4: make halfway runs resumable

If a run dies after step three of five, the worst thing you can do is start over from step one. Every step saves its result under its idempotency key. On restart, the agent walks the steps again, and any step that already finished just returns its saved result. Combined with Rule 1, re-running the whole thing becomes boring, and boring is the goal.

## Testing the bad day

Happy-path tests don't catch any of this. The tests that matter simulate the failures directly:

- **Lost response:** a fake tool that writes the record and *then* raises a timeout. Retry, and assert the record exists exactly once.
- **Broken arguments:** the model returns a string where a number should be, or leaves out a field. Assert nothing reaches the tool.
- **Crash halfway:** stop the run between two steps, start it again, and assert each side effect happened once.
- **Double call:** the model asks for the same tool with the same arguments twice in one run. Assert one write.

~~~python
def test_lost_response_does_not_double_write(fake_ledger):
    tx = CreateTransaction(
        account_id="acc-1", amount=Decimal("120.00"), currency="INR"
    )
    key = idempotency_key("run-1", "create_tx", tx.model_dump(mode="json"))
    # Creates the record, then raises TimeoutError.
    flaky = fake_ledger.writes_then_times_out()

    with pytest.raises(TimeoutError):
        create_transaction(flaky, key, tx)
    create_transaction(fake_ledger, key, tx)  # the retry

    assert fake_ledger.count(reference=key) == 1
~~~

## None of this is clever

It's bookkeeping. Keys, schemas, a pause button and a few unpleasant tests. But it's the difference between an agent that demos well and an agent you'd let near real data. The model is the part I control least, so everything around it has to be the part I can trust.

If you want the other half of this, how I see what an agent actually did and what it cost, I wrote that up in [What did my agent just do, and what did it cost?](/notes/agent-observability-and-cost).`,
};

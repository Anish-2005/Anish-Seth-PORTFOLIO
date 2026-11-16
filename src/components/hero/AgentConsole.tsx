"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type StageKey = "plan" | "tool" | "model" | "check" | "human";

const STAGES: { key: StageKey; label: string; icon: IconName }[] = [
  { key: "plan", label: "Plan", icon: "spark" },
  { key: "tool", label: "Tools", icon: "plug" },
  { key: "model", label: "Model", icon: "cpu" },
  { key: "check", label: "Guard", icon: "shield" },
  { key: "human", label: "Approve", icon: "users" },
];

type Line = { stage: StageKey; op: string; arg?: string; result: string; tone?: "ok" | "warn" | "muted" };
type Scenario = { id: string; command: string; lines: Line[]; summary: string };

const SCENARIOS: Scenario[] = [
  {
    id: "reconcile",
    command: "agent run reconcile-invoices --env sandbox",
    lines: [
      { stage: "plan", op: "plan", arg: "3 steps · 2 tools", result: "ready", tone: "muted" },
      { stage: "tool", op: "mcp.nango.invoices", arg: "(acct=ACME)", result: "48 rows · 212ms" },
      { stage: "model", op: "bedrock.extract", arg: "(line_items)", result: "1.4k tok" },
      { stage: "check", op: "schema", arg: "InvoiceBatch@v2", result: "✓ valid", tone: "ok" },
      { stage: "check", op: "idempotency", arg: "key 9c1e…b4", result: "✓ unique", tone: "ok" },
      { stage: "human", op: "approval", arg: "ops-review", result: "✓ approved", tone: "ok" },
    ],
    summary: "posted · $0.0041 · 2.8s · 0 retries",
  },
  {
    id: "graphrag",
    command: "agent ask \"Which suppliers share a parent entity?\"",
    lines: [
      { stage: "plan", op: "plan", arg: "multi-hop · graph", result: "ready", tone: "muted" },
      { stage: "model", op: "cypher.generate", arg: "(schema-aware)", result: "1 query" },
      { stage: "check", op: "guard", arg: "read_only=true", result: "✓ no writes", tone: "ok" },
      { stage: "tool", op: "neo4j.query", arg: "MATCH (s)-[:OWNED_BY]->(p)", result: "18 rows" },
      { stage: "model", op: "compose.answer", arg: "(grounded)", result: "4 claims" },
      { stage: "check", op: "grounding", arg: "citations", result: "✓ 4/4 cited", tone: "ok" },
    ],
    summary: "answered · 1.9s · fully grounded",
  },
  {
    id: "scam",
    command: "agent triage telegram://inbox --lang auto",
    lines: [
      { stage: "tool", op: "telegram.ingest", arg: "(1 message)", result: "lang=hi" },
      { stage: "plan", op: "route", arg: "hindi → classifier", result: "ready", tone: "muted" },
      { stage: "model", op: "gemini.classify", arg: "(upi · otp · phishing)", result: "risk 0.92", tone: "warn" },
      { stage: "check", op: "explain", arg: "plain-language ≤ 280c", result: "✓ pass", tone: "ok" },
      { stage: "tool", op: "airtable.log", arg: "(trend report)", result: "✓ stored", tone: "ok" },
    ],
    summary: "flagged HIGH · user alerted · 1.2s",
  },
];

type State = { sc: number; step: number; resolved: boolean; done: boolean };
const INITIAL: State = { sc: 0, step: -1, resolved: false, done: false };

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function AgentConsole() {
  const reduce = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [state, setState] = useState<State>(INITIAL);
  const [visible, setVisible] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let inView = false;
    const sync = () => setVisible(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    const scenario = SCENARIOS[state.sc];
    let next: State;
    let delay: number;
    if (state.done) {
      next = { sc: (state.sc + 1) % SCENARIOS.length, step: -1, resolved: false, done: false };
      delay = 3400;
    } else if (state.step === -1) {
      next = { ...state, step: 0 };
      delay = 650;
    } else if (!state.resolved) {
      next = { ...state, resolved: true };
      delay = 480 + (state.step % 3) * 90;
    } else if (state.step < scenario.lines.length - 1) {
      next = { ...state, step: state.step + 1, resolved: false };
      delay = 320;
    } else {
      next = { ...state, done: true };
      delay = 260;
    }
    const t = window.setTimeout(() => setState(next), delay);
    return () => window.clearTimeout(t);
  }, [state, visible, reduce]);

  const view: State = reduce ? { sc: 0, step: SCENARIOS[0].lines.length - 1, resolved: true, done: true } : state;
  const scenario = SCENARIOS[view.sc];
  const shown = view.step >= 0 ? scenario.lines.slice(0, view.step + 1) : [];
  const current = !view.done && view.step >= 0 ? scenario.lines[view.step] : null;

  const completed = new Set<StageKey>();
  shown.forEach((l, i) => {
    if (i < view.step || view.resolved) completed.add(l.stage);
  });
  const activeStage = current && !view.resolved ? current.stage : null;
  const used = new Set(scenario.lines.map((l) => l.stage));

  return (
    <div
      ref={hostRef}
      className="card overflow-hidden rounded-2xl border-line-strong bg-bg-elev/85 shadow-[var(--shadow-pop)] backdrop-blur"
      role="img"
      aria-label="Animated demo of an AI agent run: planning, calling tools through MCP, invoking a model on AWS Bedrock, validating output with guardrails and waiting for human approval."
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="font-mono text-[11px] text-subtle">agent-trace</span>
        <span className="rounded border border-line px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-subtle">
          demo
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-subtle">
          <span className={cn("size-1.5 rounded-full", view.done ? "bg-ok" : "pulse-dot bg-accent text-accent")} />
          {view.done ? "complete" : "running"}
        </span>
      </div>

      {/* Pipeline graph */}
      <div className="border-b border-line bg-bg/40 px-4 py-5 sm:px-5" aria-hidden>
        <div className="flex items-center">
          {STAGES.map((s, i) => {
            const isActive = activeStage === s.key;
            const isDone = completed.has(s.key) && !isActive;
            const isUnused = !used.has(s.key);
            const nextLit = i < STAGES.length - 1 && (completed.has(STAGES[i + 1].key) || activeStage === STAGES[i + 1].key);
            return (
              <div key={s.key} className={cn("flex min-w-0 items-center", i < STAGES.length - 1 && "flex-1")}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "relative grid size-9 place-items-center rounded-xl border transition-all duration-500 sm:size-10",
                      isActive && "border-accent bg-accent-soft text-accent-ink shadow-[0_0_24px_-4px_var(--accent)]",
                      isDone && "border-line-strong bg-bg-elev-2 text-fg",
                      !isActive && !isDone && "border-line text-subtle",
                      isUnused && "opacity-40",
                    )}
                  >
                    <Icon name={s.icon} size={16} />
                    {isDone ? (
                      <span className="absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-ok text-[8px] font-bold text-bg">
                        ✓
                      </span>
                    ) : null}
                  </div>
                  <span className={cn("font-mono text-[9px] uppercase tracking-wider sm:text-[10px]", isActive ? "text-accent-ink" : "text-subtle")}>
                    {s.label}
                  </span>
                </div>
                {i < STAGES.length - 1 ? (
                  <div className="relative mx-1.5 mb-5 h-[2px] min-w-2 flex-1 overflow-hidden rounded-full bg-line-strong">
                    <div className={cn("edge-flow-x absolute inset-0 transition-opacity duration-500", nextLit ? "opacity-100" : "opacity-0")} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trace log */}
      <div className="h-[252px] px-4 py-4 font-mono text-[11.5px] leading-relaxed sm:h-[244px] sm:px-5 sm:text-[12px]" key={scenario.id}>
        <p className="truncate text-subtle">
          <span className="text-accent-ink">❯</span> {scenario.command}
        </p>
        <ul className="mt-3 space-y-1.5">
          {shown.map((l, i) => {
            const pending = i === view.step && !view.resolved && !view.done;
            return (
              <li key={`${scenario.id}-${i}`} className="trace-row flex items-baseline gap-2.5">
                <span className="w-[42px] shrink-0 text-[10px] uppercase tracking-wider text-subtle">{l.stage}</span>
                <span className="min-w-0 truncate">
                  <span className="text-fg">{l.op}</span> <span className="text-subtle">{l.arg}</span>
                </span>
                <span
                  className={cn(
                    "ml-auto shrink-0 pl-2 tabular-nums",
                    pending && "text-subtle",
                    !pending && l.tone === "ok" && "text-ok",
                    !pending && l.tone === "warn" && "text-warn",
                    !pending && (!l.tone || l.tone === "muted") && "text-muted",
                  )}
                >
                  {pending ? "…" : l.result}
                </span>
              </li>
            );
          })}
        </ul>
        {view.done ? (
          <p className="trace-row mt-3 flex items-center gap-2 border-t border-dashed border-line pt-3 text-muted">
            <span className="text-ok">●</span>
            <span className="truncate">{scenario.summary}</span>
          </p>
        ) : (
          <span className="caret mt-2" aria-hidden />
        )}
      </div>
    </div>
  );
}

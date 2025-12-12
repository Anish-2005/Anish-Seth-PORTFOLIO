"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

import skillsJson from "@/data/skills.json";
import type { SkillsData, SkillsMode } from "@/components/visuals/skills.types";
import { cn } from "@/lib/utils";

type Node =
  | {
      kind: "cluster";
      id: string;
      name: string;
      weight: number;
      angle: number;
      r: number;
      examples: string[];
    }
  | {
      kind: "skill";
      id: string;
      name: string;
      weight: number;
      angle: number;
      r: number;
      examples: string[];
      cluster: string;
    };

const data = skillsJson as SkillsData;

function polar(angle: number, r: number) {
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function SkillsRadial({
  mode,
  onHighlightProjects,
}: {
  mode: SkillsMode;
  onHighlightProjects: (ids: string[] | null) => void;
}) {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);

  const nodes = useMemo(() => {
    const total = d3.sum(data.clusters, (c) => c.weight);
    const angleScale = d3
      .scaleLinear()
      .domain([0, total])
      .range([-Math.PI * 0.95, Math.PI * 0.95]);

    let acc = 0;
    const out: Node[] = [];

    for (const cluster of data.clusters) {
      const start = angleScale(acc);
      acc += cluster.weight;
      const end = angleScale(acc);
      const mid = (start + end) / 2;

      const clusterExamples = uniq(
        cluster.skills.flatMap((s) => s.examples ?? [])
      );

      out.push({
        kind: "cluster",
        id: `cluster:${cluster.name}`,
        name: cluster.name,
        weight: cluster.weight,
        angle: mid,
        r: 82,
        examples: clusterExamples,
      });

      const skillsTotal = d3.sum(cluster.skills, (s) => s.weight);
      let sAcc = 0;
      for (const skill of cluster.skills) {
        const sStart = d3.interpolateNumber(start, end)(sAcc / skillsTotal);
        sAcc += skill.weight;
        const sEnd = d3.interpolateNumber(start, end)(sAcc / skillsTotal);
        const sMid = (sStart + sEnd) / 2;
        out.push({
          kind: "skill",
          id: `skill:${cluster.name}:${skill.name}`,
          name: skill.name,
          cluster: cluster.name,
          weight: skill.weight,
          angle: sMid,
          r: 140,
          examples: skill.examples ?? [],
        });
      }
    }

    return out;
  }, []);

  const orderedIds = useMemo(() => {
    const skills = nodes.filter(
      (n): n is Extract<Node, { kind: "skill" }> => n.kind === "skill"
    );
    const clusters = nodes.filter(
      (n): n is Extract<Node, { kind: "cluster" }> => n.kind === "cluster"
    );
    return [...skills, ...clusters].map((n) => n.id);
  }, [nodes]);

  function getNodeById(id: string | null) {
    if (!id) return null;
    return nodes.find((n) => n.id === id) ?? null;
  }

  const active = getNodeById(focusedId ?? selectedId);

  useEffect(() => {
    if (!active) {
      onHighlightProjects(null);
      return;
    }
    onHighlightProjects(active.examples.length ? active.examples : null);
  }, [active, onHighlightProjects]);

  function focusByDelta(delta: number) {
    const current = focusedId ?? selectedId ?? orderedIds[0] ?? null;
    if (!current) return;
    const idx = orderedIds.indexOf(current);
    const next = orderedIds[(idx + delta + orderedIds.length) % orderedIds.length];
    if (!next) return;
    setFocusedId(next);
    const el = nodeRefs.current[orderedIds.indexOf(next)] ?? null;
    el?.focus();
  }

  const size = 420;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-[color:var(--text-0)]">
          {mode === "distribution"
            ? "Skill distribution"
            : mode === "mapping"
              ? "Skills → projects mapping"
              : "Impact (v0 stub)"}
        </p>
        <button
          onClick={() => setShowTable((v) => !v)}
          className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-0)] px-3 py-2 text-sm text-[color:var(--text-0)] hover:bg-[color:var(--surface-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          {showTable ? "Hide data table" : "Show data table"}
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div>
          <svg
            width="100%"
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-label="Interactive skills visualization"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                focusByDelta(1);
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                focusByDelta(-1);
              }
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const id = focusedId ?? null;
                if (!id) return;
                setSelectedId((cur) => (cur === id ? null : id));
              }
              if (e.key === "Escape") {
                setSelectedId(null);
              }
            }}
          >
            <rect
              x="0"
              y="0"
              width={size}
              height={size}
              rx="18"
              fill="transparent"
            />

            <g transform={`translate(${cx} ${cy})`}>
              <circle
                r="52"
                fill="transparent"
                stroke="var(--border)"
                strokeOpacity={0.7}
              />
              <circle
                r="110"
                fill="transparent"
                stroke="var(--border)"
                strokeOpacity={0.5}
              />
              <circle
                r="168"
                fill="transparent"
                stroke="var(--border)"
                strokeOpacity={0.35}
              />

              {nodes.map((n) => {
                const p = polar(n.angle, n.r);
                const isActive = active?.id === n.id;
                const isSelected = selectedId === n.id;
                const dot = n.kind === "cluster" ? 6 : 5;
                const wScale = d3.scaleLinear().domain([3, 12]).range([0.9, 1.6]);
                const scale = wScale(Math.max(3, Math.min(12, n.weight)));

                return (
                  <g
                    key={n.id}
                    ref={(el) => {
                      const idx = orderedIds.indexOf(n.id);
                      if (idx >= 0) nodeRefs.current[idx] = el;
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      n.kind === "cluster"
                        ? `${n.name} cluster`
                        : `${n.name}, ${n.cluster}`
                    }
                    onFocus={() => setFocusedId(n.id)}
                    onBlur={() => setFocusedId(null)}
                    onMouseEnter={() => setFocusedId(n.id)}
                    onMouseLeave={() => setFocusedId(null)}
                    onClick={() =>
                      setSelectedId((cur) => (cur === n.id ? null : n.id))
                    }
                    className="cursor-pointer"
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={dot * scale}
                      fill={
                        isSelected
                          ? "var(--accent)"
                          : n.kind === "cluster"
                            ? "rgba(148,163,184,0.85)"
                            : "rgba(226,232,240,0.85)"
                      }
                      opacity={
                        mode === "distribution"
                          ? 0.95
                          : mode === "mapping"
                            ? n.examples.length
                              ? 0.95
                              : 0.4
                            : 0.9
                      }
                    />

                    {isActive ? (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={dot * scale + 7}
                        fill="transparent"
                        stroke="var(--accent)"
                        strokeOpacity={0.75}
                      />
                    ) : null}

                    <text
                      x={p.x + 10}
                      y={p.y + 4}
                      fontSize={n.kind === "cluster" ? 12 : 11}
                      fill={
                        n.kind === "cluster"
                          ? "rgba(226,232,240,0.78)"
                          : "rgba(226,232,240,0.66)"
                      }
                    >
                      {n.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <p className="mt-3 text-xs text-[color:var(--text-2)]">
            Controls: Arrow keys move focus, Enter toggles selection, Esc clears.
          </p>
        </div>

        <aside className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-0)] p-4">
          <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--text-2)]">
            ACTIVE
          </p>
          <p className="mt-2 text-sm font-semibold text-[color:var(--text-0)]">
            {active ? active.name : "—"}
          </p>
          <p className="mt-2 text-sm text-[color:var(--text-1)]">
            {active
              ? active.examples.length
                ? `Related projects: ${active.examples.join(", ")}`
                : "No mapped projects in v0 data."
              : "Hover or focus a node."}
          </p>

          {mode === "impact" ? (
            <div className="mt-5">
              <p className="text-xs text-[color:var(--text-2)]">
                Impact metrics are a v1 expansion.
              </p>
              <div className="mt-3 grid gap-2">
                {["Perf budget", "Accessibility", "DX"].map((k, i) => (
                  <div key={k} className="grid gap-1">
                    <div className="flex items-center justify-between text-xs text-[color:var(--text-2)]">
                      <span>{k}</span>
                      <span>{80 + i * 5}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[color:var(--surface-2)]">
                      <div
                        className="h-2 rounded-full bg-[color:var(--accent)]"
                        style={{ width: `${80 + i * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      {showTable ? (
        <div className="mt-6 overflow-x-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-0)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[color:var(--border)] text-xs tracking-[0.12em] text-[color:var(--text-2)]">
              <tr>
                <th className="px-4 py-3">Cluster</th>
                <th className="px-4 py-3">Skill</th>
                <th className="px-4 py-3">Weight</th>
                <th className="px-4 py-3">Example projects</th>
              </tr>
            </thead>
            <tbody>
              {data.clusters.flatMap((c) =>
                c.skills.map((s) => (
                  <tr
                    key={`${c.name}-${s.name}`}
                    className="border-b border-[color:var(--border)] last:border-0"
                  >
                    <td className="px-4 py-3 text-[color:var(--text-1)]">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-[color:var(--text-0)]">
                      {s.name}
                    </td>
                    <td className="px-4 py-3 text-[color:var(--text-1)]">
                      {s.weight}
                    </td>
                    <td className="px-4 py-3 text-[color:var(--text-1)]">
                      {s.examples?.length ? s.examples.join(", ") : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      <p className={cn("mt-4 text-xs text-[color:var(--text-2)]")}>
        Accessibility: SVG has focusable nodes + a full data table.
      </p>
    </div>
  );
}

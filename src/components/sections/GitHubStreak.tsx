"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionResponse = {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
};

function toISODateUtc(date: Date) {
  return date.toISOString().slice(0, 10);
}

function parseISODateUtc(dateString: string) {
  return new Date(`${dateString}T00:00:00.000Z`);
}

export function GitHubStreak() {
  const { theme } = useTheme();
  const { isMobile } = useMobileOptimization();
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<string>("last-365");

  useEffect(() => {
    let active = true;

    const loadContributions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://github-contributions-api.jogruber.de/v4/Anish-2005", {
          cache: "no-store"
        });
        if (!response.ok) {
          throw new Error(`Failed to load contributions (${response.status})`);
        }

        const data = (await response.json()) as ContributionResponse;
        if (!active) {
          return;
        }

        const normalized = Array.isArray(data.contributions) ? data.contributions : [];
        setContributions(normalized);
      } catch (err) {
        if (!active) {
          return;
        }
        const message = err instanceof Error ? err.message : "Unable to load contribution data";
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadContributions();

    return () => {
      active = false;
    };
  }, []);

  const sortedDays = useMemo(() => {
    return [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  }, [contributions]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    for (const day of sortedDays) {
      years.add(parseISODateUtc(day.date).getUTCFullYear());
    }
    return Array.from(years).sort((a, b) => b - a);
  }, [sortedDays]);

  const filteredDays = useMemo(() => {
    if (sortedDays.length === 0) {
      return [] as ContributionDay[];
    }

    const byDate = new Map(sortedDays.map((entry) => [entry.date, entry]));
    const days: ContributionDay[] = [];
    const today = new Date();
    const endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    let startDate: Date;
    let rangeEndDate: Date;

    if (selectedRange === "last-365") {
      startDate = new Date(endDate);
      startDate.setUTCDate(startDate.getUTCDate() - 364);
      rangeEndDate = endDate;
    } else {
      const year = Number(selectedRange);
      if (Number.isNaN(year)) {
        return [] as ContributionDay[];
      }
      startDate = new Date(Date.UTC(year, 0, 1));
      const yearEnd = new Date(Date.UTC(year, 11, 31));
      rangeEndDate = year === endDate.getUTCFullYear() ? endDate : yearEnd;
    }

    const cursor = new Date(startDate);
    while (cursor <= rangeEndDate) {
      const key = toISODateUtc(cursor);
      days.push(byDate.get(key) ?? { date: key, count: 0, level: 0 });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return days;
  }, [selectedRange, sortedDays]);

  const totalForRange = useMemo(() => {
    return filteredDays.reduce((total, day) => total + day.count, 0);
  }, [filteredDays]);

  const gridData = useMemo(() => {
    if (filteredDays.length === 0) {
      return { weeks: [] as ContributionDay[][], monthLabels: [] as Array<{ index: number; label: string }> };
    }

    const byDate = new Map(filteredDays.map((entry) => [entry.date, entry]));
    const firstDate = parseISODateUtc(filteredDays[0].date);
    const lastDate = parseISODateUtc(filteredDays[filteredDays.length - 1].date);

    const start = new Date(firstDate);
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());

    const end = new Date(lastDate);
    end.setUTCDate(end.getUTCDate() + (6 - end.getUTCDay()));

    const weeks: ContributionDay[][] = [];
    const monthLabels: Array<{ index: number; label: string }> = [];

    let cursor = new Date(start);
    let weekIndex = 0;
    let previousMonth: number | null = null;

    while (cursor <= end) {
      const week: ContributionDay[] = [];

      for (let i = 0; i < 7; i++) {
        const key = toISODateUtc(cursor);
        week.push(byDate.get(key) ?? { date: key, count: 0, level: 0 });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }

      const month = parseISODateUtc(week[0].date).getUTCMonth();
      if (month !== previousMonth) {
        monthLabels.push({
          index: weekIndex,
          label: parseISODateUtc(week[0].date).toLocaleString("en-US", { month: "short", timeZone: "UTC" })
        });
        previousMonth = month;
      }

      weeks.push(week);
      weekIndex += 1;
    }

    return { weeks, monthLabels };
  }, [filteredDays]);

  const heatmapPalette = useMemo(() => {
    if (theme === "light") {
      return {
        levelColors: ["#fdf2f2", "#fecdd3", "#fda4af", "#fb7185", "#e11d48"],
        cellBorder: "rgba(190, 24, 93, 0.18)",
        gridBorder: "rgba(211, 51, 51, 0.2)",
        gridBg: "rgba(255, 255, 255, 0.85)",
        panelBorder: "rgba(211, 51, 51, 0.24)",
        panelBg: "rgba(255, 247, 247, 0.88)",
        panelShadow: "0 0 32px rgba(211, 51, 51, 0.16)",
        controlBg: "rgba(255, 255, 255, 0.92)",
        controlBorder: "rgba(190, 24, 93, 0.28)",
        controlText: "#3f1d1d",
        controlFocus: "rgba(225, 29, 72, 0.35)",
        buttonBg: "rgba(255, 237, 240, 0.95)",
        buttonHoverBg: "rgba(254, 205, 211, 0.95)",
        buttonBorder: "rgba(190, 24, 93, 0.32)",
        buttonText: "#9f1239"
      };
    }

    return {
      levelColors: ["#140a10", "#3f1220", "#7f1d3a", "#be185d", "#fb7185"],
      cellBorder: "rgba(251, 113, 133, 0.22)",
      gridBorder: "rgba(248, 113, 113, 0.2)",
      gridBg: "rgba(15, 6, 11, 0.82)",
      panelBorder: "rgba(248, 113, 113, 0.24)",
      panelBg: "rgba(22, 8, 14, 0.82)",
      panelShadow: "0 0 34px rgba(248, 113, 113, 0.2)",
      controlBg: "rgba(33, 11, 22, 0.9)",
      controlBorder: "rgba(251, 113, 133, 0.35)",
      controlText: "#ffe4e6",
      controlFocus: "rgba(251, 113, 133, 0.42)",
      buttonBg: "rgba(63, 18, 32, 0.78)",
      buttonHoverBg: "rgba(127, 29, 58, 0.72)",
      buttonBorder: "rgba(251, 113, 133, 0.36)",
      buttonText: "#fecdd3"
    };
  }, [theme]);

  const headerPalette = useMemo(() => {
    if (theme === "light") {
      return {
        text: "#2c1810",
        textSub: "#6b4a3a",
        highlight: "#d73333",
        border: "rgba(211, 51, 51, 0.15)",
        glow: "rgba(211, 51, 51, 0.35)"
      };
    }

    return {
      text: "#fef2f2",
      textSub: "#fca5a5",
      highlight: "#fb7185",
      border: "rgba(248, 113, 113, 0.12)",
      glow: "rgba(248, 113, 113, 0.35)"
    };
  }, [theme]);

  return (
    <section id="streak" className="relative border-t border-[color:var(--border)] py-16 sm:py-20 md:py-24 lg:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <div className="relative">
            {!isMobile && (
              <motion.div
                className="pointer-events-none absolute -right-20 -top-10 h-40 w-40 rounded-full blur-3xl"
                style={{ background: headerPalette.glow }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-4">
                <motion.div
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(to right, transparent, ${headerPalette.border}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <span
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]"
                  style={{ color: headerPalette.highlight }}
                >
                  GitHub Momentum
                </span>
                <motion.div
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(to left, transparent, ${headerPalette.border}, transparent)` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>

              <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                <span style={{ color: headerPalette.text }}>GitHub </span>
                <span
                  className="relative inline-block"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${headerPalette.highlight}, ${headerPalette.textSub})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Contributions
                  <motion.span
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-0.5 sm:h-1 rounded-full"
                    style={{ background: headerPalette.highlight }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h2>

              <motion.p
                className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed sm:mt-5 sm:text-base"
                style={{ color: headerPalette.textSub }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Daily GitHub contribution heatmap with year-long activity totals.
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 overflow-hidden rounded-2xl border p-3 sm:mt-10 sm:rounded-3xl sm:p-5"
            style={{
              borderColor: heatmapPalette.panelBorder,
              background: heatmapPalette.panelBg,
              boxShadow: heatmapPalette.panelShadow
            }}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
              <p className="text-xs text-[color:var(--text-2)] sm:text-sm">Contribution range</p>
              <label className="inline-flex items-center gap-2 text-xs text-[color:var(--text-2)] sm:text-sm">
                <span className="sr-only">Select contribution year range</span>
                <select
                  value={selectedRange}
                  onChange={(event) => setSelectedRange(event.target.value)}
                  className="rounded-md border px-2.5 py-1.5 text-xs font-medium outline-none transition focus:ring-2 sm:text-sm"
                  style={{
                    borderColor: heatmapPalette.controlBorder,
                    background: heatmapPalette.controlBg,
                    color: heatmapPalette.controlText,
                    boxShadow: `0 0 0 0 ${heatmapPalette.controlFocus}`
                  }}
                >
                  <option value="last-365">Last 365 days</option>
                  {availableYears.map((year) => (
                    <option key={year} value={String(year)}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {loading ? (
              <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-[color:var(--text-1)]">Loading contribution graph...</p>
              </div>
            ) : error || gridData.weeks.length === 0 ? (
              <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4 sm:rounded-2xl sm:p-5">
                <p className="text-sm text-[color:var(--text-1)]">Unable to load live graph right now.</p>
                <a
                  href="https://github.com/Anish-2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition"
                  style={{
                    borderColor: heatmapPalette.buttonBorder,
                    background: heatmapPalette.buttonBg,
                    color: heatmapPalette.buttonText
                  }}
                >
                  View contributions on GitHub
                </a>
              </div>
            ) : (
              <div
                className="overflow-x-auto rounded-xl border p-3 sm:rounded-2xl sm:p-4"
                style={{
                  borderColor: heatmapPalette.gridBorder,
                  background: heatmapPalette.gridBg
                }}
              >
                <div className="w-full min-w-[780px]">
                  <div className="relative mb-3 h-5 pl-8 text-[11px] text-[color:var(--text-2)] sm:text-xs">
                    {gridData.monthLabels.map((month) => (
                      <span
                        key={`${month.label}-${month.index}`}
                        className="absolute"
                        style={{
                          left: `${Math.max(0, (month.index / Math.max(gridData.weeks.length, 1)) * 100)}%`
                        }}
                      >
                        {month.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex w-6 flex-col justify-between py-[2px] text-[10px] text-[color:var(--text-2)] sm:text-xs">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>

                    <div
                      className="grid flex-1 gap-[3px]"
                      style={{
                        gridTemplateColumns: `repeat(${Math.max(gridData.weeks.length, 1)}, minmax(0, 1fr))`
                      }}
                    >
                      {gridData.weeks.map((week, weekIndex) => (
                        <div key={`week-${weekIndex}`} className="flex flex-col gap-[3px]">
                          {week.map((day) => (
                            <div
                              key={day.date}
                              title={`${day.count} contributions on ${day.date}`}
                              className="aspect-square w-full rounded-[2px]"
                              style={{
                                backgroundColor: heatmapPalette.levelColors[Math.min(Math.max(day.level, 0), 4)],
                                border: `1px solid ${heatmapPalette.cellBorder}`
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-5">
              <p className="text-xs text-[color:var(--text-2)] sm:text-sm">
                {totalForRange > 0
                  ? selectedRange === "last-365"
                    ? `${totalForRange.toLocaleString()} contributions in the last 365 days`
                    : `${totalForRange.toLocaleString()} contributions in ${selectedRange}`
                  : "Live data powered by GitHub contributions"}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-[color:var(--text-2)] sm:text-xs">
                <span>Less</span>
                {heatmapPalette.levelColors.map((color, index) => (
                  <span
                    key={`legend-${index}`}
                    className="h-2.5 w-2.5 rounded-[2px]"
                    style={{
                      backgroundColor: color,
                      border: `1px solid ${heatmapPalette.cellBorder}`
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="https://github.com/Anish-2005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition sm:text-sm"
                style={{
                  borderColor: heatmapPalette.buttonBorder,
                  background: heatmapPalette.buttonBg,
                  color: heatmapPalette.buttonText
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = heatmapPalette.buttonHoverBg;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = heatmapPalette.buttonBg;
                }}
              >
                View GitHub Profile
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

import { Section } from "@/components/ui/Section";
import { profile } from "@/data/portfolio";
import type { ContributionDay, GitHubStats } from "@/lib/github";

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30;
const TOP = 18;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function utc(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function days(n: number) {
  return `${n} day${n === 1 ? "" : "s"}`;
}

function fmtDate(date: string) {
  return utc(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function Heatmap({ days }: { days: ContributionDay[] }) {
  const offset = days.length ? utc(days[0].date).getUTCDay() : 0;
  const weeks = Math.ceil((days.length + offset) / 7);
  const width = LEFT + weeks * STEP;
  const height = TOP + 7 * STEP;

  const monthLabels: { x: number; label: string }[] = [];
  let lastCol = -10;
  days.forEach((d, i) => {
    const date = utc(d.date);
    if (date.getUTCDate() <= 7 && date.getUTCDay() === 0) {
      const col = Math.floor((i + offset) / 7);
      if (col - lastCol >= 3) {
        monthLabels.push({ x: LEFT + col * STEP, label: MONTHS[date.getUTCMonth()] });
        lastCol = col;
      }
    }
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Daily GitHub contributions over the last twelve months">
      {monthLabels.map((m) => (
        <text key={`${m.label}-${m.x}`} x={m.x} y={10} fontSize="9.5" fill="var(--fg-subtle)" fontFamily="var(--font-mono)">
          {m.label}
        </text>
      ))}
      {[
        [1, "Mon"],
        [3, "Wed"],
        [5, "Fri"],
      ].map(([row, label]) => (
        <text key={label} x={0} y={TOP + (row as number) * STEP + 9} fontSize="9" fill="var(--fg-subtle)" fontFamily="var(--font-mono)">
          {label}
        </text>
      ))}
      {days.map((d, i) => {
        const idx = i + offset;
        const col = Math.floor(idx / 7);
        const row = idx % 7;
        return (
          <rect
            key={d.date}
            x={LEFT + col * STEP}
            y={TOP + row * STEP}
            width={CELL}
            height={CELL}
            rx={1.5}
            fill={`var(--heat-${d.level})`}
          >
            <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} · ${fmtDate(d.date)}`}</title>
          </rect>
        );
      })}
    </svg>
  );
}

export function OpenSource({ stats }: { stats: GitHubStats }) {
  const years = Object.entries(stats.contributionsByYear)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year.localeCompare(b.year));
  const maxYear = Math.max(1, ...years.map((y) => y.count));
  const topLangs = stats.languages.slice(0, 6);
  const maxLang = Math.max(1, ...topLangs.map((l) => l.count));

  const tiles = [
    { label: "Longest streak", value: stats.longestStreak ? days(stats.longestStreak) : "—" },
    { label: "Current streak", value: stats.currentStreak ? days(stats.currentStreak) : "—" },
    { label: "Best day", value: stats.bestDay ? `${stats.bestDay.count}` : "—", hint: stats.bestDay ? fmtDate(stats.bestDay.date) : undefined },
    { label: "Public repositories", value: String(stats.publicRepos) },
  ];

  return (
    <Section
      id="open-source"
      index="05"
      label="Open source"
      note={
        <>
          Pulled from GitHub at build time, refreshed twice a day.{" "}
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-u text-fg">
            @Anish-2005 ↗
          </a>
        </>
      }
      title={
        <>
          Built in public<span className="text-subtle"> — the cadence behind the work.</span>
        </>
      }
    >
      <div data-reveal>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
          <p>
            <span className="block text-[clamp(3rem,7vw,5.6rem)] font-medium leading-[0.9] tracking-[-0.05em] tabular-nums [font-stretch:112%]">
              {stats.contributionsLastYear.toLocaleString("en-US")}
            </span>
            <span className="label mt-3 block">Contributions in the last 12 months</span>
          </p>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-subtle" aria-hidden>
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className="size-[10px]" style={{ background: `var(--heat-${l})` }} />
            ))}
            More
          </div>
        </div>

        {stats.days.length ? (
          <div className="mt-8 overflow-x-auto [direction:rtl] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="min-w-[640px] [direction:ltr]">
              <Heatmap days={stats.days} />
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm text-subtle">Daily activity is temporarily unavailable — totals are from the latest snapshot.</p>
        )}

        <dl className="mt-10 grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
          {tiles.map((t, i) => (
            <div
              key={t.label}
              className={`flex flex-col-reverse justify-end bg-bg py-5 pr-4 ${i % 2 === 1 ? "pl-5" : ""} ${i === 2 ? "md:pl-5" : ""}`}
            >
              <dt className="label mt-2">
                {t.label}
                {t.hint ? <span className="mt-0.5 block normal-case tracking-normal">{t.hint}</span> : null}
              </dt>
              <dd className="text-[1.6rem] font-medium tracking-[-0.03em] tabular-nums [font-stretch:110%]">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-16 grid gap-px border-y border-line bg-line md:grid-cols-2">
        {/* Contributions by year */}
        <figure className="bg-bg py-8 md:pr-8" data-reveal>
          <figcaption>
            <p className="text-[1.02rem] font-semibold tracking-[-0.01em] [font-stretch:108%]">Contributions by year</p>
            <p className="mt-1 text-[0.86rem] text-subtle">Total public contributions per calendar year.</p>
          </figcaption>
          <div className="mt-8 flex h-44 items-end gap-3 sm:gap-6">
            {years.map((y) => (
              <div key={y.year} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="font-mono text-[11px] tabular-nums text-muted">{y.count.toLocaleString("en-US")}</span>
                <div
                  className="w-full max-w-12 rounded-t-[3px] bg-accent"
                  style={{ height: `${Math.max(2, (y.count / maxYear) * 100)}%`, opacity: y.year === years.at(-1)?.year ? 1 : 0.5 }}
                  role="img"
                  aria-label={`${y.year}: ${y.count} contributions`}
                />
                <span className="font-mono text-[11px] text-subtle">{y.year}</span>
              </div>
            ))}
          </div>
        </figure>

        {/* Languages */}
        <figure className="bg-bg py-8 md:pl-8" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <figcaption>
            <p className="text-[1.02rem] font-semibold tracking-[-0.01em] [font-stretch:108%]">Primary languages</p>
            <p className="mt-1 text-[0.86rem] text-subtle">Number of public repositories by their main language.</p>
          </figcaption>
          <ul className="mt-7 space-y-4">
            {topLangs.map((l) => (
              <li key={l.name} className="grid grid-cols-[92px_1fr_28px] items-center gap-3 text-[0.86rem]">
                <span className="truncate">{l.name}</span>
                <span className="h-[3px] bg-line">
                  <span className="block h-full bg-accent" style={{ width: `${(l.count / maxLang) * 100}%` }} />
                </span>
                <span className="text-right font-mono text-[11px] tabular-nums text-muted">{l.count}</span>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </Section>
  );
}

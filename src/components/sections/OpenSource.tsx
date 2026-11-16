import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
            rx={2.5}
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
  const totalLangRepos = stats.languages.reduce((s, l) => s + l.count, 0);

  const tiles = [
    { label: "Longest streak", value: stats.longestStreak ? `${stats.longestStreak} days` : "—" },
    { label: "Current streak", value: stats.currentStreak ? `${stats.currentStreak} days` : "—" },
    { label: "Best day", value: stats.bestDay ? `${stats.bestDay.count}` : "—", hint: stats.bestDay ? fmtDate(stats.bestDay.date) : undefined },
    { label: "Public repositories", value: String(stats.publicRepos) },
  ];

  return (
    <section id="open-source" aria-labelledby="oss-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="oss-title"
          index="05"
          label="Open source"
          title={
            <>
              Built in <span className="serif-em">public.</span>
            </>
          }
          lede="Pulled from GitHub at build time and refreshed twice a day — the cadence behind the work above."
          aside={
            <ButtonLink href={profile.links.github} variant="secondary" size="sm">
              <Icon name="github" size={15} />
              @Anish-2005
              <Icon name="arrow-up-right" size={14} />
            </ButtonLink>
          }
        />

        <div className="card overflow-hidden p-0" data-reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-2 pt-6 sm:px-8 sm:pt-8">
            <div>
              <p className="text-[clamp(2.2rem,5vw,3.2rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                {stats.contributionsLastYear.toLocaleString("en-US")}
              </p>
              <p className="mt-2 text-[0.9rem] text-muted">contributions in the last 12 months</p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-subtle" aria-hidden>
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className="size-[11px] rounded-[3px]" style={{ background: `var(--heat-${l})` }} />
              ))}
              More
            </div>
          </div>

          {stats.days.length ? (
            <div className="overflow-x-auto px-6 pb-6 pt-4 [direction:rtl] sm:px-8">
              <div className="min-w-[640px] [direction:ltr]">
                <Heatmap days={stats.days} />
              </div>
            </div>
          ) : (
            <p className="px-6 pb-8 pt-4 text-sm text-subtle sm:px-8">Daily activity is temporarily unavailable — totals above are from the latest snapshot.</p>
          )}

          <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
            {tiles.map((t, i) => (
              <div
                key={t.label}
                className={`flex flex-col-reverse justify-end px-6 py-5 sm:px-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
              >
                <dt className="mt-1.5 text-[0.8rem] text-subtle">
                  {t.label}
                  {t.hint ? <span className="block font-mono text-[10.5px]">{t.hint}</span> : null}
                </dt>
                <dd className="text-[1.35rem] font-semibold tracking-tight tabular-nums">{t.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Contributions by year */}
          <figure className="card p-6 sm:p-8" data-reveal>
            <figcaption>
              <p className="text-[1.02rem] font-semibold tracking-tight">Contributions by year</p>
              <p className="mt-1 text-[0.86rem] text-muted">Total public contributions per calendar year.</p>
            </figcaption>
            <div className="mt-8 flex h-44 items-end gap-3 sm:gap-5" role="list">
              {years.map((y) => (
                <div key={y.year} role="listitem" className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="font-mono text-[11px] tabular-nums text-muted">{y.count.toLocaleString("en-US")}</span>
                  <div
                    className="w-full max-w-14 rounded-t-[4px] bg-accent transition-[height] duration-700"
                    style={{ height: `${Math.max(2, (y.count / maxYear) * 100)}%`, opacity: y.year === years.at(-1)?.year ? 1 : 0.55 }}
                    aria-label={`${y.year}: ${y.count} contributions`}
                  />
                  <span className="font-mono text-[11px] text-subtle">{y.year}</span>
                </div>
              ))}
            </div>
          </figure>

          {/* Languages */}
          <figure className="card p-6 sm:p-8" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            <figcaption>
              <p className="text-[1.02rem] font-semibold tracking-tight">Primary languages</p>
              <p className="mt-1 text-[0.86rem] text-muted">Repositories by main language, across {totalLangRepos} public repos.</p>
            </figcaption>
            <ul className="mt-7 space-y-4">
              {topLangs.map((l) => (
                <li key={l.name} className="grid grid-cols-[96px_1fr_32px] items-center gap-3 text-[0.86rem]">
                  <span className="truncate text-fg">{l.name}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-bg-elev-2">
                    <span className="block h-full rounded-full bg-accent" style={{ width: `${(l.count / maxLang) * 100}%` }} />
                  </span>
                  <span className="text-right font-mono text-[11px] tabular-nums text-muted">{l.count}</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </div>
    </section>
  );
}

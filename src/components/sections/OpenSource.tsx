import { LazyContributionRing } from "@/components/oss/LazyContributionRing";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/portfolio";
import type { ContributionDay, GitHubStats } from "@/lib/github";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const utc = (date: string) => new Date(`${date}T00:00:00Z`);
const fmtDate = (date: string) =>
  utc(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/**
 * Daily counts as a compact list (start date + counts + one digit per day for the level), with any
 * missing days filled in as zero, so the page carries ~1KB instead of 365 day objects.
 */
function compactDays(days: ContributionDay[]) {
  if (!days.length) return null;
  const byDate = new Map(days.map((d) => [d.date, d]));
  const t0 = Date.parse(`${days[0].date}T00:00:00Z`);
  const n = Math.round((Date.parse(`${days[days.length - 1].date}T00:00:00Z`) - t0) / 86_400_000) + 1;
  const counts: number[] = [];
  let levels = "";
  for (let i = 0; i < n; i++) {
    const d = byDate.get(new Date(t0 + i * 86_400_000).toISOString().slice(0, 10));
    counts.push(d?.count ?? 0);
    levels += String(d?.level ?? 0);
  }
  return { start: days[0].date, counts, levels };
}

/** Little, human facts pulled out of a year of commits. */
function funFacts(days: ContributionDay[]) {
  if (!days.length) return null;
  const byMonth = new Map<string, { label: string; count: number }>();
  const byWeekday = Array(7).fill(0) as number[];
  let daysOff = 0;
  for (const d of days) {
    const date = utc(d.date);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    const m = byMonth.get(key) ?? { label: MONTHS[date.getUTCMonth()], count: 0 };
    m.count += d.count;
    byMonth.set(key, m);
    byWeekday[date.getUTCDay()] += d.count;
    if (d.count === 0) daysOff++;
  }
  const busiest = [...byMonth.values()].sort((a, b) => b.count - a.count)[0];
  const favDay = WEEKDAYS[byWeekday.indexOf(Math.max(...byWeekday))];
  return { busiest, favDay, daysOff };
}

export function OpenSource({ stats }: { stats: GitHubStats }) {
  const facts = funFacts(stats.days);
  const ring = compactDays(stats.days);

  const rows = [
    facts ? { label: "Busiest month", value: facts.busiest.label, note: `${facts.busiest.count.toLocaleString("en-US")} contributions` } : null,
    facts ? { label: "Favourite day to ship", value: facts.favDay, note: "by total contributions" } : null,
    stats.longestStreak ? { label: "Longest streak", value: `${stats.longestStreak} days`, note: "in a row, no breaks" } : null,
    stats.bestDay ? { label: "Best single day", value: `${stats.bestDay.count}`, note: fmtDate(stats.bestDay.date) } : null,
    facts ? { label: "Days off", value: `${facts.daysOff}`, note: "everyone needs a break" } : null,
  ].filter(Boolean) as { label: string; value: string; note: string }[];

  return (
    <Section
      id="open-source"
      detail="hatch"
      index="05"
      label="Open source"
      note={
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-u text-fg">
          @Anish-2005 ↗
        </a>
      }
      title={<>I push code most days.</>}
    >
      <div className="grid items-center gap-12 border-t border-line pt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-10" data-reveal>
        {ring ? (
          <LazyContributionRing {...ring} total={stats.contributionsLastYear} />
        ) : (
          <div className="py-10 text-center">
            <p className="text-[clamp(3rem,7vw,5rem)] font-medium leading-none tracking-[-0.05em] tabular-nums [font-stretch:112%]">
              {stats.contributionsLastYear.toLocaleString("en-US")}
            </p>
            <p className="label mt-3">Contributions in the last 12 months</p>
            <p className="mt-4 text-sm text-subtle">GitHub didn&apos;t send the daily numbers this time, so this is the last saved total.</p>
          </div>
        )}

        <div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
            Every spoke is one day of the last year, starting at the top and going clockwise to today. Longer means
            busier. Hover or tap the ring to read any day.
          </p>
          {rows.length ? (
            <dl className="mt-8 grid grid-cols-2 border-t border-line md:block">
              {rows.map((r) => (
                <div
                  key={r.label}
                  className="flex flex-col gap-1.5 border-b border-line py-3.5 odd:pr-4 even:border-l even:pl-4 [&:last-child:nth-child(odd)]:col-span-2 md:flex-row md:items-baseline md:justify-between md:gap-4 md:odd:pr-0 md:even:border-l-0 md:even:pl-0"
                >
                  <dt className="label">{r.label}</dt>
                  <dd className="md:text-right">
                    <span className="block text-[1.05rem] font-medium tracking-[-0.01em] [font-stretch:108%]">{r.value}</span>
                    <span className="block font-mono text-[0.7rem] text-subtle">{r.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

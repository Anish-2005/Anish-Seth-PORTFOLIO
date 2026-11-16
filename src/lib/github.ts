import { githubSnapshot } from "@/data/portfolio";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  totalStars: number;
  contributionsLastYear: number;
  contributionsByYear: Record<string, number>;
  languages: { name: string; count: number }[];
  days: ContributionDay[];
  longestStreak: number;
  currentStreak: number;
  bestDay: { date: string; count: number } | null;
  live: boolean;
};

const USER = githubSnapshot.username;
const REVALIDATE = 60 * 60 * 12; // 12h
const TIMEOUT_MS = 6000;

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "application/json", "User-Agent": "portfolio-site" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function streaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Current streak: count back from today; an empty "today" doesn't break it yet.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue;
    else break;
  }
  return { longest, current };
}

export async function getGitHubStats(): Promise<GitHubStats> {
  type User = { public_repos: number; followers: number };
  type Repo = { fork: boolean; language: string | null; stargazers_count: number };
  type Contrib = { total?: Record<string, number>; contributions?: ContributionDay[] };

  const [user, repos, lastYear, allYears] = await Promise.all([
    getJSON<User>(`https://api.github.com/users/${USER}`),
    getJSON<Repo[]>(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`),
    getJSON<Contrib>(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`),
    getJSON<Contrib>(`https://github-contributions-api.jogruber.de/v4/${USER}`),
  ]);

  let languages = githubSnapshot.languages;
  let totalStars = githubSnapshot.totalStars;
  if (Array.isArray(repos) && repos.length) {
    const own = repos.filter((r) => !r.fork);
    totalStars = own.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const counts = new Map<string, number>();
    own.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    languages = Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  }

  const days = Array.isArray(lastYear?.contributions) ? lastYear!.contributions! : [];
  const { longest, current } = streaks(days);
  const bestDay = days.reduce<{ date: string; count: number } | null>(
    (best, d) => (!best || d.count > best.count ? { date: d.date, count: d.count } : best),
    null,
  );

  return {
    publicRepos: user?.public_repos ?? githubSnapshot.publicRepos,
    followers: user?.followers ?? githubSnapshot.followers,
    totalStars,
    contributionsLastYear: lastYear?.total?.lastYear ?? githubSnapshot.contributionsLastYear,
    contributionsByYear: allYears?.total ?? githubSnapshot.contributionsByYear,
    languages,
    days,
    longestStreak: longest,
    currentStreak: current,
    bestDay,
    live: Boolean(user || lastYear),
  };
}

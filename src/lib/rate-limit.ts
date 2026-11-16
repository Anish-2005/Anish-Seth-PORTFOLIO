/**
 * Sliding-window rate limiter kept in memory. Per server instance, so it's best effort, but it
 * needs no extra infrastructure and is plenty to stop one visitor or bot flooding the inbox.
 */
export function createRateLimiter({ max, windowMs }: { max: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  /** Returns seconds to wait if `key` is over the limit; otherwise records the hit and returns 0. */
  return function check(key: string, now = Date.now()) {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) return Math.ceil((windowMs - (now - recent[0])) / 1000);
    recent.push(now);
    hits.set(key, recent);
    // Keep the map from growing forever on a long-lived instance.
    if (hits.size > 5000) for (const [k, times] of hits) if (now - times[times.length - 1] >= windowMs) hits.delete(k);
    return 0;
  };
}

import { describe, expect, it } from "vitest";

import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("allows up to max hits per window, then asks the caller to wait", () => {
    const check = createRateLimiter({ max: 4, windowMs: 60_000 });
    const t = 1_000_000;
    expect([0, 1, 2, 3].map((i) => check("ip", t + i))).toEqual([0, 0, 0, 0]);
    expect(check("ip", t + 10)).toBe(60);
  });

  it("frees up once the oldest hit leaves the window", () => {
    const check = createRateLimiter({ max: 2, windowMs: 10_000 });
    check("ip", 0);
    check("ip", 5_000);
    expect(check("ip", 9_000)).toBeGreaterThan(0);
    expect(check("ip", 10_001)).toBe(0);
  });

  it("tracks each key separately", () => {
    const check = createRateLimiter({ max: 1, windowMs: 10_000 });
    expect(check("a", 0)).toBe(0);
    expect(check("b", 0)).toBe(0);
    expect(check("a", 1)).toBeGreaterThan(0);
  });
});

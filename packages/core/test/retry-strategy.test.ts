import { describe, it, expect } from "vitest";
import { RetryStrategy, RetryConfig } from "../src/retry";

describe("RetryStrategy", () => {
  it("uses default config when none provided", () => {
    const strategy = new RetryStrategy();
    expect(strategy.maxRetries).toBe(3);
    expect(strategy.initialDelayMs).toBe(1000);
    expect(strategy.backoffMultiplier).toBe(2);
  });

  it("accepts custom config", () => {
    const strategy = new RetryStrategy({
      maxRetries: 5,
      initialDelayMs: 500,
      backoffMultiplier: 3,
    });
    expect(strategy.maxRetries).toBe(5);
    expect(strategy.initialDelayMs).toBe(500);
    expect(strategy.backoffMultiplier).toBe(3);
  });

  it("calculates delay with exponential backoff", () => {
    const strategy = new RetryStrategy({ initialDelayMs: 1000, backoffMultiplier: 2 });
    expect(strategy.getDelay(0)).toBe(1000);
    expect(strategy.getDelay(1)).toBe(2000);
    expect(strategy.getDelay(2)).toBe(4000);
  });

  it("respects Retry-After header over calculated delay", () => {
    const strategy = new RetryStrategy({ initialDelayMs: 1000 });
    expect(strategy.getDelay(0, 5)).toBe(5000);
  });

  it("reports whether retry is possible", () => {
    const strategy = new RetryStrategy({ maxRetries: 2 });
    expect(strategy.canRetry(0)).toBe(true);
    expect(strategy.canRetry(1)).toBe(true);
    expect(strategy.canRetry(2)).toBe(false);
  });
});

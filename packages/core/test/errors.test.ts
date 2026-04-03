import { describe, it, expect } from "vitest";
import { HaravanApiError, HaravanRateLimitError } from "../src/errors";

describe("HaravanApiError", () => {
  it("preserves status code and body", () => {
    const err = new HaravanApiError(404, "Not Found", '{"errors":"not found"}');
    expect(err.statusCode).toBe(404);
    expect(err.statusText).toBe("Not Found");
    expect(err.body).toBe('{"errors":"not found"}');
    expect(err.message).toContain("404");
    expect(err.name).toBe("HaravanApiError");
  });

  it("is an instance of Error", () => {
    const err = new HaravanApiError(500, "Server Error");
    expect(err).toBeInstanceOf(Error);
  });
});

describe("HaravanRateLimitError", () => {
  it("extends HaravanApiError with 429 status", () => {
    const err = new HaravanRateLimitError(5);
    expect(err.statusCode).toBe(429);
    expect(err.retryAfterSeconds).toBe(5);
    expect(err.name).toBe("HaravanRateLimitError");
    expect(err).toBeInstanceOf(HaravanApiError);
  });
});

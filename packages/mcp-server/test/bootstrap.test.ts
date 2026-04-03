import { describe, expect, test } from "vitest";

describe("openclaw-haravan-ops-mcp bootstrap", () => {
  test("exports the lean server identity and startup message", async () => {
    const mod = await import("../src/bootstrap").catch(() => null);

    expect(mod).not.toBeNull();
    expect(mod?.SERVER_INFO).toEqual({
      name: "openclaw-haravan-ops",
      version: "0.1.0",
    });
    expect(mod?.getStartupMessage()).toBe(
      "OpenClaw Haravan Ops Lean MCP v0.1.0 running on stdio"
    );
  });
});

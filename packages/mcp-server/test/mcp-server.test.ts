import { describe, it, expect } from "vitest";
import { spawnSync } from "child_process";
import path from "path";

describe("OpenClaw lean MCP server", () => {
  it("boots on stdio and prints startup line to stderr", () => {
    const serverPath = path.resolve(__dirname, "../dist/index.js");
    const proc = spawnSync("node", [serverPath], {
      input: "\n",
      encoding: "utf-8",
      timeout: 2000,
    });

    expect(proc.error).toBeUndefined();
    expect(proc.stderr).toContain(
      "OpenClaw Haravan Ops Lean MCP v0.1.0 running on stdio"
    );
  });
});

import { describe, expect, test } from "vitest";
import { HARAVAN_API_BRIDGE_TOOL_NAMES } from "../src/api-bridge-handlers";
import { LEAN_MCP_TOOLS } from "../src/mcp-tool-definitions";
import { API_BRIDGE_MCP_TOOLS } from "../src/mcp-api-bridge-tools";
import { LEAN_COMPOSITE_TOOL_NAMES } from "../src/tool-handlers";

function sorted(names: Iterable<string>): string[] {
  return [...names].sort((a, b) => a.localeCompare(b));
}

describe("LEAN_MCP_TOOLS routing parity", () => {
  test("composite + bridge definition names match LEAN_MCP_TOOLS exactly", () => {
    const expected = sorted([
      ...LEAN_COMPOSITE_TOOL_NAMES,
      ...API_BRIDGE_MCP_TOOLS.map((t) => t.name),
    ]);
    const actual = sorted(LEAN_MCP_TOOLS.map((t) => t.name));
    expect(actual).toEqual(expected);
  });

  test("API bridge MCP defs match callHaravanApiBridge registry keys", () => {
    expect(sorted(API_BRIDGE_MCP_TOOLS.map((t) => t.name))).toEqual(
      sorted(HARAVAN_API_BRIDGE_TOOL_NAMES)
    );
  });

  test("composite names are not haravan_ API bridge tools", () => {
    for (const n of LEAN_COMPOSITE_TOOL_NAMES) {
      expect(n.startsWith("haravan_"), `${n} must not use haravan_ prefix`).toBe(
        false
      );
    }
  });
});

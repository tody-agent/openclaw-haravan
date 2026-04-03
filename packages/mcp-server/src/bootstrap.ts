export const SERVER_INFO = {
  name: "openclaw-haravan-ops",
  version: "0.1.0",
} as const;

export function getStartupMessage(): string {
  return `OpenClaw Haravan Ops Lean MCP v${SERVER_INFO.version} running on stdio`;
}

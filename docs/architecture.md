---
title: Kiến trúc kỹ thuật — OpenClaw Haravan
description: >-
  Monorepo: @haravan-master/core, haravan-ops-dispatch, MCP server, OpenClaw plugin.
  Một nguồn callLeanTool cho mọi kênh tích hợp.
keywords: >-
  monorepo, Haravan API, MCP, OpenClaw plugin, TypeScript, dispatch
robots: index, follow
---

# Kiến trúc kỹ thuật

## Tóm tắt

Hệ thống tách **logic nghiệp vụ Haravan** khỏi **lớp vận chuyển** (MCP stdio vs OpenClaw in-process). Mọi tool MCP (composite + bridge `haravan_*`) gọi chung `callLeanTool` trong package dispatch.

```mermaid
flowchart LR
  subgraph clients
    MCP[MCP stdio]
    PLG[OpenClaw plugin]
  end
  DISPATCH[haravan-ops-dispatch]
  CORE[@haravan-master/core]
  MCP --> DISPATCH
  PLG --> DISPATCH
  DISPATCH --> CORE
```

## Package

| Package | Vai trò | Entry chính |
|---------|---------|-------------|
| `@haravan-master/core` | Client REST Haravan, rate limit | `packages/core` |
| `@haravan-master/haravan-ops-dispatch` | `LEAN_MCP_TOOLS`, `callLeanTool`, ops-tools, workflows | `packages/haravan-ops-dispatch/src/index.ts` |
| `@haravan-master/openclaw-haravan-ops-mcp` | Server MCP, env `HARAVAN_*` | `packages/mcp-server/src/index.ts` |
| `@haravan-master/openclaw-haravan-ops-plugin` | `definePluginEntry`, id `haravan-ops` | `packages/openclaw-haravan-plugin/src/index.ts` |

Tham chiếu mã nguồn:

- Đăng ký tool MCP (`packages/mcp-server/src/index.ts`):

```ts
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [...LEAN_MCP_TOOLS],
}));
```

- Khởi đầu `callLeanTool` (`packages/haravan-ops-dispatch/src/tool-handlers.ts`):

```ts
export async function callLeanTool(
  name: string,
  args: Record<string, unknown> | undefined,
  haravan: Haravan | null
): Promise<unknown> {
  if (!haravan) {
    throw new Error(
      "Haravan client not initialized. Missing HARAVAN_SHOP or HARAVAN_TOKEN"
    );
  }
```

*(Plugin dùng cùng `callLeanTool`; thông báo lỗi env vẫn nhắc HARAVAN_* — có thể làm rõ message theo plugin trong bản sau.)*

## Luồng dữ liệu

1. **MCP:** Process đọc env → `new Haravan({ shopDomain, accessToken })` → `callLeanTool(name, args, haravan)`.
2. **Plugin:** `api.pluginConfig` → cùng `Haravan` → cùng `callLeanTool`.

## Kiểm thử

- Vitest workspace: `packages/haravan-ops-dispatch/test`, `packages/mcp-server/test`, `packages/core/test`.
- Lệnh: `npm test` tại root (sau `npm run build` nếu cần resolve workspace).

## Tài liệu liên quan

- [Phân tích repo (DocKit)](/analysis) — ảnh chụp nhanh cấu trúc  
- [Lean playbook](/lean/README) — ma trận tool & disclaimer  
- [Plugin](/plugin-openclaw)

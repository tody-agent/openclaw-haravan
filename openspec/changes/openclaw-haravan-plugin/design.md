# Design: OpenClaw Plugin cho Haravan Ops

## Goal

Biến tích hợp Haravan Ops thành **plugin OpenClaw** chuẩn: cài nhanh, config có schema, token qua `sensitive` hints, hành vi trùng MCP hiện tại.

## Context & technical approach

- **Hiện tại:** `packages/mcp-server` chạy stdio MCP, đọc `HARAVAN_SHOP` / `HARAVAN_TOKEN`, expose `LEAN_MCP_TOOLS` + `callLeanTool`.
- **Hướng:** Plugin in-process gọi cùng pipeline Haravan (`Haravan` từ `@haravan-master/core`) với credential lấy từ `api.pluginConfig`.
- **Tại sao tách runtime:** Tránh hai bản copy `switch (name)` và hai bộ schema lệch nhau; một module **dispatch** dùng chung cho MCP và plugin.

## Kiến trúc đề xuất

```mermaid
flowchart LR
  subgraph consumers
    MCP[MCP stdio server]
    PLG[OpenClaw plugin entry]
  end
  subgraph shared
    DISPATCH[haravan-ops-dispatch]
    CORE[@haravan-master/core]
  end
  MCP --> DISPATCH
  PLG --> DISPATCH
  DISPATCH --> CORE
```

1. **`packages/haravan-ops-dispatch`** (tên gợi ý): chứa `LEAN_MCP_TOOLS`, `callLeanTool`, toàn bộ `ops-tools/` + `tools/` hiện đang nằm dưới `mcp-server/src`. Export công khai cho plugin và MCP.
2. **`packages/mcp-server`:** Chỉ transport MCP + `Haravan` từ env + gọi `callLeanTool` từ dispatch package.
3. **`packages/openclaw-haravan-plugin`:** `definePluginEntry` → đọc config → `new Haravan({ shopDomain, accessToken })` → đăng ký tool bằng vòng lặp trên metadata + TypeBox (hoặc JSON Schema nếu SDK cho phép).

## Plugin manifest (`openclaw.plugin.json`)

- `id`: ví dụ `haravan-ops` (ổn định, khớp `plugins.entries`).
- `configSchema`: `shop` (string), `accessToken` (string), `additionalProperties: false`.
- `uiHints`: `accessToken.sensitive: true`, label tiếng Việt/English.
- `contracts.tools`: mảng đủ 19 tên tool (trùng `LEAN_MCP_TOOLS`).

## `package.json` (plugin)

- `type: module`, `main`: `./dist/index.js`.
- Khối `openclaw.extensions`, `compat.pluginApi`, `build.openclawVersion` — **lấy version thực tế tại ngày build** từ tài liệu/npm `openclaw` (không hardcode số cũ trong doc mẫu nếu đã lỗi thời).
- `peerDependencies` hoặc `dependencies` trên `openclaw` theo hướng dẫn SDK (import subpath `openclaw/plugin-sdk/plugin-entry`).

## Tool registration

- **Parameters:** Dùng `@sinclair/typebox` mirror `inputSchema` trong `LEAN_MCP_TOOLS` (required fields giữ nguyên).
- **Optional tools:** `theme_draft_create` — `registerTool(..., { optional: true })`.
- **Execute:** Gọi `callLeanTool(name, params, haravan)`; trả về `{ content: [{ type: "text", text: JSON.stringify(result, null, 2) }] }` để đồng nhất với MCP.

## Verification

- `npm run build` toàn monorepo.
- `openclaw plugins install -l ./packages/openclaw-haravan-plugin` + `openclaw plugins inspect haravan-ops`.
- `openclaw plugins doctor` không báo lỗi manifest/compat.
- Smoke: một tool read-only (ví dụ `audit_theme_risk`) với config hợp lệ.

## Rủi ro & giảm thiểu

| Rủi ro | Giảm thiểu |
|--------|------------|
| Version plugin API lệch | Pin compat theo OpenClaw đang dùng; ghi rõ trong README. |
| TypeBox lệch JSON Schema | Generator hoặc test snapshot từng tool; ít nhất test 2–3 tool đại diện. |
| Publish workspace package | `npm publish` từ package con hoặc `files` + `prepack`; tránh publish root private. |

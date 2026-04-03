---
title: Phân tích codebase (DocKit snapshot)
description: >-
  Ảnh chụp cấu trúc openclaw-haravan: ngôn ngữ, entry point, docs, test,
  để onboard nhanh cho AI và developer.
keywords: >-
  codebase analysis, monorepo, documentation, onboarding
robots: index, follow
---

# Phân tích codebase

::: info Mục đích
Trang này bám hướng **DocKit / knowledge snapshot**: một lần đọc — nắm được **loại project**, **lớp nào ở đâu**, **test ở đâu**. Cập nhật khi thêm package hoặc đổi kiến trúc lớn.
:::

## Loại project

- **Ngôn ngữ:** TypeScript (Node 20+).
- **Kiểu repo:** Monorepo `npm workspaces` (`packages/*`).
- **Ứng dụng:** Thư viện + MCP server + OpenClaw plugin — không có web app runtime riêng; **site marketing/docs** là VitePress trong `docs/`.

## Cấu trúc thư mục (cấp cao)

| Đường dẫn | Nội dung |
|-----------|----------|
| `packages/core` | Client Haravan REST |
| `packages/haravan-ops-dispatch` | Tool definitions + handlers dùng chung |
| `packages/mcp-server` | MCP stdio |
| `packages/openclaw-haravan-plugin` | OpenClaw plugin |
| `docs/` | VitePress (landing + hướng dẫn tiếng Việt) |
| `skills/` | Skill routing cho agent (OpenClaw / Claude) |
| `openspec/` | OpenSpec thay đổi (plugin initiative) |

## Entry point

- **Build toàn repo:** `npm run build` (tất cả workspace có script `build`).
- **Test:** `npm test` (Vitest workspace).
- **Docs local:** `npm run docs:dev` → VitePress dev server.

## Test coverage (tín hiệu)

- **Có:** Vitest cho `core`, `haravan-ops-dispatch`, `mcp-server` (một phần integration spawn MCP).
- **Không có trong repo:** E2E chống Haravan production (cần token + shop thật).

## Phụ thuộc đáng chú ý

- **MCP:** `@modelcontextprotocol/sdk`.
- **Plugin:** `openclaw` (pin version trong `packages/openclaw-haravan-plugin/package.json`), `@sinclair/typebox`.

## Liên kết sâu hơn

- [Kiến trúc](/architecture) — sơ đồ & package  
- [Plugin](/plugin-openclaw)  
- [index phân tích lean](/lean/README)

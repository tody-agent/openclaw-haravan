---
title: Kiến trúc kỹ thuật — Haravan Claw Master
description: >-
  Monorepo Haravan Claw Master: @haravan-master/core, haravan-ops-dispatch, MCP server, OpenClaw plugin.
  Một nguồn callLeanTool cho mọi kênh tích hợp.
keywords: >-
  monorepo, Haravan API, MCP, OpenClaw plugin, TypeScript, dispatch
robots: index, follow
---

# Kiến trúc kỹ thuật

## Tóm tắt

Hệ thống tách **logic nghiệp vụ Haravan** khỏi **lớp vận chuyển** (MCP stdio vs OpenClaw in-process). Mọi tool MCP (composite + bridge `haravan_*`) gọi chung `callLeanTool` trong package dispatch. 

```mermaid
graph TD
    subgraph Clients
        MCP[MCP Stdio Server]
        PLG[OpenClaw Plugin]
    end

    subgraph haravan-ops-dispatch
        DISP{Tool Router: callLeanTool}
        
        subgraph Ops Tools (Business Logic)
            STK[low-stock / sale-forecast]
            FIN[tax-snapshot / monthly-pl]
            SLA[order-sla / end-of-day]
            MKT[promotion-health / customer-value]
        end
        
        subgraph API Bridge
            RAW[Core/Raw Endpoints]
        end
        
        DISP --> Ops
        DISP --> RAW
    end

    subgraph core
        CORE[@haravan-master/core SDK]
        RETRY[Retry Strategy]
    end
    
    MCP --> DISP
    PLG --> DISP
    Ops Tools --> CORE
    API Bridge --> CORE
```

## Giải phẫu các Packages

| Package | Vai trò cốt lõi | Entry chính |
|---------|-----------------|-------------|
| `@haravan-master/core` | SDK gọi API REST Haravan (`/com` và `/web`), Type Definitions (Order, Product, Inventory...), cơ chế tự động Retry khi bị Rate Limit. | `packages/core/src/index.ts` |
| `@haravan-master/haravan-ops-dispatch` | Cụm não bộ: Chứa `LEAN_MCP_TOOLS` và hàm router tổng `callLeanTool`. Tích hợp mọi logic cho các **Ops Tools** (Business Logic: SLA, tồn kho, doanh thu...). | `packages/haravan-ops-dispatch/src/index.ts` |
| `@haravan-master/openclaw-haravan-ops-mcp` | Máy chủ Node.js chạy chuẩn giao thức stdio Model Context Protocol (MCP). Đọc config từ env `HARAVAN_SHOP` và `HARAVAN_TOKEN`. | `packages/mcp-server/src/index.ts` |
| `@haravan-master/openclaw-haravan-ops-plugin` | OpenClaw plugin dùng để đăng tải bộ công cụ trực tiếp không qua IPC (JSON stdio) mà chạy in-process memory. Ánh xạ schema qua `@sinclair/typebox`. | `packages/openclaw-haravan-plugin/src/index.ts` |

### Luồng Tool Router

Tất cả các lệnh tới từ AI Agent (ví dụ: chạy snapshot cuối ngày) sẽ đi qua `callLeanTool` (`packages/haravan-ops-dispatch/src/tool-handlers.ts`):

```ts
export async function callLeanTool(
  name: string,
  args: Record<string, unknown> | undefined,
  haravan: Haravan | null,
  options?: CallLeanToolOptions
): Promise<unknown> {
  if (!haravan) {
    throw new Error("Haravan client not initialized. Missing HARAVAN_SHOP or HARAVAN_TOKEN");
  }
  // Router sẽ dispatch tool tới Ops Handler cụ thể hoặc API Bridge...
}
```

## Luồng dữ liệu

1. **MCP:** Process đọc env → `new Haravan({ shopDomain, accessToken })` → `callLeanTool(name, args, haravan)`.
2. **Plugin:** `api.pluginConfig` → cùng `Haravan` → cùng `callLeanTool`.

## Kiểm thử & CI

| Lệnh (root) | Mục đích |
|-------------|----------|
| `npm test` | Vitest toàn repo (không bắt buộc build docs trước; test `docs-dist` bị skip nếu chưa có `docs/.vitepress/dist`). |
| `npm run test:gate` | Build mọi workspace + `vitepress build docs` + Vitest verbose — **chuẩn trước merge**. |
| `npm run security:scan` | Quét pattern nhạy cảm trong mã nguồn (`scripts/security-scan.mjs`, bỏ qua `docs/`). |
| `npm run verify` | `security:scan` rồi `test:gate`. |

**GitHub Actions:** workflow [`.github/workflows/ci.yml`](https://github.com/tody-agent/openclaw-haravan/blob/main/.github/workflows/ci.yml) (trên PR và push `main`): `npm ci` → security scan → Gitleaks → `npm audit --audit-level=high` → `test:gate`. Deploy docs riêng: [`.github/workflows/deploy-docs.yml`](https://github.com/tody-agent/openclaw-haravan/blob/main/.github/workflows/deploy-docs.yml).

**Hook local (tuỳ chọn):** `npm run hooks:install` rồi cài gitleaks — xem [AGENTS.md](https://github.com/tody-agent/openclaw-haravan/blob/main/AGENTS.md).

Cấu trúc test: `test/` (gate repo + docs dist), `packages/core/test`, `packages/haravan-ops-dispatch/test`, `packages/mcp-server/test`.

## Tài liệu liên quan

- [Phân tích repo (DocKit)](/analysis) — ảnh chụp nhanh cấu trúc  
- [Lean playbook](/lean/README) — ma trận tool & disclaimer  
- [Plugin](/plugin-openclaw)

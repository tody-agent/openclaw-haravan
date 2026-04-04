---
title: Phân tích codebase (DocKit snapshot)
description: >-
  Ảnh chụp cấu trúc monorepo Haravan Claw Master: ngôn ngữ, entry point, docs, test,
  để onboard nhanh cho AI và developer.
keywords: >-
  codebase analysis, monorepo, documentation, onboarding
robots: index, follow
---

# Phân tích codebase

::: info Mục đích
Trang này bám hướng **DocKit / knowledge snapshot**: một lần đọc — nắm được **loại project**, **lớp nào ở đâu**, **test ở đâu**. Cập nhật khi thêm package hoặc đổi kiến trúc lớn.
Đây là bản chụp mới nhất sau quá trình index codebase bởi lộ trình AI tự động (`cm-codeintell`).
:::

## Loại project & Quy mô

- **Ngôn ngữ:** TypeScript.
- **Kiểu repo:** npm workspaces monorepo (`packages/*`).
- **Quy mô:** \~234+ file mã nguồn chuyên biệt. Xây dựng cốt lõi từ Haravan REST clients đén các công cụ xử lý logic ops phức tạp (`haravan-ops-dispatch`).
- **Ứng dụng:** Thư viện (`@haravan-master/core`) + Hệ quản trị logic (`haravan-ops-dispatch`) + MCP server + OpenClaw plugin. 

## Cấu trúc thư mục cốt lõi

| Đường dẫn / Package | Vai trò & Nội dung |
|---------------------|--------------------|
| `packages/core` | Chứa SDK base, resources (orders, customers, themes, webhooks, inventory, shop, com-rest, web-rest), types, retry mechanism. |
| `packages/haravan-ops-dispatch` | Chứa *Business Logic* và *Tool Definitions*. Nơi định nghĩa hàng loạt các tools tối quan trọng: `daily-business-snapshot`, `orders-attention`, `low-stock`, `sale-period-stock-forecast`, `tax-snapshot`, `pricing-anomaly`, `restock-advisor`... và các API bridge handlers. |
| `packages/mcp-server` | Model Context Protocol server (stdio). Expose các `LEAN_MCP_TOOLS` và `API_BRIDGE_MCP_TOOLS` cho AI (Claude Desktop, Cursor). |
| `packages/openclaw-haravan-plugin` | OpenClaw plugin wrapper, map MCP inputs sang TypeBox schemas, cho phép đăng ký trực tiếp dưới dạng plugin `haravan-ops`. |
| `docs/` | VitePress site: tài liệu người dùng + kiến trúc hệ thống (viết bằng Markdown tối ưu SEO & LLM). |
| `scripts/` | Toolchain nội bộ: deployment, security scans, packaging. |

## Entry point & Workflow Mẫu

- **Build toàn repo:** `npm run build` (lần lượt build core -> dispatch -> plugin/server).
- **Test:** `npm test` hoặc `vitest` (đặc biệt trong `haravan-ops-dispatch` test rất kỹ nghiệp vụ).
- **Security / CI Gate:** `npm run security:scan` và `npm run verify` để đảm bảo code luôn sạch, không lộ credentials.
- **Docs (VitePress):** `npm run docs:dev`.

## Phụ thuộc và Tích hợp đáng chú ý

- **MCP SDK:** `@modelcontextprotocol/sdk`.
- **OpenClaw Interface:** `@sinclair/typebox` giúp xử lý dynamic schema khi render ra UI cho Agent.
- Node.js native, rất ít external dependencies rườm rà.

## Liên kết sâu hơn

- [Kiến trúc chi tiết](/architecture)
- [Năng lực Công cụ Ops / API](/api-ops-tools) (Tổng hợp tra cứu tool list)
- [Plugin OpenClaw](/plugin-openclaw)

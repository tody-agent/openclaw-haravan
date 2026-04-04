---
title: Plugin OpenClaw — Haravan Ops
description: >-
  Cài plugin haravan-ops: openclaw plugins install, cấu hình shop và accessToken,
  kiểm tra doctor. Cùng bộ tool với MCP (composite + API bridge haravan_*).
keywords: >-
  OpenClaw plugin, haravan-ops, Haravan token, plugins install, ClawHub
robots: index, follow
---

# Plugin OpenClaw — Haravan Ops

::: info Tóm tắt 10 giây
**Haravan Claw Master** (bộ kit) dùng plugin registry tên **Haravan Ops**.  
**Plugin id:** `haravan-ops` · **Package:** `@haravan-master/openclaw-haravan-ops-plugin`  
Cấu hình **`shop`** + **`accessToken`** (UI ẩn token nhờ `sensitive`). Tool đăng ký đồng bộ với MCP (`LEAN_MCP_TOOLS`).
:::

**Publish & chia sẻ cho cộng đồng:** [deploy-openclaw-plugin.md](./deploy-openclaw-plugin.md) (npm / ClawHub, thứ tự package, listing OpenClaw).

## Khi nào nên dùng plugin thay MCP?

| Tiêu chí | Plugin | MCP + env |
|----------|--------|-----------|
| Cấu hình qua OpenClaw / schema | Có | Thường phải sửa env tay |
| Token không lộ trên skill markdown | Có (config riêng) | Phụ thuộc cách bạn cấu hình |
| Cài một lệnh sau publish | `openclaw plugins install …` | `node …/dist/index.js` + env |

## Cài từ source (local)

Trong repo đã clone:

```bash
npm install
npm run build
openclaw plugins install -l ./packages/openclaw-haravan-plugin
```

Kiểm tra:

```bash
openclaw plugins list
openclaw plugins inspect haravan-ops
openclaw plugins doctor
```

## Cấu hình

Trong config OpenClaw, bật plugin và điền (tên field khớp manifest):

| Key | Ví dụ | Ghi chú |
|-----|-------|---------|
| `shop` | `your-shop.myharavan.com` | Domain shop Haravan |
| `accessToken` | *(token ứng dụng)* | Không dán vào chat công khai |

Sau khi đổi config, restart gateway / app OpenClaw nếu cần.

## Tool đặc biệt (optional trong OpenClaw)

Các tool sau mặc định **optional** — bật trong UI OpenClaw khi cần:

- **`theme_draft_create`** — tạo theme draft; vẫn cần `confirm: true` khi ghi API.
- **`haravan_com_api`** — gọi tùy ý Admin API `/com` (GET/POST/PUT/DELETE + path `.json`).
- **`haravan_web_api`** — gọi tùy ý API `/web` (theme, …).

Các tool `haravan_*` còn lại (địa điểm, đơn, transaction/refund, tags, đếm SP) bật mặc định cùng plugin sau khi cấu hình `shop` + `accessToken`.

## Publish & Community

Quy trình đầy đủ (ClawHub, npm, PR listing) nằm trong file `upgrade_plugin.md` ở root repo trên GitHub (xem bản raw trên remote bạn clone).

## Liên kết

- [Cài đặt & MCP](/cai-dat-va-thiet-lap)
- [FAQ](/cau-hoi-thuong-gap)
- [Bản đồ tài liệu](/bo-tai-lieu)

---
layout: home
title: OpenClaw x Haravan — Trợ lý vận hành shop bằng AI
description: >-
  Cài plugin hoặc MCP, hỏi tiếng Việt: đơn hàng, tồn kho, thuế, khuyến mãi, theme.
  Composite tool + API bridge (`haravan_*`) cho chủ shop và team vận hành Haravan.
keywords: >-
  Haravan, OpenClaw, AI shop, vận hành ecommerce, MCP, plugin Haravan,
  tồn kho, đơn hàng, tiếng Việt
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:title
      content: OpenClaw x Haravan — Trợ lý vận hành shop bằng AI
  - - meta
    - property: og:description
      content: Plugin + MCP. Hỏi bằng tiếng Việt về đơn, tồn, KM, thuế — không cần dashboard phức tạp.
hero:
  name: OpenClaw x Haravan
  text: Hỏi một câu — thấy cả cửa hàng
  tagline: >-
    Khi bạn cần biết đơn có trễ không, tồn có âm không, KM có sắp hết hạn không:
    nói tiếng Việt với AI, dữ liệu lấy trực tiếp từ Haravan. Plugin OpenClaw (khuyến nghị)
    hoặc MCP lean cho team đã quen cấu hình env.
  actions:
    - theme: brand
      text: Cài plugin OpenClaw
      link: /plugin-openclaw
    - theme: alt
      text: Cài đặt đầy đủ (MCP + skill)
      link: /cai-dat-va-thiet-lap
    - theme: alt
      text: Demo 5 phút
      link: /demo-5-phut
features:
  - icon: 🔌
    title: Plugin chuẩn OpenClaw
    details: >-
      Config `shop` + `accessToken` có schema, token đánh dấu sensitive. Một lệnh
      `openclaw plugins install -l …` sau khi build — ít sửa JSON tay hơn MCP thuần.
    link: /plugin-openclaw
    linkText: Hướng dẫn plugin
  - icon: 🛡️
    title: Đọc trước, ghi sau
    details: >-
      Mặc định read-only. Tool tạo theme draft cần xác nhận rõ ràng; phù hợp chủ shop
      và ops không muốn AI “tự ý” sửa production.
    link: /nang-luc-va-use-cases-theo-vai-tro
    linkText: Năng lực & use case
  - icon: 📊
    title: Nhiều tool nghiệp vụ + cầu API
    details: >-
      Tool composite (snapshot ngày, SLA đơn, tồn, KM, thuế ước tính…) cùng bridge
      `haravan_*` khi cần gọi REST Haravan linh hoạt — không phải tự ghép từng bước tay.
    link: /lean/playbook-tool-matrix
    linkText: Ma trận tool (lean)
  - icon: 🧭
    title: Tài liệu & kiến trúc
    details: >-
      Sơ đồ package (core, dispatch, MCP, plugin), checklist publish community,
      FAQ — sẵn cho IT onboard và contributor.
    link: /architecture
    linkText: Kiến trúc hệ thống
---

## Dành cho ai?

| Bạn là… | Bắt đầu từ đâu |
|---------|----------------|
| **Chủ shop / Ops** | [Demo 5 phút](/demo-5-phut) → hỏi thử một câu về đơn hoặc tồn |
| **Đang dùng OpenClaw** | [Plugin Haravan Ops](/plugin-openclaw) |
| **IT / tích hợp MCP** | [Cài đặt & thiết lập](/cai-dat-va-thiet-lap) + [Kiến trúc](/architecture) |

::: tip Lời hứa rõ ràng (không thổi phồng)
Đây là **trợ lý vận hành & cảnh báo sớm**, không thay kế toán hay cam kết SLA sàn thay bạn. Thuế và P&L trong tool là **ước tính / nhắc việc** — luôn đối chiếu quy định và sổ sách thực tế.
:::

## Câu hỏi mẫu (copy — paste vào chat)

- *“Hôm nay shop bán thế nào, có đơn nào cần chú ý không?”*
- *“Có variant nào tồn âm hoặc sắp hết không?”*
- *“Khuyến mãi nào sắp hết hạn nhưng vẫn đang bật?”*

[Xem thêm theo vai trò](/su-dung-theo-vai-tro) · [FAQ](/cau-hoi-thuong-gap)

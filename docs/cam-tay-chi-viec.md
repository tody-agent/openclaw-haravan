---
title: "Bắt đầu trong 3 phút — từ chưa cài đến câu hỏi đầu tiên"
description: >-
  Hướng dẫn từng bước cho người mới: cài plugin, điền thông tin shop,
  rồi hỏi câu đầu tiên — không cần biết code.
keywords: >-
  hướng dẫn cài Haravan AI, cài plugin OpenClaw, bắt đầu nhanh, Haravan token
robots: index, follow
---

# Bắt đầu trong 3 phút

> Bạn không cần biết "monorepo" hay "TypeScript" là gì. Chỉ cần làm **3 bước** dưới đây, theo đúng thứ tự. Nếu gặp vấn đề, nhờ bạn IT hoặc xem [FAQ](/cau-hoi-thuong-gap).

---

## Bước 1 — Chuẩn bị shop & token

Bạn cần 2 thứ trước khi bắt đầu:

| Cần gì | Cách lấy |
|--------|---------|
| **Tên shop** | Dạng `ten-shop.myharavan.com` (không thêm `https://`) |
| **Token riêng** | Trong Haravan admin → Ứng dụng → Tạo ứng dụng riêng → copy token |

::: warning 🔒 Bảo mật token
Không dán token vào bất kỳ chat công khai nào (Zalo group, Slack public, Facebook…). Lưu vào file cấu hình trên máy bạn thôi.
:::

Chi tiết quyền cần cấp: [Cài đặt kỹ thuật](/cai-dat-va-thiet-lap).

---

## Bước 2 — Cài plugin (chọn cách phù hợp)

### 🟢 Cách A: Dùng OpenClaw (dễ nhất, khuyến nghị)

Nếu bạn đang dùng **OpenClaw** (app chat AI), chỉ cần:

1. Cài plugin:
   ```bash
   openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin
   ```
2. Trong OpenClaw: bật plugin **`haravan-ops`**, điền **tên shop** và **token**.
3. Xong! Chuyển sang [Bước 3](#bước-3-hỏi-câu-đầu-tiên).

> **Nếu cài từ source** (IT muốn tùy chỉnh):
> ```bash
> git clone https://github.com/tody-agent/openclaw-haravan.git
> cd openclaw-haravan
> npm install && npm run build
> openclaw plugins install -l ./packages/openclaw-haravan-plugin
> ```

Hướng dẫn đầy đủ: [Plugin Haravan Ops](/plugin-openclaw).

### 🔵 Cách B: Dùng Cursor / Claude Desktop / IDE có MCP

Nếu bạn dùng Cursor, Claude Desktop, hoặc IDE hỗ trợ MCP:

1. Clone repo, `npm install && npm run build`.
2. Thêm MCP server vào config IDE, trỏ tới `packages/mcp-server/dist/index.js`:
   - Biến môi trường: `HARAVAN_SHOP` + `HARAVAN_TOKEN`
3. Restart IDE.

Chi tiết: [Cài đặt kỹ thuật](/cai-dat-va-thiet-lap).

---

## Bước 3 — Hỏi câu đầu tiên

Mở chat AI, copy **một** câu dưới đây và dán vào:

```text
Hôm nay shop bán thế nào? Có đơn nào cần chú ý không?
```

Hoặc:

```text
Có SKU nào tồn thấp hoặc sắp hết không?
```

### Bạn sẽ thấy gì?

AI sẽ trả lời bằng tiếng Việt, bám dữ liệu shop thật:
- **Doanh thu ngày** — tổng hợp từ đơn hàng
- **Đơn cần chú ý** — chưa thanh toán, chưa giao, lỡ SLA
- **Cảnh báo** — tồn thấp, giá bất thường, KM sắp hết hạn

::: tip Kỳ vọng đúng
AI là **trợ lý tóm tắt & cảnh báo sớm**. Nó không thay báo cáo kế toán, không tự sửa shop. Số thuế / P&L là ước tính — luôn đối chiếu sổ sách. Xem [cam kết an toàn](/lean/safety-disclaimers).
:::

---

## Nếu không chạy?

Đừng lo, hầu hết lỗi đều đơn giản:

| Triệu chứng | Cách sửa nhanh |
|-------------|----------------|
| Không thấy tool Haravan trong chat | Đã `npm run build` chưa? Đã restart app chưa? |
| Báo lỗi token | Token còn hạn không? Tên shop đúng format `xxx.myharavan.com`? |
| AI trả lời chung chung, không có số | MCP đã bật chưa? Thử nói rõ: *"Lấy dữ liệu từ shop qua tool"* |
| Lỗi "Cannot find module" | Cài [Node.js 20+](https://nodejs.org/), chạy lại `npm install && npm run build` |

Xem thêm: [FAQ](/cau-hoi-thuong-gap).

---

## Bước tiếp — dùng hàng ngày

Bạn đã cài xong? Tuyệt vời. Dưới đây là gợi ý tiếp theo:

- 📋 [Câu hỏi mẫu theo vai trò](/su-dung-theo-vai-tro) — copy dán mỗi ngày
- 📊 [AI làm được gì?](/nang-luc-va-use-cases-theo-vai-tro) — danh sách năng lực
- 🗺️ [Bản đồ tài liệu](/bo-tai-lieu) — tìm đúng trang bạn cần
